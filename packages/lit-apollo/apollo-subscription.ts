import { ApolloElement } from './apollo-element';
import { ApolloSubscriptionMixin } from '@apollo-elements/mixins/apollo-subscription-mixin';
import { Constructor } from '@apollo-elements/interfaces';

/**
 * # ApolloSubscription
 *
 * 🚀 A custom element base class that updates with an Apollo GraphQL subscription.
 *
 * ## 👩‍🚀 Usage
 *
 * ```js
 * import { ApolloSubscription, html, customElement } from '@apollo-elements/lit-apollo';
 * import HelloSubscription from './Hello.subscription.graphql';
 *
 * @customElement('hello-subscription')
 * class SubscribingElement extends ApolloSubscription {
 *   subscription = HelloSubscription;
 *
 *   render() {
 *     return (
 *         this.loading ? html`
 *           <such-overlay-very-spin></such-overlay-very-spin>`
 *       : this.error ? html`
 *           <h1>😢 Such Sad, Very Error! 😰</h1>
 *           <div>${this.error.message}</div>`
 *       : html`
 *           <p>${this.data.helloWorld.greeting}, ${this.data.helloWorld.name}</p>`
 *     );
 *   }
 * };
 * ```
 */
export class ApolloSubscription<TData, TVariables>
  extends ApolloSubscriptionMixin(ApolloElement as Constructor<ApolloElement>)<TData, TVariables> {
}
