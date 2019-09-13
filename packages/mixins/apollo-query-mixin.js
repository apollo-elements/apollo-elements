import { ApolloElementMixin } from './apollo-element-mixin.js';
import { stripUndefinedValues } from '@apollo-elements/lib/helpers.js';
import { dedupeMixin } from './dedupe-mixin.js';
import hasAllVariables from '@apollo-elements/lib/has-all-variables.js';
import pick from 'crocks/helpers/pick';
import compose from 'crocks/helpers/compose';

/** @typedef {import('apollo-client').ApolloError} ApolloError */
/** @typedef {import('apollo-client').ApolloQueryResult} ApolloQueryResult */
/** @typedef {import('apollo-client').ErrorPolicy} ErrorPolicy */
/** @typedef {import('apollo-client').FetchMoreQueryOptions} FetchMoreQueryOptions */
/** @typedef {import('apollo-client').FetchPolicy} FetchPolicy */
/** @typedef {import('apollo-client').ObservableQuery} ObservableQuery */
/** @typedef {import('apollo-client').QueryOptions} QueryOptions */
/** @typedef {import('apollo-client').SubscribeToMoreOptions} SubscribeToMoreOptions */
/** @typedef {import('apollo-client').SubscriptionOptions} SubscriptionOptions */
/** @typedef {import('apollo-client').WatchQueryOptions} WatchQueryOptions */
/** @typedef {import('apollo-client/core/watchQueryOptions').ModifiableWatchQueryOptions} ModifiableWatchQueryOptions */
/** @typedef {import('graphql').DocumentNode} DocumentNode */
/** @typedef {import('zen-observable')} Observable */

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
);

const pickOpts = compose(
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
);

/**
 * `ApolloQueryMixin`: class mixin for apollo-query elements.
 *
 * @polymer
 * @mixinFunction
 * @appliesMixin ApolloElementMixin
 *
 * @param {*} superclass
 * @return {ApolloQueryMixin~mixin}
 */
export const ApolloQueryMixin = dedupeMixin(superclass =>
  /**
   * Class mixin for apollo-query elements
   * @mixin
   * @template TCacheShape
   * @template TData
   * @template TVariables
   * @alias ApolloQueryMixin~mixin
   * @inheritdoc
   */
  class extends ApolloElementMixin(superclass) {
    /**
     * A GraphQL document containing a single query.
     *
     * @return {DocumentNode}
     */
    get query() {
      return this.document;
    }

    set query(query) {
      try {
        this.document = query;
      } catch (error) {
        throw new TypeError('Query must be a gql-parsed DocumentNode');
      }

      if (!this.noAutoSubscribe && query) {
        this.subscribe({ query, variables: this.variables });
      }
    }

    /**
     * An object map from variable name to variable value, where the variables are used within the GraphQL query.
     *
     * @return {TVariables}
     */
    get variables() {
      return this.__variables;
    }

    set variables(variables) {
      this.__variables = variables;
      const query = this.__query;
      this.observableQuery
        ? this.setVariables(variables)
        : this.subscribe({ query, variables });
    }

    /**
     * Exposes the [`ObservableQuery#setOptions`](https://www.apollographql.com/docs/react/api/apollo-client.html#ObservableQuery.setOptions) method.
     *
     * @return {ModifiableWatchQueryOptions<TVariables>} options [options](https://www.apollographql.com/docs/react/api/apollo-client.html#ModifiableWatchQueryOptions) object.
     */
    get options() {
      return this.__options;
    }

    set options(options) {
      this.__options = options;
      this.observableQuery && this.observableQuery.setOptions(options);
    }

    constructor() {
      super();
      this.nextData = this.nextData.bind(this);
      this.nextError = this.nextError.bind(this);

      /**
       * Specifies the ErrorPolicy to be used for this query.
       * @type {ErrorPolicy}
       */
      this.errorPolicy = 'none';

      /**
       * Specifies the FetchPolicy to be used for this query.
       * @type {FetchPolicy}
       */
      this.fetchPolicy = 'cache-first';

      /**
       * Whether or not to fetch results.
       * @type {Boolean}
       */
      this.fetchResults = undefined;

      /**
       * The time interval (in milliseconds) on which this query should be refetched from the server.
       * @type {Number}
       */
      this.pollInterval = undefined;

      /**
       * Whether or not updates to the network status should trigger next on the observer of this query.
       * @type {Boolean}
       */
      this.notifyOnNetworkStatusChange = undefined;

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
       *
       * @return {1|2|3|4|5|6|7|8}
       */
      this.networkStatus;

      /**
       * Try and fetch new results even if the variables haven't changed (we may still just hit the store, but if there's nothing in there will refetch).
       * @type {Boolean}
       */
      this.tryFetch = undefined;

      /**
       * The apollo ObservableQuery watching this element's query.
       * @type {ObservableQuery<TData, TVariables>}
       */
      this.observableQuery;

      /**
       * @type {ApolloClient<TCacheShape>}
       */
      this.client;
    }

    /** @protected */
    connectedCallback() {
      super.connectedCallback && super.connectedCallback();
      if (this.query) this.subscribe();
    }

    /**
     * Exposes the [`ObservableQuery#refetch`](https://www.apollographql.com/docs/react/api/apollo-client.html#ObservableQuery.refetch) method.
     *
     * @param  {TVariables} variables The new set of variables. If there are missing variables, the previous values of those variables will be used..
     * @return {Promise<ApolloQueryResult<TData>>}
     */
    refetch(...args) {
      return (
        this.observableQuery &&
        this.observableQuery.refetch(...args)
      );
    }

    /**
     * Exposes the [`ObservableQuery#setVariables`](https://www.apollographql.com/docs/react/api/apollo-client.html#ObservableQuery.setVariables) method.
     *
     * @deprecated: This method on ObservableQuery is meant to be private. It will be removed.
     * @param {TVariables}   variables      The new set of variables. If there are missing variables, the previous values of those variables will be used.
     * @param {boolean} [tryFetch=this.tryFetch]       Try and fetch new results even if the variables haven't changed (we may still just hit the store, but if there's nothing in there will refetch).
     * @param {boolean} [fetchResults=this.fetchResults]   Option to ignore fetching results when updating variables.
     * @return {Promise<ApolloQueryResult<TData>>}
     */
    setVariables(variables, tryFetch = this.tryFetch, fetchResults = this.fetchResults) {
      return (
        this.observableQuery &&
        this.observableQuery.setVariables(variables, tryFetch, fetchResults)
      );
    }

    /**
     * Resets the observableQuery and subscribes.
     *
     * @param  {SubscriptionOptions<TVariables>} [params={}]
     * @return {Promise<ZenObservable.Observer<ApolloQueryResult<TData>>>}
     */
    async subscribe({ query = this.query, variables = this.variables } = {}) {
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
     *
     * @param  {SubscribeToMoreOptions<TData, TVariables>} options
     * @return {function(): void}
     */
    subscribeToMore(options) {
      return (
        this.observableQuery &&
        this.observableQuery.subscribeToMore(options)
      );
    }

    /**
     * Executes a Query once and updates the component with the result
     *
     * @param {QueryOptions<TVariables>} [options=this]
     * @return {Promise<ApolloQueryResult<TData>>}
     */
    executeQuery({
      query = this.query,
      variables = this.variables,
      ...options
    } = this) {
      const opts = pickExecuteQueryOpts({ ...this, ...options, query, variables });

      const queryPromise =
        this.client
          .query(opts)
          .catch(this.nextError.bind(this));

      queryPromise.then(this.nextData.bind(this));

      return queryPromise;
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
     *
     * @param  {FetchMoreQueryOptions<TVariables>} [params={}]
     * @return {Promise<ApolloQueryResult<TData>>}
     */
    fetchMore({ query = this.query, updateQuery, variables } = {}) {
      return (
        this.observableQuery &&
        this.observableQuery.fetchMore({ query, updateQuery, variables })
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
     *
     * @param  {WatchQueryOptions<TVariables>}       [options=this]
     *
     * @return {ObservableQuery<TData, TVariables>}
     * @protected
     */
    watchQuery({
      query = this.query,
      variables = this.variables,
      ...options
    } = this) {
      const opts = pickOpts({ ...this, ...options, query, variables });
      return this.client.watchQuery(opts);
    }

    /**
     * Updates the element with the result of a query.
     *
     * @param  {ApolloQueryResult<TData>} result The result of the query.
     * @param  {TData}  result.data          The data from the query.
     * @param  {boolean} result.loading       Whether the query is loading.
     * @param  {number}  result.networkStatus The networkStatus of the query.
     * @param  {boolean} result.stale         Whether the query is stale.
     * @protected
     */
    nextData({ data, loading, networkStatus, stale }) {
      this.data = data;
      this.loading = loading;
      this.networkStatus = networkStatus;
      this.stale = stale;
    }

    /**
     * Updates the element with the error when the query fails.
     *
     * @param  {Error} error
     * @protected
     */
    nextError(error) {
      this.error = error;
    }
  });
