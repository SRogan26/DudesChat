import { gql } from "@apollo/client";

export const MESSAGE_POSTED = gql`subscription MessagePosted($threadId: ID!) {
    messagePosted(threadId: $threadId) {
      authorId {
        username
      }
      updatedAt
      createdAt
      messageBody
      _id
      threadId
    }
  }
`