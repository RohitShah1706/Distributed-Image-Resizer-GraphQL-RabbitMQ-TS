import { Request } from "express";

interface IContext {
    req: Request;
}

interface IUser {
    _id: string;
    username: string;
    email: string;
    password: string;
    img: string | null;
    createdAt: string;
}

interface IUserCookie {
    _id: string;
    username: string;
    email: string;
    img: string | null;
    createdAt: string;
}

interface IRegisterInputErrors {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

interface ILoginInputErrors {
    email?: string;
    password?: string;
}

interface IRegisterLoginUserResponse {
    user: {
        username: string;
        email: string;
        img: string | null;
        createdAt: string;
    };
    token: string;
}

export {
    IContext,
    IUser,
    IRegisterInputErrors,
    ILoginInputErrors,
    IRegisterLoginUserResponse,
    IUserCookie
}