import { LitElement } from '@polymer/lit-element';

import { ApolloQueryMixin } from './apollo-query-mixin';

export { html } from './apollo-element.js';

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
 *     render({ data, loading, error, networkStatus }) {
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
 * @extends LitElement
 * @extends HTMLElement
 * @mixes ApolloMutationMixin
 * @mixes ApolloElementMixin
 */
export class ApolloQuery extends ApolloQueryMixin(LitElement) {
  static get properties() {
    return {
      /**
       * Enum of network statuses. See https://bit.ly/2sfKLY0
       * @type {Number}
       */
      networkStatus: { type: Object },
    };
  }

  /**
   * By default, will only render if
   *   - The component has `data` or
   *   - The component has an `error` or
   *   - The component is `loading`.
   * @param  {Map}  changedProps           Changed properties.
   * @return {Boolean}                     Whether the component should render.
   * @protected
   */
  shouldUpdate(changedProps) {
    return (
      this.loading != null ||
      !!this.error ||
      !!this.data
    );
  }
}
