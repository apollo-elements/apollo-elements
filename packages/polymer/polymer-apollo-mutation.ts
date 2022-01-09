import type { Constructor, VariablesOf } from '@apollo-elements/core/types';
import { ApolloMutationMixin } from '@apollo-elements/mixins/apollo-mutation-mixin';
import { PolymerApolloElement } from './polymer-apollo-element.js';
import { notify } from './notify-decorator.js';

/**
 * @element polymer-apollo-mutation
 *
 * `<polymer-apollo-mutation>` fires Polymer-style prop-changed events
 * when its `called`, `data`, `error`, `loading` or `networkStatus`
 * properties change.
 *
 * See [ApolloMutationInterface](/api/core/interfaces/mutation/) for more information.
 *
 * @example <caption>Use in a Polymer template</caption>
 *
 * ```html
 *          <polymer-apollo-mutation id="userMutation"
 *              data="{{data}}"
 *              mutation="[[UserMutation]]"
 *          ></polymer-apollo-mutation>
 *
 *          <paper-input label="Name" value="{{name}}"></paper-input>
 *          <paper-input label="Picture URL" value="{{picture}}"></paper-input>
 *          <paper-button on-click="mutate">Submit</paper-button>
 * ```
 *
 * @fires {PolymerChangeEvent<Data<D>>} data-changed
 * @fires {PolymerChangeEvent<Variables<D, V>>} variables-changed
 * @fires {PolymerChangeEvent<Error>} error-changed
 * @fires {PolymerChangeEvent<readonly GraphQLError[]>} errors-changed
 * @fires {PolymerChangeEvent<boolean>} loading-changed
 */
export class PolymerApolloMutation<D = unknown, V = VariablesOf<D>>
  extends ApolloMutationMixin(
    PolymerApolloElement as Constructor<PolymerApolloElement<unknown>>
  )<D, V> {
  static readonly is = 'polymer-apollo-mutation';

  @notify() called = false;
}

customElements.define(PolymerApolloMutation.is, PolymerApolloMutation);

declare global { interface HTMLElementTagNameMap {
  'polymer-apollo-mutation': PolymerApolloMutation<unknown>;
} }
