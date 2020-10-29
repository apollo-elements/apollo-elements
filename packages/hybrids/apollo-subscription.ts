import { Hybrids } from 'hybrids';

import { ApolloSubscriptionElement, subscription } from './factories/subscription';
import { client } from './factories/client';

export const ApolloSubscription: Hybrids<ApolloSubscriptionElement> = {
  client: client(null, { useGlobal: true }),
  subscription: subscription(null),
};

export type { ApolloSubscriptionElement };
