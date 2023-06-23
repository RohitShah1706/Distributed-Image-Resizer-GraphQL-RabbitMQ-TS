import { Request, Response } from "express";

import { uploadFilesToS3, getFileStreamFromS3 } from "../utils/S3FileHandler";
import { saveImage } from "./imageController"

// ! below functions will only be called by authenticated users
const uploadFiles = async (req: Request, res: Response) => {
    const _id = req.session.user?._id || "";
    const files = req.files as Express.Multer.File[];
    if(!files) {
        res.status(400).send("No files uploaded");
        return;
    }
    const results = await uploadFilesToS3(_id, files);
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const result = results[i];
        await saveImage(_id, result.Key.split("/")[1], file.originalname);
    }
    res.send("Uploaded");
}

const getFile = async(req: Request, res: Response) => {
    const { key } = req.params;
    const _id = req.session.user?._id;
    const readStream = getFileStreamFromS3(_id, key);
    readStream.pipe(res);
}

export {
    uploadFiles,
    getFile,
}