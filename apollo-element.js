export { html } from '@polymer/lit-element';
import { LitElement } from '@polymer/lit-element';
import { ApolloElementMixin } from './apollo-element-mixin.js';

/**
 * @type {Class}
 * @extends LitElement
 * @extends HTMLElement
 * @mixes ApolloElementMixin
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
