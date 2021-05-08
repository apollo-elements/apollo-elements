import type {
  ApolloSubscriptionInterface,
  ComponentDocument,
  MaybeTDN,
  MaybeVariables,
} from '@apollo-elements/interfaces';

import { GraphQLScriptChildMixin } from '@apollo-elements/mixins/graphql-script-child-mixin';

import { ApolloElement } from './apollo-element';

import { ApolloSubscriptionController } from '@apollo-elements/core/apollo-subscription-controller';

import { customElement, state, property } from '@lit/reactive-element/decorators.js';

declare global { interface HTMLElementTagNameMap {
  'apollo-subscription': ApolloSubscriptionElement
} }

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
@customElement('apollo-subscription')
export class ApolloSubscriptionElement<D extends MaybeTDN = any, V = MaybeVariables<D>>
  extends GraphQLScriptChildMixin(ApolloElement)<D, V>
  implements Omit<ApolloSubscriptionInterface<D, V>, 'nextError'|'nextData'> {
  static readonly is = 'apollo-subscription';

  controller = new ApolloSubscriptionController<D, V>(this, undefined);

  get canAutoSubscribe(): boolean { return this.controller?.canAutoSubscribe ?? false; }

  @state({ controlled: true }) subscription: null | ComponentDocument<D> = null;

  @state({ controlled: true }) context?: Record<string, any>;

  @property({ controlled: 'options', type: Boolean, attribute: 'no-auto-subscribe' })
  noAutoSubscribe = false;

  @property({ controlled: 'options', type: Boolean, attribute: 'notify-on-network-status-change' })
  notifyOnNetworkStatusChange = false;

  @property({ controlled: 'options', type: Boolean, attribute: 'should-resubscribe' })
  shouldResubscribe = false;

  @property({ controlled: 'options', type: Boolean, attribute: 'skip' }) skip = false;

  @property({ controlled: 'options', attribute: 'error-policy' })
  errorPolicy?: this['controller']['options']['errorPolicy'];

  @property({ controlled: 'options', attribute: 'fetch-policy' })
  fetchPolicy?: this['controller']['options']['fetchPolicy'];

  subscribe(...args: Parameters<this['controller']['subscribe']>): void {
    return this.controller.subscribe(...args);
  }

  cancel(): void {
    return this.controller.cancel();
  }

  shouldSubscribe?(options?: Partial<this['controller']['options']>): boolean;
}
