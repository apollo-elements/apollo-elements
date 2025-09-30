import type { Profile } from './client.js';
import type { TypedDocumentNode } from '@apollo/client/core';
import { gql } from '@apollo/client/core';

export const ProfileQuery: TypedDocumentNode<{ profile: Profile }> = gql`
  query ProfileQuery {
    countries { countryCode name emoji }
    profile {
      name
      country {
        countryCode
        name
        emoji
      }
    }
  }
`;
