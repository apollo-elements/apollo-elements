import { gql, TypedDocumentNode } from '@apollo/client/core';
type Data = { profile: { id: number; name: string; picture: string; quote: string; } };
type Variables = { id: number; };
export const ProfileQuery: TypedDocumentNode<Data, Variables> = gql`
query ProfileQuery($id: ID) {
  profile(id: $id) {
    id
    name
    position
    picture
    quote
  }
}
`;
