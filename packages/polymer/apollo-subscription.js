import { NotifyingElementMixin as Notify } from './notifying-element-mixin.js';
import { ApolloSubscriptionMixin } from '@apollo-elements/mixins/apollo-subscription-mixin.js';

/**
 * `<apollo-subscription>` fires Polymer-style prop-changed events
 * when its `data`, `error`, or `loading` properties change.
 *
 * @customElement
 * @extends ApolloSubscription
 * @appliesMixin NotifyingElementMixin
 */
const ApolloSubscription = ApolloSubscriptionMixin(class extends Notify(HTMLElement) {
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

customElements.define('apollo-subscription', ApolloSubscription);
