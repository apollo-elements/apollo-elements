
import { Hybrids } from 'hybrids';

import { ApolloQueryElement, query } from './factories/query';
import { client } from './factories/client';

export const ApolloQuery: Hybrids<ApolloQueryElement> = {
  client: client(null, { useGlobal: true }),
  query: query(null),
};

export type { ApolloQueryElement };
