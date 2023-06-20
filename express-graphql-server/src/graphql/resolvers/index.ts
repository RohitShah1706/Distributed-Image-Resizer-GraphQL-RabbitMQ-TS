import userResolver from "./user"

export default {
    Query: {
        message: () => "Hello World!",
        ...userResolver.Query
    },
    Mutation: {
        ...userResolver.Mutation
    }
}