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
      _id
      authorId
      createdAt
      messageBody
      threadId
      updatedAt
    }
  }
`;
