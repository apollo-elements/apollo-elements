import { gql, TypedDocumentNode } from '@apollo/client/core';

interface Launch {
  mission_name: string;
  links: {
    mission_patch_small: string;
  };
}

interface Data {
  launchesPast: Launch[];
}

interface Variables {
  limit: number;
}

export const LaunchesQuery: TypedDocumentNode<Data, Variables> = gql`
query LaunchesQuery($limit: Int) {
  launchesPast(limit: $limit) {
    id
    mission_name
    links { mission_patch_small }
  }
}
`;
