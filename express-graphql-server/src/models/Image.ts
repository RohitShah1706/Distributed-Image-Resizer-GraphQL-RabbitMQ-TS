import mongoose from "mongoose"

import { IImage } from "../types"

const imageSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, "User id is required"]
    },
    key: {
        type: String,
        required: [true, "Key is required"],
        unique: true
    },
    name: {
        type: String,
    },
    createdAt: {
        type: String,
        default: new Date().toISOString()
    }
})

const Image = mongoose.model<IImage>("Image", imageSchema)
export default Image;