import type { Constructor, ApolloQueryInterface } from '@apollo-elements/interfaces';
import type { DocumentNode } from 'graphql/language/ast';

import type {
  ErrorPolicy,
  FetchPolicy,
  ObservableQuery,
  ApolloQueryResult,
  FetchMoreOptions,
  NetworkStatus,
  SubscriptionOptions,
  SubscribeToMoreOptions,
  QueryOptions,
  FetchMoreQueryOptions,
  WatchQueryOptions,
  ApolloError,
} from '@apollo/client/core';

import { dedupeMixin } from '@open-wc/dedupe-mixin';
import { stripUndefinedValues } from '@apollo-elements/lib/helpers';
import { hasAllVariables } from '@apollo-elements/lib/has-all-variables';

import { ApolloElementMixin } from './apollo-element-mixin';

const pickExecuteQueryOpts =
  <TVariables>(opts: QueryOptions<TVariables>): QueryOptions<TVariables> =>
    stripUndefinedValues({
      context: opts.context,
      errorPolicy: opts.errorPolicy,
      fetchPolicy: opts.fetchPolicy,
      query: opts.query,
      variables: opts.variables,
    });

const pickWatchQueryOpts =
  (opts: WatchQueryOptions): WatchQueryOptions =>
    stripUndefinedValues({
      context: opts.context,
      errorPolicy: opts.errorPolicy,
      fetchPolicy: opts.fetchPolicy,
      nextFetchPolicy: opts.nextFetchPolicy,
      notifyOnNetworkStatusChange: opts.notifyOnNetworkStatusChange,
      partialRefetch: opts.partialRefetch,
      pollInterval: opts.pollInterval,
      query: opts.query,
      returnPartialData: opts.returnPartialData,
      variables: opts.variables,
    });

function ApolloQueryMixinImpl<B extends Constructor>(superclass: B) {
  return class ApolloQueryElement<TData, TVariables>
    extends ApolloElementMixin(superclass)
    implements ApolloQueryInterface<TData, TVariables> {
    declare data: TData;

    declare query: DocumentNode;

    declare variables: TVariables;

    declare fetchPolicy: FetchPolicy;

    declare partial: boolean;

    declare partialRefetch: boolean;

    declare returnPartialData: boolean;

    declare nextFetchPolicy: FetchPolicy;

    declare networkStatus: NetworkStatus;

    declare observableQuery: ObservableQuery;

    declare options: Partial<WatchQueryOptions>;

    declare noAutoSubscribe: boolean;

    declare notifyOnNetworkStatusChange: boolean;

    declare pollInterval: number;

    onData?(_result: ApolloQueryResult<TData>): void

    onError?(_error: Error): void

    errorPolicy: ErrorPolicy = 'none';

    /** @private */
    __variables: TVariables = null;

    /** @private */
    __options: Partial<WatchQueryOptions> = null;

    constructor() {
      super();
      type This = this;
      Object.defineProperties(this, {
        query: {
          configurable: true,
          enumerable: true,

          get(this: This) {
            return this.document;
          },

          set(this: This, query) {
            try {
              this.document = query;
            } catch (error) {
              throw new TypeError('Query must be a gql-parsed DocumentNode');
            }

            if (this.shouldSubscribe.call(this, { query }))
              this.subscribe({ query });
          },
        },

        variables: {
          configurable: true,
          enumerable: true,

          get(this: This): TVariables {
            return this.__variables;
          },

          set(this: This, variables) {
            this.__variables = variables;
            if (this.observableQuery)
              this.refetch(variables);
            else if (this.shouldSubscribe.call(this, { variables }))
              this.subscribe({ variables });
            else
              return;
          },
        },

        options: {
          configurable: true,
          enumerable: true,

          get(this: This): Partial<WatchQueryOptions> {
            return this.__options;
          },

          set(this: This, options) {
            this.__options = options;
            this.observableQuery?.setOptions(options);
          },
        },

        noAutoSubscribe: {
          configurable: true,
          enumerable: true,

          get(this: This): boolean {
            return this.hasAttribute('no-auto-subscribe');
          },

          set(v: boolean) {
            if (v)
              this.setAttribute('no-auto-subscribe', '');
            else
              this.removeAttribute('no-auto-subscribe');
          },
        },
      });
    }

    /** @protected */
    connectedCallback(): void {
      super.connectedCallback();
      if (this.shouldSubscribe.call(this))
        this.subscribe();
    }

    /**
     * Exposes the [`ObservableQuery#refetch`](https://www.apollographql.com/docs/react/api/apollo-client.html#ObservableQuery.refetch) method.
     *
     * @param variables The new set of variables. If there are missing variables, the previous values of those variables will be used..
     */
    refetch(variables: TVariables): Promise<ApolloQueryResult<TData>> {
      return this.observableQuery?.refetch(variables);
    }

    /**
     * Determines whether the element should attempt to subscribe i.e. begin querying
     * Override to prevent subscribing unless your conditions are met
     */
    shouldSubscribe(options?: Partial<SubscriptionOptions>): boolean {
      const query = options?.query ?? this.query;
      const variables = options?.variables ?? this.variables;
      return !this.noAutoSubscribe && hasAllVariables({ query, variables });
    }

    /**
     * Resets the observableQuery and subscribes.
     */
    subscribe(params?: Partial<SubscriptionOptions>): ZenObservable.Subscription {
      const options: SubscriptionOptions = {
        context: params?.context ?? this.context,
        fetchPolicy: params?.fetchPolicy ?? this.fetchPolicy,
        query: params?.query ?? this.query,
        variables: params?.variables ?? this.variables,
      };

      if (this.observableQuery)
        this.observableQuery.stopPolling();

      this.observableQuery =
        this.watchQuery(options);

      this.loading = true;

      return this.observableQuery.subscribe({
        next: this.nextData.bind(this),
        error: this.nextError.bind(this),
      });
    }

    /**
     * Lets you pass a GraphQL subscription and updateQuery function
     * to subscribe to more updates for your query.
     *
     * The `updateQuery` parameter is a function that takes the previous query data,
     * then a `{ subscriptionData: TSubscriptionResult }` object,
     * and returns an object with updated query data based on the new results.
     */
    subscribeToMore(options: SubscribeToMoreOptions): () => void {
      return this.observableQuery?.subscribeToMore(options);
    }

    /**
     * Executes a Query once and updates the component with the result
     */
    executeQuery(
      params?: Partial<QueryOptions<TVariables>>
    ): Promise<void | ApolloQueryResult<TData>> {
      const query = params?.query ?? this.query;
      const variables = params?.variables ?? this.variables;
      const options = { ...pickExecuteQueryOpts(this), ...params, query, variables };

      this.loading = true;

      return this.client
        .query(options)
        .then(result => {
          this.nextData.call(this, result);
          return result;
        })
        .catch(error => {
          this.nextError.call(this, error);
          throw error;
        });
    }

    /**
     * Exposes the `ObservableQuery#fetchMore` method.
     * https://www.apollographql.com/docs/react/api/apollo-client.html#ObservableQuery.fetchMore
     *
     * The optional `updateQuery` parameter is a function that takes the previous query data,
     * then a `{ subscriptionData: TSubscriptionResult }` object,
     * and returns an object with updated query data based on the new results.
     *
     * The optional `variables` parameter is an optional new variables object.
     */
    fetchMore(
      params?: Partial<(
        FetchMoreQueryOptions<TVariables, keyof TVariables> &
        FetchMoreOptions<TData, TVariables>
    )>): Promise<ApolloQueryResult<TData>> {
      const options = {
        query: params?.query ?? this.query,
        updateQuery: params?.updateQuery,
        variables: params?.variables,
        context: params?.context ?? this.context,
      };

      this.loading = true;

      return this.observableQuery?.fetchMore(options);
    }

    /**
     * Creates an instance of ObservableQuery with the options provided by the element.
     * - `context` Context to be passed to link execution chain
     * - `errorPolicy` Specifies the ErrorPolicy to be used for this query
     * - `fetchPolicy` Specifies the FetchPolicy to be used for this query
     * - `fetchResults` Whether or not to fetch results
     * - `metadata` Arbitrary metadata stored in the store with this query. Designed for debugging, developer tools, etc.
     * - `notifyOnNetworkStatusChange` Whether or not updates to the network status should trigger next on the observer of this query
     * - `pollInterval` The time interval (in milliseconds) on which this query should be refetched from the server.
     * - `query` A GraphQL document that consists of a single query to be sent down to the server.
     * - `variables` A map going from variable name to variable value, where the variables are used within the GraphQL query.
     */
    watchQuery(params?: Partial<WatchQueryOptions>): ObservableQuery {
      const options: WatchQueryOptions = {
        ...pickWatchQueryOpts(this),
        ...params,
        query: params?.query ?? this.query,
        variables: params?.variables ?? this.variables,
      };

      return this.client.watchQuery(options);
    }

    /**
     * Sets `data`, `loading`, and `error` on the instance when new subscription results arrive.
     * @private
     */
    nextData(result?: ApolloQueryResult<TData>): void {
      this.data = result?.data;
      this.loading = result?.loading;
      this.networkStatus = result?.networkStatus;
      this.partial = result?.partial;
      if (result.error !== undefined)
        this.error = result?.error;
      if (result.errors !== undefined)
        this.errors = result?.errors ?? null;
      this.onData?.(result);
    }

    /**
     * Sets `error` and `loading` on the instance when the subscription errors.
     * @private
     */
    nextError(error: ApolloError): void {
      this.error = error;
      this.onError?.(error);
    }
  };
}


/**
 * `ApolloQueryMixin`: class mixin for apollo-query elements.
 */
export const ApolloQueryMixin =
  dedupeMixin(ApolloQueryMixinImpl);
