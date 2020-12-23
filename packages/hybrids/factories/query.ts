import type { DocumentNode, OperationVariables } from '@apollo/client/core';
import type { Descriptor } from 'hybrids';

import { NetworkStatus } from '@apollo/client/core';
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
  document?: DocumentNode,
  options?: QueryHybridsFactoryOptions<D, V>
): Descriptor<ApolloQueryElement<D, V>> {
  return {
    connect(host, key, invalidate) {
      applyPrototype(host, ApolloQueryElement, 'query');
      return initDocument<ApolloQueryElement<D, V>>({
        host, document, invalidate, defaults: {
          ...options,
          networkStatus: NetworkStatus.ready,
        },
      });
    },
  };
}
