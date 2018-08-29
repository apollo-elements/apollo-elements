export { html } from './apollo-element.js';
import { ApolloElement } from './apollo-element.js';

import gqlFromInnerText from './lib/gql-from-inner-text.js';
import hasAllVariables from './lib/has-all-variables.js';
import validGql from './lib/valid-gql.js';

const scriptSelector = 'script[type="application/graphql"]';

/** @typedef {"none" | "ignore" | "all"} ErrorPolicy */
/** @typedef {"cache-first" | "cache-and-network" | "network-only" | "cache-only" | "no-cache" | "standby"} FetchPolicy */

/**
 * # ApolloQuery
 *
 * 🚀 A custom element base class that connects to your Apollo cache.
 *
 * ## Usage
 *
 * ```html
 * <script type="module">
 *   import { cache } from './cache';
 *   import { link } from './link';
 *   import { ApolloClient } from 'apollo-client';
 *   import { ApolloQuery, html } from 'lit-apollo/apollo-query';
 *
 *   // Create the Apollo Client
 *   const client = new ApolloClient({ cache, link });
 *
 *   class ConnectedElement extends ApolloQuery {
 *     _render({ data, loading, error, networkStatus }) {
 *      return (
 *          loading ? html`
 *            <what-spin></what-spin>`
 *        : error ? html`
 *            <h1>😢 Such sad, very error!</h1>
 *            <div>${error.message}</div>`
 *        : html`
 *            <div>${data.helloWorld.greeting}, ${data.helloWorld.name}</div>`
 *      );
 *     }
 *
 *     constructor() {
 *       super();
 *       this.client = client;
 *       this.query = gql`query {
 *         helloWorld {
 *           name
 *           greeting
 *         }
 *       }`;
 *     }
 *   };
 *
 *   customElements.define('connected-element', ConnectedElement)
 * </script>
 * ```
 *
 * @type {Class}
 * @extends ApolloElement
 * @extends LitElement
 * @extends HTMLElement
 */
export class ApolloQuery extends ApolloElement {
  static get properties() {
    return {
      /** @type {Number} Enum of network statuses. See https://bit.ly/2sfKLY0 */
      networkStatus: Object,
    };
  }

  /** @type {DocumentNode} A GraphQL document that consists of a single query to be sent down to the server. */
  get query() {
    return this.__query || gqlFromInnerText(this.querySelector(scriptSelector));
  }

  set query(query) {
    this.__query = query;
    if (query == null) return;
    const valid = validGql(query);
    const variables = this.__variables;
    if (!valid) throw new Error('Query must be a gql-parsed document');
    this.subscribe({ query, variables });
  }

  /** @type {Object} An object map from variable name to variable value, where the variables are used within the GraphQL query. */
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

  constructor() {
    super();
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
     * Variables used in the query.
     * @type {Object}
     */
    this.variables = undefined;
    /**
     * Apollo Query Object. e.g. gql`query { foo { bar } }`
     * @type {DocumentNode}
     */
    this.query = undefined;
    /**
     * Try and fetch new results even if the variables haven't changed (we may still just hit the store, but if there's nothing in there will refetch).
     * @type {Boolean}
     */
    this.tryFetch = undefined;
    /**
     * The apollo ObservableQuery watching this element's query.
     * @type {ZenObservable}
     */
    this.observableQuery = undefined;
  }

  /**
   * By default, will only render if
   *   - The component has `data` or
   *   - The component has an `error` or
   *   - The component is `loading`.
   * @param  {Object}  props               Element's observed properties.
   * @param  {Object}  changed             Changed properties.
   * @param  {Object}  old                 Previous properties.
   * @param  {Object}  props.data          Latest data from the query subscription.
   * @param  {Error}   props.error         Latest error from the query subscription.
   * @param  {Boolean} props.loading       Whether the component is loading new data.
   * @param  {Number}  props.networkStatus Apollo query network status. https://bit.ly/2sfKLY0.
   * @return {Boolean}                     Whether the component should render.
   * @protected
   */
  _shouldRender({ data, error, loading, networkStatus }, changed, old) {
    return !!data || !!error || loading != null;
  }

  /**
   * Exposes the [`ObservableQuery#setOptions`](https://www.apollographql.com/docs/react/api/apollo-client.html#ObservableQuery.setOptions) method.
   * @param {ModifiableWatchQueryOptions} options [options](https://www.apollographql.com/docs/react/api/apollo-client.html#ModifiableWatchQueryOptions) object.
   * @return {Promise<ApolloQueryResult>}
   */
  setOptions(options) {
    return this.observableQuery && this.observableQuery.setOptions(options);
  }

  /**
   * Exposes the [`ObservableQuery#setVariables`](https://www.apollographql.com/docs/react/api/apollo-client.html#ObservableQuery.setVariables) method.
   * @param {Object}  variables                        The new set of variables. If there are missing variables, the previous values of those variables will be used.
   * @param {Boolean} [tryFetch=this.tryFetch]         Try and fetch new results even if the variables haven't changed (we may still just hit the store, but if there's nothing in there will refetch).
   * @param {Boolean} [fetchResults=this.fetchResults] Option to ignore fetching results when updating variables.
   * @return {Promise<ApolloQueryResult>}
   */
  setVariables(variables, tryFetch = this.tryFetch, fetchResults = this.fetchResults) {
    return this.observableQuery &&
    this.observableQuery.setVariables(variables, tryFetch, fetchResults);
  }

  /**
   * Resets the observableQuery and subscribes.
   * @param  {DocumentNode}               [query=this.query]
   * @param  {Object}                     [variables=this.variables]
   * @return {ZenObservable.Subscription}
   */
  async subscribe({ query = this.query, variables = this.variables }) {
    if (!hasAllVariables({ query, variables })) return;
    this.observableQuery = this.watchQuery({ query, variables });
    return this.observableQuery.subscribe({
      next: this.nextData.bind(this),
      error: this.nextError.bind(this),
    });
  }

  /**
   * Executes a Query once and updates the component with the result
   * @return {Promise<ApolloQueryResult>}
   */
  executeQuery() {
    const {
      context,
      errorPolicy,
      fetchPolicy,
      fetchResults,
      metadata,
      query,
      variables,
    } = this;
    const queryPromise = this.client.query({
      context,
      errorPolicy,
      fetchPolicy,
      fetchResults,
      metadata,
      query,
      variables,
    });

    queryPromise
      .then(this.nextData.bind(this))
      .catch(this.nextError.bind(this));

    return queryPromise;
  }

  /**
   * Exposes the `ObservableQuery#fetchMore` method.
   * https://www.apollographql.com/docs/react/api/apollo-client.html#ObservableQuery.fetchMore
   * @param  {fetchMoreOptions} options
   * @param  {DocumentNode} [options.query=this.query] The Query.
   * @param  {Function} options.updateQuery            Function that defines how to update the query data with the new results.
   * @param  {Object} options.variables                New variables. Any variables not provided will be filled-in using the previous variables.
   * @return {Promise<ApolloQueryResult>}
   */
  fetchMore({ query = this.query, updateQuery, variables }) {
    return (
      this.observableQuery &&
      this.observableQuery.fetchMore({ query, updateQuery, variables })
    );
  }

  /**
   * Creates an instance of ObservableQuery with the options provided by the element.
   * @param  {Object}       options
   * @param  {any}          [options.context=this.context]                                          Context to be passed to link execution chain
   * @param  {ErrorPolicy}  [options.errorPolicy=this.errorPolicy]                                  Specifies the ErrorPolicy to be used for this query
   * @param  {FetchPolicy}  [options.fetchPolicy=this.fetchPolicy]                                  Specifies the FetchPolicy to be used for this query
   * @param  {Boolean}      [options.fetchResults=this.fetchResults]                                Whether or not to fetch results
   * @param  {any}          [options.metadata=this.metadata]                                        Arbitrary metadata stored in the store with this query. Designed for debugging, developer tools, etc.
   * @param  {Boolean}      [options.notifyOnNetworkStatusChange=this.notifyOnNetworkStatusChange]  Whether or not updates to the network status should trigger next on the observer of this query
   * @param  {Number}       [options.pollInterval=this.pollInterval]                                The time interval (in milliseconds) on which this query should be refetched from the server.
   * @param  {DocumentNode} [options.query=this.query]                                              A GraphQL document that consists of a single query to be sent down to the server.
   * @param  {Object}       [options.variables=this.variables]                                      A map going from variable name to variable value, where the variables are used within the GraphQL query.
   * @return {ObservableQuery}
   * @protected
   */
  watchQuery({
    context = this.context,
    errorPolicy = this.errorPolicy,
    fetchPolicy = this.fetchPolicy,
    fetchResults = this.fetchResults,
    metadata = this.metadata,
    notifyOnNetworkStatusChange = this.notifyOnNetworkStatusChange,
    pollInterval = this.pollInterval,
    query = this.query,
    variables = this.variables,
  } = {}) {
    return this.client.watchQuery({
      context,
      errorPolicy,
      fetchPolicy,
      fetchResults,
      metadata,
      notifyOnNetworkStatusChange,
      pollInterval,
      query,
      variables,
    });
  }

  /**
   * Updates the element with the result of a query.
   * @param  {ApolloQueryResult} result The result of the query.
   * @param  {Object}  result.data          The data from the query.
   * @param  {Boolean} result.loading       Whether the query is loading.
   * @param  {Number}  result.networkStatus The networkStatus of the query.
   * @param  {Boolean} result.stale         Whether the query is stale.
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
   * @param  {Error} error
   * @protected
   */
  nextError(error) {
    this.error = error;
  }
}
