import type { Hybrids } from 'hybrids';
import type * as I from '@apollo-elements/interfaces';

import { ApolloElement } from './apollo-element';
import { query } from './factories/query';
import { controlled, option, method } from './factories/controlled';

type Omitted =
  |'document'
  |'readyToReceiveDocument'
  |'connectedCallback'
  |'disconnectedCallback'
  |'adoptedCallback'
  |'attributeChangedCallback'

type QueryHybrid = Omit<I.ApolloQueryInterface, Omitted>;

/**
 * Hybrids descriptor bag.
 *
 * Spread into your hybrids to implement the [ApolloQueryInterface](/api/interfaces/query/) interface.
 */
export const ApolloQuery: Hybrids<QueryHybrid> = {
  controller: query(null),

  ...ApolloElement,

  query: controlled(),
  networkStatus: controlled(),
  partial: controlled(),
  canAutoSubscribe: controlled(false, {
    setter: host => host.controller.canAutoSubscribe,
  }),

  options: controlled({}, {
    setter(host, controller, value) {
      const {
        onData = host.onData,
        onError = host.onError,
      } = (controller as unknown as typeof host.controller).options;
      controller.options = { onData, onError, ...value };
    },
  }),

  subscribe: method(),
  subscribeToMore: method(),
  executeQuery: method(),
  fetchMore: method(),
  refetch: method(),

  fetchPolicy: option(),
  nextFetchPolicy: option(),
  noAutoSubscribe: option(false),
  notifyOnNetworkStatusChange: option(),
  onData: option(data => void data),
  onError: option(error => void error),
  partialRefetch: option(),
  pollInterval: option(),
  returnPartialData: option(),
  shouldSubscribe: option(),

};

export type ApolloQueryElement<D extends I.MaybeTDN = I.MaybeTDN, V = I.MaybeVariables<D>> =
  HTMLElement & Omit<I.ApolloQueryInterface<D, V>, Omitted>;
