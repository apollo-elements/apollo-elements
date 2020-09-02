import type { ApolloClient, ApolloError, NormalizedCacheObject } from '@apollo/client/core';
import type { ApolloElementInterface } from '@apollo-elements/interfaces';
import { DocumentNode, GraphQLError } from 'graphql';

export { html } from '@gluon/gluon';
import { GluonElement } from '@gluon/gluon';
import { ApolloElementMixin } from '@apollo-elements/mixins/apollo-element-mixin';

/**
 * # ApolloElement
 *
 * Gluon base class for apollo custom elements.
 */
export class ApolloElement<TData = unknown>
  extends ApolloElementMixin(GluonElement)
  implements ApolloElementInterface<TData> {
  /** The apollo client instance. */
  declare client: ApolloClient<NormalizedCacheObject>;

  declare context?: Record<string, unknown>;

  declare data: TData;

  declare error: Error;

  declare errors: readonly GraphQLError[];

  declare loading: boolean;

  /** @private */
  __document: DocumentNode = null;

  /** @private */
  __data: TData = null;

  /** @private */
  __error: Error | ApolloError = null;

  /** @private */
  __errors: readonly GraphQLError[] = null;

  /** @private */
  __loading = false;

  constructor() {
    super();

    type This = this;

    Object.defineProperties(this, {
      data: {
        configurable: true,
        enumerable: true,

        get(this: This) {
          return this.__data;
        },

        set(this: This, data) {
          this.__data = data;
          this.render();
        },
      },

      error: {
        configurable: true,
        enumerable: true,

        get(this: This) {
          return this.__error;
        },

        set(this: This, error) {
          this.__error = error;
          this.render();
        },
      },

      loading: {
        configurable: true,
        enumerable: true,

        get(this: This) {
          return this.__loading;
        },

        set(this: This, loading) {
          this.__loading = loading;
          this.render();
        },
      },
    });
  }
}
