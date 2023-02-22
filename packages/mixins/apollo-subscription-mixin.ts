import type * as C from '@apollo/client/core';

import type {
  ComponentDocument,
  Constructor,
  Data,
  OnSubscriptionDataParams,
  SubscriptionDataOptions,
  Variables,
  VariablesOf,
} from '@apollo-elements/core/types';

import type { ApolloSubscriptionElement } from '@apollo-elements/core/types';

import { ApolloSubscriptionController } from '@apollo-elements/core/apollo-subscription-controller';
import { ApolloElementMixin } from './apollo-element-mixin';
import { dedupeMixin } from '@open-wc/dedupe-mixin';
import { controlled } from '@apollo-elements/core/decorators';

type MixinInstance<B extends Constructor> = B & {
  new <D, V = VariablesOf<D>>(...a: any[]): InstanceType<B> & ApolloSubscriptionElement<D, V>;
  documentType: 'subscription';
}

function ApolloSubscriptionMixinImpl<B extends Constructor>(superclass: B): MixinInstance<B> {
  class MixedApolloSubscriptionElement<D, V = VariablesOf<D>>
    extends ApolloElementMixin(superclass)<D, V> {
    static override documentType = 'subscription' as const;

    static override get observedAttributes(): string[] {
      return [
        ...super.observedAttributes as string[],
        'no-auto-subscribe',
      ];
    }

    /**
     * Latest subscription data.
     */
    declare data: Data<D> | null;

    /**
     * An object map from variable name to variable value, where the variables are used within the GraphQL subscription.
     *
     * Setting variables will initiate the subscription, unless [`noAutoSubscribe`](#noautosubscribe) is also set.
     *
     * @summary Subscription variables.
     */
    declare variables: Variables<D, V> | null;

    controller = new ApolloSubscriptionController<D, V>(this, null, {
      shouldSubscribe: x => this.readyToReceiveDocument && this.shouldSubscribe(x),
      onData: data => this.onSubscriptionData?.(data), /* c8 ignore next */ // covered
      onComplete: () => this.onSubscriptionComplete?.(), /* c8 ignore next */ // covered
      onError: error => this.onError?.(error),
    });

    @controlled() subscription: ComponentDocument<D> | null = null;

    @controlled({ readonly: true }) declare readonly canAutoSubscribe: boolean;

    @controlled({ path: 'options' }) context?: Record<string, unknown>;

    @controlled({ path: 'options' }) fetchPolicy?: C.FetchPolicy;

    @controlled({ path: 'options' }) pollInterval?: number;

    @controlled({
      path: 'options',
      onSet(
        this: ApolloSubscriptionElement,
        value: ApolloSubscriptionElement['noAutoSubscribe']
      ) {
        this.toggleAttribute('no-auto-subscribe', !!value);
      },
    })
      noAutoSubscribe = this.hasAttribute('no-auto-subscribe');

    @controlled({ path: 'options' }) notifyOnNetworkStatusChange?: boolean;

    @controlled({ path: 'options' })
      shouldResubscribe: SubscriptionDataOptions['shouldResubscribe'] = false;

    @controlled({ path: 'options' }) skip = false;

    onSubscriptionData?(_result: OnSubscriptionDataParams<Data<D>>): void

    onSubscriptionComplete?(): void

    onError?(error: C.ApolloError): void

    public subscribe(params?: Partial<SubscriptionDataOptions<D, V>>): void {
      return this.controller.subscribe(params);
    }

    public cancel(): void {
      return this.controller.cancel();
    }

    /**
     * Determines whether the element should attempt to subscribe automatically
     * Override to prevent subscribing unless your conditions are met
     */
    shouldSubscribe(
      options?: Partial<C.SubscriptionOptions<Variables<D, V>, Data<D>>>
    ): boolean {
      return (void options, true);
    }
  }

  return MixedApolloSubscriptionElement as unknown as MixinInstance<B>;
}

/**
 * `ApolloSubscriptionMixin`: class mixin for apollo-subscription elements.
 */
export const ApolloSubscriptionMixin =
  dedupeMixin(ApolloSubscriptionMixinImpl);
