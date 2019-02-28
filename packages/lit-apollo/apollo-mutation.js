import { ApolloElement } from './apollo-element.js';
import { ApolloMutationMixin } from '@apollo-elements/mixins/apollo-mutation-mixin.js';

/**
 * # ApolloMutation
 *
 * 👩‍🚀 A custom element base class to issue mutations via your Apollo cache.
 *
 * ## 👩‍🚀 Usage
 *
 * ```js
 * import { client } from './apollo-client';
 * import { ApolloMutation, html } from 'lit-apollo';
 *
 * class MutationElement extends ApolloMutation {
 *   render() {
 *     return html`<input on-input="${this.onInput.bind(this)}"
 *   }
 *
 *   constructor() {
 *     super();
 *     this.client = client;
 *     this.mutation = gql`
 *       mutation InputMutation {
 *         updateInput {
 *           input
 *         }
 *       }
 *     `;
 *   }
 *
 *   onInput(event) {
 *     const { mutation } = this;
 *     const variables = { input: event.target.value };
 *     return this.mutate({
 *       mutation,
 *       variables,
 *     });
 *   }
 * };
 *
 * customElements.define('mutation-element', MutationElement)
 * ```
 *
 * @polymer
 * @extends LitElement
 * @appliesMixin ApolloMutationMixin
 */
export class ApolloMutation extends ApolloMutationMixin(ApolloElement) {
  static get properties() {
    return {
      /**
       * If the mutation has been called
       * @type {Boolean}
       */
      called: { type: Boolean },
    };
  }

  /**
   * This resolves a single mutation according to the options specified and returns
   * a Promise which is either resolved with the resulting data or rejected with an
   * error.
   *
   * NOTE: this `LitElement` version passes `this.onUpdate` as the update function
   * by default, instead of `this.update`, which is provided by `LitElement`.
   *
   * @param  {Object}           params
   * @param  {Object}           params.context
   * @param  {ErrorPolicy}      params.errorPolicy
   * @param  {FetchPolicy}      params.fetchPolicy
   * @param  {DocumentNode}     params.mutation
   * @param  {Object|Function}  params.optimisticResponse
   * @param  {Array<string>}    params.refetchQueries
   * @param  {UpdateFunction}   params.update
   * @param  {boolean}          params.awaitRefetchQueries
   * @param  {Object}           params.variables
   * @return {Promise<FetchResult>}
   */
  async mutate({ update = this.onUpdate || null, ...opts } = {}) {
    return super.mutate({ update, ...opts });
  }
}
