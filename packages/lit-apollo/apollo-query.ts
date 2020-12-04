import { NetworkStatus } from '@apollo/client/core';
import { property } from 'lit-element';

import { ApolloElement } from './apollo-element';
import { ApolloQueryMixin } from '@apollo-elements/mixins/apollo-query-mixin';
import { ApolloQueryInterface, Constructor } from '@apollo-elements/interfaces';

/**
 * `ApolloQuery`
 *
 * 🚀 Custom element base class that connects to your Apollo cache.
 *
 * See [[`ApolloQueryInterface`]] for more information on events
 *
 */
export class ApolloQuery<TData, TVariables>
  // have to cast because of the TypeScript bug which causes the error in apollo-element-mixin
  extends ApolloQueryMixin(ApolloElement as Constructor<ApolloElement>)<TData, TVariables>
  implements ApolloQueryInterface<TData, TVariables> {
  @property({ type: Number }) networkStatus = NetworkStatus.ready;
}
