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

function ApolloSubscriptionMixinImpl<TBase extends Constructor>(superclass: TBase) {
  return class ApolloSubscriptionElement<TData, TVariables>
    extends ApolloElementMixin(superclass)
    implements ApolloSubscriptionInterface<TData, TVariables> {
    declare data: TData;

    declare fetchPolicy: FetchPolicy;

    declare fetchResults: boolean;

    declare pollInterval: number;

    declare noAutoSubscribe: boolean;

    declare observable: Observable<FetchResult<TData>>;

    declare observableSubscription: ZenObservable.Subscription;

    declare subscription: DocumentNode;

    declare variables: TVariables;

    declare skip: boolean;

    notifyOnNetworkStatusChange = false;

    onSubscriptionData?(_result: OnSubscriptionDataParams<TData>): void

    onSubscriptionComplete?(): void

    onError?(error: ApolloError): void

    /** @private */
    __variables: TVariables = null;

    constructor() {
      super();
      type This = this;
      Object.defineProperties(this, {
        subscription: {
          configurable: true,
          enumerable: true,

          get(this: This): DocumentNode {
            return this.document;
          },

          set(this: This, subscription) {
            try {
              this.document = subscription;
            } catch (error) {
              throw new TypeError('Subscription must be a gql-parsed DocumentNode');
            }

            this.cancel();

            const query = subscription;

            if (this.canSubscribe({ query }) && this.shouldSubscribe({ query }))
              this.subscribe();
          },
        },

        variables: {
          configurable: true,
          enumerable: true,

          get(this: This): TVariables {
            return this.__variables;
          },

          set(this: This, variables: TVariables) {
            this.__variables = variables;
            this.cancel();
            if (this.canSubscribe({ variables }) && this.shouldSubscribe({ variables }))
              this.subscribe();
          },
        },

        noAutoSubscribe: {
          configurable: true,
          enumerable: true,

          get(this: This): boolean {
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
    }

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

    public subscribe(params?: Partial<SubscriptionDataOptions<TData, TVariables>>) {
      this.initObservable(params);

      if (this.observableSubscription)
        return;

      this.observableSubscription =
        this.observable.subscribe({
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
      if (this.observable || (params?.skip ?? this.skip))
        return;

      this.observable =
        this.client.subscribe({
          query: params?.subscription ?? this.subscription,
          variables: params?.variables ?? this.variables,
          fetchPolicy: params?.fetchPolicy ?? this.fetchPolicy,
        });
    }

    /**
     * Sets `data`, `loading`, and `error` on the instance when new subscription results arrive.
     * @private
     */
    nextData(result: FetchResult<TData>) {
      const { data } = result;
      const { client } = this;
      const loading = false;
      const error = null;
      const subscriptionData = { data, loading, error };
      this.onSubscriptionData?.({ client, subscriptionData });
      this.data = data;
      this.loading = loading;
      this.error = error;
    }

    /**
     * Sets `error` and `loading` on the instance when the subscription errors.
     * @private
     */
    nextError(error: ApolloError) {
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
  };
}

/**
 * `ApolloSubscriptionMixin`: class mixin for apollo-subscription elements.
 */
export const ApolloSubscriptionMixin =
  dedupeMixin(ApolloSubscriptionMixinImpl);
