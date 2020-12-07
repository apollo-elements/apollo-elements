import type { ApolloQueryInterface, Constructor } from '@apollo-elements/interfaces';

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
 * See [[`ApolloQueryInterface`]] for more information on events
 *
 */
export class ApolloQuery<D = unknown, V = OperationVariables>
  // have to cast because of the TypeScript bug which causes the error in apollo-element-mixin
  extends ApolloQueryMixin(ApolloElement as Constructor<ApolloElement<any, any>>)<D, V>
  implements ApolloQueryInterface<D, V> {
  @attr({ converter: nullableNumberConverter }) networkStatus: NetworkStatus = NetworkStatus.ready;
}
