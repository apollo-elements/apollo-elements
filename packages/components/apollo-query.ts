import type { SubscribeToMoreOptions } from '@apollo/client/core';

import type * as I from '@apollo-elements/interfaces';

import { GraphQLScriptChildMixin } from '@apollo-elements/mixins/graphql-script-child-mixin';

import { ApolloElement } from './apollo-element';

import { ApolloQueryController } from '@apollo-elements/core/apollo-query-controller';

import { NetworkStatus } from '@apollo/client/core';

import { customElement, state, property } from '@lit/reactive-element/decorators.js';

declare global { interface HTMLElementTagNameMap { 'apollo-query': ApolloQueryElement } }

import { bound } from '@apollo-elements/lib/bound';

type P<D extends I.MaybeTDN, V, K extends keyof ApolloQueryController<D, V>> =
  ApolloQueryController<D, V>[K] extends (...args:any[])=> any
  ? Parameters<ApolloQueryController<D, V>[K]>
  : never

type R<D extends I.MaybeTDN, V, K extends keyof ApolloQueryController<D, V>> =
  ApolloQueryController<D, V>[K] extends (...args:any[])=> any
  ? ReturnType<ApolloQueryController<D, V>[K]>
  : never

type PrivateKeys = 'nextError'|'nextData'|'watchQuery'|'shouldSubscribe';

/**
 * @element apollo-query
 *
 * Render a GraphQL query to the DOM
 *
 * @example Render a query to Shadow DOM
 * ```html
 * <apollo-query>
 *   <script type="application/graphql">
 *     query MyProfile {
 *       profile { name picture }
 *     }
 *   </script>
 *   <template>
 *     <img loading="lazy" src="{{ data.profile.picture }}" alt="{{ data.profile.name }}"/>
 *   </template>
 * </apollo-query>
 * ```
 *
 * @example Setting query and variables using the DOM
 * ```html
 * <apollo-query id="query-element" template="avatar-template"></apollo-query>
 *
 * <template id="avatar-template">
 *   <img loading="lazy" src="{{ data.profile.picture }}" alt="{{ data.profile.name }}"/>
 * </template>
 *
 * <script type="module">
 *   import { gql } from '@apollo/client/core';
 *   const el = document.getElementById('query-element');
 *   el.query = gql`
 *     query MyProfile($size: Int) {
 *       profile { name picture(size: $size) }
 *     }
 *   `;
 *   el.variables = { size: 48 };
 * </script>
 * ```
 */
@customElement('apollo-query')
export class ApolloQueryElement<D extends I.MaybeTDN = any, V = I.MaybeVariables<D>> extends
  GraphQLScriptChildMixin(ApolloElement)<D, V>
  implements Omit<I.ApolloQueryInterface<D, V>, PrivateKeys> {
  static readonly is = 'apollo-query';

  controller = new ApolloQueryController<D, V>(this);

  get canAutoSubscribe(): boolean { return this.controller?.canAutoSubscribe ?? false; }
  @state({ controlled: true }) options = {};
  @state({ controlled: true }) networkStatus = NetworkStatus.ready;
  @state({ controlled: true }) query: null | I.ComponentDocument<D> = null;
  @state({ controlled: true }) context?: Record<string, any>;

  @property({ controlled: 'options', type: Boolean, attribute: 'no-auto-subscribe' })
  noAutoSubscribe = false;

  @property({ controlled: 'options', type: Boolean, attribute: 'notify-on-network-status-change' })
  notifyOnNetworkStatusChange = false;

  @property({ controlled: 'options', attribute: 'error-policy' })
  errorPolicy?: this['controller']['options']['errorPolicy'];

  @property({ controlled: 'options', attribute: 'fetch-policy' })
  fetchPolicy?: this['controller']['options']['fetchPolicy'];

  /**
   * Exposes the [`ObservableQuery#refetch`](https://www.apollographql.com/docs/react/api/apollo-client.html#ObservableQuery.refetch) method.
   *
   * @param variables The new set of variables. If there are missing variables, the previous values of those variables will be used..
   */
  @bound public async refetch(...params: P<D, V, 'refetch'>): R<D, V, 'refetch'> {
    return this.controller.refetch(...params);
  }

  /**
   * Resets the observableQuery and subscribes.
   * @param params options for controlling how the subscription subscribes
   */
  @bound public subscribe(...params: P<D, V, 'subscribe'>): R<D, V, 'subscribe'> {
    return this.controller.subscribe(...params);
  }

  /**
   * Lets you pass a GraphQL subscription and updateQuery function
   * to subscribe to more updates for your query.
   *
   * The `updateQuery` parameter is a function that takes the previous query data,
   * then a `{ subscriptionData: TSubscriptionResult }` object,
   * and returns an object with updated query data based on the new results.
   */
   @bound public subscribeToMore<TSubscriptionVariables, TSubscriptionData>(
    options: SubscribeToMoreOptions<I.Data<D>, TSubscriptionVariables, TSubscriptionData>
  ): (() => void) | void {
     return this.controller.subscribeToMore(options);
   }

  /**
   * Executes a Query once and updates the with the result
   */
  @bound public async executeQuery(...params: P<D, V, 'executeQuery'>): R<D, V, 'executeQuery'> {
     return this.controller.executeQuery(...params);
   }

  /**
   * Exposes the `ObservableQuery#fetchMore` method.
   * https://www.apollographql.com/docs/react/api/core/ObservableQuery/#ObservableQuery.fetchMore
   *
   * The optional `updateQuery` parameter is a function that takes the previous query data,
   * then a `{ subscriptionData: TSubscriptionResult }` object,
   * and returns an object with updated query data based on the new results.
   *
   * The optional `variables` parameter is an optional new variables object.
   */
   @bound public async fetchMore(...params: P<D, V, 'fetchMore'>): R<D, V, 'fetchMore'> {
    return this.controller.fetchMore(...params);
  }

  @bound public startPolling(ms: number): void {
     return this.controller.startPolling(ms);
   }

  @bound public stopPolling(): void {
    return this.controller.stopPolling();
  }
}
