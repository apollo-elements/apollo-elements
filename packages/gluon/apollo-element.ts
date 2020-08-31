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
export class ApolloElement
  extends ApolloElementMixin(GluonElement)
  implements ApolloElementInterface<unknown> {
  /** The apollo client instance. */
  declare client: ApolloClient<NormalizedCacheObject>;

  declare context?: Record<string, unknown>;

  declare data: unknown;

  declare error: Error;

  declare errors: readonly GraphQLError[];

  declare loading: boolean;

  __document: DocumentNode = null;

  __data: unknown = null;

  __error: Error | ApolloError = null;

  __errors: readonly GraphQLError[] = null;

  __loading = false;

  constructor() {
    super();

    Object.defineProperties(this, {
      data: {
        get(this: ApolloElement) {
          return this.__data;
        },

        set(this: ApolloElement, data) {
          this.__data = data;
          this.render();
        },
      },

      error: {
        get(this: ApolloElement) {
          return this.__error;
        },

        set(this: ApolloElement, error) {
          this.__error = error;
          this.render();
        },
      },

      loading: {
        get(this: ApolloElement) {
          return this.__loading;
        },

        set(this: ApolloElement, loading) {
          this.__loading = loading;
          this.render();
        },
      },
    });
  }
}
