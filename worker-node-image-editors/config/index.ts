import dotenv from "dotenv";
dotenv.config();

const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME || ""
const AWS_S3_BUCKET_REGION = process.env.AWS_S3_BUCKET_REGION
const AWS_EXPRESSAPP_USER_ACCESS_KEY = process.env.AWS_EXPRESSAPP_USER_ACCESS_KEY
const AWS_EXPRESSAPP_USER_SECRET_ACCESS_KEY = process.env.AWS_EXPRESSAPP_USER_SECRET_ACCESS_KEY
const RABBITMQ_HOST = process.env.RABBITMQ_HOST || "localhost"
const RABBITMQ_PORT = process.env.RABBITMQ_PORT || "5672"
const RABBITMQ_USER = process.env.RABBITMQ_USER || "rabbitmq"
const RABBITMQ_PASS = process.env.RABBITMQ_PASS || "rohit123"
const RABBITMQ_MAIN_QUEUE = process.env.RABBITMQ_MAIN_QUEUE || "dis_image_queue"
const RABBITMQ_REPLY_QUEUE = process.env.RABBITMQ_REPLY_QUEUE || "dis_image_reply_queue"

export {
    AWS_S3_BUCKET_NAME,
    AWS_S3_BUCKET_REGION,
    AWS_EXPRESSAPP_USER_ACCESS_KEY,
    AWS_EXPRESSAPP_USER_SECRET_ACCESS_KEY,
    RABBITMQ_HOST,
    RABBITMQ_PORT,
    RABBITMQ_USER,
    RABBITMQ_PASS,
    RABBITMQ_MAIN_QUEUE,
    RABBITMQ_REPLY_QUEUE
}