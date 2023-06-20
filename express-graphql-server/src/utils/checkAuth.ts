import jsonwebtoken from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';

import { SECRET_KEY } from '../config';
import { IContext } from '../interfaces';

const checkAuthHeader = (context: IContext) => {
    const authHeader = context.req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split("Bearer ")[1];
        try {
            if (token) {
                // ! jsonwebtoken.verify() will throw an error if the token is invalid
                const user = jsonwebtoken.verify(token, SECRET_KEY);
                return user;
            } 
        } catch (err) {
            throw new AuthenticationError("Invalid/Expired token");
        }
    } else {
        throw new AuthenticationError("Authentication token must be provided");
    }
}

const checkAuthCookie = (context: IContext) => {
    const user = context.req.session.user;
    if (user) {
        return user;
    }
    throw new AuthenticationError("Invalid/Expired Credentials");
}

export {
    checkAuthHeader,
    checkAuthCookie
};