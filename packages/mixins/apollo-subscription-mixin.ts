import type { ReactiveControllerHost } from '@lit/reactive-element';

import type * as C from '@apollo/client/core';

import type * as I from '@apollo-elements/interfaces';

import { dedupeMixin } from '@open-wc/dedupe-mixin';

import { ApolloElementMixin } from './apollo-element-mixin';
import { controlled } from '@apollo-elements/core/decorators';

import { ApolloSubscriptionController } from '@apollo-elements/core/apollo-subscription-controller';
import { update } from '@apollo-elements/core/apollo-controller';

type P<T extends ApolloSubscriptionController<any, any>, K extends keyof T> =
  T[K] extends (...args: any[]) => unknown
  ? Parameters<T[K]>
  : never

type ApolloSubscriptionResultEvent<TData = unknown> =
  CustomEvent<I.OnSubscriptionDataParams<TData>>;

declare global {
  interface HTMLElementEventMap {
    'apollo-subscription-result': ApolloSubscriptionResultEvent;
  }
}

type MixinInstance<B> = B & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new <D extends I.MaybeTDN = I.MaybeTDN, V = I.MaybeVariables<D>>(...a: any[]):
    I.ApolloSubscriptionInterface<D, V> & ReactiveControllerHost;
  documentType: 'subscription';
}

function ApolloSubscriptionMixinImpl<B extends I.Constructor>(base: B): MixinInstance<B> {
  class ApolloSubscriptionElement<D extends I.MaybeTDN = I.MaybeTDN, V = I.MaybeVariables<D>>
    extends ApolloElementMixin(base)<D, V>
    implements Omit<I.ApolloSubscriptionInterface<D, V>, 'canSubscribe'> {
    static override documentType = 'subscription' as const;

    static override get observedAttributes(): string[] {
      return [
        ...super.observedAttributes ?? [],
        'no-auto-subscribe',
      ];
    }

    /**
     * Latest subscription data.
     */
    declare data: I.Data<D> | null;

    /**
     * An object map from variable name to variable value, where the variables are used within the GraphQL subscription.
     *
     * Setting variables will initiate the subscription, unless [`noAutoSubscribe`](#noautosubscribe) is also set.
     *
     * @summary Subscription variables.
     */
    declare variables: I.Variables<D, V> | null;

    controller = new ApolloSubscriptionController<D, V>(this, null, {
      [update]: (properties: Partial<this>) => this[update]?.(properties),
      shouldSubscribe: x => this.readyToReceiveDocument && this.shouldSubscribe(x),
      onData: data => this.onSubscriptionData?.(data),
      onComplete: () => this.onSubscriptionComplete?.(),
      onError: error => this.onError?.(error),
    });

    @controlled() subscription: I.ComponentDocument<D> | null = null;

    @controlled({ readonly: true }) declare readonly canAutoSubscribe: boolean;

    @controlled({ path: 'options' }) context?: Record<string, unknown>;

    @controlled({ path: 'options' }) fetchPolicy?: C.FetchPolicy;

    @controlled({ path: 'options' }) pollInterval?: number;

    @controlled({
      path: 'options',
      onSet(
        this: I.ApolloSubscriptionElement,
        value: I.ApolloSubscriptionElement['noAutoSubscribe']
      ) {
        this.toggleAttribute('no-auto-subscribe', !!value);
      },
    })
    noAutoSubscribe = this.hasAttribute('no-auto-subscribe');

    @controlled({ path: 'options' }) notifyOnNetworkStatusChange?: boolean;

    @controlled({ path: 'options' })
    shouldResubscribe: I.SubscriptionDataOptions['shouldResubscribe'] = false;

    @controlled({ path: 'options' }) skip = false;

    onSubscriptionData?(_result: I.OnSubscriptionDataParams<I.Data<D>>): void

    onSubscriptionComplete?(): void

    onError?(error: C.ApolloError): void

    public subscribe(...p: P<this['controller'], 'subscribe'>): void {
      return this.controller.subscribe(...p);
    }

    public cancel(): void {
      return this.controller.cancel();
    }

    /**
     * Determines whether the element should attempt to subscribe automatically
     * Override to prevent subscribing unless your conditions are met
     * @override
     */
    shouldSubscribe(
      options?: Partial<C.SubscriptionOptions<I.Variables<D, V>, I.Data<D>>>
    ): boolean {
      return (void options, true);
    }
  }

  return ApolloSubscriptionElement;
}

/**
 * `ApolloSubscriptionMixin`: class mixin for apollo-subscription elements.
 */
export const ApolloSubscriptionMixin =
  dedupeMixin(ApolloSubscriptionMixinImpl);
