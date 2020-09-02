import { ApolloElement } from './apollo-element';
import { ApolloSubscriptionMixin } from '../mixins/apollo-subscription-mixin';
import { Constructor } from '../mixins/constructor';
export { html } from './apollo-element';

/**
 * # ApolloSubscription
 *
 * 🚀 A custom element base class that updates with an Apollo GraphQL subscription.
 *
 * ## Usage
 *
 * ```js
 * import { ApolloSubscription, html } from '@apollo-elements/gluon';
 * import HelloSubscription from './Hello.subscription.graphql';
 *
 * const errorTemplate = ({message = 'Unknown Error'}) => html`
 *   <h1>😢 Such Sad, Very Error! 😰</h1>
 *   <div>${message}</div>`
 *
 * class SubscribingElement extends ApolloSubscription {
 *   subscription = HelloSubscription;
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
export class ApolloSubscription<TData, TVariables> extends
  ApolloSubscriptionMixin(
    ApolloElement as Constructor<ApolloElement & HTMLElement>
  )<TData, TVariables> { }
