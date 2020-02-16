import type { ApolloError } from 'apollo-client';

export { html } from '@gluon/gluon';
import { GluonElement } from '@gluon/gluon';
import { ApolloElementMixin } from '@apollo-elements/mixins/apollo-element-mixin';

/**
 * # ApolloElement
 *
 * Custom Element base class for apollo custom elements.
 */
export class ApolloElement<TData> extends ApolloElementMixin(GluonElement) {
  /**
   * The latest data for the query from the Apollo cache
   */
  get data(): TData { return this.#data; }

  set data(data) {
    this.#data = data;
    this.render();
  }

  #data: TData;

  /**
   * The latest error for the query from the Apollo cache
   */
  get error(): Error | ApolloError { return this.#error; }

  set error(error) {
    this.#error = error;
    this.render();
  }

  #error: Error | ApolloError;

  /**
   * Whether the query is currently in-flight.
   */
  get loading(): boolean { return this.#loading; }

  set loading(loading) {
    this.#loading = loading;
    this.render();
  }

  #loading: boolean;
}
