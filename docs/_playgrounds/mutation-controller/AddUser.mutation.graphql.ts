import { gql, TypedDocumentNode } from '@apollo/client/core';
type T = TypedDocumentNode<{ addUser: { name: string } }, { name: string }>;
export const AddUserMutation: T = gql`
mutation AddUser($name: String) {
  addUser(name: $name) {
    name
  }
}
`;
