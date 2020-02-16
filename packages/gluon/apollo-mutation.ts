import { ApolloElement } from './apollo-element';
import { ApolloMutationMixin } from '@apollo-elements/mixins/apollo-mutation-mixin';

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
 */
export class ApolloMutation<
  TData,
  TVariables,
> extends ApolloMutationMixin(ApolloElement)<TData, TVariables> {
  /**
   * If the mutation has been called
   */
  get called(): boolean {
    return this.#called;
  }

  set called(called) {
    this.#called = called;
    // @ts-expect-error
    this.render();
  }

  #called: boolean;
}
