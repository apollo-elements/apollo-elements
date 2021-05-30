import type {
  ApolloClient,
  ApolloError,
  DocumentNode,
  ErrorPolicy,
  FetchPolicy,
  NormalizedCacheObject,
  OperationVariables,
  SubscriptionOptions,
} from '@apollo/client/core';

import type { ComponentDocument, Data, Variables } from './operation';
import type { ApolloElementInterface } from './apollo-element';
import type { ApolloSubscriptionController } from '@apollo-elements/core';
import type * as I from './operation';
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
  context: SubscriptionOptions<V, D>['context'];
  subscription: DocumentNode | ComponentDocument<D>;
  variables?: Variables<D, V>;
  errorPolicy?: ErrorPolicy;
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
 * See [`ApolloElementInterface`](https://apolloelements.dev/api/interfaces/element) for more information on events
 *
 * @element
 *
 * @fires 'apollo-subscription-result' when the subscription updates
 * @fires 'apollo-error' when the query rejects
 *
 * @prop {ApolloMutationInterface<D, V>['onSubscriptionData']} onSubscriptionData
 * @prop {ApolloMutationInterface<D, V>['onSubscriptionComplete']} onSubscriptionComplete
 * @prop {ApolloMutationInterface<D, V>['onError']} onError
 */
export declare abstract class ApolloSubscriptionInterface<
  D extends I.MaybeTDN = I.MaybeTDN,
  V = I.MaybeVariables<D>
> extends ApolloElementInterface {
  declare controller: ApolloSubscriptionController<D, V>;

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

  /**
   * @summary Specifies the FetchPolicy to be used for this subscription.
   * @attr fetch-policy
   */
  declare fetchPolicy?: FetchPolicy;

  /**
   * @summary The time interval (in milliseconds) on which this subscription should be refetched from the server.
   */
  declare pollInterval?: number;

  /**
   * @summary Whether or not updates to the network status should trigger next on the observer of this subscription.
   */
  declare notifyOnNetworkStatusChange?: boolean;

  /**
   * @summary A GraphQL document containing a single subscription.
   */
  declare subscription: DocumentNode | ComponentDocument<D> | null;

  /**
   * @summary If true, the element will not begin querying data until you manually call `subscribe`
   * @attr no-auto-subscribe
   */
  declare noAutoSubscribe: boolean;

  /**
   * @summary If true, the query will be skipped entirely
   */
  declare skip: boolean;

  /**
   * @summary Determines if your subscription should be unsubscribed and subscribed again.
   */
  declare shouldResubscribe: SubscriptionDataOptions['shouldResubscribe'];

  /**
   * @summary Resets the observable and subscribes.
   */
  public subscribe(params?: Partial<SubscriptionDataOptions<D, V>>): void

  /**
   * @summary Cancels and clears the subscription
   */
  public cancel(): void

  /** @summary Flags an element that's ready and able to auto subscribe */
  public get canAutoSubscribe(): boolean;

  /**
   * Determines whether the element should attempt to subscribe automatically
   * Override to prevent subscribing unless your conditions are met
   */
  shouldSubscribe?(
    options?: Partial<SubscriptionOptions<Variables<D, V>, Data<D>>>
  ): boolean

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
}

export class ApolloSubscriptionElement<D extends I.MaybeTDN = I.MaybeTDN, V = I.MaybeVariables<D>>
  extends ApolloSubscriptionMixin(HTMLElement)<D, V> { }
