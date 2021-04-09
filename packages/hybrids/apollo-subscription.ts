import type { Hybrids } from 'hybrids';
import type { ApolloSubscriptionElement } from '@apollo-elements/interfaces/apollo-subscription';

import { subscription } from './factories/subscription';

/**
 * Hybrids descriptor bag.
 *
 * Spread into your hybrids to implement the [ApolloSubscriptionElement](/api/interfaces/subscription/) interface.
 */
export const ApolloSubscription: Hybrids<ApolloSubscriptionElement> = {
  ...subscription(null),
};

export type { ApolloSubscriptionElement };
