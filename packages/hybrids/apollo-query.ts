import type { ApolloQuery as IApolloQuery } from '@apollo-elements/mixins/apollo-query';
import type {
  SubscribeToMoreOptions,
  ObservableQuery,
  ApolloQueryResult,
  ApolloError,
  WatchQueryOptions,
  FetchMoreOptions,
  FetchMoreQueryOptions,
  QueryOptions,
} from 'apollo-client';

import hasAllVariables from '@apollo-elements/lib/has-all-variables';

import { clientFactory } from './factories/client';
import { queryFactory } from './factories/query';

type ApolloQueryElement<TData, TVariables> =
  IApolloQuery<TData, TVariables> & HTMLElement

const onNext = <TData, TVariables>(host: ApolloQueryElement<TData, TVariables>) =>
  ({ data, loading, networkStatus, stale }: ApolloQueryResult<TData>): void => {
    host.error = null;
    host.data = data;
    host.loading = loading;
    host.networkStatus = networkStatus;
    host.stale = stale;
  };

const onError = <TData, TVariables>(host: ApolloQueryElement<TData, TVariables>) =>
  (error: ApolloError): void => {
    host.error = error;
  };

export const ApolloQuery = {
  client: clientFactory(),

  data: null,

  errorPolicy: 'none',

  options: {
    set<OperationVariables, TData, TVariables>(
      host: ApolloQueryElement<TData, TVariables>,
      options: WatchQueryOptions<OperationVariables>
    ): WatchQueryOptions<OperationVariables> {
      if (host.observableQuery) host.observableQuery.setOptions(options);
      return options;
    },
  },

  query: queryFactory(),

  variables: {
    connect<TData, TVariables>(
      host: ApolloQueryElement<TData, TVariables> & HTMLElement,
      key: keyof IApolloQuery<TData, TVariables>
    ): () => void {
      const onInvalidate = ({ target }): void => {
        if (!(host === target && host[key])) return;
        if (key === 'variables') {
          const variables = host[key];
          if (variables && typeof host.observableQuery?.setVariables === 'function')
            host.observableQuery.setVariables(variables);
          else
            host.subscribe({ query: host.query, variables });
        }
      };

      host.addEventListener('@invalidate', onInvalidate);

      return (): void =>
        host.removeEventListener('@invalidate', onInvalidate);
    },

    set<TData, TVariables>(
      host: ApolloQueryElement<TData, TVariables>,
      next: TVariables,
      last: TVariables,
    ): TVariables {
      if (next && next !== last && host.observableQuery)
        host.observableQuery.setVariables(next);
      return next;
    },
  },

  watchQuery: {
    get<TData, TVariables>(host: ApolloQueryElement<TData, TVariables> & HTMLElement) {
      return (options?: WatchQueryOptions): ObservableQuery<TData> => {
        const {
          context = host.context,
          errorPolicy = host.errorPolicy,
          fetchPolicy = host.fetchPolicy,
          fetchResults = host.fetchResults,
          metadata,
          notifyOnNetworkStatusChange = host.notifyOnNetworkStatusChange,
          pollInterval = host.pollInterval,
          query = host.query,
          variables = host.variables,
        } = options ?? {};

        return host.client.watchQuery({
          context,
          errorPolicy,
          fetchPolicy,
          fetchResults,
          metadata,
          notifyOnNetworkStatusChange,
          pollInterval,
          query,
          variables,
        });
      };
    },
  },

  subscribeToMore: {
    get<TData, TVariables>(host: ApolloQueryElement<TData, TVariables>) {
      return (options: SubscribeToMoreOptions): ReturnType<ObservableQuery['subscribeToMore']> => {
        const { document = host.document, updateQuery } = options || {};
        return host.observableQuery?.subscribeToMore({ document, updateQuery });
      };
    },
  },

  executeQuery: {
    get<TData, TVariables>(host: ApolloQueryElement<TData, TVariables>) {
      return async (params: QueryOptions<TData>): Promise<void|ApolloQueryResult<TData>> => {
        const {
          context = host.context,
          errorPolicy = host.errorPolicy,
          fetchPolicy = host.fetchPolicy,
          fetchResults = host.fetchResults,
          metadata,
          query = host.query,
          variables = host.variables,
        } = params || {};

        const queryPromise = host.client
          .query({ context, errorPolicy, fetchPolicy, fetchResults, metadata, query, variables })
          .catch(onError(host));

        queryPromise.then(onNext(host));

        return queryPromise;
      };
    },
  },

  fetchMore: {
    get<TData, TVariables>(host: ApolloQueryElement<TData, TVariables>) {
      return (options:
      FetchMoreQueryOptions<TVariables, keyof TVariables> &
      FetchMoreOptions<TData, TVariables>
      ): Promise<ApolloQueryResult<TData>> => {
        const { query = host.query, updateQuery, variables = host.variables } = options || {};
        return host.observableQuery?.fetchMore({ query, updateQuery, variables });
      };
    },
  },

  subscribe: {
    get<TData, TVariables>(host: ApolloQueryElement<TData, TVariables>) {
      return (options?): ZenObservable.Subscription => {
        const query = options?.query ?? host.query;
        const variables = options?.variables ?? host.variables;
        if (!hasAllVariables({ query, variables })) return;
        host.observableQuery = host.watchQuery({ query, variables });
        const error = onError(host);
        const next = onNext(host);
        return host.observableQuery.subscribe({ error, next });
      };
    },
  },
};
