import type { OperationVariables } from '@apollo/client/core';
import type { ApolloQueryInterface, Constructor } from '@apollo-elements/interfaces';
import { NetworkStatus } from '@apollo/client/core';
import { ApolloQueryMixin } from '../mixins/apollo-query-mixin';
import { PolymerApolloElement } from './apollo-element';
import { notify } from './notify-decorator';

/**
 * @element apollo-query
 *
 * `<apollo-query>` fires Polymer-style prop-changed events
 * when its `data`, `error`, `loading` or `networkStatus`
 * properties change.
 *
 * See [ApolloQueryInterface](/api/interfaces/query/) for more information.
 *
 * @example
 * ```html
 * <apollo-query
 *     data="{{data}}"
 *     variables="[[variables]]"
 *     query="[[UserQuery]]"
 * ></apollo-query>
 *
 * <paper-icon-item>
 *   <iron-image slot="item-icon">[[data.user.picture]]</iron-image>
 *   [[data.user.name]]
 * </paper-icon-item>
 * ```
 *
 * @fires 'data-changed'
 * @fires 'error-changed'
 * @fires 'errors-changed'
 * @fires 'loading-changed'
 * @fires 'network-status-changed'
 */
export class PolymerApolloQuery<D = unknown, V = OperationVariables>
  extends ApolloQueryMixin(PolymerApolloElement as Constructor<PolymerApolloElement>)<D, V>
  implements ApolloQueryInterface<D, V> {
  @notify networkStatus: NetworkStatus = NetworkStatus.ready;
}

customElements.define('apollo-query', PolymerApolloQuery);

declare global { interface HTMLElementTagNameMap { 'apollo-query': PolymerApolloQuery; } }
