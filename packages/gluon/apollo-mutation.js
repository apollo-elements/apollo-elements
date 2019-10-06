import { ApolloElement } from './apollo-element.js';
import { ApolloMutationMixin } from '@apollo-elements/mixins/apollo-mutation-mixin.js';

/**
 * # ApolloMutation
 *
 * 👩‍🚀 A custom element base class to issue mutations via your Apollo cache.
 *
 * ## Usage
 *
 * ```js
 * import { client } from './apollo-client';
 * import { ApolloMutation, html } from '@apollo-elements/gluon';
 * import mutation from './mutation-element.graphql';
 *
 * class MutationElement extends ApolloMutation {
 *   client = client;
 *   mutation = mutation;
 *   template =  html`<input @keyup="${this.onInput}"/>`
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
 * @appliesMixin ApolloMutationMixin
 * @element
 * @inheritdoc
 */
export class ApolloMutation extends ApolloMutationMixin(ApolloElement) {
  /**
   * If the mutation has been called
   *
   * @return {boolean}
   */
  get called() {
    return this.__called;
  }

  set called(called) {
    this.__called = called;
    this.render();
  }
}
