import type { Constructor, MaybeTDN, MaybeVariables } from '@apollo-elements/core/types';
import { NetworkStatus } from '@apollo/client/core';
import { ApolloQueryMixin } from '@apollo-elements/mixins/apollo-query-mixin';
import { PolymerApolloElement } from './polymer-apollo-element.js';
import { notify } from './notify-decorator.js';

/**
 * @element polymer-apollo-query
 *
 * `<polymer-apollo-query>` fires Polymer-style prop-changed events
 * when its `data`, `error`, `loading` or `networkStatus`
 * properties change.
 *
 * See [ApolloQueryInterface](/api/core/interfaces/query/) for more information.
 *
 * @example <caption>Querying for Data</caption>
 * ```html
 *          <polymer-apollo-query
 *              data="{{data}}"
 *              variables="[[variables]]"
 *              query="[[UserQuery]]"
 *          ></polymer-apollo-query>
 *
 *          <paper-icon-item>
 *            <iron-image slot="item-icon">[[data.user.picture]]</iron-image>
 *            [[data.user.name]]
 *          </paper-icon-item>
 * ```
 *
 * @fires {PolymerChangeEvent<Data<D>>} data-changed
 * @fires {PolymerChangeEvent<Variables<D, V>>} variables-changed
 * @fires {PolymerChangeEvent<Error>} error-changed
 * @fires {PolymerChangeEvent<readonly GraphQLError[]>} errors-changed
 * @fires {PolymerChangeEvent<boolean>} loading-changed
 */
export class PolymerApolloQuery<D extends MaybeTDN = MaybeTDN, V = MaybeVariables<D>>
  extends ApolloQueryMixin(
    PolymerApolloElement as unknown as Constructor<PolymerApolloElement>
  )<D, V> {
  static readonly is = 'polymer-apollo-query';

  @notify() networkStatus: NetworkStatus = NetworkStatus.ready;
}

customElements.define(PolymerApolloQuery.is, PolymerApolloQuery);

declare global { interface HTMLElementTagNameMap {
  'polymer-apollo-query': PolymerApolloQuery;
} }
