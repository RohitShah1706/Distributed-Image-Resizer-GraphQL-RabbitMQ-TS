import S3 from 'aws-sdk/clients/s3';

import {
    AWS_S3_BUCKET_NAME,
    AWS_S3_BUCKET_REGION,
    AWS_EXPRESSAPP_USER_ACCESS_KEY,
    AWS_EXPRESSAPP_USER_SECRET_ACCESS_KEY,
} from "../config"

const s3 = new S3({
    region: AWS_S3_BUCKET_REGION,
    accessKeyId: AWS_EXPRESSAPP_USER_ACCESS_KEY,
    secretAccessKey: AWS_EXPRESSAPP_USER_SECRET_ACCESS_KEY,
})

type S3UploadResult = S3.ManagedUpload.SendData;

const uploadFilesToS3 = async (userId: string | undefined, files: Express.Multer.File[]): Promise<S3UploadResult[]> => {
    const promises = files.map(async (file) => {
        const params = {
            Bucket: AWS_S3_BUCKET_NAME,
            Key: `${userId}/${file.originalname}`,
            Body: file.buffer,
        }
        return await s3.upload(params).promise();
    })
    return Promise.all(promises);
}

const getFileStreamFromS3 = (userId: string | undefined, key: string) => {
    const params = {
        Bucket: AWS_S3_BUCKET_NAME,
        Key: `${userId}/${key}`,
    }
    return s3.getObject(params).createReadStream();
}

const getAllFilesAfterUserKey = async (userId: string | undefined) => {
    const params = {
        Bucket: AWS_S3_BUCKET_NAME,
        Prefix: `${userId}/`,
    }
    const data = await s3.listObjectsV2(params).promise();
    var files: string[] = []
    if(data.Contents) {
        data.Contents.forEach((file) => {
            if(file.Key) {
                const key = file.Key.split("/")[1];
                files.push(key);
            }
        })
    }
    return files;
}

export {
    uploadFilesToS3,
    getFileStreamFromS3,
    getAllFilesAfterUserKey
}