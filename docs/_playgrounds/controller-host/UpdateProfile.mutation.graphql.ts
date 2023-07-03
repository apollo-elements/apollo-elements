import { gql, TypedDocumentNode } from '@apollo/client/core';
export const UpdateProfileMutation: TypedDocumentNode<{
  updateProfile: {
    nick: string
  }
}, {
  nick: string
}> = gql`
mutation UpdateProfile($nick: String) {
  updateProfile(nick: $nick) {
    nick
  }
}
`;
