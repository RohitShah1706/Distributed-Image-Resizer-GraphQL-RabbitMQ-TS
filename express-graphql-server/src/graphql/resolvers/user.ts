import bcrypt from "bcryptjs"
import { UserInputError } from "apollo-server-express"

import { getOrSetCache } from "../../connection/connectRedis"
import { IContext, IRegisterLoginUserResponse } from "../../interfaces";
import User from "../../models/User";
import generateToken from "../../utils/generateToken";
import {
    validateRegisterInput,
    validateLoginInput
} from "../../utils/validators";
import { checkAuthHeader, checkAuthCookie } from "../../utils/checkAuth";

const userResolver = {
    // ! args: (parent: res of prev resolver, args: passed to this resolver, context, info: info about execution state)
    // ! can use "_" for unused args
    // ! can also destructure args to get only what we need
    Query: {
        getUser(
            _: any,
            args: any,
            context: IContext
        ) {
            const user = checkAuthCookie(context);
            return user;
        },
        logout(
            _: any,
            args: any,
            context: IContext
        ) {
            context.req.session.destroy((err) => {
                if (err) {
                    console.log(err);
                }
            });
            return {
                message: "Logged out"
            }
        }
    },
    Mutation: {
        async getOrSetCache(
            _: any,
            { cacheCheck: { key, value } }: { cacheCheck: { key: string, value: string } },
            context: IContext
        ) {
            const user = checkAuthHeader(context);
            const result = await getOrSetCache<string>(key, async() => {
                return value;
            });
            return result;
        },

        async register(
            _: any,
            { registerInput: { username, email, password, confirmPassword, img } }: { registerInput: { username: string, email: string, password: string, confirmPassword: string, img: string | null } },
            context: IContext
        ): Promise<IRegisterLoginUserResponse> {
            const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword);
            if (valid === false) {
                throw new UserInputError("Errors", { errors });
            }
            const foundUser = await User.find({ email: email });
            if (foundUser.length > 0) {
                throw new UserInputError("Email is taken", {
                    errors: {
                        email: "This email is taken"
                    }
                });
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const newUser = new User({
                username: username,
                email: email,
                password: hashedPassword,
                img: img,
                createdAt: new Date().toISOString()
            })
            const savedUser = await newUser.save();
            const token = generateToken(savedUser);
            context.req.session.user = {
                _id: savedUser._id,
                email: savedUser.email,
                username: savedUser.username,
                img: savedUser.img,
                createdAt: savedUser.createdAt
            }
            return {
                user: {
                    _id: savedUser._id,
                    email: savedUser.email,
                    username: savedUser.username,
                    img: savedUser.img,
                    createdAt: savedUser.createdAt
                },
                token
            }
        },

        async login(
            _: any,
            { loginInput: { email, password } }: { loginInput: { email: string, password: string } },
            context: IContext
        ): Promise<IRegisterLoginUserResponse> {
            const { valid, errors } = validateLoginInput(email, password);
            if (valid === false) {
                throw new UserInputError("Errors", { errors });
            }

            const foundUser = await User.findOne({ email: email });
            if (!foundUser) {
                errors.email = "User not found";
                throw new UserInputError("Errors", { errors });
            }

            const match = await bcrypt.compare(password, foundUser.password);
            if (!match) {
                errors.password = "Wrong password";
                throw new UserInputError("Errors", { errors });
            }
            const token = generateToken(foundUser);
            context.req.session.user = {
                _id: foundUser._id,
                email: foundUser.email,
                username: foundUser.username,
                img: foundUser.img,
                createdAt: foundUser.createdAt
            }
            return {
                user: {
                    _id: foundUser._id,
                    email: foundUser.email,
                    username: foundUser.username,
                    img: foundUser.img,
                    createdAt: foundUser.createdAt
                },
                token
            }
        }
    }
}

export default userResolver;