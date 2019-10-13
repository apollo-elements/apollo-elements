import { ApolloElement } from './apollo-element.js';
import { ApolloMutationMixin } from '@apollo-elements/mixins/apollo-mutation-mixin.js';

/** @typedef {import('apollo-client').MutationUpdaterFn} MutationUpdaterFn */
/** @typedef {import('apollo-client').ErrorPolicy} ErrorPolicy */
/** @typedef {import('apollo-client').FetchPolicy} FetchPolicy */
/** @typedef {import('apollo-client').MutationOptions} MutationOptions */
/** @typedef {import('apollo-link').FetchResult} FetchResult */
/** @typedef {import('graphql/language').DocumentNode} DocumentNode */

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
 * import mutation from './mutation-element.graphql';
 *
 * class MutationElement extends ApolloMutation {
 *   client = client;
 *   mutation = mutation;
 *
 *   render() {
 *     return html`<input @keyup="${this.onInput}"/>`
 *   }
 *
 *   onInput({ target: { value: input }, key }) {
 *     this.variables = { input };
 *     if (key === 'Enter') return this.mutate();
 *   }
 * };
 *
 * customElements.define('mutation-element', MutationElement)
 * ```
 *
 * @polymer
 * @element
 * @extends ApolloElement
 * @appliesMixin ApolloMutationMixin
 * @implements {import('@apollo-elements/mixins/apollo-mutation')<TCacheShape, TData>}
 */
export class ApolloMutation extends ApolloMutationMixin(ApolloElement) {
  static get properties() {
    return {
      /** If the mutation has been called */
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
   * @param  {MutationOptions}                       [params]
   * @return {Promise<FetchResult>}
   */
  async mutate(params) {
    const update = params && params.update || this.onUpdate || null;
    return super.mutate({ update, ...params });
  }
}
