import { gql, TypedDocumentNode } from '@apollo/client/core';
export const FriendCameOnlineSubscription: TypedDocumentNode<{
  friendCameOnline: {
    nick: string
  }
}> = gql`
subscription FriendCameOnline {
  friendCameOnline {
    nick
  }
}
`;
