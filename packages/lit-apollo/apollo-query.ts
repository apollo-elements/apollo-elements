import type { ApolloQueryInterface, Data, Variables } from '@apollo-elements/interfaces';
import type { OperationVariables } from '@apollo/client/core';

import { NetworkStatus } from '@apollo/client/core';

import { property } from 'lit/decorators.js';

import { ApolloQueryMixin } from '@apollo-elements/mixins/apollo-query-mixin';

import { ApolloElement } from './apollo-element';

/**
 * `ApolloQuery`
 *
 * 🚀 Custom element base class that connects to your Apollo cache.
 *
 * See [`ApolloQueryInterface`](https://apolloelements.dev/api/interfaces/query) for more information on events
 *
 */
export class ApolloQuery<D = unknown, V = OperationVariables>
  extends ApolloQueryMixin(ApolloElement)<D, V>
  implements ApolloQueryInterface<D, V> {
  /**
   * Latest query data.
   */
  declare data: Data<D> | null;

  /**
   * An object that maps from the name of a variable as used in the query GraphQL document to that variable's value.
   *
   * @summary Query variables.
   */
  declare variables: Variables<D, V> | null;

  @property({ type: Number }) networkStatus = NetworkStatus.ready;
}
