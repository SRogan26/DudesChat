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