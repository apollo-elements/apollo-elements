import type { DocumentNode } from 'graphql/language/ast';

import type {
  ApolloError,
  FetchPolicy,
  FetchResult,
  Observable,
  SubscriptionOptions,
} from '@apollo/client/core';

import type {
  Constructor,
  ApolloSubscriptionInterface,
  OnSubscriptionDataParams,
  SubscriptionDataOptions,
} from '@apollo-elements/interfaces';

import { dedupeMixin } from '@open-wc/dedupe-mixin';

import { ApolloElementMixin } from './apollo-element-mixin';

type ApolloSubscriptionResultEvent<TData = unknown> =
  CustomEvent<OnSubscriptionDataParams<TData>>;

declare global {
  interface HTMLElementEventMap {
    'apollo-subscription-result': ApolloSubscriptionResultEvent;
  }
}

function ApolloSubscriptionMixinImpl<TBase extends Constructor>(superclass: TBase) {
  class ApolloSubscriptionElement<TData, TVariables>
    extends ApolloElementMixin(superclass)<TData, TVariables>
    implements ApolloSubscriptionInterface<TData, TVariables> {
    static documentType = 'subscription';

    declare data: TData | null;

    declare fetchPolicy?: FetchPolicy;

    declare pollInterval?: number;

    declare noAutoSubscribe: boolean;

    declare observable?: Observable<FetchResult<TData>>;

    declare observableSubscription?: ZenObservable.Subscription;

    declare subscription: DocumentNode | null;

    declare variables: TVariables | null;

    notifyOnNetworkStatusChange = false;

    shouldResubscribe: SubscriptionDataOptions['shouldResubscribe'] = false;

    skip = false;

    onSubscriptionData?(_result: OnSubscriptionDataParams<TData>): void

    onSubscriptionComplete?(): void

    onError?(error: ApolloError): void

    /** @protected */
    connectedCallback(): void {
      super.connectedCallback();
      if (!this.canSubscribe() || !this.shouldSubscribe()) return;
      this.initObservable();
      this.subscribe();
    }

    /** @protected */
    disconnectedCallback(): void {
      super.disconnectedCallback();
      this.cancel();
    }

    documentChanged(document: DocumentNode): void {
      this.cancel();

      const query = document;

      if (this.canSubscribe({ query }) && this.shouldSubscribe({ query }))
        this.subscribe();
    }

    variablesChanged(variables: TVariables): void {
      this.cancel();
      if (this.canSubscribe({ variables }) && this.shouldSubscribe({ variables }))
        this.subscribe();
    }

    public subscribe(params?: Partial<SubscriptionDataOptions<TData, TVariables>>) {
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
     * @protected
     */
    canSubscribe(options?: Partial<SubscriptionOptions>): boolean {
      return (
        !this.noAutoSubscribe &&
        !!this.client &&
        !!(options?.query ?? this.document)
      );
    }

    /**
     * Determines whether the element should attempt to automatically subscribe i.e. begin querying
     *
     * Override to prevent subscribing unless your conditions are met.
     */
    shouldSubscribe(options?: Partial<SubscriptionOptions>): boolean {
      return (void options, true);
    }

    /** @private */
    initObservable(params?: Partial<SubscriptionDataOptions<TData, TVariables>>): void {
      const shouldResubscribe = params?.shouldResubscribe ?? this.shouldResubscribe;
      const client = params?.client ?? this.client;
      const skip = params?.skip ?? this.skip;
      // It's better to let Apollo client throw this error
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const query = params?.subscription ?? this.subscription!;
      const variables = params?.variables ?? this.variables;
      const fetchPolicy = params?.fetchPolicy ?? this.fetchPolicy;

      if (!client)
        throw new TypeError('No Apollo client. See https://apolloelements.dev/pages/guides/getting-started/apollo-client.html');

      if ((this.observable && !shouldResubscribe) || skip)
        return;

      this.observable =
        client.subscribe({ query, variables, fetchPolicy });
    }

    /**
     * Sets `data`, `loading`, and `error` on the instance when new subscription results arrive.
     * @private
     */
    nextData(result: FetchResult<TData>) {
      const data = result.data ?? null;
      // If we got to this line without a client, it's because of user error
      const client = this.client!; // eslint-disable-line @typescript-eslint/no-non-null-assertion
      const loading = false;
      const error = null;
      const subscriptionData = { data, loading, error };
      const detail = { client, subscriptionData };
      this.dispatchEvent(new CustomEvent('apollo-subscription-result', { detail }));
      this.onSubscriptionData?.(detail);
      this.data = data;
      this.loading = loading;
      this.error = error;
    }

    /**
     * Sets `error` and `loading` on the instance when the subscription errors.
     * @private
     */
    nextError(error: ApolloError) {
      this.dispatchEvent(new CustomEvent('apollo-error', { detail: error }));
      this.error = error;
      this.loading = false;
      this.onError?.(error);
    }

    /**
     * Shuts down the subscription
     * @private
     */
    onComplete(): void {
      this.onSubscriptionComplete?.();
      this.endSubscription();
    }

    /** @private */
    endSubscription() {
      if (this.observableSubscription) {
        this.observableSubscription.unsubscribe();
        this.observableSubscription = undefined;
      }
    }
  }

  Object.defineProperties(ApolloSubscriptionElement.prototype, {
    subscription: {
      configurable: true,
      enumerable: true,

      get(this: ApolloSubscriptionElement<unknown, unknown>): DocumentNode | null {
        return this.document;
      },

      set(this: ApolloSubscriptionElement<unknown, unknown>, subscription) {
        this.document = subscription;
      },
    },

    noAutoSubscribe: {
      configurable: true,
      enumerable: true,

      get(this: ApolloSubscriptionElement<unknown, unknown>): boolean {
        return this.hasAttribute('no-auto-subscribe');
      },

      set(v: boolean) {
        if (v)
          this.setAttribute('no-auto-subscribe', '');
        else
          this.removeAttribute('no-auto-subscribe');
      },
    },
  });

  return ApolloSubscriptionElement;
}

/**
 * `ApolloSubscriptionMixin`: class mixin for apollo-subscription elements.
 */
export const ApolloSubscriptionMixin =
  dedupeMixin(ApolloSubscriptionMixinImpl);
