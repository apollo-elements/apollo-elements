import type { ReactiveControllerHost } from '@lit/reactive-element';

import type * as C from '@apollo/client/core';

import type * as I from '@apollo-elements/interfaces';

import { NetworkStatus } from '@apollo/client/core';

import { dedupeMixin } from '@open-wc/dedupe-mixin';

import { ApolloElementMixin } from './apollo-element-mixin';
import { controlled } from './controller-host-mixin';

import { ApolloQueryController } from '@apollo-elements/core/apollo-query-controller';

type P<T extends ApolloQueryController, K extends keyof T> =
  T[K] extends (...args: any[]) => unknown
  ? Parameters<T[K]>
  : never

type R<T extends ApolloQueryController, K extends keyof T> =
  T[K] extends (...args: any[]) => unknown
  ? ReturnType<T[K]>
  : never

type ApolloQueryResultEvent<TData = unknown> =
  CustomEvent<C.ApolloQueryResult<TData>>;

declare global {
  interface HTMLElementEventMap {
    'apollo-query-result': ApolloQueryResultEvent;
  }
}

type MixinInstance = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new <D extends I.MaybeTDN = I.MaybeTDN, V = I.MaybeVariables<D>>(...a: any[]):
    I.ApolloQueryInterface<D, V> & ReactiveControllerHost;
  documentType: 'query',
}

function ApolloQueryMixinImpl<B extends I.Constructor>(superclass: B): MixinInstance & B {
  class ApolloQueryElement<D extends I.MaybeTDN = I.MaybeTDN, V = I.MaybeVariables<D>>
    extends ApolloElementMixin(superclass)<D, V>
    implements Omit<I.ApolloQueryInterface<D, V>, 'shouldSubscribe'> {
    static documentType = 'query' as const;

    static get observedAttributes(): string[] {
      return [
        // exists on ApolloElement
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        ...super.observedAttributes!,
        'next-fetch-policy',
        'no-auto-subscribe',
      ];
    }

    controller = new ApolloQueryController<D, V>(this, null, {
      onData: data => this.onData?.(data),
      onError: error => this.onError?.(error),
    });

    /**
     * @summar The latest query data.
     */
    declare data: I.Data<D> | null;

    /**
     * An object map from variable name to variable value, where the variables are used within the GraphQL query.
     *
     * Setting variables will initiate the query, unless [`noAutoSubscribe`](#noautosubscribe) is also set.
     *
     * @summary Query variables.
     */
    declare variables: I.Variables<D, V> | null;

    @controlled({ readonly: true }) readonly partial = false;

    @controlled() networkStatus: NetworkStatus = NetworkStatus.ready;

    @controlled()
    declare options: Partial<C.WatchQueryOptions<I.Variables<D, V>, I.Data<D>>> | null;

    @controlled() query: I.ComponentDocument<D> | null = null;

    @controlled({ path: 'options' }) fetchPolicy?: C.WatchQueryFetchPolicy;

    @controlled({ path: 'options' }) partialRefetch = false;

    @controlled({ path: 'options' }) refetchQueries: I.RefetchQueriesType<D> | null = null;

    @controlled({ path: 'options' }) returnPartialData?: boolean;

    @controlled({
      path: 'options',
      onSet(this: ApolloQueryElement, value: ApolloQueryElement['nextFetchPolicy']) {
        if (value && typeof value !== 'function')
          this.setAttribute('next-fetch-policy', value);
        else
          this.removeAttribute('next-fetch-policy');
      },
    }) nextFetchPolicy?: C.WatchQueryFetchPolicy =
      this.getAttribute('next-fetch-policy') as C.WatchQueryFetchPolicy ?? null;

    @controlled({
      path: 'options',
      onSet(this: ApolloQueryElement, value: ApolloQueryElement['noAutoSubscribe']) {
        this.toggleAttribute('no-auto-subscribe', !!value);
      },
    }) noAutoSubscribe = this.hasAttribute('no-auto-subscribe');

    @controlled({ path: 'options' }) notifyOnNetworkStatusChange?: boolean;

    @controlled({ path: 'options' }) pollInterval?: number;

    onData?(data: I.Data<D>): void

    onError?(error: Error): void

    @controlled({ readonly: true }) readonly canAutoSubscribe = true;

    attributeChangedCallback(name: string, oldVal: string, newVal: string): void {
      super.attributeChangedCallback?.(name, oldVal, newVal);
      // @ts-expect-error: ts is not tracking the static side
      if (super.constructor?.observedAttributes?.includes?.(name))
        return;

      switch (name) {
        case 'next-fetch-policy':
          if (this.nextFetchPolicy != newVal)
            this.nextFetchPolicy = newVal as C.WatchQueryFetchPolicy;
          break;
        case 'no-auto-subscribe':
          this.noAutoSubscribe = newVal != null;
      }
    }

    /**
     * Exposes the [`ObservableQuery#refetch`](https://www.apollographql.com/docs/react/api/apollo-client.html#ObservableQuery.refetch) method.
     *
     * @param variables The new set of variables. If there are missing variables, the previous values of those variables will be used..
     */
    async refetch(variables: I.Variables<D, V>): Promise<C.ApolloQueryResult<I.Data<D>>> {
      return this.controller.refetch(variables);
    }

    /**
     * Determines whether the element should attempt to automatically subscribe i.e. begin querying
     *
     * Override to prevent subscribing unless your conditions are met.
     */
    shouldSubscribe(
      options?: Partial<C.SubscriptionOptions<I.Variables<D, V>, I.Data<D>>>
    ): boolean {
      return (void options, true);
    }

    /**
     * Resets the observableQuery and subscribes.
     * @param params options for controlling how the subscription subscribes
     */
    subscribe(
      params?: Partial<C.SubscriptionOptions<I.Variables<D, V>, I.Data<D>>>
    ): ZenObservable.Subscription {
      return this.controller.subscribe(params);
    }

    /**
     * Lets you pass a GraphQL subscription and updateQuery function
     * to subscribe to more updates for your query.
     *
     * The `updateQuery` parameter is a function that takes the previous query data,
     * then a `{ subscriptionData: TSubscriptionResult }` object,
     * and returns an object with updated query data based on the new results.
     */
    subscribeToMore<TSubscriptionVariables, TSubscriptionData>(
      options: C.SubscribeToMoreOptions<I.Data<D>, TSubscriptionVariables, TSubscriptionData>
    ): void | (() => void) {
      return this.controller.subscribeToMore(options);
    }

    /**
     * Executes a Query once and updates the component with the result
     */
    executeQuery(
      params?: Partial<C.QueryOptions<I.Variables<D, V>, I.Data<D>>>
    ): Promise<C.ApolloQueryResult<I.Data<D>>> {
      return this.controller.executeQuery(params);
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
    async fetchMore(
      params?: Partial<I.FetchMoreParams<D, V>>
    ): Promise<C.ApolloQueryResult<I.Data<D>>> {
      return this.controller.fetchMore(params);
    }
  }

  return ApolloQueryElement;
}


/**
 * `ApolloQueryMixin`: class mixin for apollo-query elements.
 */
export const ApolloQueryMixin =
  dedupeMixin(ApolloQueryMixinImpl);
