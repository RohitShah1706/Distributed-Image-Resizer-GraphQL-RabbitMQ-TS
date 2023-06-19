import gql from "graphql-tag";

const typeDefs = gql`
    input cacheCheck{
        key: String!
        value: String!
    }
    type Query {
        message: String!
    }
    type Mutation {
        getOrSetCache(cacheCheck: cacheCheck!): String!
    }
`
export default typeDefs;