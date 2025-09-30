import { gql, TypedDocumentNode } from '@apollo/client/core';
export const ProfileQuery: TypedDocumentNode<{
  profile: {
    nick: string
  }
}> = gql`
query ProfileQuery {
  profile {
    nick
  }
}
`;
