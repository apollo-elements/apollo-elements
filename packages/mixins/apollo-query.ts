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

import type { ApolloElement } from './apollo-element';

export declare class ApolloQuery<TData, TVariables> extends ApolloElement<TData> {
  /**
   * A GraphQL document containing a single query.
   */
  declare query: DocumentNode;

  /**
   * An object map from variable name to variable value, where the variables are used within the GraphQL query.
   */
  declare variables: TVariables;

  /**
   * Specifies the ErrorPolicy to be used for this query.
   */
  declare errorPolicy: ErrorPolicy;

  /**
   * Specifies the FetchPolicy to be used for this query.
   */
  declare fetchPolicy: FetchPolicy;

  /**
   * Whether or not to fetch results.
   */
  declare fetchResults: boolean;

  /**
   * Enum of network statuses. See https://github.com/apollographql/apollo-client/blob/d470c964db46728d8a5dfc63990859c550fa1656/src/core/networkStatus.ts#L4
   */
  declare networkStatus: NetworkStatus;

  /**
   * When true, the component will not automatically subscribe to new data.
   * Call the `subscribe()` method to do so.
   */
  declare noAutoSubscribe: boolean;

  /**
   * Whether or not updates to the network status should trigger next on the observer of this query.
   */
  declare notifyOnNetworkStatusChange: boolean;

  /**
   * The apollo ObservableQuery watching this element's query.
   */
  declare observableQuery: ObservableQuery;

  /**
   * Exposes the [`ObservableQuery#setOptions`](https://www.apollographql.com/docs/react/api/apollo-client.html#ObservableQuery.setOptions) method.
   *
   * @return {ModifiableWatchQueryOptions} options [options](https://www.apollographql.com/docs/react/api/apollo-client.html#ModifiableWatchQueryOptions) object.
   */
  declare options: ModifiableWatchQueryOptions;

  /**
   * The time interval (in milliseconds) on which this query should be refetched from the server.
   */
  declare pollInterval: number;

  /**
   * Whether or not the query data is stale.
   */
  declare stale: boolean;

  /**
   * Try and fetch new results even if the variables haven't changed (we may still just hit the store, but if there's nothing in there will refetch).
   */
  declare tryFetch: boolean;

  /**
   * Callback for when a query is completed.
   */
  onData?(_result: ApolloQueryResult<TData>): void

  /**
   * Callback for when an error occurs in mutation.
   */
  onError?(_error: Error): void

  /**
   * Exposes the [`ObservableQuery#refetch`](https://www.apollographql.com/docs/react/api/apollo-client.html#ObservableQuery.refetch) method.
   * @param variables The new set of variables. If there are missing variables, the previous values of those variables will be used..
   */
  refetch(variables: TVariables): Promise<ApolloQueryResult<TData>>;

  /**
   * Resets the observableQuery and subscribes.
   */
  subscribe(options?: Partial<SubscriptionOptions>): ZenObservable.Subscription;

  /**
   * Lets you pass a GraphQL subscription and updateQuery function
   * to subscribe to more updates for your query.
   *
   * The `updateQuery` parameter is a function that takes the previous query data,
   * then a `{ subscriptionData: TSubscriptionResult }` object,
   * and returns an object with updated query data based on the new results.
   */
  subscribeToMore(options: SubscribeToMoreOptions): () => void;

  /**
   * Executes a Query once and updates the component with the result
   */
  executeQuery(options?: Partial<QueryOptions>): Promise<void | ApolloQueryResult<TData>>;

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
  fetchMore(options?: Partial<FetchMoreQueryOptions<
    TVariables,
    keyof TVariables
  > & FetchMoreOptions<
    TData,
    TVariables
  >>): Promise<ApolloQueryResult<TData>>;

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
  watchQuery(options?: Partial<WatchQueryOptions>): ObservableQuery;
}
