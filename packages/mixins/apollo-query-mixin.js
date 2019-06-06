import { ApolloElementMixin } from './apollo-element-mixin.js';
import { stripUndefinedValues } from '@apollo-elements/lib/helpers.js';
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
export const ApolloQueryMixin = superclass =>
  /**
   * Class mixin for apollo-query elements
   * @mixin
   * @template TData
   * @template TVariables
   * @alias ApolloQueryMixin~mixin
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
     * @return {Object<string, *>}
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
     * @return {ModifiableWatchQueryOptions} options [options](https://www.apollographql.com/docs/react/api/apollo-client.html#ModifiableWatchQueryOptions) object.
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
       * Try and fetch new results even if the variables haven't changed (we may still just hit the store, but if there's nothing in there will refetch).
       * @type {Boolean}
       */
      this.tryFetch = undefined;

      /**
       * The apollo ObservableQuery watching this element's query.
       * @type {ObservableQuery}
       */
      this.observableQuery;
    }

    /** @protected */
    connectedCallback() {
      super.connectedCallback && super.connectedCallback();
      if (this.query) this.subscribe();
    }

    /**
     * Exposes the [`ObservableQuery#refetch`](https://www.apollographql.com/docs/react/api/apollo-client.html#ObservableQuery.refetch) method.
     *
     * @param  {Object} variables The new set of variables. If there are missing variables, the previous values of those variables will be used..
     * @return {Promise<ApolloQueryResult>}
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
     * @param {Object}   variables      The new set of variables. If there are missing variables, the previous values of those variables will be used.
     * @param {boolean=} tryFetch       Try and fetch new results even if the variables haven't changed (we may still just hit the store, but if there's nothing in there will refetch).
     * @param {boolean=} fetchResults   Option to ignore fetching results when updating variables.
     * @return {Promise<ApolloQueryResult>}
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
     * @param  {SubscriptionOptions=} params
     * @return {Promise<ZenObservable.Observer<ApolloQueryResult>>}
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
     * @param  {SubscribeToMoreOptions=} options
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
     * @param {QueryOptions} options
     * @return {Promise<ApolloQueryResult>}
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
     * @param  {FetchMoreQueryOptions=} params
     * @return {Promise<ApolloQueryResult>}
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
     * @param  {WatchQueryOptions=}       options
     *
     * @return {ObservableQuery}
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
     * @param  {ApolloQueryResult} result The result of the query.
     * @param  {Object}  result.data          The data from the query.
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
  };
