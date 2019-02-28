export { html } from '@gluon/gluon';
import { GluonElement } from '@gluon/gluon';
import { ApolloElementMixin } from '@apollo-elements/mixins/apollo-element-mixin.js';

/**
 * # ApolloElement
 *
 * Custom Element base class for apollo custom elements.
 *
 * @polymer
 * @extends GluonElement
 * @appliesMixin ApolloElementMixin
 */
export class ApolloElement extends ApolloElementMixin(GluonElement) {
  /**
   * The latest data for the query from the Apollo cache
   *
   * @return {Object}
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
   *
   * @return {Object}
   */
  get error() {
    return this.__error;
  }

  set error(error) {
    this.__error = error;
    this.render();
  }

  /**
   * Whether the query is currently in-flight.
   *
   * @return {boolean}
   */
  get loading() {
    return this.__loading;
  }

  set loading(loading) {
    this.__loading = loading;
    this.render();
  }
}
