import type { ApolloQueryInterface, Constructor } from '@apollo-elements/interfaces';
import type { OperationVariables } from '@apollo/client/core';
import { NetworkStatus } from '@apollo/client/core';

import { property } from 'lit-element';

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
  // have to cast because of the TypeScript bug which causes the error in apollo-element-mixin
  extends ApolloQueryMixin(ApolloElement as Constructor<ApolloElement>)<D, V>
  implements ApolloQueryInterface<D, V> {
  @property({ type: Number }) networkStatus = NetworkStatus.ready;
}
