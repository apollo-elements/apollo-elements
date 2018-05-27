import { LitElement } from '@polymer/lit-element';
export { html } from '@polymer/lit-element';

/**
 * @extends LitElement
 * @extends HTMLElement
 */
export class ApolloElement extends LitElement {
  static get properties() {
    return {
      /* Response data */
      data: Object,
      /* Apollo error object */
      error: Object,
      /* If the query is in-flight */
      loading: Boolean,
    };
  }

  constructor() {
    super();
    this.client = window.__APOLLO_CLIENT__ || null;
  }
}
