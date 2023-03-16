import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation Mutation($username: String!, $email: String!, $password: String!, $firstName: String, $lastName: String) {
    addUser(username: $username, email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
      authToken
      newUser {
        _id
        email
        username
      }
    }
  } 
`;