import type { ApolloError } from '@apollo/client/core';
import type { ApolloElementInterface, Constructor } from '@apollo-elements/interfaces';
import { DocumentNode, GraphQLError } from 'graphql';

export { html } from '@gluon/gluon';
import { GluonElement } from '@gluon/gluon';
import { ApolloElementMixin } from '@apollo-elements/mixins/apollo-element-mixin';

/**
 * # ApolloElement
 *
 * Gluon base class for apollo custom elements.
 */
export class ApolloElement<TData = unknown, TVariables = unknown>
  // have to cast because of the TypeScript bug which causes the error in apollo-element-mixin
  extends ApolloElementMixin(GluonElement as Constructor<GluonElement>)<TData, TVariables>
  implements ApolloElementInterface<TData> {
  /** The apollo client instance. */
  protected __document: DocumentNode | null = null;

  protected __data: TData | null= null;

  protected __error: Error | ApolloError | null = null;

  protected __errors: readonly GraphQLError[] | null = null;

  protected __loading = false;
}

Object.defineProperties(ApolloElement.prototype, {
  data: {
    configurable: true,
    enumerable: true,

    get(this: ApolloElement) {
      return this.__data;
    },

    set(this: ApolloElement, data) {
      this.__data = data;
      this.render();
    },
  },

  error: {
    configurable: true,
    enumerable: true,

    get(this: ApolloElement) {
      return this.__error;
    },

    set(this: ApolloElement, error) {
      this.__error = error;
      this.render();
    },
  },

  errors: {
    configurable: true,
    enumerable: true,

    get(this: ApolloElement) {
      return this.__error;
    },

    set(this: ApolloElement, error) {
      this.__error = error;
      this.render();
    },
  },

  loading: {
    configurable: true,
    enumerable: true,

    get(this: ApolloElement) {
      return this.__loading;
    },

    set(this: ApolloElement, loading) {
      this.__loading = loading;
      this.render();
    },
  },
});
