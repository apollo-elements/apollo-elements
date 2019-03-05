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
 * @extends ApolloElement
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
}
