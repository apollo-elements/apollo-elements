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
 *
 * class MutationElement extends ApolloMutation {
 *   get template() {
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
 * @extends GluonElement
 * @appliesMixin ApolloMutationMixin
 */
export class ApolloMutation extends ApolloMutationMixin(ApolloElement) {
  /**
   * If the mutation has been called
   * @type {Boolean}
   */
  get called() {
    return this.__called;
  }

  set called(called) {
    this.__called = called;
    this.render();
  }
}
