import type { DocumentNode, OperationVariables, TypedDocumentNode } from '@apollo/client/core';
import type { Descriptor as Desc } from 'hybrids';

import { ApolloSubscriptionElement } from '@apollo-elements/interfaces/apollo-subscription';
import { applyPrototype } from '@apollo-elements/lib/prototypes';

import { initDocument } from '../helpers/accessors';

export type SubscriptionHybridsFactoryOptions<D, V> = Pick<ApolloSubscriptionElement<D, V>,
  | 'client'
  | 'fetchPolicy'
  | 'noAutoSubscribe'
  | 'onSubscriptionComplete'
  | 'onSubscriptionData'
  | 'shouldResubscribe'
  | 'shouldSubscribe'
  | 'skip'
  | 'subscription'
  | 'variables'
>;


export type { ApolloSubscriptionElement };

/**
 * Hybrids property descriptor factory for GraphQL subscriptions.
 * Setting one will automatically trigger the query, unless `noAutoSubscribe` is set.
 * Implements the [ApolloSubscriptionElement](/api/interfaces/subscription/) interface.
 *
 * @param  document The subscription to subscribe to
 * @param  options Options to configure the subscription
 * @return Hybrids descriptor which mixes the [ApolloSubscriptionInterface](/api/interfaces/subscription/) in on connect
 */
export function subscription<D = unknown, V = OperationVariables>(
  document?: DocumentNode|TypedDocumentNode,
  options?: SubscriptionHybridsFactoryOptions<D, V>
): Desc<ApolloSubscriptionElement<D, V>> {
  return {
    connect(host, key, invalidate) {
      applyPrototype(host, ApolloSubscriptionElement, 'subscription');
      return initDocument<ApolloSubscriptionElement<D, V>>({
        host,
        document,
        invalidate,
        defaults: options,
      });
    },
  };
}
