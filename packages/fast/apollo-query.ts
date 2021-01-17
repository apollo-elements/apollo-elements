import type {
  ApolloQueryInterface,
  Constructor,
  Data,
  Variables,
} from '@apollo-elements/interfaces';

import { ApolloElement } from './apollo-element';
import { NetworkStatus, OperationVariables } from '@apollo/client/core';
import { attr, nullableNumberConverter } from '@microsoft/fast-element';
import { ApolloQueryMixin } from '@apollo-elements/mixins/apollo-query-mixin';

/**
 * `ApolloQuery`
 *
 * 🚀 Custom element base class that connects to your Apollo cache.
 *
 * @element
 *
 * See [`ApolloQueryInterface`](https://apolloelements.dev/api/interfaces/query) for more information on events
 *
 */
export class ApolloQuery<D = unknown, V = OperationVariables>
  extends ApolloQueryMixin(ApolloElement as Constructor<ApolloElement>)<D, V>
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

  @attr({ converter: nullableNumberConverter }) networkStatus: NetworkStatus = NetworkStatus.ready;

  @attr({ attribute: 'fetch-policy' }) fetchPolicy?: ApolloQueryInterface<D, V>['fetchPolicy'];
}
