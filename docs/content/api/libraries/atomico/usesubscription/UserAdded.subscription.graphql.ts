import type { User } from './client';
import type { TypedDocumentNode } from '@apollo/client/core';
import { gql } from '@apollo/client/core';
export const UserAddedSubscription: TypedDocumentNode<{ userAdded: User }> =  gql`
  subscription UserAddedSubscription  {
    userAdded {
      id
      name
    }
  }
`;
