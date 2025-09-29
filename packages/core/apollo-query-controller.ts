import type { ReactiveController, ReactiveControllerHost } from 'lit';

import type {
  ComponentDocument,
  Data,
  FetchMoreParams,
  Variables,
  VariablesOf,
} from '@apollo-elements/core/types';

import type {
  ApolloQueryResult,
  DocumentNode,
  ObservableQuery,
  OperationVariables,
  QueryOptions,
  RefetchWritePolicy,
  SubscribeToMoreOptions,
  SubscriptionOptions,
  WatchQueryFetchPolicy,
  WatchQueryOptions,
} from '@apollo/client';

import type { Subscription } from 'rxjs';

import { NetworkStatus } from '@apollo/client';

import { ApolloController, ApolloControllerOptions } from './apollo-controller.js';

import { bound } from './lib/bound.js';

export interface ApolloQueryControllerOptions<D, V = VariablesOf<D>> extends
    ApolloControllerOptions<D, V> {
  variables?: Variables<D, V>;
  noAutoSubscribe?: boolean;
  shouldSubscribe?: (options?: Partial<WatchQueryOptions<Variables<D, V>, Data<D>>>) => boolean;
  onData?: (data: Data<D>) => void;
  onError?: (error: Error) => void;
  fetchPolicy?: WatchQueryFetchPolicy;
  pollInterval?: number;
  nextFetchPolicy?: WatchQueryFetchPolicy;
  refetchWritePolicy?: RefetchWritePolicy;
}

export class ApolloQueryController<D, V = VariablesOf<D>>
  extends ApolloController<D, V> implements ReactiveController {
  private observableQuery?: ObservableQuery<Data<D>, Variables<D, V>>;

  private querySubscription?: Subscription;

  private pollingInterval?: number;

  /** @summary Options to customize the query and to interface with the controller. */
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
  get query(): ComponentDocument<D, V> | null { return this.document; }

  set query(document: ComponentDocument<D, V> | null) { this.document = document; }

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
    query?: ComponentDocument<D, V> | null,
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
    // Properly clean up the RxJS subscription to prevent unhandled promise rejections
    this.cleanupSubscription();
    super.hostDisconnected();
  }

  private cleanupSubscription(): void {
    if (this.querySubscription) {
      try {
        this.querySubscription.unsubscribe();
      } catch (error) {
        // Silently handle AbortError and other cancellation errors
        // These are expected when cleaning up ongoing operations
        if (error instanceof Error && error.name !== 'AbortError') {
          console.warn('Error during subscription cleanup:', error);
        }
      } finally {
        this.querySubscription = undefined;
      }
    }

    // Also properly cleanup the ObservableQuery to prevent ongoing operations
    if (this.observableQuery) {
      try {
        // Stop any polling operations
        this.observableQuery.stopPolling();
      } catch (error) {
        // Silently handle cleanup errors
        if (error instanceof Error && error.name !== 'AbortError') {
          console.warn('Error during ObservableQuery cleanup:', error);
        }
      }
    }
  }

  private shouldSubscribe(opts?: Partial<WatchQueryOptions<Variables<D, V>, Data<D>>>): boolean {
    return this.options.shouldSubscribe?.(opts) ?? true;/* c8 ignore next */
  }

  /**
   * Determines whether the element is able to automatically subscribe
   */
  private canSubscribe(
    options?: Partial<WatchQueryOptions<Variables<D, V>, Data<D>>>
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
      pollInterval: this.options.pollInterval,
      nextFetchPolicy: this.options.nextFetchPolicy,
      ...params,
    }) as ObservableQuery<Data<D>, Variables<D, V>>;
  }

  private nextData(result: ApolloQueryResult<Data<D>>): void {
    this.emitter.dispatchEvent(new CustomEvent('apollo-query-result', { detail: result }));
    const { data, error, errors, loading, networkStatus, partial } = this;
    this.data = (result.data as Data<D>) ?? null;
    this.error = result.error ?? null;/* c8 ignore next */
    this.errors = result.error ? [result.error] : [];
    this.loading = result.loading ?? false;/* c8 ignore next */
    this.networkStatus = result.networkStatus ?? NetworkStatus.ready;
    this.partial = result.partial ?? false;
    this.options.onData?.(this.data!);/* c8 ignore next */
    this.notify({ data, error, errors, loading, networkStatus, partial });
  }

  private nextError(error: Error): void {
    const { error: prevError, loading } = this;
    this.emitter.dispatchEvent(new CustomEvent('apollo-error', { detail: error }));
    this.error = error;
    this.loading = false;
    this.options.onError?.(error);/* c8 ignore next */
    this.notify({ error: prevError, loading });
  }

  protected override clientChanged(): void {
    if (this.canSubscribe() && this.shouldSubscribe())/* c8 ignore next */
      this.subscribe();/* c8 ignore next */
  }

  protected override documentChanged(doc?: ComponentDocument<D, V> | null): void {
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

  protected override optionsChanged(options: ApolloQueryControllerOptions<D, V>): void {
    // Apollo Client v4: reobserve() replaces setOptions()
    this.observableQuery?.reobserve(options);
  }

  /**
   * Exposes the [`ObservableQuery#refetch`](https://www.apollographql.com/docs/react/api/apollo-client.html#ObservableQuery.refetch) method.
   *
   * @param variables The new set of variables. If there are missing variables, the previous values of those variables will be used.
   */
  @bound public async refetch(variables?: Variables<D, V>): Promise<ApolloQueryResult<Data<D>>> {
    if (!this.observableQuery)
      throw new Error('Cannot refetch without an ObservableQuery'); /* c8 ignore next */ // covered
    try {
      return await this.observableQuery.refetch(variables as Variables<D, V>);
    } catch (error) {
      // Handle AbortError gracefully during cleanup
      if (error instanceof Error && error.name === 'AbortError') {
        // Return a minimal result instead of throwing
        return { data: this.data, loading: false, networkStatus: NetworkStatus.ready } as ApolloQueryResult<Data<D>>;
      }
      throw error;
    }
  }

  /**
   * Resets the observableQuery and subscribes.
   * @param params options for controlling how the subscription subscribes
   */
  @bound public subscribe(
    params?: Partial<WatchQueryOptions<Variables<D, V>, Data<D>>>
  ): Subscription {
    // Clean up any existing subscription to prevent leaks
    this.cleanupSubscription();

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
      refetchWritePolicy: this.options.refetchWritePolicy,
      ...params,
    });

    this.#lastQueryDocument = params?.query ?? this.query ?? undefined;/* c8 ignore next */

    const { loading } = this;
    this.loading = true;
    this.notify({ loading });

    // Immediately catch any internal Apollo Client promises
    // by using the observable's internal promise if available
    if ('then' in this.observableQuery) {
      (this.observableQuery as any).then?.(
        () => {},
        (error: Error) => {
          // Handle promise rejections from Apollo Client internals
          try {
            this.nextError(error);
          } catch {
            // Prevent further propagation
          }
        }
      );
    }

    // Store the subscription so we can properly clean it up later
    this.querySubscription = this.observableQuery.subscribe({
      next: this.nextData.bind(this),
      error: (error: Error) => {
        // Handle errors within the stream to prevent unhandled promise rejections
        try {
          // Silently handle AbortError during cleanup
          if (error instanceof Error && error.name === 'AbortError') {
            // AbortError is expected during cleanup, just clear the subscription
            this.querySubscription = undefined;
            return;
          }
          this.nextError(error);
        } catch (handlingError) {
          // If error handling itself fails, log but don't propagate
          console.warn('Error in error handler:', handlingError);
        }
      },
      complete: () => {
        // Handle completion to ensure clean termination
        this.querySubscription = undefined;
      }
    });

    return this.querySubscription;
  }

  /**
   * Lets you pass a GraphQL subscription and updateQuery function
   * to subscribe to more updates for your query.
   *
   * The `updateQuery` parameter is a function that takes the previous query data,
   * then a `{ subscriptionData: TSubscriptionResult }` object,
   * and returns an object with updated query data based on the new results.
   */
  @bound public subscribeToMore<TSubscriptionVariables extends OperationVariables, TSubscriptionData>(
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

      const { loading } = this;
      this.loading = true;
      this.notify({ loading });

      const result = await this.client.query({
        // It's better to let Apollo client throw this error, if needs be
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        query: this.query!, variables: this.variables!,
        context: this.options.context,
        errorPolicy: this.options.errorPolicy,
        fetchPolicy: this.options.fetchPolicy,
        // removed deprecated options for Apollo Client v4
        ...params,
      });
      if (result) // NB: not sure why, but sometimes this returns undefined
        this.nextData(result as ApolloQueryResult<Data<D>>);
      return result as ApolloQueryResult<Data<D>>;/* c8 ignore next */
    } catch (error) {
      // Handle AbortError gracefully during cleanup
      if (error instanceof Error && error.name === 'AbortError') {
        // AbortError is expected during cleanup, just reset loading state
        const { loading } = this;
        this.loading = false;
        this.notify({ loading }); // notify of the change
        return { data: null, loading: false, networkStatus: NetworkStatus.ready } as ApolloQueryResult<Data<D>>;
      }
      this.nextError(error as Error);
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
  @bound public async fetchMore<TD = this['data'], TV = this['variables']>(
    params?: Partial<FetchMoreParams<TD, TV>>
  ): Promise<ApolloQueryResult<Data<TD>>> {
    const { loading } = this;
    this.loading = true;
    this.notify({ loading });

    const options = {
      // It's better to let Apollo client throw this error
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      query: this.query!,
      context: this.options.context,
      variables: this.variables ?? undefined,
      ...params,
    };

    options.variables ??= undefined;

    this.observableQuery ??=
      this.watchQuery(options);

    return (this.observableQuery)
      .fetchMore(options)
      .then((x: any) => {
        const { loading } = this;
        this.loading = false;
        this.notify({ loading });
        return x as ApolloQueryResult<Data<TD>>;
      })
      .catch((error: Error) => {
        // Handle AbortError gracefully during cleanup
        if (error.name === 'AbortError') {
          const { loading } = this;
          this.loading = false;
          this.notify({ loading });
          return { data: this.data, loading: false, networkStatus: NetworkStatus.ready } as ApolloQueryResult<Data<TD>>;
        }
        throw error;
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
