import { NotifyingElementMixin } from '../mixins/notifying-element-mixin.js';
import { ApolloQuery } from '../classes/apollo-query.js';

/**
 * `<apollo-subscription>` fires Polymer-style prop-changed events
 * when its `data`, `error`, or `loading` properties change.
 *
 * @customElement
 * @extends ApolloSubscription
 * @appliesMixin NotifyingElementMixin
 */
const ApolloSubscriptionElement = NotifyingElementMixin(ApolloQuery, [
  'data',
  'error',
  'loading',
]);

customElements.define('apollo-subscription', ApolloSubscriptionElement);
