import type { Hybrids } from 'hybrids';

import { client } from './factories/client';

import type { ApolloElementElement } from '@apollo-elements/interfaces/apollo-element';

export const ApolloElement: Hybrids<ApolloElementElement> = {
  client: client(),
};

export type { ApolloElementElement };
