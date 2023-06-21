import userResolver from "./user"
import imageResolver from "./image"

export default {
    Query: {
        message: () => "Hello World!",
        ...userResolver.Query,
        ...imageResolver.Query
    },
    Mutation: {
        ...userResolver.Mutation,
        ...imageResolver.Mutation
    }
}