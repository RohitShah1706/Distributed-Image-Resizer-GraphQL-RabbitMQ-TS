import gql from "graphql-tag";

const typeDefs = gql`

    input cacheCheck{
        key: String!
        value: String!
    }
    input RegisterInput {
        username: String!
        email: String!
        password: String!
        confirmPassword: String!
        img: String
    }
    input LoginInput {
        email: String!
        password: String!
    }
    type Message {
        message: String!
    }
    type User {
        email: String!
        username: String!
        img: String
        createdAt: String!
    }
    type UserResponse {
        user: User!
        token: String!
    }
    type Query {
        message: String!
        getUser: User!
        logout: Message!
    }
    type Mutation {
        getOrSetCache(cacheCheck: cacheCheck!): String!
        register(registerInput: RegisterInput!): UserResponse!
        login(loginInput: LoginInput!): UserResponse!
 
    }
`
export default typeDefs;