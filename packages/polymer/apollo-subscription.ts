import { ApolloSubscriptionMixin } from '../mixins/apollo-subscription-mixin';
import { PolymerApolloElement } from './apollo-element';

/**
 * `<apollo-subscription>` fires Polymer-style prop-changed events
 * when its `data`, `error`, or `loading` properties change.
 *
 * ## 👩‍🚀 Usage
 * ```js
 * class QueryElement extends PolymerElement {
 *   static template = html`
 *     <apollo-subscription data="{{data}}" variables="[[variables]]" on-data-changed="toast">
 *       <script type="application/graphql">
 *         subscription UserJoined($id: ID!) {
 *           userJoined(id: $id) {
 *             name
 *             picture
 *           }
 *         }
 *       </script>
 *     </apollo-subscription>
 *
 *     <paper-toast duration="5000" text="A wild [[data.userJoined.name]] approaches!">
 *       <iron-image>[[data.userJoined.picture]]</iron-image>
 *     </paper-toast>
 *   `;
 * }
 * ```
 */
export class PolymerApolloSubscription<TData, TVariables> extends
  ApolloSubscriptionMixin(PolymerApolloElement)<TData, TVariables> { }

customElements.define('apollo-subscription', PolymerApolloSubscription);

declare global {
  interface HTMLElementTagNameMap {
    'apollo-subscription': PolymerApolloSubscription<unknown, unknown>;
  }
}
