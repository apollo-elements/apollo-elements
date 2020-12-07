import type {
  ApolloClient,
  ApolloError,
  DocumentNode,
  FetchPolicy,
  FetchResult,
  NormalizedCacheObject,
  Observable,
  OperationVariables,
  SubscriptionOptions,
} from '@apollo/client/core';

import type { ComponentDocument, Data, Variables } from './operation';
import type { ApolloElementInterface } from './apollo-element';

import { ApolloSubscriptionMixin } from '@apollo-elements/mixins/apollo-subscription-mixin';

export interface SubscriptionResult<TData> {
  /** whether the subscription is loading */
  loading: boolean;
  /** subscription data */
  data: TData | null;
  /** subscription error */
  error: ApolloError | null;
}

export interface SubscriptionDataOptions<D = unknown, V = OperationVariables> {
  subscription: DocumentNode | ComponentDocument<D>;
  variables?: Variables<D, V>;
  fetchPolicy?: FetchPolicy;
  shouldResubscribe?:
    | boolean
    | ((options: SubscriptionDataOptions<D, V>) => boolean);
  client?: ApolloClient<NormalizedCacheObject>;
  skip?: boolean;
}

export interface OnSubscriptionDataParams<TData = unknown> {
  client: ApolloClient<NormalizedCacheObject>;
  subscriptionData: SubscriptionResult<TData>;
}

/**
 * Common interface for subscription elements
 *
 * See [[`ApolloElementInterface`]] for more information on events
 *
 * @element
 *
 * @fires 'apollo-subscription-result' when the subscription updates
 * @fires 'apollo-error' when the query rejects
 */
export declare class ApolloSubscriptionInterface<D, V = OperationVariables>
  extends ApolloElementInterface<D, V> {
  /**
   * Specifies the FetchPolicy to be used for this subscription.
   */
  declare fetchPolicy?: FetchPolicy;

  /**
   * The time interval (in milliseconds) on which this subscription should be refetched from the server.
   */
  declare pollInterval?: number;

  /**
   * Whether or not updates to the network status should trigger next on the observer of this subscription.
   */
  declare notifyOnNetworkStatusChange: boolean;

  /**
   * Observable watching this element's subscription.
   */
  declare observable?: Observable<FetchResult<Data<D>>>;

  /**
   * Subscription to the observable
   */
  declare observableSubscription?: ZenObservable.Subscription;

  /**
   * A GraphQL document containing a single subscription.
   */
  declare subscription: DocumentNode | ComponentDocument<D> | null;

  /**
   * If true, the element will not begin querying data until you manually call `subscribe`
   */
  declare noAutoSubscribe: boolean;

  /**
   * An object map from variable name to variable value, where the variables are used within the GraphQL subscription.
   */
  declare variables: Variables<D, V> | null;

  /**
   * If skip is true, the query will be skipped entirely
   */
  declare skip: boolean;

  declare shouldResubscribe: SubscriptionDataOptions['shouldResubscribe'];

  /**
   * Resets the observable and subscribes.
   */
  public subscribe(params?: Partial<SubscriptionDataOptions<D, V>>): void

  /**
   * Cancels and clears the subscription
   */
  public cancel(): void

  /**
   * Determines whether the element is able to automatically subscribe
   * @protected
   */
  canSubscribe(options?: Partial<SubscriptionOptions<Variables<D, V>, Data<D>>>): boolean

  /**
   * Determines whether the element should attempt to subscribe i.e. begin querying
   * Override to prevent subscribing unless your conditions are met
   */
  shouldSubscribe(options?: Partial<SubscriptionOptions<Variables<D, V>, Data<D>>>): boolean

  /**
   * Callback for when data is updated
   */
  onSubscriptionData?(result: OnSubscriptionDataParams<Data<D>>): void;

  /**
   * Callback for when error is updated
   */
  onError?(error: ApolloError): void;

  /**
   * Callback for when subscription completes.
   */
  onSubscriptionComplete?(): void;

  /** @private */
  initObservable(params?: Partial<SubscriptionDataOptions<D, V>>): void;

  /**
   * Sets `data`, `loading`, and `error` on the instance when new subscription results arrive.
   * @private
   */
  nextData(result: FetchResult<Data<D>>): void;

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

export class ApolloSubscriptionElement<D = unknown, V = OperationVariables>
  extends ApolloSubscriptionMixin(HTMLElement)<D, V> { }
