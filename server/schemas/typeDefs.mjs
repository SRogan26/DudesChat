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

  type Auth {
    authToken: ID
    user: User
  }

  type Query {
    users: [User]
    userByUsername(username: String!) : User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, firstName: String, lastName: String) : Auth
    userLogIn(email: String!, password: String!) : Auth
  }
`;