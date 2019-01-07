import { ApolloElement } from './apollo-element.js';
import { ApolloSubscriptionMixin } from '@apollo-elements/mixins/apollo-subscription-mixin.js';
export { html } from './apollo-element.js';

/**
 * # ApolloSubscription
 *
 * 🚀 A custom element base class that updates with an Apollo GraphQL subscription.
 *
 * ## Usage
 *
 * ```js
 * import { client } from './apollo-client.js';
 * import { ApolloSubscription, html } from 'lit-apollo';
 * import gql from 'graphql-tag';
 *
 * const errorTemplate = ({message = 'Unknown Error'}) => html`
 *   <h1>😢 Such Sad, Very Error! 😰</h1>
 *   <div>${message}</div>`
 *
 * class SubscribingElement extends ApolloSubscription {
 *   render() {
 *     const { data, error = {}, loading } = this;
 *     return
 *         loading ? html`<such-overlay-very-spin></such-overlay-very-spin>`
 *       : error ? errorTemplate(error)
 *       : html`<p>${data.helloWorld.greeting}, ${data.helloWorld.name}</p>`
 *   }
 *
 *   constructor() {
 *     super();
 *     this.client = client;
 *     this.subscription = gql`
 *       subscription {
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
 * @extends LitElement
 * @appliesMixin ApolloSubscriptionMixin
 */
export class ApolloSubscription extends ApolloSubscriptionMixin(ApolloElement) {
  /**
   * By default, will only render if
   *   - The component has `data` or
   *   - The component has an `error` or
   *   - The component is `loading`.
   * @param  {Map}  changedProps           Changed properties.
   * @return {Boolean}                     Whether the component should render.
   * @protected
   */
  shouldUpdate() {
    return (
      this.loading != null ||
      !!this.error ||
      !!this.data
    );
  }
}
