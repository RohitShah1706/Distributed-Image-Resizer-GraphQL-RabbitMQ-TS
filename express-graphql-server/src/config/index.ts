import dotenv from "dotenv";
dotenv.config();

const INTROSPECTION = process.env.INTROSPECTION_ENABLED === "true"
const SECRET_KEY = process.env.SECRET_KEY || "secretkey"
const DEFAULT_EXPIRATION = parseInt(process.env.DEFAULT_EXPIRATION || "3600")
const REDIS_HOST = process.env.REDIS_HOST || "redis"
const REDIS_PORT = process.env.REDIS_PORT || "6379"
const REDIS_PASSWORD = process.env.REDIS_PASSWORD || "mypassword"
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017"
const PORT = process.env.PORT || 5000

export {
    INTROSPECTION,
    SECRET_KEY,
    DEFAULT_EXPIRATION,
    REDIS_HOST,
    REDIS_PORT,
    REDIS_PASSWORD,
    MONGODB_URI,
    PORT,
}

