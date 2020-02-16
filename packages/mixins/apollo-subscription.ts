import type { DocumentNode } from 'graphql/language/ast';
import type { ApolloClient, SubscriptionOptions, ApolloError, FetchPolicy } from 'apollo-client';
import type { FetchResult, Observable } from 'apollo-link';
import type { ApolloElement } from './apollo-element';

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

export interface ApolloSubscription<TData, TVariables> extends ApolloElement<TData> {
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
    subscription: DocumentNode;


    /**
     * An object map from variable name to variable value, where the variables are used within the GraphQL subscription.
     */
    variables: TVariables;

    /**
     * Resets the observable and subscribes.
     */
    subscribe(options?: Partial<SubscriptionOptions>): ZenObservable.Subscription;

    onSubscriptionData?(_result: OnSubscriptionDataParams<TData>): void;
  }
