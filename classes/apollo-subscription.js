import { ApolloElement } from './apollo-element.js';
import { ApolloSubscriptionMixin } from '../mixins/apollo-subscription-mixin.js';
export { html } from './apollo-element.js';

/** @typedef {"none" | "ignore" | "all"} ErrorPolicy */
/** @typedef {"cache-first" | "cache-and-network" | "network-only" | "cache-only" | "no-cache" | "standby"} FetchPolicy */

/**
 * # ApolloSubscription
 *
 * 🚀 A custom element base class that updates with an Apollo GraphQL subscription.
 *
 * ## Usage
 *
 * ```js
 * import { cache } from './cache';
 * import { link } from './link';
 * import { ApolloClient } from 'apollo-client';
 * import { ApolloSubscription, html } from 'lit-apollo/classes/apollo-subscription';
 *
 * // Create the Apollo Client
 * const client = new ApolloClient({ cache, link });
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
 *     this.subscription = gql`subscription {
 *       helloWorld {
 *         name
 *         greeting
 *       }
 *     }`;
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
  shouldUpdate(changedProps) {
    return (
      this.loading != null ||
      !!this.error ||
      !!this.data
    );
  }
}
