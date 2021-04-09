import type { DocumentNode, OperationVariables, TypedDocumentNode } from '@apollo/client/core';
import type { ApolloElementElement } from '@apollo-elements/interfaces/apollo-element';
import type { ApolloSubscriptionInterface } from '@apollo-elements/interfaces/apollo-subscription';
import type { Hybrids } from 'hybrids';

import { ApolloSubscriptionElement } from '@apollo-elements/interfaces/apollo-subscription';
import { applyPrototype } from '@apollo-elements/lib/prototypes';

import { property } from 'hybrids';

import { ApolloElement } from '../apollo-element';

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
  document: DocumentNode | TypedDocumentNode<D, V> | null,
  options?: SubscriptionHybridsFactoryOptions<D, V>
): Hybrids<ApolloSubscriptionInterface<D, V>> {
  return {
    ...(ApolloElement as Hybrids<ApolloSubscriptionInterface<D, V>>),
    subscription: {
      connect(host, _, invalidate) {
        applyPrototype(host, ApolloSubscriptionElement, {
          type: 'subscription',
        });

        return initDocument<ApolloSubscriptionElement<D, V>>({
          host,
          document,
          invalidate,
          defaults: options,
        });
      },
    },
  };
}
