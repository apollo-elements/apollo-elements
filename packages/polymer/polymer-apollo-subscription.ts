import type { Constructor, VariablesOf } from '@apollo-elements/core/types';
import { OperationVariables } from '@apollo/client/core';
import { ApolloSubscriptionMixin } from '../mixins/apollo-subscription-mixin';
import { PolymerApolloElement } from './polymer-apollo-element.js';

/**
 * @element polymer-apollo-subscription
 *
 * `<polymer-apollo-subscription>` fires Polymer-style prop-changed events
 * when its `data`, `error`, or `loading` properties change.
 *
 * See [ApolloSubscriptionInterface](/api/core/interfaces/subscription/) for more information.
 *
 * @example <caption>Subscribing for Updates</caption>
 * ```html
 *          <polymer-apollo-subscription
 *              data="{{data}}"
 *              variables="[[variables]]"
 *              subscription="[[UserJoinedSubscription]]"
 *              on-data-changed="toast"
 *          ></polymer-apollo-subscription>
 *
 *          <paper-toast duration="5000" text="A wild [[data.userJoined.name]] approaches!">
 *            <iron-image>[[data.userJoined.picture]]</iron-image>
 *          </paper-toast>
 * ```
 *
 * @fires {PolymerChangeEvent<Data<D>>} data-changed
 * @fires {PolymerChangeEvent<Variables<D, V>>} variables-changed
 * @fires {PolymerChangeEvent<Error>} error-changed
 * @fires {PolymerChangeEvent<readonly GraphQLError[]>} errors-changed
 * @fires {PolymerChangeEvent<boolean>} loading-changed
 */
export class PolymerApolloSubscription<D = unknown, V extends OperationVariables = VariablesOf<D>>
  extends ApolloSubscriptionMixin(
    PolymerApolloElement as Constructor<PolymerApolloElement<unknown>>
  )<D, V> {
  static readonly is = 'polymer-apollo-subscription';
}

customElements.define(PolymerApolloSubscription.is, PolymerApolloSubscription);

// eslint-disable-next-line max-len
declare global { interface HTMLElementTagNameMap {
  'polymer-apollo-subscription': PolymerApolloSubscription<unknown>;
} }
