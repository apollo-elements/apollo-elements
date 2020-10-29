import type { Hybrids } from 'hybrids';

import { ApolloMutationElement, mutation } from './factories/mutation';
import { client } from './factories/client';

export const ApolloMutation: Hybrids<ApolloMutationElement> = {
  client: client(null, { useGlobal: true }),
  mutation: mutation(null),
};

export type { ApolloMutationElement };
