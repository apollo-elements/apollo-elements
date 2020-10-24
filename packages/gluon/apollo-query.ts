import type { Constructor, ApolloQueryInterface } from '@apollo-elements/interfaces';
import type { GraphQLError } from 'graphql';
import type { ApolloClient, NetworkStatus, NormalizedCacheObject } from '@apollo/client/core';

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
  declare client: ApolloClient<NormalizedCacheObject>;

  declare context?: Record<string, unknown>;

  declare error: Error;

  declare errors: readonly GraphQLError[];

  declare loading: boolean;

  declare networkStatus: NetworkStatus;

  #networkStatus: NetworkStatus;

  constructor() {
    super();
    type This = this;
    Object.defineProperties(this, {
      networkStatus: {
        configurable: true,
        enumerable: true,

        get(this: This): NetworkStatus {
          return this.#networkStatus;
        },

        set(this: This, networkStatus: NetworkStatus) {
          this.#networkStatus = networkStatus;
          this.render();
        },
      },
    });
  }
}
