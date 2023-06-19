import userResolver from "./user"

export default {
    Query: {
        message: () => "Hello World!"
    },
    Mutation: {
        ...userResolver.Mutation
    }
}