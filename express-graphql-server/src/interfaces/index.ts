interface Context {
    req: Request;
}

interface IUser {
    _id: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
}

export {
    Context,
    IUser
}