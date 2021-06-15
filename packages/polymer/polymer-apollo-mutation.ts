import type { Constructor, MaybeTDN, MaybeVariables } from '@apollo-elements/core/types';
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
 * See [ApolloMutationInterface](/api/core/interfaces/mutation/) for more information.
 *
 * @example Use in a Polymer template
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
 * @fires data-changed
 * @fires error-changed
 * @fires errors-changed
 * @fires loading-changed
 * @fires called-changed
 */
export class PolymerApolloMutation<D extends MaybeTDN = MaybeTDN, V = MaybeVariables<D>>
  extends ApolloMutationMixin(
    PolymerApolloElement as unknown as Constructor<PolymerApolloElement>
  )<D, V> {
  static readonly is = 'polymer-apollo-mutation';

  @notify() called = false;
}

customElements.define(PolymerApolloMutation.is, PolymerApolloMutation);

declare global { interface HTMLElementTagNameMap {
  'polymer-apollo-mutation': PolymerApolloMutation;
} }
