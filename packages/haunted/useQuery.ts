import type {
  ApolloClient,
  DocumentNode,
  NormalizedCacheObject,
  OperationVariables,
  TypedDocumentNode,
} from '@apollo/client/core';

import type { State } from 'haunted';

import type { ApolloQueryInterface } from '@apollo-elements/interfaces';

import { NetworkStatus } from '@apollo/client/core';

import { ApolloQueryElement } from '@apollo-elements/interfaces/apollo-query';

import { hook } from 'haunted';

import { ApolloHook } from './ApolloHook';

export type QueryHookOptions<D, V> = Partial<Pick<ApolloQueryInterface<D, V>,
  | 'context'
  | 'errorPolicy'
  | 'fetchPolicy'
  | 'nextFetchPolicy'
  | 'noAutoSubscribe'
  | 'notifyOnNetworkStatusChange'
  | 'onError'
  | 'partialRefetch'
  | 'pollInterval'
  | 'query'
  | 'returnPartialData'
  | 'shouldSubscribe'
  | 'variables'
> & {
  client?: ApolloClient<NormalizedCacheObject>;
  onCompleted?(data: D): void;
}>;

export type QueryResult<D, V> = Pick<ApolloQueryInterface<D, V>,
    'client'
  | 'data'
  | 'error'
  | 'fetchMore'
  | 'loading'
  | 'networkStatus'
  | 'refetch'
  | 'subscribeToMore'
  | 'variables'
> & {
  called: true;
  startPolling: (ms: number) => void;
  stopPolling: () => void;
}

class UseQueryHook<D = unknown, V = OperationVariables> extends ApolloHook<
  D,
  V,
  QueryHookOptions<D, V>,
  QueryResult<D, V>,
  ApolloQueryElement<D, V>
> {
  readonly type = 'query';

  readonly componentClass = ApolloQueryElement;

  readonly defaults: Partial<ApolloQueryElement<D, V>> = {
    networkStatus: NetworkStatus.ready,
  };

  pollingInterval?: number;

  constructor(
    id: number,
    state: State<ApolloQueryElement<D, V>>,
    query: D extends TypedDocumentNode ? D : DocumentNode,
    options?: QueryHookOptions<D, V>
  ) {
    super(id, state, query, options);
    this.init();
  }

  protected optionsToProperties() : Partial<ApolloQueryElement<D, V>> {
    const { onError, onCompleted, ...options } = this.options;
    const query = this.document ?? options.query;
    const noAutoSubscribe =
      options.noAutoSubscribe ?? this.state.host.hasAttribute('no-auto-subscribe');
    const errorPolicy = options.errorPolicy ?? 'none';
    return {
      ...this.defaults,
      ...options,
      noAutoSubscribe,
      errorPolicy,
      query,
    };
  }

  protected optionsToOptionalMethods() {
    // shouldSubscribe is handled just fine by `apply`
    const { onCompleted, onError } = this.options;
    return { onCompleted, onError };
  }

  update(_ = this.document, { variables = null } = this.options): QueryResult<D, V> {
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
