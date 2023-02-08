// The GraphQL schema
export const typeDefs = `#graphql
  type User {
    _id: ID
    username: String
    firstName: String
    lastName: String
    email: String
    password: String
  }

  type Query {
    users: [User]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, firstName: String, lastName: String) : User
  }
`;