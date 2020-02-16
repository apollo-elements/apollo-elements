import { NetworkStatus } from 'apollo-client';
import { ApolloQueryMixin } from '@apollo-elements/mixins/apollo-query-mixin';
import { PolymerApolloElement } from './apollo-element';
import { NotifyingElementMixin } from './notifying-element-mixin';

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
 */
export class PolymerApolloQuery<TData, TVariables> extends
  NotifyingElementMixin(ApolloQueryMixin(PolymerApolloElement))<TData, TVariables> {
  #networkStatus: NetworkStatus = NetworkStatus.ready;

  /**
   * Enum of network statuses. See https://bit.ly/2sfKLY0
   */
  get networkStatus(): NetworkStatus { return this.#networkStatus; }

  set networkStatus(value) {
    this.#networkStatus = value;
    this.notify('networkStatus', value);
  }
}

customElements.define('apollo-query', PolymerApolloQuery);

declare global {
  interface HTMLElementTagNameMap {
    'apollo-query': PolymerApolloQuery<unknown, unknown>;
  }
}
