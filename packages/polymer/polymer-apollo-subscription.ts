import type { Constructor, MaybeTDN, MaybeVariables } from '@apollo-elements/core/types';
import { ApolloSubscriptionMixin } from '../mixins/apollo-subscription-mixin.js';
import { PolymerApolloElement } from './polymer-apollo-element.js';

/**
 * @element polymer-apollo-subscription
 *
 * `<polymer-apollo-subscription>` fires Polymer-style prop-changed events
 * when its `data`, `error`, or `loading` properties change.
 *
 * See [ApolloSubscriptionInterface](/api/core/interfaces/subscription/) for more information.
 *
 * @example
 * ```html
 * <polymer-apollo-subscription
 *     data="{{data}}"
 *     variables="[[variables]]"
 *     subscription="[[UserJoinedSubscription]]"
 *     on-data-changed="toast"
 * ></polymer-apollo-subscription>
 *
 * <paper-toast duration="5000" text="A wild [[data.userJoined.name]] approaches!">
 *   <iron-image>[[data.userJoined.picture]]</iron-image>
 * </paper-toast>
 * ```
 *
 * @fires data-changed
 * @fires error-changed
 * @fires errors-changed
 * @fires loading-changed
 */
export class PolymerApolloSubscription<D extends MaybeTDN = MaybeTDN, V = MaybeVariables<D>>
  extends ApolloSubscriptionMixin(
    PolymerApolloElement as unknown as Constructor<PolymerApolloElement>
  )<D, V> {
  static readonly is = 'polymer-apollo-subscription';
}

customElements.define(PolymerApolloSubscription.is, PolymerApolloSubscription);

// eslint-disable-next-line max-len
declare global { interface HTMLElementTagNameMap {
  'polymer-apollo-subscription': PolymerApolloSubscription;
} }
