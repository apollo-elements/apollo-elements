import type {
  Constructor,
  Data,
  MaybeTDN,
  MaybeVariables,
  NextFetchPolicyFunction,
  Variables,
} from '@apollo-elements/core/types';

import type {
  ErrorPolicy,
  WatchQueryFetchPolicy,
} from '@apollo/client/core';

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
export class ApolloQuery<D extends MaybeTDN = MaybeTDN, V = MaybeVariables<D>>
  extends ApolloQueryMixin(ApolloElement as Constructor<ApolloElement>)<D, V> {
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

  @hosted()
  @attr({ converter: nullableNumberConverter })
  networkStatus: NetworkStatus = NetworkStatus.ready;

  @hosted({ path: 'options' })
  @attr({ attribute: 'fetch-policy' })
  fetchPolicy?: WatchQueryFetchPolicy;

  @hosted({ path: 'options' })
  @attr({ attribute: 'error-policy' })
  errorPolicy?: ErrorPolicy;

  @hosted({ path: 'options' })
  @attr({ attribute: 'next-fetch-policy' })
  nextFetchPolicy?: WatchQueryFetchPolicy | NextFetchPolicyFunction<D, V>;

  @hosted({ path: 'options' })
  @attr({ attribute: 'no-auto-subscribe', mode: 'boolean' })
  noAutoSubscribe = false;
}
