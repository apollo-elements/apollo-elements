import gql from 'graphql-tag';
import prop from 'crocks/Maybe/prop';

import { hasAllVariables } from './graphql-helpers';
import { ApolloElement } from './apollo-element.js';
export { html } from './apollo-element.js';

import { validGql } from './graphql-helpers';

/**
 * # ApolloQuery
 *
 * 🚀 A custom element base class that connects to your Apollo cache.
 *
 * ## Usage
 *
 * ```html
 * <script type="module">
 *   import gql from 'graphql-tag';
 *   import ApolloQuery from 'lit-apollo/apollo-query';
 *
 * class ConnectedElement extends ApolloQuery {
 *   _render({ data: { helloWorld }, loading, error, networkStatus }) {
 *    return (
 *        loading ? html`
 *          <what-spin></what-spin>`
 *      : error ? html`
 *          <h1>😢 Such sad, very error!</h1>
 *          <div>${error.message}</div>`
 *      : html`
 *          <div>${helloWorld.greeting}, ${helloWorld.name}</div>`
 *    );
 *  }
 *
 *  constructor() {
 *     super();
 *     this.query = gql`query { helloWorld { name, greeting } }`;
 *   }
 * }
 * customElements.define('connected-element', ConnectedElement);
 * </script>
 * ```
 *
 * ### Inline Query Scripts
 * You can also provide a graphql query string in your markup by appending a
 * graphql script to your element like so:
 *
 * ```html
 * <connected-element>
 *   <script type="application/graphql">
 *     query {
 *       helloWorld {
 *         name
 *         greeting
 *       }
 *     }
 *   </script>
 * </connected-element>
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
      /**
       * Enum of network statuses.
       * See https://bit.ly/2sfKLY0
       * @type {Number}
       */
      networkStatus: Object,
    };
  }

  /**
   * @type {DocumentNode} The gql-parsed query.
   */
  get query() {
    return this.__query ||
    prop('innerText', this.querySelector('script[type="application/graphql"]'))
      .map(gql)
      .option(null);
  }

  set query(query) {
    this.__query = query;
    if (query == null) return;
    const valid = validGql(query);
    const variables = this.__variables;
    if (!valid) throw new Error('Query must be a gql-parsed document');
    this.subscribe({ query, variables });
  }

  /**
   * @type {Object} Variables object for the query.
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

  constructor() {
    super();
    /**
     * Specifies the ErrorPolicy to be used for this query
     * @type {"none"|"ignore"|"all"}
     */
    this.errorPolicy = 'none';
    /**
     * Specifies the FetchPolicy to be used for this query.
     * @type {"cache-first" | "cache-and-network" | "network-only" | "cache-only" | "no-cache" | "standby"}
     */
    this.fetchPolicy = 'cache-first';
    /**
     * Whether or not to fetch results.
     * @type {Boolean}
     */
    this.fetchResults = undefined;
    /**
     * The time interval (in milliseconds) on which this query shuold be refetched from the server.
     * @type {Number}
     */
    this.pollInterval = undefined;
    /**
     * Whether or not updates to the network status should trigger next on the observer of this query.
     * @type {Boolean}
     */
    this.notifyOnNetworkStatusChange = undefined;
    /**
     * An object map from variable name to variable value,
     * where the variables are used within the GraphQL query.
     * @type {Object}
     */
    this.variables = undefined;
    /**
     * A GraphQL document that consists of a single query to be sent down to the server.
     * @type {DocumentNode}
     */
    this.query = undefined;
  }

  /**
   * By default, will only render if
   *   - The component has `data`
   *   - The component has an `error`
   *   - The component is `loading`
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
   * Exposes the `ObservableQuery#setOptions` method.
   * https://www.apollographql.com/docs/react/api/apollo-client.html#ObservableQuery.setOptions
   * @param {ModifiableWatchQueryOptions} options https://www.apollographql.com/docs/react/api/apollo-client.html#ModifiableWatchQueryOptions
   * @return {Promise<ApolloQueryResult>}
   */
  setOptions(options) {
    return this.observableQuery &&
    this.observableQuery.setOptions(options);
  }

  /**
   * Exposes the `ObservableQuery#setVariables` method.
   * https://www.apollographql.com/docs/react/api/apollo-client.html#ObservableQuery.setVariables
   * @param {Object} variables                         The new set of variables. If there are missing variables,
   *                                                   the previous values of those variables will be used.
   * @param {Boolean} [tryFetch=this.tryFetch]         Try and fetch new results even if the variables haven't
   *                                                    changed (we may still just hit the store,
   *                                                    but if there's nothing in there will refetch).
   * @param {Boolean} [fetchResults=this.fetchResults] Option to ignore fetching results when updating variables.
   * @return {Promise<ApolloQueryResult>}
   */
  setVariables(variables, tryFetch = this.tryFetch, fetchResults = this.fetchResults) {
    return this.observableQuery &&
    this.observableQuery.setVariables(variables, tryFetch, fetchResults);
  }

  /**
   * Subscribes the element to a query.
   * @param  {DocumentNode}               [query=this.query]
   * @param  {Object}                     [variables=this.variables]
   * @return {ZenObservable.Subscription}
   */
  async subscribe({ query = this.query, variables = this.variables }) {
    if (!hasAllVariables({ query, variables })) return;
    const next = this.nextData.bind(this);
    const error = a => this.nextError.bind(this);
    const {
      context,
      errorPolicy,
      fetchPolicy,
      fetchResults,
      metadata,
      notifyOnNetworkStatusChange,
      pollInterval,
    } = this;
    this.observableQuery = this.client.watchQuery({
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
    return this.observableQuery.subscribe({ next, error });
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

    return this.client.query({
      context,
      errorPolicy,
      fetchPolicy,
      fetchResults,
      metadata,
      query,
      variables,
    }).then(this.nextData.bind(this))
      .catch(this.nextError.bind(this));
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
