import type { Constructor, CustomElement } from './constructor';
import type { DocumentNode } from 'graphql/language/ast';

import type {
  ErrorPolicy,
  FetchPolicy,
  ObservableQuery,
  ApolloQueryResult,
  FetchMoreOptions,
  NetworkStatus,
} from 'apollo-client';

import type {
  ModifiableWatchQueryOptions,
  SubscriptionOptions,
  SubscribeToMoreOptions,
  QueryOptions,
  FetchMoreQueryOptions,
  WatchQueryOptions,
} from 'apollo-client/core/watchQueryOptions';

import { stripUndefinedValues } from '@apollo-elements/lib/helpers';
import compose from 'crocks/helpers/compose';
import hasAllVariables from '@apollo-elements/lib/has-all-variables';
import pick from 'crocks/helpers/pick';
import bound from 'bind-decorator';

import { ApolloElementMixin } from './apollo-element-mixin';
import { dedupeMixin } from '@open-wc/dedupe-mixin';

const pickExecuteQueryOpts = compose(
  stripUndefinedValues,
  pick([
    'context',
    'errorPolicy',
    'fetchPolicy',
    'fetchResults',
    'metadata',
    'query',
    'variables',
  ])
) as <TVariables>(o: QueryOptions<TVariables>) =>
  Pick<QueryOptions<TVariables>, keyof QueryOptions<TVariables>>;

const pickWatchQueryOpts = compose(
  stripUndefinedValues,
  pick([
    'context',
    'errorPolicy',
    'fetchPolicy',
    'fetchResults',
    'metadata',
    'notifyOnNetworkStatusChange',
    'pollInterval',
    'query',
    'variables',
  ])
) as (o: WatchQueryOptions) => Pick<WatchQueryOptions, keyof WatchQueryOptions>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function ApolloQueryMixinImplementation<
  TBase extends Constructor<CustomElement>
>(superclass: TBase) {
  /**
   * Class mixin for apollo-query elements
   */
  class ApolloQuery<TData, TVariables> extends ApolloElementMixin(superclass)<TData> {
    /**
     * Specifies the ErrorPolicy to be used for this query.
     */
    errorPolicy: ErrorPolicy = 'none';

    /**
     * Specifies the FetchPolicy to be used for this query.
     */
    fetchPolicy: FetchPolicy;

    /**
     * Whether or not to fetch results.
     */
    fetchResults: boolean = undefined;

    networkStatus: NetworkStatus;

    /**
     * Whether or not updates to the network status should trigger next on the observer of this query.
     */
    notifyOnNetworkStatusChange: boolean = undefined;

    /**
     * The time interval (in milliseconds) on which this query should be refetched from the server.
     */
    pollInterval: number = undefined;

    stale: boolean;

    /**
     * Try and fetch new results even if the variables haven't changed (we may still just hit the store, but if there's nothing in there will refetch).
     */
    tryFetch: boolean = undefined;

    /**
     * The apollo ObservableQuery watching this element's query.
     */
    observableQuery: ObservableQuery;

    /**
     * When true, the component will not automatically subscribe to new data.
     * Call the `subscribe()` method to do so.
     */
    noAutoSubscribe: boolean;

    /**
     * A GraphQL document containing a single query.
     */
    get query(): DocumentNode { return this.document; }

    set query(query) {
      try {
        this.document = query;
      } catch (error) {
        throw new TypeError('Query must be a gql-parsed DocumentNode');
      }

      if (!this.noAutoSubscribe && query)
        this.subscribe({ query, variables: this.variables });
    }

    #variables: TVariables;

    /**
     * An object map from variable name to variable value, where the variables are used within the GraphQL query.
     */
    get variables(): TVariables { return this.#variables; }

    set variables(variables) {
      this.#variables = variables;
      const { query } = this;
      if (this.observableQuery)
        this.observableQuery.setVariables(variables, this.tryFetch, this.fetchResults);
      else
        this.subscribe({ query, variables });
    }

    #options: ModifiableWatchQueryOptions;

    /**
     * Exposes the [`ObservableQuery#setOptions`](https://www.apollographql.com/docs/react/api/apollo-client.html#ObservableQuery.setOptions) method.
     *
     * @return {ModifiableWatchQueryOptions} options [options](https://www.apollographql.com/docs/react/api/apollo-client.html#ModifiableWatchQueryOptions) object.
     */
    get options(): ModifiableWatchQueryOptions { return this.#options; }

    set options(options) {
      this.#options = options;
      this.observableQuery?.setOptions(options);
    }

    connectedCallback(): void {
      /* istanbul ignore next */
      super.connectedCallback?.();
      if (this.query) this.subscribe();
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
     * Resets the observableQuery and subscribes.
     */
    subscribe(options?: Partial<SubscriptionOptions>): ZenObservable.Subscription {
      const query = options?.query ?? this.query;
      const variables = options?.variables ?? this.variables;
      if (!hasAllVariables({ query, variables })) return;
      this.observableQuery = this.watchQuery({ query, variables });
      return this.observableQuery.subscribe({
        next: this.nextData,
        error: this.nextError,
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
    executeQuery(options?: Partial<QueryOptions>): Promise<void | ApolloQueryResult<TData>> {
      const query = options?.query ?? this.query;
      const variables = options?.variables ?? this.variables;
      const opts = pickExecuteQueryOpts({ ...this, ...options, query, variables });

      const queryInFlight =
        this.client
          .query(opts)
          .catch(this.nextError);

      queryInFlight.then(this.nextData);

      return queryInFlight;
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
    fetchMore(options?: Partial<(
      FetchMoreQueryOptions<TVariables, keyof TVariables> &
      FetchMoreOptions<TData, TVariables>
    )>): Promise<ApolloQueryResult<TData>> {
      const query = options?.query ?? this.query;
      const updateQuery = options?.updateQuery;
      const variables = options?.variables;
      return this.observableQuery?.fetchMore({ query, updateQuery, variables });
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
    watchQuery(options?: Partial<WatchQueryOptions>): ObservableQuery {
      const query = options?.query ?? this.query;
      const variables = options?.variables ?? this.variables;
      const opts = pickWatchQueryOpts({ ...this, ...options, query, variables });
      return this.client.watchQuery(opts);
    }

    /**
     * Updates the element with the result of a query.
     */
    @bound nextData({ data, loading, networkStatus, stale }: ApolloQueryResult<TData>): void {
      this.data = data;
      this.loading = loading;
      this.networkStatus = networkStatus;
      this.stale = stale;
      this.onData?.({ data, loading, networkStatus, stale });
    }

    /**
     * Updates the element with the error when the query fails.
     */
    @bound nextError(error: Error): void {
      this.error = error;
      this.onError?.(error);
    }

    /**
     * Callback for when a query is completed.
     */
    onData?(_result: ApolloQueryResult<TData>): void

    /**
     * Callback for when an error occurs in mutation.
     */
    onError?(_error: Error): void
  }

  return ApolloQuery;
}


/**
 * `ApolloQueryMixin`: class mixin for apollo-query elements.
 */
export const ApolloQueryMixin =
  dedupeMixin(ApolloQueryMixinImplementation);
