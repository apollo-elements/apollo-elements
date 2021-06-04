import type * as I from '@apollo-elements/interfaces';
import { ApolloMutationMixin } from '@apollo-elements/mixins/apollo-mutation-mixin';
import { PolymerApolloElement } from './polymer-apollo-element';
import { notify } from './notify-decorator';

/**
 * @element polymer-apollo-mutation
 *
 * `<polymer-apollo-mutation>` fires Polymer-style prop-changed events
 * when its `called`, `data`, `error`, `loading` or `networkStatus`
 * properties change.
 *
 * See [ApolloMutationInterface](/api/interfaces/mutation/) for more information.
 *
 * @example
 *
 * ```html
 * <polymer-apollo-mutation id="userMutation"
 *     data="{{data}}"
 *     mutation="[[UserMutation]]"
 * ></polymer-apollo-mutation>
 *
 * <paper-input label="Name" value="{{name}}"></paper-input>
 * <paper-input label="Picture URL" value="{{picture}}"></paper-input>
 * <paper-button on-click="mutate">Submit</paper-button>
 * ```
 *
 * @fires 'data-changed'
 * @fires 'error-changed'
 * @fires 'errors-changed'
 * @fires 'loading-changed'
 * @fires 'called-changed'
 */
export class PolymerApolloMutation<D extends I.MaybeTDN = I.MaybeTDN, V = I.MaybeVariables<D>>
  extends ApolloMutationMixin(
    PolymerApolloElement as unknown as I.Constructor<PolymerApolloElement>
  )<D, V>
  implements I.ApolloMutationInterface<D, V> {
  static readonly is = 'polymer-apollo-mutation';

  @notify() called = false;
}

customElements.define(PolymerApolloMutation.is, PolymerApolloMutation);

declare global { interface HTMLElementTagNameMap {
  'polymer-apollo-mutation': PolymerApolloMutation;
} }
