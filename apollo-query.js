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
 *   import ApolloQuery from '@lit-apollo/lit-apollo';
 *
 * class MyConnectedElement extends ApolloQuery {
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
 * customElements.define('connected-element', MyConnectedElement);
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
 */
export class ApolloQuery extends ApolloElement {
  static get properties() {
    return {
      /* Enum of network statuses. See https://bit.ly/2sfKLY0 */
      networkStatus: Object,
      /* A map going from variable name to variable value, where the variables are used within the GraphQL query. */
      variables: Object,
      /* A GraphQL document that consists of a single query to be sent down to the server. */
      query: Object,
    };
  }

  get query() {
    return this.__query ||
    prop('innerText', this.querySelector('[type="application/graphql"]'))
      .map(gql)
      .option(null);
  }

  set query(query) {
    super.query = query;
    const valid = validGql(query);
    this.__query = valid ? query : null;
    if (!valid) throw new Error('Query must be a gql-parsed document');
    const variables = this.__variables;
    this.subscribe({ query, variables });
  }

  set variables(variables) {
    super.variables = variables;
    this.__variables = variables;
    const query = this.__query;
    this.subscribe({ query, variables });
  }

  get variables() {
    return this.__variables;
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
  }

  _shouldRender({ data, loading, networkStatus }, changed, old) {
    const { variables, query } = changed || {};
    return !!data || loading != null && (!query && !variables);
  }

  setOptions(options) {
    this.observableQuery &&
    this.observableQuery.setOptions(options);
  }

  async subscribe({ query, variables }) {
    if (!this.query || !hasAllVariables({ query, variables })) return;
    const next = this.nextData.bind(this);
    const error = a => this.nextError.bind(this);
    const {
      errorPolicy,
      fetchPolicy,
      fetchResults,
      metadata,
      notifyOnNetworkStatusChange,
      pollInterval,
    } = this;
    this.observableQuery = this.client.watchQuery({
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

  executeQuery(event) {
    const { errorPolicy, fetchPolicy, fetchResults, metadata, query, variables } = this;
    return this.client.query({ errorPolicy, fetchPolicy, fetchResults, metadata, query, variables })
      .then(this.nextData)
      .catch(this.nextError);
  }

  nextData({ data, loading, networkStatus, stale }) {
    this.data = data;
    this.loading = loading;
    this.networkStatus = networkStatus;
    this.stale = stale;
  }

  nextError(error) {
    this.error = error;
  }
}
