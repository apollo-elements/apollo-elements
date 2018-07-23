import gql from 'graphql-tag';
import prop from 'crocks/Maybe/prop';

import { ApolloElement, html } from './apollo-element.js';
export { html } from './apollo-element';

import { validGql } from './graphql-helpers';

/** @typedef {"none" | "ignore" | "all"} ErrorPolicy */

/** @typedef {"cache-first" | "cache-and-network" | "network-only" | "cache-only" | "no-cache" | "standby"} FetchPolicy */

/**
 * This function will be called twice over the lifecycle of a mutation. Once at the very beginning if an optimisticResponse was provided. The writes created from the optimistic data will be rolled back before the second time this function is called which is when the mutation has succesfully resolved. At that point update will be called with the actual mutation result and those writes will not be rolled back.
 * The reason a DataProxy is provided instead of the user calling the methods directly on ApolloClient is that all of the writes are batched together at the end of the update, and it allows for writes generated by optimistic data to be rolled back.
 * @typedef {Function} UpdateFunction
 */


/**
 *  ApolloMutation
 *
 * 👩‍🚀 A custom element base class that issues mutations via your Apollo cache.
 *
 * @customElement
 * @type {Class}
 * @extends ApolloElement
 * @extends LitElement
 * @extends HTMLElement
 */
export class ApolloMutation extends ApolloElement {
  _render() {
    return html`<slot></slot>`;
  }

  static get properties() {
    return {
      /* If the mutation has been called */
      called: Boolean,
    };
  }

  /**
   * The mutation.
   * @type {DocumentNode}
   */
  get mutation() {
    return this.__mutation ||
    prop('innerText', this.querySelector('script[type="application/graphql"]'))
      .map(gql)
      .option(null);
  }

  set mutation(mutation) {
    const valid = validGql(mutation);
    this.__mutation = valid ? mutation : null;
    if (!valid) throw new Error('Mutation must be a gql-parsed document');
  }

  constructor() {
    super();
    /**
     * Whether to ignore the results of the mutation.
     * @type {Boolean}
     */
    this.ignoreResults = false;
    /**
     * The ID number of the most recent mutation since the element was instantiated.
     * @type {Number}
     */
    this.mostRecentMutationId = 0;
    /**
     * Callback for when a mutation is completed.
     * @type {Function}
     * @return {any}
     */
    this.onCompleted = () => undefined;
    /**
     * Callback for when an error occurs in mutation.
     * @type {Function}
     * @return {any}
     */
    this.onError = () => undefined;
    /**
     * An object that represents the result of this mutation that will be optimistically stored before the server has actually returned a result. This is most often used for optimistic UI, where we want to be able to see the result of a mutation immediately, and update the UI later if any errors appear.
     * https://www.apollographql.com/docs/react/api/apollo-client.html#ApolloClient.mutate
     * @type {Object}
     */
    this.optimisticResponse = undefined;
    /**
     * @type {UpdateFunction}
     */
    this.update = undefined;
    /**
     * An object that maps from the name of a variable as used in the mutation GraphQL document to that variable's value.
     * @type {Object}
     */
    this.variables = undefined;
    this.__explicitlySetMutation = undefined;
  }

  /**
   * This resolves a single mutation according to the options specified and returns a Promise which is either resolved with the resulting data or rejected with an error.
   * @param  {Object}           opts
   * @param  {Object}           opts.context
   * @param  {ErrorPolicy}      opts.errorPolicy
   * @param  {FetchPolicy}      opts.fetchPolicy
   * @param  {DocumentNode}     opts.mutation
   * @param  {Object|Function}  opts.optimisticResponse
   * @param  {Array<String>}    opts.refetchQueries
   * @param  {UpdateFunction}   opts.update
   * @param  {MutationQueriesReducersMap}    opts.updateQueries
   * @param  {Object}           opts.variables
   * @return {Promise<FetchResult>}
   */
  async mutate({
    context = this.context,
    errorPolicy = this.errorPolicy,
    fetchPolicy = this.fetchPolicy,
    mutation = this.mutation,
    optimisticResponse = this.optimisticResponse,
    refetchQueries = this.refetchQueries,
    update = this.update,
    updateQueries = this.updateQueries,
    variables = this.variables,
  }) {
    const mutationId = this.generateMutationId();

    this.loading = true;
    this.error = undefined;
    this.data = undefined;
    this.called = true;

    try {
      const response = await this.client.mutate({
        context,
        errorPolicy,
        fetchPolicy,
        mutation,
        optimisticResponse,
        refetchQueries,
        update,
        updateQueries,
        variables,
      });

      this.onCompletedMutation(response, mutationId);
      return response;
    } catch (error) {
      this.onMutationError(error, mutationId);
      return error;
    }
  }

  /**
   * Callback for when a mutation is completed.
   * @param  {FetchResult} response
   * @param  {Number} mutationId
   * @return {any}
   * @protected
   */
  onCompletedMutation(response, mutationId) {
    const { data } = response;
    if (this.isMostRecentMutation(mutationId) && !this.ignoreResults) {
      this.loading = false;
      this.data = data;
    }
    return this.onCompleted(data);
  }

  /**
   * Callback for when a mutation fails.
   * @param  {Error} error
   * @param  {Number} mutationId [description]
   * @return {any}
   */
  onMutationError(error, mutationId) {
    if (this.isMostRecentMutation(mutationId)) {
      this.loading = false;
      this.error = error;
    }
    return this.onError(error);
  }

  /**
   * Increments and returns the most recent mutation id.
   * @return {Number}
   */
  generateMutationId() {
    this.mostRecentMutationId += 1;
    return this.mostRecentMutationId;
  }

  /**
   * Returns true when an ID matches the most recent mutation id.
   * @param  {Number}  mutationId
   * @return {Boolean}
   */
  isMostRecentMutation(mutationId) {
    return this.mostRecentMutationId === mutationId;
  }
}

customElements.define('apollo-mutation', ApolloMutation);
