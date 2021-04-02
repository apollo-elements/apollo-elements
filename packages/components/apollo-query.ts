import type { ApolloError, OperationVariables } from '@apollo/client/core';
import type {
  ApolloQueryInterface,
  Constructor,
  Data,
  GraphQLError,
} from '@apollo-elements/interfaces';

import { ApolloQueryMixin } from '@apollo-elements/mixins/apollo-query-mixin';
import { NetworkStatus } from '@apollo/client/core';

import { StampinoElement, property } from './stampino-element';

declare global { interface HTMLElementTagNameMap { 'apollo-query': ApolloQueryElement } }

export type ApolloQueryModel<D, V> = Pick<ApolloQueryElement<D, V>,
  | 'data'
  | 'error'
  | 'errors'
  | 'loading'
  | 'networkStatus'
>;

/**
 * @element apollo-query
 *
 * Render a GraphQL query to the DOM
 *
 * @example Render a query to Shadow DOM
 * ```html
 * <apollo-query>
 *   <script type="application/graphql">
 *     query MyProfile {
 *       profile { name picture }
 *     }
 *   </script>
 *   <template>
 *     <img loading="lazy" src="{{ data.profile.picture }}" alt="{{ data.profile.name }}"/>
 *   </template>
 * </apollo-query>
 * ```
 *
 * @example Setting query and variables using the DOM
 * ```html
 * <apollo-query id="query-element" template="avatar-template"></apollo-query>
 *
 * <template id="avatar-template">
 *   <img loading="lazy" src="{{ data.profile.picture }}" alt="{{ data.profile.name }}"/>
 * </template>
 *
 * <script type="module">
 *   import { gql } from '@apollo/client/core';
 *   const el = document.getElementById('query-element');
 *   el.query = gql`
 *     query MyProfile($size: Int) {
 *       profile { name picture(size: $size) }
 *     }
 *   `;
 *   el.variables = { size: 48 };
 * </script>
 * ```
 */
export class ApolloQueryElement<D = unknown, V = OperationVariables>
  extends ApolloQueryMixin<Constructor<StampinoElement>>(StampinoElement)<D, V>
  implements ApolloQueryInterface<D, V> {
  static get is(): 'apollo-query' { return 'apollo-query'; }

  @property() data: Data<D>|null = null;

  @property() error: Error|ApolloError|null = null;

  @property() errors: readonly GraphQLError[] = [];

  @property({ reflect: true, init: false }) loading = false;

  @property({ reflect: true, init: NetworkStatus.ready }) networkStatus = NetworkStatus.ready;

  protected get model(): ApolloQueryModel<D, V> {
    const { data, error, errors, loading, networkStatus } = this;
    return { data, error, errors, loading, networkStatus };
  }

  /**
   * Call to render the element's template using the query result.
   * Templates can access `data`, `error`, `errors`, `loading`, and `networkStatus` properties.
   * Rendering is synchronous and incremental.
   *
   * @summary Render the template with the query result.
   */
  public render(): void {
    super.render();
  }
}

customElements.define(ApolloQueryElement.is, ApolloQueryElement);
