import type { ReactiveController, ReactiveControllerHost } from 'lit';

import type {
  ComponentDocument,
  Data,
  FetchMoreParams,
  MaybeTDN,
  MaybeVariables,
  Variables,
} from '@apollo-elements/interfaces';

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

import { ApolloController, ApolloControllerOptions } from './apollo-controller';

import { bound } from '@apollo-elements/lib/bound';

export interface ApolloQueryControllerOptions<D, V> extends
    ApolloControllerOptions<D, V>,
    Partial<WatchQueryOptions<Variables<D, V>, Data<D>>> {
  variables?: Variables<D, V>,
  noAutoSubscribe?: boolean;
  shouldSubscribe?: (options?: Partial<SubscriptionOptions<Variables<D, V>, Data<D>>>) => boolean;
  onData?: (data: Data<D>) => void;
  onError?: (error: ApolloError) => void;
}

export class ApolloQueryController<D extends MaybeTDN = any, V = MaybeVariables<D>>
  extends ApolloController<D, V>
  implements ReactiveController {
  private observableQuery?: ObservableQuery<Data<D>, Variables<D, V>>;

  private pollingInterval?: number;

  declare options: ApolloQueryControllerOptions<D, V>;

  networkStatus = NetworkStatus.ready;

  partial = false;

  #hasDisconnected = false;

  #lastQueryDocument?: DocumentNode;

  get query(): ComponentDocument<D> | null { return this.document; }

  set query(document: ComponentDocument<D> | null) { this.document = document; }

  constructor(
    host: ReactiveControllerHost,
    query?: ComponentDocument<D> | null,
    options?: ApolloQueryControllerOptions<D, V>
  ) {
    super(host, options);
    this.init(query ?? null);
  }

  hostConnected(): void {
    super.hostConnected();
    if (this.#hasDisconnected && this.observableQuery) {
      this.observableQuery.reobserve();
      this.#hasDisconnected = false;
    } else
      this.documentChanged(this.query);
  }

  hostDisconnected(): void {
    this.#hasDisconnected = true;
    super.hostDisconnected();
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
    });
  }

  private nextData(result: ApolloQueryResult<Data<D>>): void {
    this.data = result.data;
    this.error = result.error ?? null;
    this.errors = result.errors ?? [];
    this.loading = result.loading;
    this.networkStatus = result.networkStatus;
    this.partial = result.partial ?? false;
    this.options.onData?.(result.data);
    this.notify('data', 'error', 'errors', 'loading', 'networkStatus', 'partial');
  }

  private nextError(error: ApolloError): void {
    this.error = error;
    this.loading = false;
    this.options.onError?.(error);
    this.notify('error', 'loading');
  }

  protected documentChanged(doc?: ComponentDocument<D> | null): void {
    const query = doc ?? undefined;
    if (doc === this.#lastQueryDocument)
      return;
    if (
      this.canSubscribe({ query }) &&
      (this.options.shouldSubscribe?.({ query }) ?? true)
    )
      this.subscribe({ query }); /* c8 ignore next */ // covered
  }

  protected variablesChanged(variables?: Variables<D, V>): void {
    if (this.observableQuery)
      this.refetch(variables);
    else if (
      this.canSubscribe({ variables }) &&
      (this.options.shouldSubscribe?.({ variables }) ?? true)
    )
      this.subscribe({ variables });
  }

  /** Flags an element that's ready and able to auto-subscribe */
  public get canAutoSubscribe(): boolean {
    return (
      !!this.client &&
      !this.options.noAutoSubscribe &&
      (this.options?.shouldSubscribe?.() ?? true)
    );
  }

  /**
   * Exposes the [`ObservableQuery#refetch`](https://www.apollographql.com/docs/react/api/apollo-client.html#ObservableQuery.refetch) method.
   *
   * @param variables The new set of variables. If there are missing variables, the previous values of those variables will be used..
   */
  @bound public async refetch(variables?: Variables<D, V>): Promise<ApolloQueryResult<Data<D>>> {
    if (!this.observableQuery)
      throw new Error('Cannot refetch without an ObservableQuery'); /* c8 ignore next */ // covered
    return this.observableQuery.refetch(variables);
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

    this.#lastQueryDocument = params?.query ?? this.query ?? undefined;

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
   * Executes a Query once and updates the with the result
   */
  @bound public async executeQuery(
    params?: Partial<QueryOptions<Variables<D, V>>>
  ): Promise<ApolloQueryResult<Data<D>>> {
    try {
      if (!this.client)
        throw new TypeError('No Apollo client. See https://apolloelements.dev/guides/getting-started/apollo-client/'); /* c8 ignore next */ // covered

      this.loading = true;
      this.notify('loading');

      const result = await this.client.query({
        // It's better to let Apollo client throw this error
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        query: this.query!,
        variables: this.variables,
        context: this.options.context,
        errorPolicy: this.options.errorPolicy,
        fetchPolicy:
            this.options.fetchPolicy === 'cache-and-network' ? undefined
          : this.options.fetchPolicy,
        notifyOnNetworkStatusChange: this.options.notifyOnNetworkStatusChange,
        partialRefetch: this.options.partialRefetch,
        returnPartialData: this.options.returnPartialData,
        ...params,
      });
      if (result) // NB: not sure why, but sometimes this returns undefined
        this.nextData(result);
      return result;
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
      variables: options.variables ?? undefined,
    }).then(x => {
      this.loading = false;
      this.notify('loading');
      return x;
    });
  }

  @bound public startPolling(ms: number): void {
    this.pollingInterval = window.setInterval(() => {
      this.refetch();
    }, ms);
  }

  @bound public stopPolling(): void {
    clearInterval(this.pollingInterval);
  }
}
