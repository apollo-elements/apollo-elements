import type { Hybrids } from 'hybrids';
import type { ApolloQueryElement } from '@apollo-elements/interfaces/apollo-query';

import { query } from './factories/query';
import { client } from './factories/client';

export const ApolloQuery: Hybrids<ApolloQueryElement> = {
  client: client(),
  query: query(null),
};

export type { ApolloQueryElement };
