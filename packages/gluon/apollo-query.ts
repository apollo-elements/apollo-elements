import type { Constructor, ApolloQueryInterface } from '@apollo-elements/interfaces';
import type { GraphQLError } from 'graphql';
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core';

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
  declare client: ApolloClient<NormalizedCacheObject>;

  declare context?: Record<string, unknown>;

  declare error: Error;

  declare errors: readonly GraphQLError[];

  declare loading: boolean;

  declare networkStatus: NetworkStatus;

  #networkStatus = NetworkStatus.ready;

  constructor() {
    super();
    Object.defineProperties(ApolloQuery.prototype, {
      networkStatus: {
        configurable: true,
        enumerable: true,

        get(this: ApolloQuery<TData, TVariables>): NetworkStatus {
          return this.#networkStatus;
        },

        set(this: ApolloQuery<TData, TVariables>, networkStatus: NetworkStatus) {
          this.#networkStatus = networkStatus;
          this.render();
        },
      },
    });
  }
}
