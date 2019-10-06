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
 * import query from './connected-element.graphql';
 *
 * const errorTemplate = ({message = 'Unknown Error'}) => html`
 *   <h1>😢 Such Sad, Very Error! 😰</h1>
 *   <div>${message}</div>`
 *
 * class ConnectedElement extends ApolloQuery {
 *   client = client;
 *   query = query;
 *
 *   render() {
 *     const { data, error, loading, networkStatus } = this;
 *     return (
 *         loading ? html`<such-overlay-very-spin></such-overlay-very-spin>`
 *       : error ? errorTemplate(error)
 *       : html`<p>${data.helloWorld.greeting}, ${data.helloWorld.name}</p>`
 *     );
 *   }
 * };
 *
 * customElements.define('connected-element', ConnectedElement)
 * ```
 *
 * @polymer
 * @extends ApolloElement
 * @appliesMixin ApolloQueryMixin
 * @element
 * @inheritdoc
 */
export class ApolloQuery extends ApolloQueryMixin(ApolloElement) {
  static get properties() {
    return {
      /**
       * Enum of network statuses. See https://bit.ly/2sfKLY0
       */
      networkStatus: { type: Number },

      /**
       * If the query should not subscribe until `subscribe` is explicitly called.
       */
      noAutoSubscribe: { type: Boolean, attribute: 'no-auto-subscribe' },
    };
  }

  /**
   * By default, will only render if
   *   - The component has `data` or
   *   - The component has an `error` or
   *   - The component has a `loading` status.
   *
   * @return {boolean}                     Whether the component should render.
   * @protected
   * @abstract
   * @inheritdoc
   */
  shouldUpdate() {
    return (
      !!this.data ||
      !!this.error ||
      this.loading != null
    );
  }
}
