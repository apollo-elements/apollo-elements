import { ApolloElement } from './apollo-element';
import { ApolloMutationMixin } from '../mixins/apollo-mutation-mixin';
import { Constructor } from '../mixins/constructor';
import { ApolloMutationInterface } from '@apollo-elements/interfaces';

/**
 * # ApolloMutation
 *
 * 👩‍🚀 A custom element base class to issue mutations via your Apollo cache.
 *
 * ## Usage
 *
 * ```js
 * import { ApolloMutation, html } from '@apollo-elements/gluon';
 * import InputMutation from './Input.mutation.graphql';
 *
 * class MutationElement extends ApolloMutation {
 *   mutation = InputMutation;
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
export class ApolloMutation<TData, TVariables>
  extends ApolloMutationMixin(ApolloElement as Constructor<ApolloElement>)<TData, TVariables>
  implements ApolloMutationInterface<TData, TVariables> {
  #called: boolean;

  constructor() {
    super();
    Object.defineProperty(this, 'called', {
      get(this: ApolloMutation<TData, TVariables>): boolean {
        return this.#called;
      },

      set(this: ApolloMutation<TData, TVariables>, called: boolean) {
        this.#called = called;
        this.render();
      },
    });
  }
}
