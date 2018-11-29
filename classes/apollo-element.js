export { html } from '@polymer/lit-element';
import { LitElement } from '@polymer/lit-element';
import { ApolloElementMixin } from '../mixins/apollo-element-mixin.js';

/**
 * # ApolloElement
 *
 * Custom Element base class for apollo custom elements.
 *
 * @extends LitElement
 * @appliesMixin ApolloElementMixin
 */
export class ApolloElement extends ApolloElementMixin(LitElement) {
  static get properties() {
    return {
      client: { type: Object },
      data: { type: Object },
      error: { type: Object },
      loading: { type: Boolean },
    };
  }
}
