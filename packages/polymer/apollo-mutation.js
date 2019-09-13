import { NotifyingElementMixin } from './notifying-element-mixin.js';
import { ApolloMutationMixin } from '@apollo-elements/mixins/apollo-mutation-mixin.js';

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
 *
 * @polymer
 * @customElement
 * @extends ApolloMutation
 * @appliesMixin NotifyingElementMixin
 * @element
 * @inheritdoc
 * @template TData
 */
const ApolloMutation = ApolloMutationMixin(class extends NotifyingElementMixin(HTMLElement) {
  /**
   * Whether the mutation has been called
   * @type {Boolean}
   */
  get called() {
    return this.__called;
  }

  set called(value) {
    this.__called = value;
    this.notify('called', value);
  }

  /**
   * Latest data.
   * @type {TData}
   */
  get data() {
    return this.__data;
  }

  set data(value) {
    this.__data = value;
    this.notify('data', value);
  }

  /**
   * Latest error.
   * @type {Object}
   */
  get error() {
    return this.__error;
  }

  set error(value) {
    this.__error = value;
    this.notify('error', value);
  }

  /**
   * Whether a request is in flight.
   * @type {Boolean}
   */
  get loading() {
    return this.__loading;
  }

  set loading(value) {
    this.__loading = value;
    this.notify('loading', value);
  }
});

customElements.define('apollo-mutation', ApolloMutation);
