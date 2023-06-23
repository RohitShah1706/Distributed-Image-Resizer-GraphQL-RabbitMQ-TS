import express from "express"
import { ApolloServer } from "apollo-server-express";
import multer from "multer";
import cors from "cors"
import cookieParser from "cookie-parser";
import session from "express-session";
import connectRedis from "connect-redis";

import typeDefs from "./graphql/typedefs";
import resolvers from "./graphql/resolvers";
import connectDB from "./connection/connectDB";
import { redisClient } from "./connection/connectRedis";
import { connectToRabbitMQ } from "./connection/connectRabbitMQ";
import { checkAuthMiddleware } from "./utils/checkAuth";
import { getFile, uploadFiles } from "./controllers/fileController";
import { saveImage } from "./controllers/imageController"
import { getChannel } from "./connection/connectRabbitMQ"
import { PORT, MONGODB_URI, SECRET_KEY, RABBITMQ_REPLY_QUEUE } from "./config";
import { IUserCookie, IImageConsumerFromWorker } from "./types";

declare module "express-session" {
    interface SessionData {
        user: IUserCookie;
    }
}

// ! const objects
const app = express();
const upload = multer();
const RedisStore = connectRedis(session);
const server = new ApolloServer({
    typeDefs,
    resolvers,
    // ! context: fn that returns a request obj that is passed to all resolvers
    // ! allows us to acces req obj in resolvers
    context: ({ req }) => ({ req }),
    introspection: process.env.INTROSPECTION_ENABLED === "true"
})

// ! middleware
app.use(cors({
    origin: "*",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser()) 
app.use(session({
    store: new RedisStore({ client: redisClient }),
    saveUninitialized: false,
    secret: SECRET_KEY,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 1 // 1 hour
    }
}))
app.use((req, res, next) => {
    if(!req.session) {
        return next(new Error("Session is not initialized"));
    }
    next();
})

// ! routes
app.post("/upload", upload.array("images", 10), checkAuthMiddleware, uploadFiles);
app.get("/files/:key", checkAuthMiddleware, getFile);

const consumeImagesFromWorker = async() => {
    console.log("Consuming images from worker node...");
    getChannel().consume(RABBITMQ_REPLY_QUEUE, async (msg) => {
        if(msg) {
            const { key, userId }: IImageConsumerFromWorker = JSON.parse(msg.content.toString());
            await saveImage(userId, key.split("/")[1]);
            getChannel().ack(msg);
        }
    }, {
        // ! noAck - automatically ack the msg when it is received
        noAck: false
    })
}

const startServer = async() => {
    try {
        await connectDB(MONGODB_URI);
        console.log("Connected to MongoDB");
        
        await server.start();
        server.applyMiddleware({ app, cors: false });
        
        await connectToRabbitMQ();
        console.log("Connected to RabbitMQ");

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
        })

        await consumeImagesFromWorker();
    } catch (error) {
        console.log(error);
    }
}
startServer();

redisClient.on("error", (err) => {
    console.error(err);
})
redisClient.on("connect", () => {
    console.log("Connected to Redis");
})

