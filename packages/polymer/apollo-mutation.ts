import type { ApolloMutationInterface, Constructor } from '@apollo-elements/interfaces';
import { ApolloMutationMixin } from '@apollo-elements/mixins/apollo-mutation-mixin';
import { PolymerApolloElement } from './apollo-element';

type Base = Constructor<HTMLElement & PolymerApolloElement>;

/**
 * @element apollo-mutation
 *
 * `<apollo-mutation>` fires Polymer-style prop-changed events
 * when its `called`, `data`, `error`, `loading` or `networkStatus`
 * properties change.
 *
 * ## 👩‍🚀 Usage
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
 */
export class PolymerApolloMutation<TData, TVariables>
  extends ApolloMutationMixin(PolymerApolloElement as Base)<TData, TVariables>
  implements ApolloMutationInterface<TData, TVariables> {
  #called = false;

  declare called: boolean;

  constructor() {
    super();
    type This = this;
    Object.defineProperties(this, {
      called: {
        configurable: true,
        enumerable: true,

        get(this: This): boolean {
          return this.#called;
        },

        set(this: This, value) {
          this.#called = value;
          this.notify('called', value);
        },
      },
    });
  }
}

customElements.define('apollo-mutation', PolymerApolloMutation);

declare global {
  interface HTMLElementTagNameMap {
    'apollo-mutation': PolymerApolloMutation<unknown, unknown>;
  }
}
