import { Request } from "express";

interface IContext {
    req: Request;
}

interface IUserCookie {
    _id: string;
    username: string;
    email: string;
    img: string | null;
    createdAt: string;
}

interface IUser extends IUserCookie{
    password: string;
}

interface ILoginInputErrors {
    email?: string;
    password?: string;
}

interface IRegisterInputErrors extends ILoginInputErrors {
    username?: string;
    confirmPassword?: string;
}

interface IRegisterLoginUserResponse {
    user: IUserCookie;
    token: string;
}

interface IImageConsumerFromWorker {
    userId: string;
    key: string;
}

interface IImage extends IImageConsumerFromWorker{
    name: string;
    createdAt: string;
}

interface IImageTask {
    userId: string;
    key: string;
    operations: string[];
}

export {
    IContext,
    IUser,
    IRegisterInputErrors,
    ILoginInputErrors,
    IRegisterLoginUserResponse,
    IUserCookie,
    IImage,
    IImageConsumerFromWorker,
    IImageTask
}