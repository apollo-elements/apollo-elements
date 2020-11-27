import type { ApolloError, DocumentNode, FetchPolicy } from '@apollo/client/core';

import type { QueryHookOptions as ReactQueryHookOptions } from '@apollo/client/react/types/types';

import type { State } from 'haunted';

import { NetworkStatus } from '@apollo/client/core';

import { ApolloQueryElement } from '@apollo-elements/interfaces/apollo-query';

import { hook } from 'haunted';

import { ApolloHook } from './ApolloHook';

export type QueryHookOptions<D, V> = Partial<
  Omit<ReactQueryHookOptions<D, V>,
      'data'
    | 'displayName'
    | 'error'
    | 'fetchPolicy'
    | 'nextFetchPolicy'
    | 'ssr'
  > & {
    data: D | null;
    noAutoSubscribe: boolean;
    shouldSubscribe: ApolloQueryElement['shouldSubscribe']
    error: Error | ApolloError;
    fetchPolicy: FetchPolicy;
    nextFetchPolicy: FetchPolicy
  }>;

export interface QueryResult<TData, TVariables> {
  called: true;
  client: ApolloQueryElement<TData, TVariables>['client'];
  data: TData | null;
  error: Error | ApolloError | null;
  fetchMore: ApolloQueryElement<TData, TVariables>['fetchMore'];
  loading: boolean;
  networkStatus: NetworkStatus;
  variables: TVariables | null;
  refetch: ApolloQueryElement<TData, TVariables>['refetch'];
  startPolling: (ms: number) => void;
  stopPolling: () => void;
  subscribeToMore: ApolloQueryElement<TData, TVariables>['subscribeToMore'];
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

  pollingInterval?: number;

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

  update(_ = this.document, { variables = null } = this.options): QueryResult<TData, TVariables> {
    if (this.disconnected) this.connect();

    const { client, data, error, loading, networkStatus } = this.state.host;

    const refetch = this.state.host.refetch.bind(this.state.host);
    const fetchMore = this.state.host.fetchMore.bind(this.state.host);
    const subscribeToMore = this.state.host.subscribeToMore.bind(this.state.host);

    const startPolling = (ms: number) =>
      void (this.pollingInterval = window.setInterval(refetch, ms));

    const stopPolling = () =>
      clearInterval(this.pollingInterval);

    const called = true;

    return {
      called, client, data, error, loading, networkStatus, variables,
      fetchMore, refetch, startPolling, stopPolling, subscribeToMore,
    };
  }

  teardown() {
    if (this.pollingInterval != null)
      clearInterval(this.pollingInterval);
    super.teardown();
  }
}

export const useQuery = hook(UseQueryHook);
