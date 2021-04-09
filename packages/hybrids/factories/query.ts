import type { DocumentNode, OperationVariables, TypedDocumentNode } from '@apollo/client/core';
import type { ApolloQueryInterface } from '@apollo-elements/interfaces';
import type { Hybrids } from 'hybrids';

import { NetworkStatus } from '@apollo/client/core';

import { ApolloElement } from '../apollo-element';

import { ApolloQueryElement } from '@apollo-elements/interfaces/apollo-query';
import { applyPrototype } from '@apollo-elements/lib/prototypes';

import { initDocument } from '../helpers/accessors';

export type { ApolloQueryElement };

export type QueryHybridsFactoryOptions<D, V> = Pick<ApolloQueryElement<D, V>,
  | 'client'
  | 'context'
  | 'errorPolicy'
  | 'fetchPolicy'
  | 'nextFetchPolicy'
  | 'noAutoSubscribe'
  | 'notifyOnNetworkStatusChange'
  | 'onData'
  | 'onError'
  | 'partialRefetch'
  | 'pollInterval'
  | 'query'
  | 'returnPartialData'
  | 'shouldSubscribe'
  | 'variables'
>;

/**
 * Hybrids property descriptor factory for GraphQL queries.
 * Setting one will automatically trigger the query, unless `noAutoSubscribe` is set.
 * Implements the [ApolloQueryElement](/api/interfaces/query/) interface.
 *
 * @param  document The query to subscribe to
 * @param  options Options to configure the query
 * @return Hybrids descriptor which mixes the [ApolloQueryInterface](/api/interfaces/query/) in on connect
 */
export function query<D = unknown, V = OperationVariables>(
  document: DocumentNode | TypedDocumentNode<D, V> | null,
  options?: QueryHybridsFactoryOptions<D, V>,
): Hybrids<ApolloQueryInterface<D, V>> {
  return {
    ...ApolloElement as Hybrids<ApolloQueryElement<D, V>>,
    networkStatus: NetworkStatus.ready,
    query: {
      connect(host, _, invalidate) {
        applyPrototype(host, ApolloQueryElement, {
          type: 'query',
        });

        return initDocument<ApolloQueryElement<D, V>>({
          host, document, invalidate, defaults: {
            ...options,
            networkStatus: NetworkStatus.ready,
          },
        });
      },
    } };
}
