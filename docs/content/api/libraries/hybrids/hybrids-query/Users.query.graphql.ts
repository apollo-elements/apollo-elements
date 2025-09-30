import type { User } from './client';
import type { TypedDocumentNode } from '@apollo/client/core';
import { gql } from '@apollo/client/core';
export const UsersQuery: TypedDocumentNode<{ users: User[] }> =  gql`
  query UsersQuery {
    users {
      id
      name
    }
  }
`;
