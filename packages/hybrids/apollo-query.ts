import type { Hybrids } from 'hybrids';
import type { ApolloQueryElement } from '@apollo-elements/interfaces/apollo-query';

import { query } from './factories/query';
import { client } from './factories/client';

/**
 * Hybrids descriptor bag.
 *
 * Spread into your hybrids to implement the [ApolloQueryElement](/api/interfaces/query/) interface.
 */
export const ApolloQuery: Hybrids<ApolloQueryElement> = {
  client: client(),
  query: query(),
};

export type { ApolloQueryElement };
