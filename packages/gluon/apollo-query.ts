import type { Constructor, ApolloQueryInterface } from '@apollo-elements/interfaces';

import { NetworkStatus } from '@apollo/client/core';

import { ApolloQueryMixin } from '../mixins/apollo-query-mixin';
import { ApolloElement } from './apollo-element';
export { html } from './apollo-element';

/**
 * 🚀 `ApolloQuery`
 *
 * Custom element base class that connects to your Apollo cache.
 */
export class ApolloQuery<TData, TVariables>
  // have to cast because of the TypeScript bug which causes the error in apollo-element-mixin
  extends ApolloQueryMixin(ApolloElement as Constructor<ApolloElement>)<TData, TVariables>
  implements ApolloQueryInterface<TData, TVariables> {
  protected ___networkStatus = NetworkStatus.ready;
}

Object.defineProperties(ApolloQuery.prototype, {
  networkStatus: {
    configurable: true,
    enumerable: true,

    get(this: ApolloQuery<unknown, unknown>): NetworkStatus {
      return this.___networkStatus;
    },

    set(this: ApolloQuery<unknown, unknown>, networkStatus: NetworkStatus) {
      this.___networkStatus = networkStatus;
      this.render();
    },
  },
});
