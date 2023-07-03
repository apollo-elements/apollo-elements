import { gql } from '@apollo/client/core';
export const AddUserMutation = gql`
  mutation InsertUser($name: String!) {
    insertUsers: insert_users(objects: {name: $name}) {
      returning {
        name
        id
        timestamp
      }
    }
  }
`;
