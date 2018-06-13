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
    };
  }

  get query() {
    return this.__query ||
    prop('innerText', this.querySelector('[type="application/graphql"]'))
      .map(gql)
      .option(null);
  }

  set query(query) {
    const valid = validGql(query);
    this.__query = valid ? query : null;
    if (!valid) throw new Error('Query must be a gql-parsed document');
    const variables = this.__variables;
    this.subscribe({ query, variables });
  }

  set variables(variables) {
    this.__variables = variables;
    const query = this.__query;
    this.subscribe({ query, variables });
  }

  get variables() {
    return this.__variables;
  }

  constructor() {
    super();
    this.observableQuery = null;
    this.skip = false;
    this.pollInterval = 500;
    this.notifyOnNetworkStatusChange = false;
    this.fetchPolicy = 'cache-first';
    this.errorPolicy = 'none';
    this.delay = false;
    this.__query = null;
  }

  _shouldRender({ data }, changed, old) {
    return !!data;
  }

  setOptions(options) {
    this.observableQuery &&
    this.observableQuery.setOptions(options);
  }

  async subscribe({ query, variables }) {
    if (!this.query) return;
    const next = a => this.nextData(a);
    const error = a => this.nextError(a);
    if (!hasAllVariables({ query, variables })) return;
    this.observableQuery = this.client.watchQuery({ query, variables });
    return this.observableQuery.subscribe({ next, error });
  }

  executeQuery(event) {
    const { client, query, variables } = this;
    client.query({ query, variables })
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
