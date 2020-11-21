import type { ApolloError, DocumentNode, FetchPolicy } from '@apollo/client/core';

import type {
  QueryHookOptions as ReactQueryHookOptions,
  QueryResult as ReactQueryResult,
} from '@apollo/client/react/types/types';

import type { State } from 'haunted';

import { NetworkStatus } from '@apollo/client/core';

import { ApolloQueryElement } from '@apollo-elements/interfaces/apollo-query';

import { hook } from 'haunted';

import { ApolloHook } from './ApolloHook';

export type QueryHookOptions<D, V> = Partial<
  Omit<ReactQueryHookOptions<D, V>,
      'displayName'
    | 'error'
    | 'fetchPolicy'
    | 'nextFetchPolicy'
    | 'ssr'
  > & {
    noAutoSubscribe: boolean;
    shouldSubscribe: ApolloQueryElement['shouldSubscribe']
    error: Error | ApolloError;
    fetchPolicy: FetchPolicy;
    nextFetchPolicy: FetchPolicy
  }>;

export type QueryResult<TData, TVariables> = Omit<ReactQueryResult<TData, TVariables>, 'error'> & {
  error: Error | ApolloError;
}

class UseQueryHook<TData, TVariables> extends ApolloHook<
  TData,
  TVariables,
  QueryHookOptions<TData, TVariables>,
  QueryResult<TData, TVariables>,
  ApolloQueryElement<TData, TVariables>
> {
  readonly type = 'query';

  readonly componentClass = ApolloQueryElement;

  readonly defaults: Partial<ApolloQueryElement<TData, TVariables>> = {
    networkStatus: NetworkStatus.ready,
  };

  pollingInterval: number;

  constructor(
    id: number,
    state: State<ApolloQueryElement<TData, TVariables>>,
    query: DocumentNode,
    options?: QueryHookOptions<TData, TVariables>
  ) {
    super(id, state, query, options);
    this.init();
  }

  protected optionsToProperties() {
    const { onError, onCompleted, ...options } = this.options;
    const query = this.document ?? options.query;
    const noAutoSubscribe =
      options.noAutoSubscribe ?? this.state.host.hasAttribute('no-auto-subscribe');
    const errorPolicy = options.errorPolicy ?? 'none';
    return {
      ...this.defaults,
      noAutoSubscribe,
      errorPolicy,
      query,
      ...options,
    };
  }

  protected optionsToOptionalMethods() {
    // shouldSubscribe is handled just fine by `applyPrototype`
    const { onCompleted, onError } = this.options;
    return { onCompleted, onError };
  }

  update(_ = this.document, { variables } = this.options): QueryResult<TData, TVariables> {
    if (this.disconnected) this.connect();

    const { client, data, error, loading, networkStatus } = this.state.host;

    const refetch = this.state.host.refetch.bind(this.state.host);
    const fetchMore = this.state.host.fetchMore.bind(this.state.host);
    const subscribeToMore = this.state.host.subscribeToMore.bind(this.state.host);

    // updateQuery is deprecated, so we're not going to implement
    const updateQuery =
      () => void null; /* c8 ignore next */

    const startPolling = (ms: number) =>
      void (this.pollingInterval = window.setInterval(refetch, ms));

    const stopPolling = () =>
      clearInterval(this.pollingInterval);

    const called = undefined;

    return {
      called, client, data, error, loading, networkStatus, variables,
      fetchMore, refetch, startPolling, stopPolling, subscribeToMore, updateQuery,
    };
  }

  teardown() {
    if (this.pollingInterval != null)
      clearInterval(this.pollingInterval);
    super.teardown();
  }
}

export const useQuery = hook(UseQueryHook);
