import type { ReactiveController, ReactiveControllerHost } from '@lit/reactive-element';

import type { TypedDocumentNode } from '@graphql-typed-document-node/core';

import type {
  ApolloClient,
  ApolloError,
  ApolloQueryResult,
  DocumentNode,
  ErrorPolicy,
  FetchMoreOptions,
  FetchPolicy,
  FetchResult,
  MutationOptions,
  NetworkStatus,
  NormalizedCacheObject,
  OperationVariables,
  QueryOptions,
  SubscribeToMoreOptions,
  SubscriptionOptions,
  WatchQueryFetchPolicy,
  WatchQueryOptions,
  ObservableSubscription,
} from '@apollo/client/core';

import type {
  ApolloController,
  ApolloMutationController,
  ApolloQueryController,
  ApolloSubscriptionController,
  ApolloQueryControllerOptions,
} from '.';

export type Value<T> = T[keyof T];

export type Entries<T> = [keyof T, Value<T>][];

export type MutationUpdaterFn<D, V> = Required<MutationOptions<D, V>>['update'];

export type GraphQLError = ApolloError['graphQLErrors'][number];

export type ComponentDocument<D, V> =
    D extends TypedDocumentNode<infer TD, infer TV> ? TypedDocumentNode<TD, TV>
  : TypedDocumentNode<D, V>

export type Data<D> =
    D extends TypedDocumentNode<infer TD, infer _> ? TD
  : D extends DocumentNode ? unknown
  : D;

export type Variables<D, V> =
    D extends TypedDocumentNode<infer _, infer TV> ? TV
  : V extends OperationVariables ? V
  : V extends any ? any
  : unknown;

export type VariablesOf<E> =
    E extends TypedDocumentNode<infer _, infer V> ? V
  : E extends ApolloElementElement<infer D, infer V> ? Variables<D, V>
  : E extends any ? any
  : unknown;

export type NextFetchPolicyFunction<D, V> =
  (
    this: WatchQueryOptions<Variables<D, V>, Data<V>>,
    lastFetchPolicy: WatchQueryFetchPolicy
  ) => WatchQueryFetchPolicy

export type RefetchQueriesType<D = TypedDocumentNode|Record<string, unknown>> =
  MutationOptions<Data<D>>['refetchQueries'];

export type OptimisticResponseType<D, V> =
  Data<D> |
  ((vars: Variables<D, V>) =>
    Data<D>);

export type FetchMoreParams<D, V> =
  FetchMoreQueryOptions<Variables<D, V>, Data<D>> &
  FetchMoreOptions<Data<D>, Variables<D, V>>

export interface FetchMoreQueryOptions<TVariables, TData = any> {
    query?: DocumentNode | TypedDocumentNode<TData, TVariables>;
    variables?: Partial<TVariables>;
    context?: any;
}

/**
 * Type that represents a class
 */
export type Constructor<T = CustomElement> = {
  new (...a: any[]): T;
}

export declare class CustomElement extends HTMLElement {
  static readonly observedAttributes?: string[];

  /**
   * Called when one of the element's `observedAttributes` changes.
   * @param name name of the observed attribute
   * @param oldValue previous value of the attribute. null if it was nonexistent
   * @param newValue current value of the attribute. null if removed.
   */
  attributeChangedCallback?(name: string, oldValue: string, newValue: string): void;

  /**
   * Called when the element is adopted to a document.
   */
  adoptedCallback?(): void;

  /**
   * Called when the element connects to a document, when the element has access to it's own DOM.
   */
  connectedCallback?(): void;

  /**
   * Called when the element is removed from a document.
   */
  disconnectedCallback?(): void;
}

export interface SubscriptionResult<TData> {
  /** whether the subscription is loading */
  loading: boolean;
  /** subscription data */
  data: TData | null;
  /** subscription error */
  error: ApolloError | null;
}

export interface SubscriptionDataOptions<D = unknown, V = OperationVariables> {
  context: SubscriptionOptions<V, D>['context'];
  subscription: DocumentNode | ComponentDocument<D, V>;
  variables?: Variables<D, V>;
  errorPolicy?: ErrorPolicy;
  fetchPolicy?: FetchPolicy;
  shouldResubscribe?:
    | boolean
    | ((options: SubscriptionDataOptions<D, V>) => boolean);
  client?: ApolloClient<NormalizedCacheObject>;
  skip?: boolean;
}

export interface OnSubscriptionDataParams<TData = unknown> {
  client: ApolloClient<NormalizedCacheObject>;
  subscriptionData: SubscriptionResult<TData>;
}

export declare class ControllerHost extends HTMLElement implements ReactiveControllerHost {
  connectedCallback(): void;
  disconnectedCallback(): void;
  requestUpdate(name?: string, value?: unknown): void;
  addController(controller: ReactiveController): void
  removeController(controller: ReactiveController): void
  get updateComplete(): Promise<boolean>;
  protected update(...args: any[]): void
  protected updated(...args: any[]): void
}

/**
 * Common base interface for apollo elements
 *
 * @fires {ApolloElementEvent} apollo-element-connected - The element connected to the DOM
 * @fires {ApolloElementEvent} apollo-element-disconnected - The element disconnected from the DOM
 */
export declare class ApolloElementElement<D = unknown, V = VariablesOf<D>> extends CustomElement {
  static readonly documentType: 'document'|'query'|'mutation'|'subscription';
  static get observedAttributes(): string[]
  /** @summary The Apollo Client instance. */
  public client: ApolloClient<NormalizedCacheObject> | null;
  public controller: ApolloController<D, V>;
  /**
   * GraphQL operation document i.e. query, subscription, or mutation.
   * Must be a parsed GraphQL DocumentNode, so use `graphql-tag`.
   *
   * @summary Operation document.
   */
  public document: ComponentDocument<D, V> | null;
  /** @summary Latest Data. */
  public data: Data<D> | null;
  /** @summary Operation variables. */
  public variables: Variables<D, V> | null;
  /** @summary Latest error */
  public error: Error | ApolloError | null;
  /** @summary Latest errors */
  public errors: readonly GraphQLError[];
  /** @summary Whether a request is in flight. */
  public loading: boolean;
  /**
   * @summary Fetch Policy for the operation.
   * @attr fetch-policy
   */
  public fetchPolicy?: string;
  /** @summary Context passed to the link execution chain. */
  public context?: Record<string, unknown>;
  /**
   * Much like `fetchPolicy`, `errorPolicy` allows you to control how GraphQL errors
   * from the server are sent to your UI code. By default, the error policy treats any
   * GraphQL Errors as network errors and ends the request chain.
   * It doesn't save any data in the cache, and renders your UI with the error property
   * set to an `ApolloError`. By changing this policy per request, you can adjust how
   * GraphQL Errors are managed by your UI. The possible options for `errorPolicy` are:
   * - `none` (default): any errors from the request are treated like runtime errors and the observable is stopped (XXX this is default to lower breaking changes going from AC 1.0 => 2.0)
   * - `ignore`: errors from the request do not stop the observable, but also don't call `next`
   * - `all`: errors are treated like data and will notify observables
   * @summary [Error Policy](https://www.apollographql.com/docs/react/api/core/ApolloClient/#ErrorPolicy) for the operation.
   * @attr error-policy
   */
  public errorPolicy?: ErrorPolicy;
  /** @summary True when the element is connected and ready to receive its GraphQL document */
  public readyToReceiveDocument: boolean;
  public attributeChangedCallback(name: string, oldVal: string, newVal: string): void;
  /** Lifecycle callback that reacts to changes in the GraphQL document */
  protected documentChanged?(document: ComponentDocument<D, V> | null): void
  /** Lifecycle callback that reacts to changes in the operation variables */
  protected variablesChanged?(variables: Variables<D, V> | null): void
}

/**
 * Common interface for mutation elements
 *
 * See [`ApolloElementInterface`](https://apolloelements.dev/api/core/interfaces/element) for more information on events
 *
 * @fires {CustomEvent<FetchResult<Data<D>>>} apollo-mutation-result - The mutation resolved
 * @fires {CustomEvent<ApolloError>} apollo-error - The mutation rejected
 */
export declare class ApolloMutationElement<D = unknown, V = VariablesOf<D>>
  extends ApolloElementElement<D, V> {
  static readonly documentType: 'mutation';
  public controller: ApolloMutationController<D, V>;
  /** @summary Latest mutation data */
  public data: Data<D> | null;
  /**
   * An object that maps from the name of a variable as used in the mutation GraphQL document to that variable's value.
   *
   * @summary Mutation variables.
   */
  public variables: Variables<D, V> | null;
  /**
   * Queries refetched as part of refetchQueries are handled asynchronously,
   * and are not waited on before the mutation is completed (resolved).
   * Setting this to true will make sure refetched queries are completed
   * before the mutation is considered done. false by default.
   * @attr await-refetch-queries
   */
  public awaitRefetchQueries?: boolean;
  /** @summary Whether the mutation was called. */
  public readonly called: boolean;
  /**
   * If set to 'no-cache', the mutation result will not update the Apollo cache.
   * @attr fetch-policy
   */
  public fetchPolicy?: Extract<FetchPolicy, 'no-cache'>;
  /**
   * @summary If true, the returned data property will not update with the mutation result.
   */
  public ignoreResults: boolean;
  /** @summary The mutation. */
  public mutation: ComponentDocument<D, V> | null;
  /**
   * An object that represents the result of this mutation that
   * will be optimistically stored before the server has actually returned a
   * result.
   *
   * This is most often used for optimistic UI, where we want to be able to see
   * the result of a mutation immediately, and update the UI later if any errors
   * appear.
   */
  public optimisticResponse?: OptimisticResponseType<D, V>;
  /**
   * A list of query names which will be refetched once this mutation has returned.
   * This is often used if you have a set of queries which may be affected by a mutation and will have to update.
   * Rather than writing a mutation query reducer (i.e. `updateQueries`) for this,
   * you can refetch the queries that will be affected
   * and achieve a consistent store once these queries return.
   * @attr refetch-queries
   */
  public refetchQueries: RefetchQueriesType<D> | null;
  /**
   * Callback for when a mutation is completed.
   */
  public onCompleted?(_data: Data<D>): void;
  /**
   * Callback for when an error occurs in mutation.
   */
  public onError?(_error: Error): void;
  /**
   * A function which updates the apollo cache when the query responds.
   * This function will be called twice over the lifecycle of a mutation.
   * Once at the very beginning if an optimisticResponse was provided.
   * The writes created from the optimistic data will be rolled back before
   * the second time this function is called which is when the mutation has
   * succesfully resolved. At that point update will be called with the actual
   * mutation result and those writes will not be rolled back.
   *
   * The reason a DataProxy is provided instead of the user calling the methods
   * directly on ApolloClient is that all of the writes are batched together at
   * the end of the update, and it allows for writes generated by optimistic
   * data to be rolled back.
   *
   * @example <caption>Updating a query</caption>
   * ```js
   *          updater(cache, result) {
   *            cache.writeQuery({
   *              query: MyProfileQuery,
   *              data: { profile: result.data.updateMyProfile },
   *            });
   *          }
   * ```
   */
  public updater?(
    ...params: Parameters<MutationUpdaterFn<Data<D>, Variables<D, V>>>
  ): ReturnType<MutationUpdaterFn<Data<D>, Variables<D, V>>>;

  /**
   * This resolves a single mutation according to the options specified and returns a
   * Promise which is either resolved with the resulting data or rejected with an error.
   */
  public mutate(
    params?: Partial<MutationOptions<Data<D>, Variables<D, V>>>
  ): Promise<FetchResult<Data<D>>>;
}

/**
 * Common interface for query elements
 *
 * See [`ApolloElementInterface`](https://apolloelements.dev/api/core/interfaces/element) for more information on events
 *
 * @fires {CustomEvent<ApolloQueryResult<Data<D>>>} apollo-query-result - The query resolved
 * @fires {CustomEvent<ApolloError>} apollo-error - The query rejected
 */
export declare class ApolloQueryElement<D = unknown, V = VariablesOf<D>>
  extends ApolloElementElement<D, V> {
  static readonly documentType: 'mutation';
  public controller: ApolloQueryController<D, V>;
  /** @summary The latest query data. */
  public data: Data<D> | null;
  /**
   * An object map from variable name to variable value, where the variables are used within the GraphQL query.
   *
   * Setting variables will initiate the query, unless [`noAutoSubscribe`](#noautosubscribe) is also set.
   *
   * @summary Query variables.
   */
  public variables: Variables<D, V> | null;
  /**
   * Determines where the client may return a result from. The options are:
   *
   * - `cache-first` (default): return result from cache, fetch from network if cached result is not available.
   * - `cache-and-network`: return result from cache first (if it exists), then return network result once it's available.
   * - `cache-only`: return result from cache if available, fail otherwise.
   * - `no-cache`: return result from network, fail if network call doesn't succeed, don't save to cache
   * - `network-only`: return result from network, fail if network call doesn't succeed, save to cache
   * - `standby`: only for queries that aren't actively watched, but should be available for refetch and updateQueries.
   *
   * @summary The [fetchPolicy](https://www.apollographql.com/docs/react/api/core/ApolloClient/#FetchPolicy) for the query.
   * @attr fetch-policy
   */
  public fetchPolicy?: WatchQueryFetchPolicy;
  /** @summary Flags an element that's ready and able to auto subscribe */
  public get canAutoSubscribe(): boolean;
  public get options(): ApolloQueryControllerOptions<D, V>
  public set options(options: ApolloQueryControllerOptions<D, V>)
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
  public networkStatus: NetworkStatus;
  /**
   * When someone chooses cache-and-network or network-only as their
   * initial FetchPolicy, they often do not want future cache updates to
   * trigger unconditional network requests, which is what repeatedly
   * applying the cache-and-network or network-only policies would seem
   * to imply. Instead, when the cache reports an update after the
   * initial network request, it may be desirable for subsequent network
   * requests to be triggered only if the cache result is incomplete.
   * The nextFetchPolicy option provides a way to update
   * options.fetchPolicy after the intial network request, without
   * having to set options.
   *
   * @summary Set to prevent subsequent network requests when the fetch policy is `cache-and-network` or `network-only`.
   * @attr next-fetch-policy
   */
  public nextFetchPolicy?: WatchQueryFetchPolicy | NextFetchPolicyFunction<D, V>;
  /**
   * When true, the component will not automatically subscribe to new data.
   * Call the `subscribe()` method to do so.
   * @attr no-auto-subscribe
   */
  public noAutoSubscribe: boolean;
  /** @summary Whether or not updates to the network status should trigger next on the observer of this query. */
  public notifyOnNetworkStatusChange?: boolean;
  /**
   * If data was read from the cache with missing fields,
   * partial will be true. Otherwise, partial will be falsy.
   *
   * @summary True when the query returned partial data.
   */
  public readonly partial?: boolean;
  /**
   * If true, perform a query refetch if the query result is marked as being partial,
   * and the returned data is reset to an empty Object by the Apollo Client QueryManager
   * (due to a cache miss).
   *
   * The default value is false for backwards-compatibility's sake,
   * but should be changed to true for most use-cases.
   *
   * @summary Set to retry any partial query results.
   */
  public partialRefetch?: boolean;
  /** @summary The time interval (in milliseconds) on which this query should be refetched from the server. */
  public pollInterval?: number;
  /** @summary A GraphQL document containing a single query. */
  public query: DocumentNode | ComponentDocument<D, V> | null;
  /**
   * Opt into receiving partial results from the cache for queries
   * that are not fully satisfied by the cache.
   */
  public returnPartialData?: boolean;
  /**
   * Optional callback for when a query is completed.
   * @param data the query data.
   */
  public onData?(data: Data<D>): void
  /**
   * Optional callback for when an error occurs.
   * @param error the error.
   */
  public onError?(error: Error): void
  /**
   * Update the variables of this observable query, and fetch the new results.
   * @param variables The new set of variables. If there are missing variables, the previous values of those variables will be used..
   */
  public refetch(variables: Variables<D, V>): Promise<ApolloQueryResult<Data<D>>>
  /**
   * Determines whether the element should attempt to subscribe i.e. begin querying
   * Override to prevent subscribing unless your conditions are met
   */
  public shouldSubscribe(
    options?: Partial<SubscriptionOptions<Variables<D, V>, Data<D>>>
  ): boolean

  /**
   * Resets the internal state of the query and subscribes.
   */
  public subscribe(
    params?: Partial<SubscriptionOptions<Variables<D, V>, Data<D>>>
  ): ObservableSubscription

  /**
   * Lets you pass a GraphQL subscription and updateQuery function
   * to subscribe to more updates for your query.
   *
   * The `updateQuery` parameter is a function that takes the previous query data,
   * then a `{ subscriptionData: TSubscriptionResult }` object,
   * and returns an object with updated query data based on the new results.
   */
  public subscribeToMore<TSubscriptionVariables, TSubscriptionData>(
    options: SubscribeToMoreOptions<Data<D>, TSubscriptionVariables, TSubscriptionData>
  ): void | (() => void)

  /**
   * Executes a Query once and updates the component with the result
   */
  public executeQuery(
    params?: Partial<QueryOptions<Variables<D, V>, Data<D>>> | undefined
  ): Promise<ApolloQueryResult<Data<D>>>

  /**
   * Exposes the `ObservableQuery#fetchMore` method.
   * https://www.apollographql.com/docs/react/api/core/ObservableQuery/#ObservableQuery.fetchMore
   *
   * The optional `updateQuery` parameter is a function that takes the previous query data,
   * then a `{ subscriptionData: TSubscriptionResult }` object,
   * and returns an object with updated query data based on the new results.
   *
   * The optional `variables` parameter is an optional new variables object.
   */
  public fetchMore<D = this['data'], V = this['variables']>(
    params?: Partial<FetchMoreParams<D, V>> | undefined
  ): Promise<ApolloQueryResult<D>>
}

/**
 * Common interface for subscription elements
 *
 * See [`ApolloElementInterface`](https://apolloelements.dev/api/core/interfaces/element) for more information on events
 *
 * @fires {ApolloSubscriptionResultEvent} apollo-subscription-result - The subscription updated
 * @fires {CustomEvent<ApolloError>} apollo-error - The subscription produced an error
 */
export declare class ApolloSubscriptionElement<D = unknown, V = VariablesOf<D>>
  extends ApolloElementElement<D, V> {
  static readonly documentType: 'subscription';
  public controller: ApolloSubscriptionController<D, V>;
  /**
   * Latest subscription data.
   */
  public data: Data<D> | null;

  /**
   * An object map from variable name to variable value, where the variables are used within the GraphQL subscription.
   *
   * Setting variables will initiate the subscription, unless [`noAutoSubscribe`](#noautosubscribe) is also set.
   *
   * @summary Subscription variables.
   */
  public variables: Variables<D, V> | null;
  /**
   * @summary A GraphQL document containing a single subscription.
   */
  public subscription: ComponentDocument<D, V> | null;
  /** @summary Flags an element that's ready and able to auto subscribe */
  public get canAutoSubscribe(): boolean;
  /**
   * @summary Specifies the FetchPolicy to be used for this subscription.
   * @attr fetch-policy
   */
  public fetchPolicy?: FetchPolicy;
  /**
   * @summary The time interval (in milliseconds) on which this subscription should be refetched from the server.
   */
  public pollInterval?: number;
  /**
   * @summary If true, the element will not begin querying data until you manually call `subscribe`
   * @attr no-auto-subscribe
   */
  public noAutoSubscribe: boolean;
  /**
   * @summary Whether or not updates to the network status should trigger next on the observer of this subscription.
   */
  public notifyOnNetworkStatusChange?: boolean;
  /**
   * @summary Determines if your subscription should be unsubscribed and subscribed again.
   */
  public shouldResubscribe: boolean | ((options: SubscriptionDataOptions<Data<D>, Variables<D, V>>) => boolean); // eslint-disable-line max-len
  /**
   * @summary If true, the query will be skipped entirely
   */
  public skip: boolean;
  /**
   * Callback for when data is updated
   */
  public onSubscriptionData?(_result: OnSubscriptionDataParams<Data<D>>): void
  /**
   * Callback for when subscription completes.
   */
  public onSubscriptionComplete?(): void
  /**
   * Callback for when error is updated
   */
  public onError?(error: ApolloError): void
  /**
   * @summary Resets the subscription and subscribes.
   */
  public subscribe(params?: Partial<SubscriptionDataOptions<D, V>>): void
  /**
   * @summary Cancels and clears the subscription
   */
  public cancel(): void
  /**
   * Determines whether the element should attempt to subscribe automatically
   * Override to prevent subscribing unless your conditions are met
   */
  public shouldSubscribe(
    options?: Partial<SubscriptionOptions<Variables<D, V>, Data<D>>>
  ): boolean;
}

declare global {
  interface Window {
    __APOLLO_CLIENT__?: ApolloClient<NormalizedCacheObject>;
  }
}
