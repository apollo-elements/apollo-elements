import type { Hybrids } from 'hybrids';
import type { ApolloMutationElement } from '@apollo-elements/interfaces/apollo-mutation';

import { mutation } from './factories/mutation';
import { client } from './factories/client';

export const ApolloMutation: Hybrids<ApolloMutationElement> = {
  client: client(),
  mutation: mutation(null),
};

export type { ApolloMutationElement };
