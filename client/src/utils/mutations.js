import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation Mutation($username: String!, $email: String!, $password: String!, $firstName: String, $lastName: String) {
    addUser(username: $username, email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
      authToken
      user {
        _id
        email
        username
      }
    }
  } 
`;

export const USER_LOGIN = gql`
  mutation Mutation($email: String!, $password: String!) {
    userLogIn(email: $email, password: $password) {
      authToken
      user {
        _id
        email
        username
      }
    }
  }
`;

export const POST_MESSAGE = gql`
  mutation Mutation($messageBody: String!, $threadId: ID!) {
    addMessage(messageBody: $messageBody, threadId: $threadId) {
      createdAt
    }
  }
`

export const CREATE_DMTHREAD = gql`
  mutation Mutation($title: String!, $isDm: Boolean!, $memberNames: [String!]) {
    addThread(title: $title, isDM: $isDm, memberNames: $memberNames) {
      updatedAt
      title
      memberIds
      isDM
      creatorId
      createdAt
      _id
    }
  }
`