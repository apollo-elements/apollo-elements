import { LitElement } from '@polymer/lit-element';

import { ApolloMutationMixin } from '../mixins/apollo-mutation-mixin';

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
 * @extends LitElement
 * @appliesMixin ApolloMutationMixin
 */
export class ApolloMutation extends ApolloMutationMixin(LitElement) {
  static get properties() {
    return {
      /* If the mutation has been called */
      called: Boolean,
    };
  }
}
