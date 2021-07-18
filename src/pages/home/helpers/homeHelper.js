import { gql } from "@apollo/client";

export const getUsers = gql`
  query Query {
    getUsers {
      username
      email
    }
  }
`;
