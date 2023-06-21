import dotenv from "dotenv";
dotenv.config();

const INTROSPECTION = process.env.INTROSPECTION_ENABLED === "true"
const SECRET_KEY = process.env.SECRET_KEY || "secretkey"
const DEFAULT_EXPIRATION = parseInt(process.env.DEFAULT_EXPIRATION || "3600")
const REDIS_HOST = process.env.REDIS_HOST || "redis"
const REDIS_PORT = process.env.REDIS_PORT || "6379"
const REDIS_PASSWORD = process.env.REDIS_PASSWORD || "mypassword"
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017"
const AWS_S3_BUCKET_NAME= process.env.AWS_S3_BUCKET_NAME || ""
const AWS_S3_BUCKET_REGION= process.env.AWS_S3_BUCKET_REGION || ""
const AWS_EXPRESSAPP_USER_ACCESS_KEY= process.env.AWS_EXPRESSAPP_USER_ACCESS_KEY || ""
const AWS_EXPRESSAPP_USER_SECRET_ACCESS_KEY= process.env.AWS_EXPRESSAPP_USER_SECRET_ACCESS_KEY || ""

const PORT = process.env.PORT || 5000

export {
    INTROSPECTION,
    SECRET_KEY,
    DEFAULT_EXPIRATION,
    REDIS_HOST,
    REDIS_PORT,
    REDIS_PASSWORD,
    MONGODB_URI,
    AWS_S3_BUCKET_NAME,
    AWS_S3_BUCKET_REGION,
    AWS_EXPRESSAPP_USER_ACCESS_KEY,
    AWS_EXPRESSAPP_USER_SECRET_ACCESS_KEY,

    PORT,
}

