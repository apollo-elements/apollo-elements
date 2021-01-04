import type {
  ApolloError,
  DocumentNode,
  FetchPolicy,
  FetchResult,
  Observable,
  SubscriptionOptions,
} from '@apollo/client/core';

import type {
  ApolloSubscriptionInterface,
  ComponentDocument,
  Constructor,
  Data,
  OnSubscriptionDataParams,
  SubscriptionDataOptions,
  Variables,
} from '@apollo-elements/interfaces';

import { dedupeMixin } from '@open-wc/dedupe-mixin';

import { ApolloElementMixin } from './apollo-element-mixin';
import { booleanAttr, gqlDocument } from '@apollo-elements/lib/descriptors';

type ApolloSubscriptionResultEvent<TData = unknown> =
  CustomEvent<OnSubscriptionDataParams<TData>>;

declare global {
  interface HTMLElementEventMap {
    'apollo-subscription-result': ApolloSubscriptionResultEvent;
  }
}

type MixinInstance = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new <D = unknown, V = Record<string, any>>(...a: any[]): ApolloSubscriptionInterface<D, V>;
  documentType: 'subscription';
}

function ApolloSubscriptionMixinImpl<B extends Constructor>(superclass: B): MixinInstance & B {
  // @ts-expect-error: it is though
  class ApolloSubscriptionElement<D, V>
    extends ApolloElementMixin(superclass)<D, V> implements ApolloSubscriptionInterface<D, V> {
    static documentType = 'subscription' as const;

    declare subscription: DocumentNode | ComponentDocument<D> | null;

    declare data: Data<D> | null;

    declare variables: Variables<D, V> | null;

    declare fetchPolicy?: FetchPolicy;

    declare pollInterval?: number;

    declare noAutoSubscribe: boolean;

    declare observable?: Observable<FetchResult<Data<D>>>;

    declare observableSubscription?: ZenObservable.Subscription;

    notifyOnNetworkStatusChange = false;

    shouldResubscribe: SubscriptionDataOptions['shouldResubscribe'] = false;

    skip = false;

    onSubscriptionData?(_result: OnSubscriptionDataParams<Data<D>>): void

    onSubscriptionComplete?(): void

    onError?(error: ApolloError): void

    connectedCallback(): void {
      super.connectedCallback?.();
      if (!this.canSubscribe() || !this.shouldSubscribe()) return;
      this.initObservable();
      this.subscribe();
    }

    disconnectedCallback(): void {
      super.disconnectedCallback?.();
      this.cancel();
    }

    documentChanged(document: DocumentNode | ComponentDocument<D>): void {
      this.cancel();

      const query = document;

      if (this.canSubscribe({ query }) && this.shouldSubscribe({ query }))
        this.subscribe();
    }

    variablesChanged(variables: Variables<D, V> | null): void {
      this.cancel();
      if (this.canSubscribe({ variables }) && this.shouldSubscribe({ variables }))
        this.subscribe();
    }

    public subscribe(params?: Partial<SubscriptionDataOptions<D, V>>) {
      this.initObservable(params);

      if (this.observableSubscription && !(params?.shouldResubscribe ?? this.shouldResubscribe))
        return;

      this.loading = true;

      this.observableSubscription =
        this.observable?.subscribe({
          next: this.nextData.bind(this),
          error: this.nextError.bind(this),
          complete: this.onComplete.bind(this),
        });
    }

    public cancel(): void {
      this.endSubscription();
      this.observableSubscription = undefined;
      this.observable = undefined;
    }

    /**
     * Determines whether the element is able to automatically subscribe
     */
    protected canSubscribe(params?: Partial<SubscriptionOptions<this['variables']>>): boolean {
      return (
        !this.noAutoSubscribe &&
        !!this.client &&
        !!(params?.query ?? this.document)
      );
    }

    /**
     * Determines whether the element should attempt to automatically subscribe i.e. begin querying
     *
     * Override to prevent subscribing unless your conditions are met.
     */
    protected shouldSubscribe(params?: Partial<SubscriptionOptions<this['variables']>>): boolean {
      return (void params, true);
    }

    private initObservable(params?: Partial<SubscriptionDataOptions<D, V>>): void {
      const shouldResubscribe = params?.shouldResubscribe ?? this.shouldResubscribe;
      const client = params?.client ?? this.client;
      const skip = params?.skip ?? this.skip;
      // It's better to let Apollo client throw this error
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const query = params?.subscription ?? this.subscription!;
      const variables = params?.variables ?? this.variables ?? undefined;
      const fetchPolicy = params?.fetchPolicy ?? this.fetchPolicy;

      if (!client)
        throw new TypeError('No Apollo client. See https://apolloelements.dev/guides/getting-started/apollo-client/');

      if ((this.observable && !shouldResubscribe) || skip)
        return;

      this.observable =
        client.subscribe<Data<D>, Variables<D, V>>({ query, variables, fetchPolicy });
    }

    /**
     * Sets `data`, `loading`, and `error` on the instance when new subscription results arrive.
     */
    private nextData(result: FetchResult<Data<D>>) {
      const data = result.data ?? null;
      // If we got to this line without a client, it's because of user error
      const client = this.client!; // eslint-disable-line @typescript-eslint/no-non-null-assertion
      const loading = false;
      const error = null;
      const subscriptionData = { data, loading, error };
      const detail = { client, subscriptionData };
      this.dispatchEvent(new CustomEvent('apollo-subscription-result', { detail }));
      this.data = data;
      this.loading = loading;
      this.error = error;
      this.onSubscriptionData?.(detail);
    }

    /**
     * Sets `error` and `loading` on the instance when the subscription errors.
     */
    private nextError(error: ApolloError) {
      this.dispatchEvent(new CustomEvent('apollo-error', { detail: error }));
      this.error = error;
      this.loading = false;
      this.onError?.(error);
    }

    /**
     * Shuts down the subscription
     */
    private onComplete(): void {
      this.onSubscriptionComplete?.();
      this.endSubscription();
    }

    private endSubscription() {
      if (this.observableSubscription) {
        this.observableSubscription.unsubscribe();
        this.observableSubscription = undefined;
      }
    }
  }

  Object.defineProperties(ApolloSubscriptionElement.prototype, {
    subscription: gqlDocument(),
    noAutoSubscribe: booleanAttr('no-auto-subscribe'),
  });

  // @ts-expect-error: it is though
  return ApolloSubscriptionElement;
}

/**
 * `ApolloSubscriptionMixin`: class mixin for apollo-subscription elements.
 */
export const ApolloSubscriptionMixin =
  dedupeMixin(ApolloSubscriptionMixinImpl);
