// The GraphQL schema
export const typeDefs = `#graphql
  type User {
    _id: ID
    username: String
    firstName: String
    lastName: String
    email: String
    password: String
    contactIds: [User]
  }

  type Auth {
    authToken: ID
    user: User
  }
  
  scalar Date

  type Message {
    _id: ID
    messageBody: String
    authorId: User
    threadId: ID
    createdAt: Date
    updatedAt: Date
  }

  type Thread {
    _id: ID
    title: String
    creatorId: ID
    memberIds: [ID]
    isDM: Boolean
    createdAt: Date
    updatedAt: Date
  }

  type Query {
    users: [User]
    userByUsername(username: String!) : User
    threadsByUser : [Thread]
    messagesByThread(threadId: String!) : [Message]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, firstName: String, lastName: String) : Auth
    userLogIn(email: String!, password: String!) : Auth
    addMessage(messageBody: String!, threadId: ID!) : Message
    addThread(title: String!, memberNames: [String!], isDM: Boolean!) : Thread
  }

  type Subscription {
    messagePosted(threadId: ID!) : Message
  }
`;