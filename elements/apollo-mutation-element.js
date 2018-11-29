import { NotifyingElementMixin } from '../mixins/notifying-element-mixin.js';
import { ApolloMutation } from '../classes/apollo-mutation.js';

/**
 * `<apollo-mutation>` fires Polymer-style prop-changed events
 * when its `called`, `data`, `error`, `loading` or `networkStatus`
 * properties change.
 *
 * @customElement
 * @extends ApolloMutation
 * @appliesMixin NotifyingElementMixin
 */
const ApolloMutationElement = NotifyingElementMixin(ApolloMutation, [
  'called',
  'data',
  'error',
  'loading',
  'networkStatus',
]);

customElements.define('apollo-mutation', ApolloMutationElement);
