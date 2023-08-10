import { gql } from "@apollo/client";

export const GET_THREADS = gql`
  query Query {
    threadsByUser {
      updatedAt
      title
      memberIds
      isDM
      creatorId
      createdAt
      _id
    }
  }
`;

export const GET_MESSAGES = gql`
  query Query($threadId: String!) {
    messagesByThread(threadId: $threadId) {
      updatedAt
      threadId
      messageBody
      createdAt
      authorId {
        username
      }
      _id
    }
  }
`;
