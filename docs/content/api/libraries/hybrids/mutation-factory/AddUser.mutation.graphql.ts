import type { User } from './client';
import type { TypedDocumentNode } from '@apollo/client/core';
import { gql } from '@apollo/client/core';
export const AddUserMutation: TypedDocumentNode<{ addUser: User }, { name: String }> =  gql`
  mutation AddUserMutation($name: String)  {
    addUser(name: $name) {
      id
      name
    }
  }
`;
