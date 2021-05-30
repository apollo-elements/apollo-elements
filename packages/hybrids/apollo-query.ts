import type { Hybrids } from 'hybrids';
import type * as I from '@apollo-elements/interfaces';

import { ApolloElement } from './apollo-element';
import { query } from './factories/query';
import { controlled, option, method } from './factories/controlled';

type Omitted =
  |'shouldSubscribe'
  |'canAutoSubscribe'
  |'document'
  |'readyToReceiveDocument'
  |'connectedCallback'
  |'disconnectedCallback'
  |'adoptedCallback'
  |'attributeChangedCallback'

/**
 * Hybrids descriptor bag.
 *
 * Spread into your hybrids to implement the [ApolloQueryInterface](/api/interfaces/query/) interface.
 */
export const ApolloQuery: Hybrids<Omit<I.ApolloQueryInterface, Omitted>> = {
  controller: query(null),

  ...ApolloElement,

  query: controlled(),
  networkStatus: controlled(),
  partial: controlled(),
  options: controlled(),

  subscribe: method(),
  subscribeToMore: method(),
  executeQuery: method(),
  fetchMore: method(),
  refetch: method(),

  fetchPolicy: option(),
  returnPartialData: option(),
  noAutoSubscribe: option(false),
  notifyOnNetworkStatusChange: option(),
  nextFetchPolicy: option(),
  onData: option(),
  onError: option(),
};

export type ApolloQueryElement<D extends I.MaybeTDN = I.MaybeTDN, V = I.MaybeVariables<D>> =
  HTMLElement & Omit<I.ApolloQueryInterface<D, V>, Omitted>;
