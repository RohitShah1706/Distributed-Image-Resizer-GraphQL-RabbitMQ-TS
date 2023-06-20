import mongoose from "mongoose";

import { IUser } from "../interfaces";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    img: {
        type: String,
    },
    createdAt: {
        type: String,
    }
});

const User = mongoose.model<IUser & mongoose.Document>("User", UserSchema);
export default User;