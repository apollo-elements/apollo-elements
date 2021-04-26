import type { OperationVariables } from '@apollo/client/core';
import type { ApolloMutationInterface, Constructor } from '@apollo-elements/interfaces';
import { ApolloMutationMixin } from '@apollo-elements/mixins/apollo-mutation-mixin';
import { PolymerApolloElement } from './apollo-element';
import { notify } from './notify-decorator';

/**
 * @element apollo-mutation
 *
 * `<apollo-mutation>` fires Polymer-style prop-changed events
 * when its `called`, `data`, `error`, `loading` or `networkStatus`
 * properties change.
 *
 * See [ApolloMutationInterface](/api/interfaces/mutation/) for more information.
 *
 * @example
 *
 * ```html
 * <apollo-mutation id="userMutation"
 *     data="{{data}}"
 *     mutation="[[UserMutation]]"
 * ></apollo-mutation>
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
export class PolymerApolloMutation<D = unknown, V = OperationVariables>
  extends ApolloMutationMixin(PolymerApolloElement as Constructor<PolymerApolloElement>)<D, V>
  implements ApolloMutationInterface<D, V> {
  @notify called = false;
}

customElements.define('apollo-mutation', PolymerApolloMutation);

declare global { interface HTMLElementTagNameMap { 'apollo-mutation': PolymerApolloMutation; } }
