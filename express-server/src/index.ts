import { ApolloServer } from "apollo-server";

import typeDefs from "./graphql/typedefs";
import resolvers from "./graphql/resolvers";
import { PORT, MONGODB_URI } from "./config";
import connectDB from "./db/connectDB";
import { redisClient } from "./db/connectRedis";

const server = new ApolloServer({
    typeDefs,
    resolvers,
    // ! context: fn that returns a request obj that is passed to all resolvers
    // ! allows us to acces req obj in resolvers
    context: ({ req }) => ({ req }),
    introspection: process.env.INTROSPECTION_ENABLED === "true"
})

const startServer = async() => {
    connectDB(MONGODB_URI)
        .then(() => console.log("Connected to MongoDB"))
        .catch(err => console.log(err));
    // await connectDB(MONGODB_URI);    
    // console.log("Connected to MongoDB");    
    await redisClient.connect();
    console.log("Connected to Redis");
    server.listen(PORT, () => {
        console.log(`Server running at port ${PORT} with introspection: ${process.env.INTROSPECTION_ENABLED}`);
    })
}

startServer();