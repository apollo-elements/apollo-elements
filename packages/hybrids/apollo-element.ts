import type { Hybrids } from 'hybrids';

import { client } from './factories/client';

import type { ApolloElementElement } from '@apollo-elements/interfaces/apollo-element';

export const ApolloElement: Hybrids<Partial<ApolloElementElement>> = {
  client: client(),
  data: null,
  error: null,
  errors: null,
  loading: false,
};

export type { ApolloElementElement };
