import type { ReactiveController, ReactiveControllerHost } from 'lit';

import type {
  ComponentDocument,
  Data,
  FetchMoreParams,
  MaybeTDN,
  MaybeVariables,
  Variables,
} from '@apollo-elements/core/types';

import type {
  ApolloError,
  ApolloQueryResult,
  DocumentNode,
  ObservableQuery,
  QueryOptions,
  SubscribeToMoreOptions,
  SubscriptionOptions,
  WatchQueryOptions,
} from '@apollo/client/core';

import { NetworkStatus } from '@apollo/client/core';

import { ApolloController, ApolloControllerOptions } from './apollo-controller.js';

import { bound } from './lib/bound.js';

export interface ApolloQueryControllerOptions<D, V> extends
    ApolloControllerOptions<D, V>,
    Partial<WatchQueryOptions<Variables<D, V>, Data<D>>> {
  variables?: Variables<D, V>;
  noAutoSubscribe?: boolean;
  shouldSubscribe?: (options?: Partial<SubscriptionOptions<Variables<D, V>, Data<D>>>) => boolean;
  onData?: (data: Data<D>) => void;
  onError?: (error: Error) => void;
}

export class ApolloQueryController<D extends MaybeTDN = MaybeTDN, V = MaybeVariables<D>>
  extends ApolloController<D, V>
  implements ReactiveController {
  private observableQuery?: ObservableQuery<Data<D>, Variables<D, V>>;

  private pollingInterval?: number;

  /** @summary Options to customize the query and to interface with the controller. */ // @ts-expect-error: https://github.com/microsoft/TypeScript/issues/40220
  declare options: ApolloQueryControllerOptions<D, V>;

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
  networkStatus = NetworkStatus.ready;

  /**
   * If data was read from the cache with missing fields,
   * partial will be true. Otherwise, partial will be falsy.
   *
   * @summary True when the query returned partial data.
   */
  partial = false;

  #hasDisconnected = false;

  #lastQueryDocument?: DocumentNode;

  /** @summary A GraphQL document containing a single query. */
  get query(): ComponentDocument<D> | null { return this.document; }

  set query(document: ComponentDocument<D> | null) { this.document = document; }

  /** @summary Flags an element that's ready and able to auto-subscribe */
  public get canAutoSubscribe(): boolean {
    return (
      !!this.client &&
      !!this.document &&
      !this.options.noAutoSubscribe &&
      this.shouldSubscribe()
    );
  }

  constructor(
    host: ReactiveControllerHost,
    query?: ComponentDocument<D> | null,
    options?: ApolloQueryControllerOptions<D, V>
  ) {
    super(host, options);
    this.init(query ?? null);/* c8 ignore next */
  }

  /** @summary initializes or reinitializes the query */
  override hostConnected(): void {
    super.hostConnected();
    if (this.#hasDisconnected && this.observableQuery) { /* c8 ignore next */
      this.observableQuery.reobserve();
      this.#hasDisconnected = false;
    } else
      this.documentChanged(this.query);
  }

  override hostDisconnected(): void {
    this.#hasDisconnected = true;
    super.hostDisconnected();
  }

  private shouldSubscribe(opts?: Partial<SubscriptionOptions<Variables<D, V>, Data<D>>>): boolean {
    return this.options.shouldSubscribe?.(opts) ?? true;/* c8 ignore next */
  }

  /**
   * Determines whether the element is able to automatically subscribe
   */
  private canSubscribe(
    options?: Partial<SubscriptionOptions<Variables<D, V> | null, Data<D>>>
  ): boolean {
    /* c8 ignore next 4 */
    return (
      !(this.options.noAutoSubscribe ?? false) &&
      !!this.client &&
      !!(options?.query ?? this.document)
    );
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
  @bound private watchQuery(
    params?: Partial<WatchQueryOptions<Variables<D, V>, Data<D>>>
  ): ObservableQuery<Data<D>, Variables<D, V>> {
    if (!this.client)
      throw new TypeError('No Apollo client. See https://apolloelements.dev/guides/getting-started/apollo-client/'); /* c8 ignore next */ // covered

    return this.client.watchQuery({
      // It's better to let Apollo client throw this error
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      query: this.query!,
      variables: this.variables ?? undefined,
      context: this.options.context,
      errorPolicy: this.options.errorPolicy,
      fetchPolicy: this.options.fetchPolicy,
      notifyOnNetworkStatusChange: this.options.notifyOnNetworkStatusChange,
      partialRefetch: this.options.partialRefetch,
      pollInterval: this.options.pollInterval,
      returnPartialData: this.options.returnPartialData,
      nextFetchPolicy: this.options.nextFetchPolicy,
      ...params,
    }) as ObservableQuery<Data<D>, Variables<D, V>>;
  }

  private nextData(result: ApolloQueryResult<Data<D>>): void {
    this.emitter.dispatchEvent(new CustomEvent('apollo-query-result', { detail: result }));
    this.data = result.data;
    this.error = result.error ?? null;/* c8 ignore next */
    this.errors = result.errors ?? [];
    this.loading = result.loading ?? false;/* c8 ignore next */
    this.networkStatus = result.networkStatus;
    this.partial = result.partial ?? false;
    this.options.onData?.(result.data);/* c8 ignore next */
    this.notify('data', 'error', 'errors', 'loading', 'networkStatus', 'partial');
  }

  private nextError(error: ApolloError): void {
    this.emitter.dispatchEvent(new CustomEvent('apollo-error', { detail: error }));
    this.error = error;
    this.loading = false;
    this.options.onError?.(error);/* c8 ignore next */
    this.notify('error', 'loading');
  }

  protected override clientChanged(): void {
    if (this.canSubscribe() && this.shouldSubscribe())/* c8 ignore next */
      this.subscribe();/* c8 ignore next */
  }

  protected override documentChanged(doc?: ComponentDocument<D> | null): void {
    const query = doc ?? undefined;/* c8 ignore next */
    if (doc === this.#lastQueryDocument)
      return;/* c8 ignore next */
    if (this.canSubscribe({ query }) && this.shouldSubscribe({ query }))/* c8 ignore next */
      this.subscribe({ query }); /* c8 ignore next */ // covered
  }

  protected override variablesChanged(variables?: Variables<D, V>): void {
    if (this.observableQuery)
      this.refetch(variables);/* c8 ignore next */
    else if (this.canSubscribe({ variables }) && this.shouldSubscribe({ variables }))/* c8 ignore next */
      this.subscribe({ variables });/* c8 ignore next */
  }

  /**
   * Exposes the [`ObservableQuery#refetch`](https://www.apollographql.com/docs/react/api/apollo-client.html#ObservableQuery.refetch) method.
   *
   * @param variables The new set of variables. If there are missing variables, the previous values of those variables will be used.
   */
  @bound public async refetch(variables?: Variables<D, V>): Promise<ApolloQueryResult<Data<D>>> {
    if (!this.observableQuery)
      throw new Error('Cannot refetch without an ObservableQuery'); /* c8 ignore next */ // covered
    return this.observableQuery.refetch(variables as Variables<D, V>);
  }

  /**
   * Resets the observableQuery and subscribes.
   * @param params options for controlling how the subscription subscribes
   */
  @bound public subscribe(
    params?: Partial<WatchQueryOptions<Variables<D, V>, Data<D>>>
  ): ZenObservable.Subscription {
    if (this.observableQuery)
      this.observableQuery.stopPolling(); /* c8 ignore next */ // covered

    this.observableQuery = this.watchQuery({
      // It's better to let Apollo client throw this error
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      query: this.query!,
      variables: this.variables ?? undefined,
      context: this.options.context,
      errorPolicy: this.options.errorPolicy,
      fetchPolicy: this.options.fetchPolicy,
      pollInterval: this.options.pollInterval,
      notifyOnNetworkStatusChange: this.options.notifyOnNetworkStatusChange,
      returnPartialData: this.options.returnPartialData,
      partialRefetch: this.options.partialRefetch,
      ...params,
    });

    this.#lastQueryDocument = params?.query ?? this.query ?? undefined;/* c8 ignore next */

    this.loading = true;
    this.notify('loading');

    return this.observableQuery?.subscribe({
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
  @bound public subscribeToMore<TSubscriptionVariables, TSubscriptionData>(
    options: SubscribeToMoreOptions<Data<D>, TSubscriptionVariables, TSubscriptionData>
  ): (() => void) | void {
    return this.observableQuery?.subscribeToMore(options);
  }

  /**
   * @summary Executes a Query once and updates the with the result
   */
  @bound public async executeQuery(
    params?: Partial<QueryOptions<Variables<D, V>, Data<D>>>
  ): Promise<ApolloQueryResult<Data<D>>> {
    try {
      if (!this.client)
        throw new TypeError('No Apollo client. See https://apolloelements.dev/guides/getting-started/apollo-client/'); /* c8 ignore next */ // covered

      this.loading = true;
      this.notify('loading');

      const result = await this.client.query<Data<D>, Variables<D, V>>({
        // It's better to let Apollo client throw this error, if needs be
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        query: this.query!, variables: this.variables!,
        context: this.options.context,
        errorPolicy: this.options.errorPolicy,
        fetchPolicy:
            this.options.fetchPolicy === 'cache-and-network' ? undefined/* c8 ignore next */
          : this.options.fetchPolicy,
        notifyOnNetworkStatusChange: this.options.notifyOnNetworkStatusChange,
        partialRefetch: this.options.partialRefetch,
        returnPartialData: this.options.returnPartialData,
        ...params,
      });
      if (result) // NB: not sure why, but sometimes this returns undefined
        this.nextData(result);
      return result;/* c8 ignore next */
    } catch (error) {
      this.nextError(error);
      throw error;
    }
  }

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
  @bound public async fetchMore(
    params?: Partial<FetchMoreParams<D, V>>
  ): Promise<ApolloQueryResult<Data<D>>> {
    this.loading = true;
    this.notify('loading');

    const options = {
      // It's better to let Apollo client throw this error
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      query: this.query!,
      context: this.options.context,
      variables: this.variables,
      ...params,
    };

    return (
      this.observableQuery ??= this.watchQuery(
        options as WatchQueryOptions<Variables<D, V>, Data<D>>
      )
    ).fetchMore({
      ...options,
      variables: (options.variables as Variables<D, V>) ?? undefined, /* c8 ignore next */
    }).then(x => {
      this.loading = false;
      this.notify('loading');
      return x;
    });
  }

  /**
   * @summary Start polling this query
   * @param ms milliseconds to wait between fetches
   */
  @bound public startPolling(ms: number): void {
    this.pollingInterval = window.setInterval(() => {
      this.refetch();
    }, ms);
  }

  /**
   * @summary Stop polling this query
   */
  @bound public stopPolling(): void {
    clearInterval(this.pollingInterval);
  }
}
