import { gql, TypedDocumentNode } from '@apollo/client/core';

interface Data {
  insertUsers: {
    returning: {
      name: string;
      id: string;
      timestamp: string;
    }
  }
}

export const AddUserMutation: TypedDocumentNode<Data, { name: string }> = gql`
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
