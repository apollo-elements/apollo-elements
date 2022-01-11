import type { Constructor, Data, Variables, VariablesOf } from '@apollo-elements/core/types';

import { ApolloQueryMixin } from '@apollo-elements/mixins/apollo-query-mixin';
import { ApolloElement } from './apollo-element.js';

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
export class ApolloQuery<D = unknown, V = VariablesOf<D>>
  extends ApolloQueryMixin(ApolloElement as Constructor<ApolloElement<unknown>>)<D, V> {
  /** @summary Latest query data. */
  declare data: Data<D> | null;

  /**
   * An object that maps from the name of a variable as used in the query GraphQL document to that variable's value.
   *
   * @summary Query variables.
   */
  declare variables: Variables<D, V> | null;
}
