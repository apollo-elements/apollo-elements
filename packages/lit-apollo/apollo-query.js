import { ApolloQueryMixin } from '@apollo-elements/mixins/apollo-query-mixin';
import { ApolloElement } from './apollo-element.js';
export { html } from './apollo-element.js';

/**
 * # ApolloQuery
 *
 * 🚀 A custom element base class that connects to your Apollo cache.
 *
 * ## 👩‍🚀 Usage
 *
 * ```js
 * import { client } from './apollo-client.js';
 * import { ApolloQuery, html } from 'lit-apollo';
 * import gql from 'graphql-tag';
 *
 * const errorTemplate = ({message = 'Unknown Error'}) => html`
 *   <h1>😢 Such Sad, Very Error! 😰</h1>
 *   <div>${message}</div>`
 *
 * class ConnectedElement extends ApolloQuery {
 *   render() {
 *     const { data, error, loading, networkStatus } = this;
 *     return
 *         loading ? html`<such-overlay-very-spin></such-overlay-very-spin>`
 *       : error ? errorTemplate(error)
 *       : html`<p>${data.helloWorld.greeting}, ${data.helloWorld.name}</p>`
 *   }
 *
 *   constructor() {
 *     super();
 *     this.client = client;
 *     this.query = gql`
 *       query {
 *         helloWorld {
 *           name
 *           greeting
 *         }
 *       }
 *     `;
 *   }
 * };
 *
 * customElements.define('connected-element', ConnectedElement)
 * ```
 *
 * @polymer
 * @extends LitElement
 * @appliesMixin ApolloQueryMixin
 */
export class ApolloQuery extends ApolloQueryMixin(ApolloElement) {
  static get properties() {
    return {
      /**
       * Enum of network statuses. See https://bit.ly/2sfKLY0
       * @type {Number}
       */
      networkStatus: { type: Number },
      noAutoSubscribe: { type: Boolean, attribute: 'no-auto-subscribe' },
    };
  }

  /**
   * By default, will only render if
   *   - The component has `data` or
   *   - The component has an `error` or
   *   - The component has a `loading` status.
   * @param  {Map}  changedProps           Changed properties.
   * @return {Boolean}                     Whether the component should render.
   * @protected
   */
  shouldUpdate() {
    return (
      !!this.data ||
      !!this.error ||
      this.loading != null
    );
  }
}
