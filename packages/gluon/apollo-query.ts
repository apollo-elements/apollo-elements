import type {
  Constructor,
  Data,
  MaybeTDN,
  MaybeVariables,
  Variables,
} from '@apollo-elements/core/types';

import { ApolloQueryMixin } from '@apollo-elements/mixins/apollo-query-mixin';
import { ApolloElement } from './apollo-element';

export { html } from '@gluon/gluon';

/**
 * 🚀 `ApolloQuery`
 *
 * Custom element base class that connects to your Apollo cache.
 *
 * See [`ApolloQueryInterface`](https://apolloelements.dev/api/core/interfaces/query) for more information on events
 *
 * @element
 */
export class ApolloQuery<D extends MaybeTDN = MaybeTDN, V = MaybeVariables<D>>
  extends ApolloQueryMixin(ApolloElement as Constructor<ApolloElement>)<D, V> {
  /** @summary Latest query data. */
  declare data: Data<D> | null;

  /**
   * An object that maps from the name of a variable as used in the query GraphQL document to that variable's value.
   *
   * @summary Query variables.
   */
  declare variables: Variables<D, V> | null;
}
