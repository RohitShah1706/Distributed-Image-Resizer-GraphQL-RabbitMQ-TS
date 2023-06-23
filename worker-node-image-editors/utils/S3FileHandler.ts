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

const uploadFileToS3 = async (key: string, file: Buffer): Promise<S3UploadResult> => {
    const params = {
        Bucket: AWS_S3_BUCKET_NAME,
        Key: key,
        Body: file,
    }
    return s3.upload(params).promise()
}

const getFileFromS3 = async (key: string) => {
    const params = {
        Bucket: AWS_S3_BUCKET_NAME,
        Key: key,
    }
    return s3.getObject(params).promise()
}

export {
    uploadFileToS3,
    getFileFromS3,
}