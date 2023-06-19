import mongoose, { ConnectOptions } from "mongoose";
import { MongoClient } from "mongodb";

const connectDB = (mongoURI: string) => {
    return mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as ConnectOptions)
}

export default connectDB;