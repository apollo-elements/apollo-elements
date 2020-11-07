import type { DocumentNode } from 'graphql';
import type { ApolloElementInterface } from './apollo-element';
import type {
  ApolloClient,
  ApolloError,
  FetchPolicy,
  FetchResult,
  Observable,
  SubscriptionOptions,
  OperationVariables,
  NormalizedCacheObject,
} from '@apollo/client/core';

export interface SubscriptionResult<TData> {
  /** whether the subscription is loading */
  loading: boolean;
  /** subscription data */
  data: TData;
  /** subscription error */
  error: ApolloError;
}

export interface SubscriptionDataOptions<TData = unknown, TVariables = OperationVariables> {
  subscription: DocumentNode;
  variables?: TVariables;
  fetchPolicy?: FetchPolicy;
  shouldResubscribe?:
    | boolean
    | ((options: SubscriptionDataOptions<TData, TVariables>) => boolean);
  client?: ApolloClient<NormalizedCacheObject>;
  skip?: boolean;
}

export interface OnSubscriptionDataParams<TData = unknown> {
  client: ApolloClient<NormalizedCacheObject>;
  subscriptionData: SubscriptionResult<TData>;
}

export declare class ApolloSubscriptionInterface<TData, TVariables>
  extends ApolloElementInterface<TData, TVariables> {
  /**
   * Specifies the FetchPolicy to be used for this subscription.
   */
  declare fetchPolicy: FetchPolicy;

  /**
   * The time interval (in milliseconds) on which this subscription should be refetched from the server.
   */
  declare pollInterval: number;

  /**
   * Whether or not updates to the network status should trigger next on the observer of this subscription.
   */
  declare notifyOnNetworkStatusChange: boolean;

  /**
   * Observable watching this element's subscription.
   */
  declare observable: Observable<FetchResult<TData>>;

  /**
   * Subscription to the observable
   */
  declare observableSubscription: ZenObservable.Subscription;

  /**
   * A GraphQL document containing a single subscription.
   */
  declare subscription: DocumentNode;

  /**
   * If true, the element will not begin querying data until you manually call `subscribe`
   */
  declare noAutoSubscribe: boolean;

  /**
   * An object map from variable name to variable value, where the variables are used within the GraphQL subscription.
   */
  declare variables: TVariables;

  /**
   * If skip is true, the query will be skipped entirely
   */
  declare skip: boolean;

  declare shouldResubscribe: SubscriptionDataOptions['shouldResubscribe'];

  /**
   * Resets the observable and subscribes.
   */
  public subscribe(params?: Partial<SubscriptionDataOptions<TData, TVariables>>): void

  /**
   * Cancels and clears the subscription
   */
  public cancel(): void

  /**
   * Determines whether the element is able to automatically subscribe
   * @protected
   */
  canSubscribe(options?: Partial<SubscriptionOptions>): boolean

  /**
   * Determines whether the element should attempt to subscribe i.e. begin querying
   * Override to prevent subscribing unless your conditions are met
   */
  shouldSubscribe(options?: Partial<SubscriptionOptions>): boolean

  /**
   * Callback for when data is updated
   */
  onSubscriptionData?(result: OnSubscriptionDataParams<TData>): void;

  /**
   * Callback for when error is updated
   */
  onError?(error: ApolloError): void;

  /**
   * Callback for when subscription completes.
   */
  onSubscriptionComplete?(): void;

  /** @private */
  initObservable(params?: Partial<SubscriptionDataOptions<TData, TVariables>>): void;

  /**
   * Sets `data`, `loading`, and `error` on the instance when new subscription results arrive.
   * @private
   */
  nextData(result: FetchResult<TData>): void;

  /**
   * Sets `error` and `loading` on the instance when the subscription errors.
   * @private
   */
  nextError(error: ApolloError): void;

  /**
   * Shuts down the subscription
   * @private
   */
  onComplete(): void;

  /** @private */
  endSubscription(): void;
}
