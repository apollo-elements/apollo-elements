import type { ApolloMutationInterface, Constructor } from '@apollo-elements/interfaces';
import { ApolloMutationMixin } from '@apollo-elements/mixins/apollo-mutation-mixin';
import { PolymerApolloElement } from './apollo-element';
import { notify } from './notify-decorator';

type Base = Constructor<PolymerApolloElement>;

/**
 * @element apollo-mutation
 *
 * `<apollo-mutation>` fires Polymer-style prop-changed events
 * when its `called`, `data`, `error`, `loading` or `networkStatus`
 * properties change.
 *
 * @example
 *
 * ```html
 * <apollo-mutation id="userMutation" data="{{data}}">
 *   <script type="application/graphql">
 *     mutation User($id: ID!, $name: String, $picture: String) {
 *       user(id: $id, name: $name, picture: $picture) {
 *         name
 *         picture
 *       }
 *     }
 *   </script>
 * </apollo-mutation>
 *
 * <paper-input label="Name" value="{{name}}"></paper-input>
 * <paper-input label="Picture URL" value="{{picture}}"></paper-input>
 * <paper-button on-click="mutate">Submit</paper-button>
 * ```
 *
 * @fires 'apollo-element-disconnected' when the element disconnects from the dom
 * @fires 'apollo-element-connected' when the element connects to the dom
 * @fires 'data-changed'
 * @fires 'error-changed'
 * @fires 'errors-changed'
 * @fires 'loading-changed'
 * @fires 'called-changed'
 */
export class PolymerApolloMutation<TData, TVariables>
  extends ApolloMutationMixin(PolymerApolloElement as Base)<TData, TVariables>
  implements ApolloMutationInterface<TData, TVariables> {
  @notify called = false;
}

customElements.define('apollo-mutation', PolymerApolloMutation);

declare global {
  interface HTMLElementTagNameMap {
    'apollo-mutation': PolymerApolloMutation<unknown, unknown>;
  }
}
