import { gql, TypedDocumentNode } from '@apollo/client/core';

interface Site {
  id: string;
}

interface Network {
  id: string;
  name: string;
  sites: Site[];
}

export const CreateNetworkMutation: TypedDocumentNode<{createNetwork:Network}> =
gql`
mutation CreateNetwork($sites: ID[]!) {
  createNetwork(sites: $sites) {
    id
    name
    sites {
      id
    }
  }
}
` as TypedDocumentNode<{createNetwork:Network}, {sites: string[]}>;
