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
    type This = this;
    Object.defineProperties(this, {
      data: {
        get(this: This): TData {
          return this.#data;
        },

        set(this: This, value) {
          this.#data = value;
          this.notify('data', value);
        },
      },

      error: {
        get(this: This): Error {
          return this.#error;
        },

        set(this: This, value) {
          this.#error = value;
          this.notify('error', value);
        },
      },

      loading: {
        get(this: This): boolean {
          return this.#loading;
        },

        set(this: This, value) {
          this.#loading = value;
          this.notify('loading', value);
        },
      },
    });
  }
}
