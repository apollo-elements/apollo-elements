import gql from 'graphql-tag';
import prop from 'crocks/Maybe/prop';

import { ApolloElement, html } from './apollo-element.js';
export { html } from './apollo-element';

import { validGql } from './graphql-helpers';

/**
 *  ApolloMutation
 *
 * 👩‍🚀 A custom element base class that issues mutations via your Apollo cache.
 *
 * @type {Class}
 * @extends ApolloElement
 */
export class ApolloMutation extends ApolloElement {
  _render() {
    return html`<slot></slot>`;
  }

  get mutation() {
    return this.__mutation ||
    prop('innerText', this.querySelector('[type="application/graphql"]'))
      .map(gql)
      .option(null);
  }

  set mutation(mutation) {
    const valid = validGql(mutation);
    this.__mutation = valid ? mutation : null;
    if (!valid) throw new Error('Mutation must be a gql-parsed document');
  }

  static get properties() {
    return {
      /* If the mutation has been called */
      called: Boolean,
    };
  }

  constructor() {
    super();
    this.client = window.__APOLLO_CLIENT__ || null;
    this.ignoreResults = false;
    this.mostRecentMutationId = 0;
    this.onCompleted = null;
    this.onError = null;
    this.optimisticResponse = null;
    this.update = null;
    this.variables = null;
    this.__explicitlySetMutation = null;
  }

  mutate(opts) {
    const handleMutation = response =>
      (this.onCompletedMutation(response, mutationId), response);
    const handleError = error =>
      (this.onMutationError(error, mutationId), error);

    const { mutation } = this;
    const { optimisticResponse, update, variables } = opts;
    const mutationId = this.generateMutationId();

    this.loading = true;
    this.error = undefined;
    this.data = undefined;
    this.called = true;

    return this.client.mutate({ mutation, variables, optimisticResponse, update, ...opts })
      .then(handleMutation)
      .catch(handleError);
  }

  onCompletedMutation(response, mutationId) {
    const { data } = response;
    if (this.isMostRecentMutation(mutationId) && !this.ignoreResults) {
      this.loading = false;
      this.data = data;
    }
    this.onCompleted &&
    typeof this.onCompleted === 'function' &&
    this.onCompleted(data);
  }

  onMutationError(error, mutationId) {
    if (this.isMostRecentMutation(mutationId)) {
      this.loading = false;
      this.error = error;
    }
    this.onError &&
    typeof this.onError === 'function' &&
    this.onError(error);
  }

  generateMutationId() {
    this.mostRecentMutationId += 1;
    return this.mostRecentMutationId;
  }

  isMostRecentMutation(mutationId) {
    return this.mostRecentMutationId === mutationId;
  }
}

customElements.define('apollo-mutation', ApolloMutation);
