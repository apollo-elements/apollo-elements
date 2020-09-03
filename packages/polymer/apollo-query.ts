import type { ApolloQueryInterface, Constructor } from '@apollo-elements/interfaces';
import { NetworkStatus } from '@apollo/client/core';
import { ApolloQueryMixin } from '../mixins/apollo-query-mixin';
import { PolymerApolloElement } from './apollo-element';

type Base = Constructor<HTMLElement & PolymerApolloElement>;

/**
 * @element apollo-query
 *
 * `<apollo-query>` fires Polymer-style prop-changed events
 * when its `data`, `error`, `loading` or `networkStatus`
 * properties change.
 *
 * ## 👩‍🚀 Usage
 * ```html
 * <apollo-query data="{{data}}" variables="[[variables]]">
 *   <script type="application/graphql">
 *     query User($id: ID!) {
 *       user(id: $id) {
 *         name
 *         picture
 *       }
 *     }
 *   </script>
 * </apollo-query>
 *
 * <paper-icon-item>
 *   <iron-image slot="item-icon">[[data.user.picture]]</iron-image>
 *   [[data.user.name]]
 * </paper-icon-item>
 * ```
 */
export class PolymerApolloQuery<TData, TVariables>
  extends ApolloQueryMixin(PolymerApolloElement as Base)<TData, TVariables>
  implements ApolloQueryInterface<TData, TVariables> {
  #networkStatus: NetworkStatus = NetworkStatus.ready;

  // @ts-expect-error: ambient property. see https://github.com/microsoft/TypeScript/issues/40220
  get networkStatus(): NetworkStatus {
    return this.#networkStatus;
  }

  set networkStatus(value: NetworkStatus) {
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
