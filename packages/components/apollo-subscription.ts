import type { ApolloError, OperationVariables } from '@apollo/client/core';
import type {
  ApolloSubscriptionInterface,
  Constructor,
  Data,
  GraphQLError,
} from '@apollo-elements/interfaces';

import { GraphQLScriptChildMixin } from '@apollo-elements/mixins/graphql-script-child-mixin';
import { ApolloSubscriptionMixin } from '@apollo-elements/mixins/apollo-subscription-mixin';
import { NetworkStatus } from '@apollo/client/core';

import { StampinoRender, property } from './stampino-render';

declare global {
  interface HTMLElementTagNameMap {
    'apollo-subscription': ApolloSubscriptionElement
  }
}

export type ApolloSubscriptionModel<D, V> = Pick<ApolloSubscriptionElement<D, V>,
  | 'data'
  | 'error'
  | 'errors'
  | 'loading'
  | 'networkStatus'
>;

/**
 * @element apollo-subscription
 *
 * Render a GraphQL subscription to the DOM
 *
 * @example Render a subscription to Shadow DOM
 * ```html
 * <apollo-subscription>
 *   <script type="application/graphql">
 *     subscription NewMessages {
 *       messageAdded { id author content }
 *     }
 *   </script>
 *   <template>
 *     <article>
 *       <span class="author-name">{{ data.author.name }}</span>
 *       <mark-down>{{ data.content }}</mark-down>
 *     </article>
 *   </template>
 * </apollo-subscription>
 * ```
 *
 * @example Setting subscription and variables using the DOM
 * ```html
 * <apollo-subscription id="subscription-element" template="message-template"></apollo-subscription>
 *
 * <template id="message-template">
 *   <article>
 *     <span class="author-name">{{ data.author.name }}</span>
 *     <mark-down>{{ data.content }}</mark-down>
 *   </article>
 * </template>
 *
 * <script type="module">
 *   import { gql } from '@apollo/client/core';
 *   const el = document.getElementById('subscription-element');
 *   el.subscription = gql`
 *     subscription NewMessages($limit: Int) {
 *       messagesAdded {
 *         messages { id author content }
 *         hasMore
 *       }
 *     }
 *   `;
 *   el.variables = { limit: 10 };
 * </script>
 * ```
 */
export class ApolloSubscriptionElement<D = unknown, V = OperationVariables> extends
  GraphQLScriptChildMixin(
    ApolloSubscriptionMixin<Constructor<StampinoRender>>(
      StampinoRender
    )
  )<D, V> implements ApolloSubscriptionInterface<D, V> {
  static get is(): 'apollo-subscription' { return 'apollo-subscription'; }

  @property() data: Data<D>|null = null;

  @property() error: Error|ApolloError|null = null;

  @property() errors: readonly GraphQLError[] = [];

  @property({ reflect: true, init: false }) loading = false;

  @property({ reflect: true, init: NetworkStatus.ready }) networkStatus = NetworkStatus.ready;

  protected get model(): ApolloSubscriptionModel<D, V> {
    const { data, error, errors, loading, networkStatus } = this;
    return { data, error, errors, loading, networkStatus };
  }

  /**
   * Call to render the element's template using the subscription result.
   * Templates can access `data`, `error`, `errors`, `loading`, and `networkStatus` properties.
   * Rendering is synchronous and incremental.
   *
   * @summary Render the template with the subscription result.
   */
  public render(): void {
    super.render();
  }
}

customElements.define(ApolloSubscriptionElement.is, ApolloSubscriptionElement);
