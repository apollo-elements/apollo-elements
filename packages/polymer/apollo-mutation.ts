import { ApolloMutationMixin } from '@apollo-elements/mixins/apollo-mutation-mixin';
import { PolymerApolloElement } from './apollo-element';
import { NotifyingElementMixin } from './notifying-element-mixin';

/**
 * `<apollo-mutation>` fires Polymer-style prop-changed events
 * when its `called`, `data`, `error`, `loading` or `networkStatus`
 * properties change.
 *
 * ## 👩‍🚀 Usage
 *
 * ```js
 * class MutationElement extends PolymerElement {
 *   static template = html`
 *     <apollo-mutation id="userMutation" data="{{data}}">
 *       <script type="application/graphql">
 *         mutation User($id: ID!, $name: String, $picture: String) {
 *           user(id: $id, name: $name, picture: $picture) {
 *             name
 *             picture
 *           }
 *         }
 *       </script>
 *     </apollo-mutation>
 *
 *     <paper-input label="Name" value="{{name}}"></paper-input>
 *     <paper-input label="Picture URL" value="{{picture}}"></paper-input>
 *     <paper-button on-click="mutate">Submit</paper-button>
 *   `;
 *
 *   static properties = {
 *     variables: {
 *       type: Object,
 *       computed: 'computeVariables(name, picture)',
 *     },
 *   };
 *
 *   computeVariables(name, picture) {
 *     return { name, picture }
 *   }
 *
 *   mutate() {
 *     const { variables } = this;
 *     return this.$.userMutation.mutate({ variables })
 *   }
 * }
 * ```
 */
export class PolymerApolloMutation<TData, TVariables> extends
  NotifyingElementMixin(ApolloMutationMixin(PolymerApolloElement))<TData, TVariables> {
  #called = false;

  declare called: boolean;

  constructor() {
    super();
    Object.defineProperties(this, {
      called: {
        configurable: true,
        enumerable: true,

        get(this: This): boolean {
          return this.#called;
        },

        set(this: PolymerApolloMutation<TData, TVariables>, value) {
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
