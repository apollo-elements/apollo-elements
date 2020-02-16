import { ApolloElement } from './apollo-element';
import { ApolloSubscriptionMixin } from '@apollo-elements/mixins/apollo-subscription-mixin';
export { html } from './apollo-element';

/**
 * # ApolloSubscription
 *
 * 🚀 A custom element base class that updates with an Apollo GraphQL subscription.
 *
 * ## Usage
 *
 * ```js
 * import { client } from './apollo-client';
 * import { ApolloSubscription, html } from '@apollo-elements/gluon';
 * import subscription from './subscription-element.graphql';
 *
 * const errorTemplate = ({message = 'Unknown Error'}) => html`
 *   <h1>😢 Such Sad, Very Error! 😰</h1>
 *   <div>${message}</div>`
 *
 * class SubscribingElement extends ApolloSubscription {
 *   client = client;
 *   subscription = subscription;
 *
 *   get template() {
 *     const { data, error = {}, loading } = this;
 *     return (
 *         loading ? html`<such-overlay-very-spin></such-overlay-very-spin>`
 *       : error ? errorTemplate(error)
 *       : html`<p>${data.helloWorld.greeting}, ${data.helloWorld.name}</p>`
 *     )
 *   }
 * };
 *
 * customElements.define('connected-element', ConnectedElement)
 * ```
 */
export class ApolloSubscription<
  TData,
  TVariables
> extends ApolloSubscriptionMixin(ApolloElement)<TData, TVariables> { }
