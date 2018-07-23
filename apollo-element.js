export { html } from '@polymer/lit-element';
import { LitElement } from '@polymer/lit-element';

/**
 * @extends LitElement
 * @extends HTMLElement
 */
export class ApolloElement extends LitElement {
  static get properties() {
    return {
      client: Object,
      data: Object,
      error: Object,
      loading: Boolean,
    };
  }

  constructor() {
    super();
    /**
     * Context to be passed to link execution chain.
     * @type {Object}
     */
    this.context = undefined;
    /**
     * Latest data.
     * @type {Object}
     */
    this.data = undefined;
    /**
     * Latest error.
     * @type {Object}
     */
    this.error = undefined;
    /**
     * Whether a request is in flight.
     * @type {Boolean}
     */
    this.loading = undefined;
    /**
     * Handle on the apollo client instance.
     * @type {ApolloClient}
     */
    this.client = window.__APOLLO_CLIENT__;
  }
}
