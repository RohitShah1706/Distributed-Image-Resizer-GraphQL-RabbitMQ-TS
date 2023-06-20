import mongoose from "mongoose";

import { IImage } from "../interfaces";

const ImageSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, "User ID is required"],
    },
    imgURL: {
        type: String,
        required: [true, "Image URL is required"],
    },
    createdAt: {
        type: String,
        default: new Date().toISOString()
    }
})

const Image = mongoose.model<IImage & mongoose.Document>("Image", ImageSchema);
export default Image;
