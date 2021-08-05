import { gql, TypedDocumentNode } from '@apollo/client/core';

interface Site {
  id: string;
  name: string;
  selected: boolean;
}

export const SitesQuery: TypedDocumentNode<{sites:Site[]}> =
gql`
query SitesQuery {
  sites {
    id
    name
    selected @client
  }
}
` as TypedDocumentNode<{sites:Site[]}>;
