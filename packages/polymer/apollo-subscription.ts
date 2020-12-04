import { ApolloSubscriptionInterface, Constructor } from '@apollo-elements/interfaces';
import { ApolloSubscriptionMixin } from '../mixins/apollo-subscription-mixin';
import { PolymerApolloElement } from './apollo-element';

type Base = Constructor<PolymerApolloElement>;

/**
 * @element apollo-subscription
 *
 * `<apollo-subscription>` fires Polymer-style prop-changed events
 * when its `data`, `error`, or `loading` properties change.
 *
 * @example
 * ```html
 * <apollo-subscription data="{{data}}" variables="[[variables]]" on-data-changed="toast">
 *   <script type="application/graphql">
 *     subscription UserJoined($id: ID!) {
 *       userJoined(id: $id) {
 *         name
 *         picture
 *       }
 *     }
 *   </script>
 * </apollo-subscription>
 *
 * <paper-toast duration="5000" text="A wild [[data.userJoined.name]] approaches!">
 *   <iron-image>[[data.userJoined.picture]]</iron-image>
 * </paper-toast>
 * ```
 *
 * See [[`ApolloSubscriptionInterface`]] for more information on events
 *
 * @fires 'data-changed'
 * @fires 'error-changed'
 * @fires 'errors-changed'
 * @fires 'loading-changed'
 */
export class PolymerApolloSubscription<TData, TVariables>
  extends ApolloSubscriptionMixin(PolymerApolloElement as Base)<TData, TVariables>
  implements ApolloSubscriptionInterface<TData, TVariables> { }

customElements.define('apollo-subscription', PolymerApolloSubscription);

declare global {
  interface HTMLElementTagNameMap {
    'apollo-subscription': PolymerApolloSubscription<unknown, unknown>;
  }
}
