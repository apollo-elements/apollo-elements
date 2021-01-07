import type { OperationVariables } from '@apollo/client/core';
import type { ApolloSubscriptionInterface, Constructor } from '@apollo-elements/interfaces';
import { ApolloSubscriptionMixin } from '../mixins/apollo-subscription-mixin';
import { PolymerApolloElement } from './apollo-element';

type Base = Constructor<PolymerApolloElement<any, any>>;

/**
 * @element apollo-subscription
 *
 * `<apollo-subscription>` fires Polymer-style prop-changed events
 * when its `data`, `error`, or `loading` properties change.
 *
 * See [ApolloSubscriptionInterface](/api/interfaces/subscription/) for more information.
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
 * @fires 'data-changed'
 * @fires 'error-changed'
 * @fires 'errors-changed'
 * @fires 'loading-changed'
 */
export class PolymerApolloSubscription<D = unknown, V = OperationVariables>
  extends ApolloSubscriptionMixin(PolymerApolloElement as Base)<D, V>
  implements ApolloSubscriptionInterface<D, V> { }

customElements.define('apollo-subscription', PolymerApolloSubscription);

// eslint-disable-next-line max-len
declare global { interface HTMLElementTagNameMap { 'apollo-subscription': PolymerApolloSubscription; } }
