import jsonwebtoken from "jsonwebtoken"

import { IUser } from "../interfaces"
import { SECRET_KEY } from "../config"

const generateToken  = (user: IUser) => {
    return jsonwebtoken.sign(
        {
            id: user._id,
            email: user.email,
            username: user.username,
            img: user.img,
            createdAt: user.createdAt
        },
        SECRET_KEY,
        { expiresIn: "1h" }
    )
}

export default generateToken;