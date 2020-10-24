import type { NetworkStatus } from '@apollo/client/core';

import { ApolloElement } from './apollo-element';
import { attr, nullableNumberConverter } from '@microsoft/fast-element';
import { ApolloQueryInterface, Constructor } from '@apollo-elements/interfaces';
import { ApolloQueryMixin } from '@apollo-elements/mixins/apollo-query-mixin';

/**
 * `ApolloQuery`
 *
 * 🚀 Custom element base class that connects to your Apollo cache.
 */
export class ApolloQuery<Data, Variables>
  // have to cast because of the TypeScript bug which causes the error in apollo-element-mixin
  extends ApolloQueryMixin(ApolloElement as Constructor<ApolloElement>)<Data, Variables>
  implements ApolloQueryInterface<Data, Variables> {
  @attr({ converter: nullableNumberConverter }) networkStatus: NetworkStatus;
}
