import type { Hybrids } from 'hybrids';
import type { ApolloMutationElement } from '@apollo-elements/interfaces/apollo-mutation';

import { mutation } from './factories/mutation';
import { client } from './factories/client';

/**
 * Hybrids descriptor bag.
 *
 * Spread into your hybrids to implement the [ApolloMutationElement](/api/interfaces/mutation/) interface.
 */
export const ApolloMutation: Hybrids<ApolloMutationElement> = {
  client: client(),
  mutation: mutation(),
};

export type { ApolloMutationElement };
