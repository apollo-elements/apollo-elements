import type { DocumentNode } from 'graphql/language/ast';
import type { ApolloClient, SubscriptionOptions, ApolloError, FetchPolicy } from 'apollo-client';
import type { FetchResult, Observable } from 'apollo-link';
import type { Constructor } from './constructor';

import { stripUndefinedValues } from '@apollo-elements/lib/helpers';
import hasAllVariables from '@apollo-elements/lib/has-all-variables';

import { ApolloElementMixin } from './apollo-element-mixin';
import { dedupeMixin } from '@open-wc/dedupe-mixin';
import bound from 'bind-decorator';

export interface SubscriptionResult<TData> {
  /** whether the subscription is loading */
  loading: boolean;
  /** subscription data */
  data: TData;
  /** subscription error */
  error: ApolloError;
}

export interface OnSubscriptionDataParams<TData> {
  client: ApolloClient<unknown>;
  subscriptionData: { data: TData };
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function ApolloSubscriptionMixinImplementation<
  TBase extends Constructor<HTMLElement>
>(superclass: TBase) {
  /**
   * Class mixin for apollo-subscription elements
   */
  class ApolloSubscription<TData, TVariables> extends ApolloElementMixin(superclass) {
    data: TData;

    /**
     * Specifies the FetchPolicy to be used for this subscription.
     */
    fetchPolicy: FetchPolicy;

    /**
     * Whether or not to fetch results.
     */
    fetchResults: boolean;

    /**
     * The time interval (in milliseconds) on which this subscription should be refetched from the server.
     */
    pollInterval: number;

    /**
     * Whether or not updates to the network status should trigger next on the observer of this subscription.
     */
    notifyOnNetworkStatusChange: boolean;

    /**
     * Try and fetch new results even if the variables haven't changed (we may still just hit the store, but if there's nothing in there will refetch).
     */
    tryFetch: boolean;

    /**
     * Observable watching this element's subscription.
     */
    observable: Observable<FetchResult<TData>>;

    /**
     * A GraphQL document containing a single subscription.
     */
    get subscription(): DocumentNode { return this.document; }

    set subscription(subscription) {
      try {
        this.document = subscription;
      } catch (error) {
        throw new TypeError('Subscription must be a gql-parsed DocumentNode');
      }
      if (subscription && !this.observable) this.subscribe();
    }

    #variables: TVariables

    /**
     * An object map from variable name to variable value, where the variables are used within the GraphQL subscription.
     */
    get variables(): TVariables { return this.#variables; }

    set variables(variables) {
      this.#variables = variables;
      if (!this.observable) this.subscribe();
    }

    /** @protected */
    connectedCallback(): void {
      /* istanbul ignore next */
      super.connectedCallback?.();
      this.subscribe();
    }

    /**
     * Resets the observable and subscribes.
     */
    subscribe(options?: Partial<SubscriptionOptions>): ZenObservable.Subscription {
      const fetchPolicy = options?.fetchPolicy ?? this.fetchPolicy;
      const query = options?.query ?? this.subscription;
      const variables = options?.variables ?? this.variables;
      if (!hasAllVariables({ query, variables })) return;
      const { nextData: next, nextError: error } = this;
      const opts = stripUndefinedValues({ query, variables, fetchPolicy });
      this.observable = this.client.subscribe(opts);
      return this.observable.subscribe({ error, next });
    }

    /**
     * Updates the element with the result of a subscription.
     */
    @bound nextData({ data }: SubscriptionResult<TData>): void {
      const { client } = this;
      const subscriptionData = { data };
      this.onSubscriptionData?.({ client, subscriptionData });
      this.data = data;
      this.loading = false;
      this.error = undefined;
    }

    /**
     * Updates the element with the error when the subscription fails.
     */
    @bound nextError(error: ApolloError): void {
      this.error = error;
      this.loading = false;
      // this is actually covered
      /* istanbul ignore next */
      this.onError?.(error);
    }

    onSubscriptionData?(_result: OnSubscriptionDataParams<TData>): void

    onError?(error: ApolloError): void
  }

  return ApolloSubscription;
}

/**
 * `ApolloSubscriptionMixin`: class mixin for apollo-subscription elements.
 */
export const ApolloSubscriptionMixin = dedupeMixin(ApolloSubscriptionMixinImplementation);
