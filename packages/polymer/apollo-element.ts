import type { ApolloClient, ApolloError, NormalizedCacheObject } from '@apollo/client/core';
import type { ApolloElementInterface } from '@apollo-elements/interfaces';
import type { GraphQLError } from 'graphql';

import { NotifyingElementMixin } from './notifying-element-mixin';
import { ApolloElementMixin } from '@apollo-elements/mixins/apollo-element-mixin';

export class PolymerApolloElement<TData = unknown>
  extends NotifyingElementMixin(ApolloElementMixin(HTMLElement))
  implements ApolloElementInterface<TData> {
  declare client: ApolloClient<NormalizedCacheObject>;

  declare context?: Record<string, unknown>;

  declare data: TData;

  declare error: Error|ApolloError;

  declare errors: readonly GraphQLError[];

  declare loading: boolean;

  #data: TData = null;

  #error: Error = null;

  #loading = false;

  constructor() {
    super();
    Object.defineProperties(this, {
      data: {
        get(this: PolymerApolloElement<TData>): TData {
          return this.#data;
        },

        set(this: PolymerApolloElement<TData>, value) {
          this.#data = value;
          this.notify('data', value);
        },
      },

      error: {
        get(this: PolymerApolloElement<TData>): Error {
          return this.#error;
        },

        set(this: PolymerApolloElement<TData>, value) {
          this.#error = value;
          this.notify('error', value);
        },
      },

      loading: {
        get(this: PolymerApolloElement<TData>): boolean {
          return this.#loading;
        },

        set(this: PolymerApolloElement<TData>, value) {
          this.#loading = value;
          this.notify('loading', value);
        },
      },
    });
  }
}
