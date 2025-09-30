import type { Profile, ProfileInput } from './client.js';
import type { TypedDocumentNode } from '@apollo/client/core';
import { gql } from '@apollo/client/core';

export const UpdateProfileMutation: TypedDocumentNode<
  { updateProfile: Profile },
  { input: ProfileInput }
> = gql`
  mutation UpdateProfileMutation($input: ProfileInput) {
    updateProfile(input: $input) {
      name
      country {
        countryCode
        name
        emoji
      }
    }
  }
`;
