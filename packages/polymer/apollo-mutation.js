import { NotifyingElementMixin } from './notifying-element-mixin.js';
import { ApolloMutationMixin } from '@apollo-elements/mixins/apollo-mutation-mixin.js';

/**
 * `<apollo-mutation>` fires Polymer-style prop-changed events
 * when its `called`, `data`, `error`, `loading` or `networkStatus`
 * properties change.
 *
 * @customElement
 * @extends ApolloMutation
 * @appliesMixin NotifyingElementMixin
 */
const ApolloMutation = ApolloMutationMixin(class extends NotifyingElementMixin(HTMLElement) {
  get called() {
    return this.__called;
  }

  set called(value) {
    this.__called = value;
    this.notify('called', value);
  }

  get data() {
    return this.__data;
  }

  set data(value) {
    this.__data = value;
    this.notify('data', value);
  }

  get error() {
    return this.__error;
  }

  set error(value) {
    this.__error = value;
    this.notify('error', value);
  }

  get loading() {
    return this.__loading;
  }

  set loading(value) {
    this.__loading = value;
    this.notify('loading', value);
  }
});

customElements.define('apollo-mutation', ApolloMutation);
