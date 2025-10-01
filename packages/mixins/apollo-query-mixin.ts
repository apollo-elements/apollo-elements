import type * as C from '@apollo/client';
import type { Subscription } from 'rxjs';

import type {
  ComponentDocument,
  Constructor,
  Data,
  FetchMoreParams,
  NextFetchPolicyFunction,
  Variables,
  VariablesOf,
} from '@apollo-elements/core/types';

import type { ApolloQueryElement } from '@apollo-elements/core/types';

import { NetworkStatus } from '@apollo/client';

import { ApolloElementMixin } from './apollo-element-mixin';
import { dedupeMixin } from '@open-wc/dedupe-mixin';
import { controlled } from '@apollo-elements/core/decorators';

import {
  ApolloQueryController,
  ApolloQueryControllerOptions,
} from '@apollo-elements/core/apollo-query-controller';

type MixinInstance<B extends Constructor> = B & {
  new <D, V = VariablesOf<D>>(
    // mixins are notoriously hard to type in ts.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...a: any[]
  ): InstanceType<B> & ApolloQueryElement<D, V>;
  documentType: 'query',
}

/**
 * `ApolloQueryMixin`: class mixin for apollo-query elements.
 */
function ApolloQueryMixinImpl<B extends Constructor>(superclass: B): MixinInstance<B> {
  class ApolloQueryElement<D = unknown, V = VariablesOf<D>>
    extends ApolloElementMixin(superclass)<D, V> {
    static override documentType = 'query' as const;

    static override get observedAttributes(): string[] {
      return [
        ...super.observedAttributes as string[],
        'next-fetch-policy',
        'no-auto-subscribe',
      ];
    }

    controller = new ApolloQueryController<D, V>(this, null, {
      shouldSubscribe: x => this.readyToReceiveDocument && this.shouldSubscribe(x),
      onData: data => this.onData?.(data),  // covered
      onError: error => this.onError?.(error),  // covered
    });

    /** @summary The latest query data. */
    declare data: Data<D> | null;

    /**
     * An object map from variable name to variable value, where the variables are used within the GraphQL query.
     *
     * Setting variables will initiate the query, unless [`noAutoSubscribe`](#noautosubscribe) is also set.
     *
     * @summary Query variables.
     */
    declare variables: Variables<D, V> | null;

    get options(): ApolloQueryControllerOptions<D, V> {
      return this.controller.options;
    }

    set options(options: ApolloQueryControllerOptions<D, V>) {
      const { onData, onError } = this.controller.options;
      this.controller.options = {
        ...options,
        onData,
        onError,
      };
    }

    /**
     * If data was read from the cache with missing fields,
     * partial will be true. Otherwise, partial will be falsy.
     *
     * @summary True when the query returned partial data.
     */
    @controlled({ readonly: true }) readonly partial = false;

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
    @controlled() networkStatus: NetworkStatus = NetworkStatus.ready;

    /** @summary A GraphQL document containing a single query. */
    @controlled() query: ComponentDocument<D, V> | null = null;

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
    @controlled({ path: 'options' }) fetchPolicy?: C.WatchQueryFetchPolicy;

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
    @controlled({ path: 'options' }) partialRefetch?: boolean;

    /**
     * Opt into receiving partial results from the cache for queries
     * that are not fully satisfied by the cache.
     */
    @controlled({ path: 'options' }) returnPartialData?: boolean;

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
    @controlled({
      path: 'options',
      onSet(this: ApolloQueryElement, value: ApolloQueryElement['nextFetchPolicy']) {
        if (value && typeof value !== 'function')
          this.setAttribute('next-fetch-policy', value);  // covered
        else
          this.removeAttribute('next-fetch-policy');
      },
    })
      nextFetchPolicy?: C.WatchQueryFetchPolicy | NextFetchPolicyFunction<D, V>;

    /**
     * When true, the component will not automatically subscribe to new data.
     * Call the `subscribe()` method to do so.
     * @attr no-auto-subscribe
     */
    @controlled({
      path: 'options',
      onSet(this: ApolloQueryElement, value: ApolloQueryElement['noAutoSubscribe']) {
        this.toggleAttribute('no-auto-subscribe', !!value);
      },
    })
      noAutoSubscribe = this.hasAttribute('no-auto-subscribe');

    /**
     * @summary Whether or not updates to the network status should trigger next on the observer of this query.
     */
    @controlled({ path: 'options' }) notifyOnNetworkStatusChange?: boolean;

    /** @summary The time interval (in milliseconds) on which this query should be refetched from the server. */
    @controlled({ path: 'options' }) pollInterval?: number;

    /**
     * Optional callback for when a query is completed.
     * @param data the query data.
     */
    onData?(data: Data<D>): void

    /**
     * Optional callback for when an error occurs.
     * @param error the error.
     */
    onError?(error: Error): void

    /** @summary Flags an element that's ready and able to auto subscribe */
    @controlled({ readonly: true }) readonly canAutoSubscribe = true;

    override attributeChangedCallback(name: string, oldVal: string, newVal: string): void {
      super.attributeChangedCallback?.(name, oldVal, newVal);
      // @ts-expect-error: ts is not tracking the static side
      if (super.constructor?.observedAttributes?.includes?.(name))
        return;  // covered

      switch (name) {  // covered
        case 'next-fetch-policy':
          // to allow for case where this.nextFetchPolicy is undefined

          if (this.nextFetchPolicy != newVal)
            this.nextFetchPolicy = newVal as C.WatchQueryFetchPolicy;  // covered
          break;
        case 'no-auto-subscribe':
          this.noAutoSubscribe = newVal != null;
      }
    }

    /**
     * Exposes the [`ObservableQuery#refetch`](https://www.apollographql.com/docs/react/api/apollo-client.html#ObservableQuery.refetch) method.
     *
     * @param variables The new set of variables. If there are missing variables, the previous values of those variables will be used..
     */
    async refetch(variables: Variables<D, V>) {
      return this.controller.refetch(variables);
    }

    /**
     * Determines whether the element should attempt to automatically subscribe i.e. begin querying
     *
     * Override to prevent subscribing unless your conditions are met.
     */
    shouldSubscribe(
      options?: Partial<C.ApolloClient.WatchQueryOptions<Data<D>, Variables<D, V>>>
    ): boolean {
      return (void options, true);
    }

    /**
     * Resets the observableQuery and subscribes.
     * @param params options for controlling how the subscription subscribes
     */
    subscribe(
      params?: Partial<C.ApolloClient.WatchQueryOptions<Data<D>, Variables<D, V>>>
    ): Subscription {
      return this.controller.subscribe(params);
    }

    /**
     * Lets you pass a GraphQL subscription and updateQuery function
     * to subscribe to more updates for your query.
     *
     * The `updateQuery` parameter is a function that takes the previous query data,
     * then a `{ subscriptionData: TSubscriptionResult }` object,
     * and returns an object with updated query data based on the new results.
     */
    subscribeToMore<TSubscriptionVariables extends C.OperationVariables, TSubscriptionData>(
      options: C.ObservableQuery.SubscribeToMoreOptions<Data<D>, TSubscriptionVariables, TSubscriptionData, Variables<D, V>>
    ): void | (() => void) {
      return this.controller.subscribeToMore(options);
    }

    /**
     * Executes a Query once and updates the component with the result
     */
    async executeQuery(
      params?: Partial<C.ApolloClient.QueryOptions<Data<D>, Variables<D, V>>> | undefined
    ): Promise<C.ObservableQuery.Result<Data<D>>> {
      return this.controller.executeQuery(params);
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
    async fetchMore(
      params?: Partial<FetchMoreParams<D, V>> | undefined
    ): Promise<C.ObservableQuery.Result<Data<D>>> {
      return this.controller.fetchMore(params);
    }
  }

  return ApolloQueryElement as unknown as MixinInstance<B>;
}


export const ApolloQueryMixin =
  dedupeMixin(ApolloQueryMixinImpl);
