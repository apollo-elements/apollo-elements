import type * as I from '@apollo-elements/interfaces';
import type { Descriptor } from 'hybrids';

import { controller } from './controller';

import {
  ApolloSubscriptionController,
  ApolloSubscriptionControllerOptions,
} from '@apollo-elements/core/apollo-subscription-controller';

/**
 * Hybrids property descriptor factory for GraphQL subscriptions.
 *
 * @param  subscriptionDocument The subscription document.
 * @param  options Options to control the subscription.
 * @return Hybrids descriptor for a [ApolloMutationController](/api/core/subscription/)
 */
export function subscription<
  E extends HTMLElement,
  D extends I.MaybeTDN = I.MaybeTDN,
  V = I.MaybeVariables<D>
>(
  subscriptionDocument?: I.ComponentDocument<D> | null,
  options?: ApolloSubscriptionControllerOptions<D, V>,
): Descriptor<E, ApolloSubscriptionController<D, V>> {
  return controller(
    ApolloSubscriptionController as I.Constructor<ApolloSubscriptionController<D, V>>,
    subscriptionDocument,
    options,
  );
}
