import type { ComponentDocument, VariablesOf } from '@apollo-elements/core/types';
import type { OperationVariables } from '@apollo/client/core';

import { GraphQLScriptChildMixin } from '@apollo-elements/mixins/graphql-script-child-mixin';

import { ApolloElement } from './apollo-element.js';

import { ApolloSubscriptionController } from '@apollo-elements/core/apollo-subscription-controller';

import { controlled } from '@apollo-elements/core/decorators';

import { customElement, state, property } from '@lit/reactive-element/decorators.js';

declare global { interface HTMLElementTagNameMap {
  'apollo-subscription': ApolloSubscriptionElement<any>
} }

/**
 * Render a GraphQL subscription to the DOM
 *
 * @example <caption>Render a subscription to Shadow DOM</caption>
 * ```html
 *          <apollo-subscription>
 *            <script type="application/graphql">
 *              subscription NewMessages {
 *                messageAdded { id author content }
 *              }
 *            </script>
 *            <template>
 *              <article>
 *                <span class="author-name">{{ data.author.name }}</span>
 *                <mark-down>{{ data.content }}</mark-down>
 *              </article>
 *            </template>
 *          </apollo-subscription>
 * ```
 *
 * @example <caption>Setting subscription and variables using the DOM</caption>
 * ```html
 *          <apollo-subscription id="subscription-element" template="message-template"></apollo-subscription>
 *
 *          <template id="message-template">
 *            <article>
 *              <span class="author-name">{{ data.author.name }}</span>
 *              <mark-down>{{ data.content }}</mark-down>
 *            </article>
 *          </template>
 *
 *          <script type="module">
 *            import { gql } from '@apollo/client/core';
 *            const el = document.getElementById('subscription-element');
 *            el.subscription = gql`
 *              subscription NewMessages($limit: Int) {
 *                messagesAdded {
 *                  messages { id author content }
 *                  hasMore
 *                }
 *              }
 *            `;
 *            el.variables = { limit: 10 };
 *          </script>
 * ```
 */
@customElement('apollo-subscription')
export class ApolloSubscriptionElement<D = unknown, V extends OperationVariables = VariablesOf<D>>
  extends GraphQLScriptChildMixin(ApolloElement)<D, V> {
  static readonly is = 'apollo-subscription';

  controller = new ApolloSubscriptionController<D, V>(this);

  /** @summary Flags an element that's ready and able to auto subscribe */
  get canAutoSubscribe(): boolean { return this.controller?.canAutoSubscribe ?? false; }

  /**
   * @summary A GraphQL document containing a single subscription.
   */
  @controlled() @state() subscription: null | ComponentDocument<D> = null;

  /** @summary Context passed to the link execution chain. */
  @controlled({ path: 'options' }) @state() context?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

  /**
   * @summary If true, the element will not begin querying data until you manually call `subscribe`
   * @attr no-auto-subscribe
   */
  @controlled({ path: 'options' })
  @property({ type: Boolean, attribute: 'no-auto-subscribe' })
    noAutoSubscribe = false;

  /**
   * @summary Whether or not updates to the network status should trigger next on the observer of this subscription.
   */
  @controlled({ path: 'options' })
  @property({ type: Boolean, attribute: 'notify-on-network-status-change' })
    notifyOnNetworkStatusChange = false;

  /**
   * @summary Determines if your subscription should be unsubscribed and subscribed again.
   */
  @controlled({ path: 'options' })
  @property({ type: Boolean, attribute: 'should-resubscribe' })
    shouldResubscribe = false;

  /**
   * @summary If true, the query will be skipped entirely
   */
  @controlled({ path: 'options' })
  @property({ type: Boolean, attribute: 'skip' }) skip = false;

  /**
   * @summary Error policy for the subscription
   */
  @controlled({ path: 'options' })
  @property({ attribute: 'error-policy' })
    errorPolicy?: this['controller']['options']['errorPolicy'];

  /**
   * @summary Specifies the FetchPolicy to be used for this subscription.
   * @attr fetch-policy
   */
  @controlled({ path: 'options' })
  @property({ attribute: 'fetch-policy' })
    fetchPolicy?: this['controller']['options']['fetchPolicy'];

  /**
   * @summary The time interval (in milliseconds) on which this subscription should be refetched from the server.
   */
  @controlled({ path: 'options' })
  @property({ type: Number, attribute: 'poll-interval' })
    pollInterval?: number;

  /**
   * @summary Resets the observable and subscribes.
   */
  subscribe(...args: Parameters<this['controller']['subscribe']>): void {
    return this.controller.subscribe(...args);
  }

  /**
   * @summary Cancels and clears the subscription
   */
  cancel(): void {
    return this.controller.cancel();
  }

  shouldSubscribe?(options?: Partial<this['controller']['options']>): boolean;
}
