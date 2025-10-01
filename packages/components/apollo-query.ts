import type {
  ErrorPolicy,
  ObservableQuery,
  OperationVariables,
  ApolloClient,
  WatchQueryFetchPolicy,
} from '@apollo/client';

import type { Subscription } from 'rxjs';

import type {
  ComponentDocument,
  FetchMoreParams,
  Data,
  NextFetchPolicyFunction,
  Variables,
  VariablesOf,
} from '@apollo-elements/core/types';

import { GraphQLScriptChildMixin } from '@apollo-elements/mixins/graphql-script-child-mixin';

import { ApolloElement } from './apollo-element.js';

import {
  ApolloQueryController,
  ApolloQueryControllerOptions,
} from '@apollo-elements/core/apollo-query-controller';

import { NetworkStatus } from '@apollo/client';

import { controlled } from '@apollo-elements/core/decorators';

import { customElement, state, property } from '@lit/reactive-element/decorators.js';

import { bound } from '@apollo-elements/core/lib/bound';

declare global { interface HTMLElementTagNameMap { 'apollo-query': ApolloQueryElement } }

/**
 * Render a GraphQL query to the DOM
 *
 * @example <caption>Render a query to Shadow DOM</caption>
 * ```html
 *          <apollo-query>
 *            <script type="application/graphql">
 *              query MyProfile {
 *                profile { name picture }
 *              }
 *            </script>
 *            <template>
 *              <img loading="lazy" src="{{ data.profile.picture }}" alt="{{ data.profile.name }}"/>
 *            </template>
 *          </apollo-query>
 * ```
 *
 * @example <caption>Setting query and variables using the DOM</caption>
 * ```html
 *          <apollo-query id="query-element" template="avatar-template"></apollo-query>
 *
 *          <template id="avatar-template">
 *            <img loading="lazy" src="{{ data.profile.picture }}" alt="{{ data.profile.name }}"/>
 *          </template>
 *
 *          <script type="module">
 *            import { gql } from '@apollo/client';
 *            const el = document.getElementById('query-element');
 *            el.query = gql`
 *              query MyProfile($size: Int) {
 *                profile { name picture(size: $size) }
 *              }
 *            `;
 *            el.variables = { size: 48 };
 *          </script>
 * ```
 */
@customElement('apollo-query')
export class ApolloQueryElement<D = unknown, V = VariablesOf<D>>
  extends GraphQLScriptChildMixin(ApolloElement)<D, V> {
  static readonly is = 'apollo-query';

  controller = new ApolloQueryController<D, V>(this);

  /** @summary Flags an element that's ready and able to auto subscribe */
  @controlled({ readonly: true }) @state() canAutoSubscribe = false;

  @controlled() @state() options: ApolloQueryControllerOptions<D, V> = {
    // Default to 'all' error policy for UI components to prevent unhandled promise rejections
    // and allow graceful rendering of both data and errors in templates
    errorPolicy: 'all' as const,
  };

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
  @controlled() @state() networkStatus = NetworkStatus.ready;

  /**
   * @summary A GraphQL document containing a single query.
   */
  @controlled() @state() query: null | ComponentDocument<D, V> = null;

  /** @summary Context passed to the link execution chain. */
  @controlled({ path: 'options' }) @state() context?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

  /**
   * If data was read from the cache with missing fields,
   * partial will be true. Otherwise, partial will be falsy.
   *
   * @summary True when the query returned partial data.
   */
  @controlled() @state() partial = false;

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
  @controlled({ path: 'options' })
  @property({ type: Boolean, attribute: 'partial-refetch' })
    partialRefetch?: boolean;

  /**
   * @summary The time interval (in milliseconds) on which this query should be refetched from the server.
   */
  @controlled({ path: 'options' })
  @property({ type: Number, attribute: 'poll-interval' })
    pollInterval?: number;

  /**
   * Opt into receiving partial results from the cache for queries
   * that are not fully satisfied by the cache.
   */
  @controlled({ path: 'options' })
  @property({ type: Boolean, attribute: 'return-partial-data' })
    returnPartialData?: boolean;

  /**
   * When true, the component will not automatically subscribe to new data.
   * Call the `subscribe()` method to do so.
   * @attr no-auto-subscribe
   */
  @controlled({ path: 'options' })
  @property({ type: Boolean, attribute: 'no-auto-subscribe' })
    noAutoSubscribe = false;

  /**
   * @summary Whether or not updates to the network status should trigger next on the observer of this query.
   */
  @controlled({ path: 'options' })
  @property({ type: Boolean, attribute: 'notify-on-network-status-change' })
    notifyOnNetworkStatusChange = false;

  /**
   * errorPolicy determines the level of events for errors in the execution result. The options are:
   * - `none` (default): any errors from the request are treated like runtime errors and the observable is stopped (XXX this is default to lower breaking changes going from AC 1.0 => 2.0)
   * - `ignore`: errors from the request do not stop the observable, but also don't call `next`
   * - `all`: errors are treated like data and will notify observables
   * @summary [Error Policy](https://www.apollographql.com/docs/react/api/core/ApolloClient/#ErrorPolicy) for the query.
   * @attr error-policy
   */
  @controlled({ path: 'options' })
  @property({ attribute: 'error-policy' })
    errorPolicy?: ErrorPolicy;

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
  @controlled({ path: 'options' })
  @property({ attribute: 'fetch-policy' })
    fetchPolicy?: WatchQueryFetchPolicy;

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
  @controlled({ path: 'options' })
  @property({ attribute: 'next-fetch-policy' })
    nextFetchPolicy?: WatchQueryFetchPolicy | NextFetchPolicyFunction<D, V>;

  /**
   * Exposes the [`ObservableQuery#refetch`](https://www.apollographql.com/docs/react/api/apollo-client.html#ObservableQuery.refetch) method.
   *
   * @param variables The new set of variables. If there are missing variables, the previous values of those variables will be used..
   */
  @bound public async refetch(
    variables?: Variables<D, V>
  ) {
    return this.controller.refetch(variables);
  }

  /**
   * Resets the observableQuery and subscribes.
   * @param params options for controlling how the subscription subscribes
   */
  @bound public subscribe(
    params?: Partial<ApolloClient.WatchQueryOptions<Data<D>, Variables<D, V>>>
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
  @bound public subscribeToMore<TSubscriptionVariables extends OperationVariables, TSubscriptionData>(
    options: ObservableQuery.SubscribeToMoreOptions<Data<D>, TSubscriptionVariables, TSubscriptionData, Variables<D, V>>
  ): (() => void) | void {
    return this.controller.subscribeToMore(options);
  }

  /**
   * Executes a Query once and updates the with the result
   */
  @bound public async executeQuery(
    params?: Partial<ApolloClient.QueryOptions<Data<D>, Variables<D, V>>>
  ): Promise<ObservableQuery.Result<Data<D>>> {
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
  @bound public async fetchMore(
    params?: Partial<FetchMoreParams<D, V>>
  ): Promise<ObservableQuery.Result<Data<D>>> {
    return this.controller.fetchMore(params);
  }

  @bound public startPolling(ms: number): void {
    return this.controller.startPolling(ms);
  }

  @bound public stopPolling(): void {
    return this.controller.stopPolling();
  }
}
