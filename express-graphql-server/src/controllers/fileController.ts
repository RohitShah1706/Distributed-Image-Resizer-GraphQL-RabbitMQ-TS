import { Request, Response } from "express";

import { uploadFilesToS3, getFileStreamFromS3, getAllFilesAfterUserKey } from "../utils/S3FileHandler";

// ! below functions will only be called by authenticated users
const uploadFiles = async (req: Request, res: Response) => {
    const _id = req.session.user?._id;
    const files = req.files as Express.Multer.File[];
    const results = await uploadFilesToS3(_id, files);
    res.send("Uploaded");
}

const getFile = async(req: Request, res: Response) => {
    const { key } = req.params;
    const _id = req.session.user?._id;
    const readStream = getFileStreamFromS3(_id, key);
    readStream.pipe(res);
}

const getUserFiles = async(req: Request, res: Response) => {
    const _id = req.session.user?._id;
    const files = await getAllFilesAfterUserKey(_id);
    res.send(files);
}

export {
    uploadFiles,
    getFile,
    getUserFiles
}