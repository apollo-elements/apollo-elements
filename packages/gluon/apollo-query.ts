import type * as I from '@apollo-elements/interfaces';

import { ApolloQueryMixin } from '@apollo-elements/mixins/apollo-query-mixin';
import { ApolloElement } from './apollo-element';

export { html } from '@gluon/gluon';

/**
 * 🚀 `ApolloQuery`
 *
 * Custom element base class that connects to your Apollo cache.
 *
 * See [`ApolloQueryInterface`](https://apolloelements.dev/api/interfaces/query) for more information on events
 *
 * @element
 */
export class ApolloQuery<D extends I.MaybeTDN = I.MaybeTDN, V = I.MaybeVariables<D>>
  extends ApolloQueryMixin(ApolloElement as I.Constructor<ApolloElement>)<D, V> {
  /**
   * Latest query data.
   */
  declare data: I.Data<D> | null;

  /**
   * An object that maps from the name of a variable as used in the query GraphQL document to that variable's value.
   *
   * @summary Query variables.
   */
  declare variables: I.Variables<D, V> | null;
}
