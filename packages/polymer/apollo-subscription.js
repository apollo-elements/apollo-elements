import { NotifyingElementMixin as Notify } from './notifying-element-mixin.js';
import { ApolloSubscriptionMixin } from '@apollo-elements/mixins/apollo-subscription-mixin.js';

/**
 * `<apollo-subscription>` fires Polymer-style prop-changed events
 * when its `data`, `error`, or `loading` properties change.
 *
 * ## 👩‍🚀 Usage
 * ```js
 * class QueryElement extends PolymerElement {
 *   static template = html`
 *     <apollo-subscription data="{{data}}" variables="[[variables]]" on-data-changed="toast">
 *       <script type="application/graphql">
 *         subscription UserJoined($id: ID!) {
 *           userJoined(id: $id) {
 *             name
 *             picture
 *           }
 *         }
 *       </script>
 *     </apollo-subscription>
 *
 *     <paper-toast duration="5000" text="A wild [[data.userJoined.name]] approaches!">
 *       <iron-image>[[data.userJoined.picture]]</iron-image>
 *     </paper-toast>
 *   `;
 * }
 * ```
 *
 * @polymer
 * @customElement
 * @extends ApolloSubscription
 * @appliesMixin NotifyingElementMixin
 */
const ApolloSubscription = ApolloSubscriptionMixin(class extends Notify(HTMLElement) {
  /**
   * Latest data.
   *
   * @type {Object}
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

customElements.define('apollo-subscription', ApolloSubscription);
