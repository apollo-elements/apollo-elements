import { NotifyingElementMixin } from './notifying-element-mixin.js';
import { ApolloQueryMixin } from '@apollo-elements/mixins/apollo-query-mixin.js';

/**
 * `<apollo-query>` fires Polymer-style prop-changed events
 * when its `data`, `error`, `loading` or `networkStatus`
 * properties change.
 *
 * ## 👩‍🚀 Usage
 * ```js
 * class QueryElement extends PolymerElement {
 *   static template = html`
 *     <apollo-query data="{{data}}" variables="[[variables]]">
 *       <script type="application/graphql">
 *         query User($id: ID!) {
 *           user(id: $id) {
 *             name
 *             picture
 *           }
 *         }
 *       </script>
 *     </apollo-query>
 *
 *     <paper-icon-item>
 *       <iron-image slot="item-icon">[[data.user.picture]]</iron-image>
 *       [[data.user.name]]
 *     </paper-icon-item>
 *   `;
 * }
 * ```
 *
 * @polymer
 * @customElement
 * @extends ApolloQuery
 * @appliesMixin NotifyingElementMixin
 */
const ApolloQuery = ApolloQueryMixin(class extends NotifyingElementMixin(HTMLElement) {
  /**
   * Latest data.
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

  /**
   * Enum of network statuses. See https://bit.ly/2sfKLY0
   * @type {Number}
   */
  get networkStatus() {
    return this.__networkStatus;
  }

  set networkStatus(value) {
    this.__networkStatus = value;
    this.notify('networkStatus', value);
  }
});

customElements.define('apollo-query', ApolloQuery);
