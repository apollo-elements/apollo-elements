import type { Hybrids } from 'hybrids';
import type { ApolloQueryElement } from '@apollo-elements/interfaces/apollo-query';

import { query } from './factories/query';

/**
 * Hybrids descriptor bag.
 *
 * Spread into your hybrids to implement the [ApolloQueryElement](/api/interfaces/query/) interface.
 */
export const ApolloQuery: Hybrids<ApolloQueryElement> = {
  ...query(null),
};

export type { ApolloQueryElement };
