export { html } from "lit-element";
/**
 * # ApolloSubscription
 *
 * 🚀 A custom element base class that updates with an Apollo GraphQL subscription.
 *
 * ## 👩‍🚀 Usage
 *
 * ```js
 * import { client } from './apollo-client.js';
 * import { ApolloSubscription, html } from 'lit-apollo';
 * import subscription from './subscribing-element.graphql';
 *
 * const errorTemplate = ({message = 'Unknown Error'}) => html`
 *   <h1>😢 Such Sad, Very Error! 😰</h1>
 *   <div>${message}</div>`
 *
 * class SubscribingElement extends ApolloSubscription {
 *   client = client;
 *   subcscription = subscription;
 *   render() {
 *     const { data, error = {}, loading } = this;
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
 * @appliesMixin ApolloSubscriptionMixin
 * @inheritdoc
 * @element
 */
export class ApolloSubscription extends ApolloElement<any, any> {
    /**
     * By default, will only render if
     *   - The component has `data` or
     *   - The component has an `error` or
     *   - The component is `loading`.
     *
     * @param  {Map}  _changedProps           Changed properties.
     * @return {boolean}                     Whether the component should render.
     * @protected
     * @inheritdoc
     */
    shouldUpdate(_changedProps: Map<any, any>): boolean;
}
import { ApolloElement } from "./apollo-element.js";
