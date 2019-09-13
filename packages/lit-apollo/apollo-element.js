export { html } from 'lit-element';
import { LitElement } from 'lit-element';
import { ApolloElementMixin } from '@apollo-elements/mixins/apollo-element-mixin.js';

/** @typedef {import('apollo-client').ApolloClient} ApolloClient */

/**
 * # ApolloElement
 *
 * Custom Element base class for apollo custom elements.
 *
 * @element
 * @polymer
 * @extends LitElement
 * @appliesMixin ApolloElementMixin
 *
 * @template TCacheShape
 * @template TData
 * @inheritdoc
 */
export class ApolloElement extends ApolloElementMixin(LitElement) {
  static get properties() {
    return {
      /**
       * The Apollo client.
       * See https://github.com/apollo-elements/apollo-elements#-bundling
       * @type {ApolloClient<TCacheShape>}
       */
      client: { type: Object },

      /**
       * The latest data for the query from the Apollo cache
       * @type {TData}
       */
      data: { type: Object },

      /**
       * The latest error for the query from the Apollo cache
       * @type {Object}
       */
      error: { type: Object },

      /**
       * If the query is currently in-flight.
       * @type {Object}
       */
      loading: { type: Boolean },
    };
  }
}
