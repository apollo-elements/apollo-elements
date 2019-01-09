export { html } from '@gluon/gluon';
import { GluonElement } from '@gluon/gluon';
import { ApolloElementMixin } from '@apollo-elements/mixins/apollo-element-mixin.js';

/**
 * # ApolloElement
 *
 * Custom Element base class for apollo custom elements.
 *
 * @extends GluonElement
 * @appliesMixin ApolloElementMixin
 */
export class ApolloElement extends ApolloElementMixin(GluonElement) {
  /**
   * The Apollo client.
   * See https://github.com/apollo-elements/apollo-elements#-bundling
   * @type {import('apollo-client').ApolloClient}
   */
  get client() {
    return this.__client;
  }

  set client(client) {
    this.__client = client;
  }

  /**
   * The latest data for the query from the Apollo cache
   * @type {Object}
   */
  get data() {
    return this.__data;
  }

  set data(data) {
    this.__data = data;
    this.render();
  }

  /**
   * The latest error for the query from the Apollo cache
   * @type {Object}
   */
  get error() {
    return this.__error;
  }

  set error(error) {
    this.__error = error;
    this.render();
  }

  /**
   * If the query is currently in-flight.
   * @type {Object}
   */
  set loading(loading) {
    this.__loading = loading;
    this.render();
  }

  get loading() {
    return this.__loading;
  }
}
