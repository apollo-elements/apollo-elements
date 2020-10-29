import type { Hybrids } from 'hybrids';

import { client } from './factories/client';

import { ApolloElementElement } from './factories/client';

export type { ApolloElementElement };

export const ApolloElement: Hybrids<ApolloElementElement> = {
  client: client(null, { useGlobal: true }),
};
