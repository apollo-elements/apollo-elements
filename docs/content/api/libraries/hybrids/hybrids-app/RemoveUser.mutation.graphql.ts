import type { User } from './client';
import type { TypedDocumentNode } from '@apollo/client/core';
import { gql } from '@apollo/client/core';
export const RemoveUserMutation: TypedDocumentNode<{ removeUser: User }, { id: String }> =  gql`
  mutation RemoveUserMutation($id: ID)  {
    removeUser(id: $id) { id }
  }
`;
