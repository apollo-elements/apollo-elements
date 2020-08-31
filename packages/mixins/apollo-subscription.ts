import type { DocumentNode } from 'graphql/language/ast';
import type {
  ApolloClient,
  SubscriptionOptions,
  ApolloError,
  FetchPolicy,
  ObservableQuery,
} from 'apollo-client';
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

export declare class ApolloSubscription<TData, TVariables> extends ApolloElement<TData> {
  /**
   * Specifies the FetchPolicy to be used for this subscription.
   */
  declare fetchPolicy?: FetchPolicy;

  /**
   * Whether or not to fetch results.
   */
  declare fetchResults?: boolean;

  /**
   * The time interval (in milliseconds) on which this subscription should be refetched from the server.
   */
  declare pollInterval?: number;

  /**
   * Whether or not updates to the network status should trigger next on the observer of this subscription.
   */
  declare notifyOnNetworkStatusChange?: boolean;

  /**
   * Try and fetch new results even if the variables haven't changed (we may still just hit the store, but if there's nothing in there will refetch).
   */
  declare tryFetch?: boolean;

  /**
   * Observable watching this element's subscription.
   */
  declare observable?: Observable<FetchResult<TData>>;

  /**
   * The apollo ObservableQuery watching this element's query.
   */
  declare observableQuery?: ObservableQuery<TData, TVariables>;

  /**
   * A GraphQL document containing a single subscription.
   */
  declare subscription: DocumentNode;

  /**
   * If true, the element will not begin querying data until you manually call `subscribe`
   */
  declare noAutoSubscribe?: boolean;

  /**
   * An object map from variable name to variable value, where the variables are used within the GraphQL subscription.
   */
  declare variables?: TVariables;

  /**
   * Resets the observable and subscribes.
   */
  subscribe(options?: Partial<SubscriptionOptions>): ZenObservable.Subscription;

  onSubscriptionData?(_result: OnSubscriptionDataParams<TData>): void;
}
