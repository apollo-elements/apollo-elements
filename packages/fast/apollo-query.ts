import type * as I from '@apollo-elements/interfaces';

import { ApolloElement } from './apollo-element';
import { NetworkStatus } from '@apollo/client/core';
import { attr, nullableNumberConverter } from '@microsoft/fast-element';
import { ApolloQueryMixin } from '@apollo-elements/mixins/apollo-query-mixin';

import { hosted } from './decorators';

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
export class ApolloQuery<D extends I.MaybeTDN = I.MaybeTDN, V = I.MaybeVariables<D>>
  extends ApolloQueryMixin(ApolloElement as I.Constructor<ApolloElement>)<D, V>
  implements I.ApolloQueryInterface<D, V> {
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

  @hosted()
  @attr({ converter: nullableNumberConverter })
  networkStatus: NetworkStatus = NetworkStatus.ready;

  @hosted({ path: 'options' })
  @attr({ attribute: 'fetch-policy' })
  fetchPolicy?: I.ApolloQueryInterface<D, V>['fetchPolicy'];

  @hosted({ path: 'options' })
  @attr({ attribute: 'next-fetch-policy' })
  nextFetchPolicy?: I.ApolloQueryInterface<D, V>['nextFetchPolicy'];
}
