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

  type Message {
    _id: ID
    messageBody: String
    authorId: ID
    threadId: ID
  }

  scalar Date

  type Thread {
    _id: ID
    title: String
    creatorId: ID
    memberIds: [ID]
    messages: [ID]
    isDM: Boolean
    createdAt: Date
    updatedAt: Date
  }

  type Query {
    users: [User]
    userByUsername(username: String!) : User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, firstName: String, lastName: String) : Auth
    userLogIn(email: String!, password: String!) : Auth
    addMessage(messageBody: String!, threadId: ID!) : Message
    addThread(title: String!, memberIds: [ID], isDM: Boolean!) : Thread
  }
`;