import type { NetworkStatus } from '@apollo/client/core';
import type { PropertyDeclarations } from 'lit-element';

import { ApolloElement } from './apollo-element';
import { ApolloQueryMixin } from '@apollo-elements/mixins/apollo-query-mixin';
import { ApolloQueryInterface, Constructor } from '@apollo-elements/interfaces';

/**
 * `ApolloQuery`
 *
 * 🚀 Custom element base class that connects to your Apollo cache.
 */
export class ApolloQuery<TData, TVariables>
  extends ApolloQueryMixin(ApolloElement as Constructor<ApolloElement>)<TData, TVariables>
  implements ApolloQueryInterface<TData, TVariables> {
  declare networkStatus: NetworkStatus;

  declare noAutoSubscribe: boolean;

  static get properties(): PropertyDeclarations {
    return {
      networkStatus: { type: Number },
      noAutoSubscribe: { type: Boolean, attribute: 'no-auto-subscribe' },
    };
  }
}
