import type {
  ApolloQueryResult,
  DocumentNode,
  ErrorPolicy,
  FetchPolicy,
  FetchMoreOptions,
  FetchMoreQueryOptions,
  NetworkStatus,
  ObservableQuery,
  OperationVariables,
  QueryOptions,
  SubscribeToMoreOptions,
  SubscriptionOptions,
  WatchQueryOptions,
} from '@apollo/client/core';

import type { ComponentDocument, Data, Variables } from './operation';
import type { ApolloElementInterface } from './apollo-element';

import { ApolloQueryMixin } from '@apollo-elements/mixins/apollo-query-mixin';

export type FetchMoreParams<D, V> =
  FetchMoreQueryOptions<Variables<D, V>, keyof Variables<D, V>, Data<D>> &
  FetchMoreOptions<Data<D>, Variables<D, V>>

/**
 * Common interface for query elements
 *
 * See [[`ApolloElementInterface`]] for more information on events
 *
 * @element
 *
 * @fires 'apollo-query-result' when the query resolves
 * @fires 'apollo-error' when the query rejects
 */
export declare class ApolloQueryInterface<D, V = OperationVariables>
  extends ApolloElementInterface<D, V> {
  /**
   * Latest query data.
   */
  declare data: Data<D> | null;

  /**
   * A GraphQL document containing a single query.
   */
  declare query: DocumentNode | ComponentDocument<D> | null;

  /**
   * An object map from variable name to variable value, where the variables are used within the GraphQL query.
   */
  declare variables: Variables<D, V> | null;

  /**
   * Specifies the FetchPolicy to be used for this query.
   */
  declare fetchPolicy?: FetchPolicy;

  /**
   * When someone chooses cache-and-network or network-only as their
   * initial FetchPolicy, they often do not want future cache updates to
   * trigger unconditional network requests, which is what repeatedly
   * applying the cache-and-network or network-only policies would seem
   * to imply. Instead, when the cache reports an update after the
   * initial network request, it may be desirable for subsequent network
   * requests to be triggered only if the cache result is incomplete.
   * The nextFetchPolicy option provides an easy way to update
   * options.fetchPolicy after the intial network request, without
   * having to set options.
   */
  declare nextFetchPolicy?: FetchPolicy;

  /**
   * If data was read from the cache with missing fields,
   * partial will be true. Otherwise, partial will be falsy
   */
  declare partial?: boolean;

  /**
   * If true, perform a query refetch if the query result is marked as being partial,
   * and the returned data is reset to an empty Object by the Apollo Client QueryManager
   * (due to a cache miss).
   *
   * The default value is false for backwards-compatibility's sake,
   * but should be changed to true for most use-cases.
   */
  declare partialRefetch?: boolean;

  /**
   * Opt into receiving partial results from the cache for queries
   * that are not fully satisfied by the cache.
   */
  declare returnPartialData?: boolean;

  /**
   * `networkStatus` is useful if you want to display a different loading indicator (or no indicator at all)
   * depending on your network status as it provides a more detailed view into the state of a network request
   * on your component than `loading` does. `networkStatus` is an enum with different number values between 1 and 8.
   * These number values each represent a different network state.
   *
   * 1. `loading`: The query has never been run before and the request is now pending. A query will still have this network status even if a result was returned from the cache, but a query was dispatched anyway.
   * 2. `setVariables`: If a query’s variables change and a network request was fired then the network status will be setVariables until the result of that query comes back. React users will see this when options.variables changes on their queries.
   * 3. `fetchMore`: Indicates that fetchMore was called on this query and that the network request created is currently in flight.
   * 4. `refetch`: It means that refetch was called on a query and the refetch request is currently in flight.
   * 5. Unused.
   * 6. `poll`: Indicates that a polling query is currently in flight. So for example if you are polling a query every 10 seconds then the network status will switch to poll every 10 seconds whenever a poll request has been sent but not resolved.
   * 7. `ready`: No request is in flight for this query, and no errors happened. Everything is OK.
   * 8. `error`: No request is in flight for this query, but one or more errors were detected.
   *
   * If the network status is less then 7 then it is equivalent to `loading` being true. In fact you could
   * replace all of your `loading` checks with `networkStatus < 7` and you would not see a difference.
   * It is recommended that you use `loading`, however.
   */
  declare networkStatus: NetworkStatus;

  /**
   * The Apollo ObservableQuery watching this element's query.
   */
  declare observableQuery?: ObservableQuery<Data<D>, Variables<D, V>>;

  /**
   * Exposes the [`ObservableQuery#setOptions`](https://www.apollographql.com/docs/react/api/apollo-client.html#ObservableQuery.setOptions) method.
   */
  declare options: Partial<WatchQueryOptions<Variables<D, V>, Data<D>>> | null;

  /**
   * Whether or not updates to the network status should trigger next on the observer of this query.
   */
  declare notifyOnNetworkStatusChange?: boolean;

  /**
   * The time interval (in milliseconds) on which this query should be refetched from the server.
   */
  declare pollInterval?: number;

  /**
   * Specifies the ErrorPolicy to be used for this query.
   */
  declare errorPolicy: ErrorPolicy;

  /**
   * When true, the component will not automatically subscribe to new data.
   * Call the `subscribe()` method to do so.
   */
  declare noAutoSubscribe: boolean;

  /**
   * Callback for when a query is completed.
   */
  onData?(_result: ApolloQueryResult<Data<D>>): void

  /**
   * Callback for when an error occurs in mutation.
   */
  onError?(_error: Error): void

  /**
   * Exposes the [`ObservableQuery#refetch`](https://www.apollographql.com/docs/react/api/apollo-client.html#ObservableQuery.refetch) method.
   * @param variables The new set of variables. If there are missing variables, the previous values of those variables will be used..
   */
  refetch(variables: Variables<D, V>): Promise<ApolloQueryResult<Data<D>>>;

  /**
   * Determines whether the element is able to automatically subscribe
   * @protected
   */
  canSubscribe(options?: Partial<SubscriptionOptions<Variables<D, V>, Data<D>>>): boolean

  /**
   * Determines whether the element should attempt to subscribe i.e. begin querying
   * Override to prevent subscribing unless your conditions are met
   */
  shouldSubscribe(options?: Partial<SubscriptionOptions<Variables<D, V>, Data<D>>>): boolean

  /**
   * Resets the observableQuery and subscribes.
   */
  subscribe(
    params?: Partial<SubscriptionOptions<Variables<D, V>, Data<D>>>
  ): ZenObservable.Subscription;

  /**
   * Lets you pass a GraphQL subscription and updateQuery function
   * to subscribe to more updates for your query.
   *
   * The `updateQuery` parameter is a function that takes the previous query data,
   * then a `{ subscriptionData: TSubscriptionResult }` object,
   * and returns an object with updated query data based on the new results.
   */
  subscribeToMore(options: SubscribeToMoreOptions<Data<D>, Variables<D, V>>): (() => void) | void;

  /**
   * Executes a Query once and updates the component with the result
   */
  executeQuery(
    params?: Partial<QueryOptions<Variables<D, V>>>
  ): Promise<ApolloQueryResult<Data<D>> | void>;

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
  fetchMore(params?: Partial<FetchMoreParams<D, V>>): Promise<ApolloQueryResult<Data<D>>>;

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
  watchQuery(
    options?: Partial<WatchQueryOptions<Variables<D, V>, Data<D>>>
  ): ObservableQuery<Data<D>, Variables<D, V>>;
}

export class ApolloQueryElement<D = unknown, V = OperationVariables>
  extends ApolloQueryMixin(HTMLElement)<D, V> { }
