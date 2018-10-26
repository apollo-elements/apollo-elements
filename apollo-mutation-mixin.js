import { ApolloElementMixin } from './apollo-element-mixin';

import gqlFromInnerText from './lib/gql-from-inner-text.js';
import validGql from './lib/valid-gql.js';

const scriptSelector = 'script[type="application/graphql"]';

/**
 *  ApolloMutation
 *
 * 👩‍🚀 A custom element base class to issue mutations via your Apollo cache.
 *
 * ## Usage
 *
 * ```html
 * <script type="module">
 *   import { client } from './apollo-client';
 *   import { ApolloMutation, html } from 'lit-apollo/apollo-mutation';
 *
 *   class MutationElement extends ApolloMutation {
 *     render({ data }) {
 *       return html`<input on-input="${this.onInput.bind(this)}"
 *     }
 *
 *     constructor() {
 *       super();
 *       this.client = client;
 *       this.mutation = gql`mutation InputMutation {
 *         updateInput {
 *           input
 *         }
 *       }`;
 *     }
 *
 *     onInput(event) {
 *       const { mutation } = this;
 *       const variables = { input: event.target.value };
 *       return this.mutate({
 *         mutation,
 *         variables,
 *         // update,
 *         // optimisticResponse,
 *       });
 *     }
 *   };
 *
 *   customElements.define('mutation-element', MutationElement)
 * </script>
 * ```
 *
 * @customElement
 * @type {Class}
 * @extends ApolloElement
 * @extends LitElement
 * @extends HTMLElement
 */
export const ApolloMutationMixin = superclass => class extends ApolloElementMixin(superclass) {
  /**
   * The mutation.
   * @type {DocumentNode}
   */
  get mutation() {
    return this.__mutation || gqlFromInnerText(this.querySelector(scriptSelector));
  }

  set mutation(mutation) {
    const valid = validGql(mutation);
    this.__mutation = valid ? mutation : null;
    if (!valid) throw new Error('Mutation must be a gql-parsed document');
  }

  constructor() {
    super();
    /** @type {Boolean} Whether to ignore the results of the mutation. */
    this.ignoreResults = false;
    /** @type {Number} The ID number of the most recent mutation since the element was instantiated. */
    this.mostRecentMutationId = 0;
    /**
     * @type {Function} Callback for when a mutation is completed.
     * @return {any}
     */
    this.onCompleted = () => undefined;
    /**
     * @type {Function} Callback for when an error occurs in mutation.
     * @return {any}
     */
    this.onError = () => undefined;
    /** @type {Object} An object that represents the result of this mutation that will be optimistically stored before the server has actually returned a result. This is most often used for optimistic UI, where we want to be able to see the result of a mutation immediately, and update the UI later if any errors appear. */
    this.optimisticResponse = undefined;
    /** @type {UpdateFunction} */
    this.onUpdate = undefined;
    /** @type {Object} An object that maps from the name of a variable as used in the mutation GraphQL document to that variable's value. */
    this.variables = undefined;
    this.__explicitlySetMutation = undefined;
  }

  /**
   * Increments and returns the most recent mutation id.
   * @return {Number}
   * @protected
   */
  generateMutationId() {
    this.mostRecentMutationId += 1;
    return this.mostRecentMutationId;
  }

  /**
   * Returns true when an ID matches the most recent mutation id.
   * @param  {Number}  mutationId
   * @return {Boolean}
   * @protected
   */
  isMostRecentMutation(mutationId) {
    return this.mostRecentMutationId === mutationId;
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
    update = this.onUpdate,
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
   * @protected
   */
  onMutationError(error, mutationId) {
    if (this.isMostRecentMutation(mutationId)) {
      this.loading = false;
      this.error = error;
    }
    return this.onError(error);
  }
};

/** @typedef {"none" | "ignore" | "all"} ErrorPolicy */

/** @typedef {"cache-first" | "cache-and-network" | "network-only" | "cache-only" | "no-cache" | "standby"} FetchPolicy */

/**
 * This function will be called twice over the lifecycle of a mutation. Once at the very beginning if an optimisticResponse was provided. The writes created from the optimistic data will be rolled back before the second time this function is called which is when the mutation has succesfully resolved. At that point update will be called with the actual mutation result and those writes will not be rolled back.
 * The reason a DataProxy is provided instead of the user calling the methods directly on ApolloClient is that all of the writes are batched together at the end of the update, and it allows for writes generated by optimistic data to be rolled back.
 * @typedef {Function} UpdateFunction
 */
