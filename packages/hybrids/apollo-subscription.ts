import type { Hybrids } from 'hybrids';
import type { ApolloSubscriptionElement } from '@apollo-elements/interfaces/apollo-subscription';

import { subscription } from './factories/subscription';
import { client } from './factories/client';

/**
 * Hybrids descriptor bag.
 *
 * Spread into your hybrids to implement the [ApolloSubscriptionElement](/api/interfaces/subscription/) interface.
 */
export const ApolloSubscription: Hybrids<ApolloSubscriptionElement> = {
  client: client(),
  subscription: subscription(),
};

export type { ApolloSubscriptionElement };
