import type * as C from '@apollo/client/core';

import type {
  ComponentDocument,
  Data,
  MaybeTDN,
  MaybeVariables,
  OnSubscriptionDataParams,
  Variables,
} from '@apollo-elements/core/types';

import { ApolloElement } from './apollo-element.js';

import { attr, nullableNumberConverter } from '@microsoft/fast-element';

import { hosted } from './decorators.js';
import { ApolloSubscriptionBehavior } from '../apollo-subscription-behavior.js';
import { controlled } from '@apollo-elements/core/decorators';

/**
 * `ApolloSubscription`
 *
 * 🚀 FASTElement base class that updates with an Apollo GraphQL subscription.
 *
 * @element
 *
 * See [`ApolloSubscriptionInterface`](https://apolloelements.dev/api/core/interfaces/subscription) for more information on events
 *
 */
export class ApolloSubscription<
  D extends MaybeTDN = MaybeTDN,
  V = MaybeVariables<D>
> extends ApolloElement<D, V> {
  controller = new ApolloSubscriptionBehavior<D, V>(this, null, {
    shouldSubscribe: x => this.readyToReceiveDocument && this.shouldSubscribe(x),
    onData: data => this.onSubscriptionData?.(data),
    onComplete: () => this.onSubscriptionComplete?.(),
    onError: error => this.onError?.(error),
  });

  /** @summary Flags an element that's ready and able to auto subscribe */
  get canAutoSubscribe(): boolean { return this.controller?.canAutoSubscribe ?? false; }

  /**
   * Latest subscription data.
   */
  declare data: Data<D> | null;

  /**
   * An object that maps from the name of a variable as used in the subscription GraphQL document to that variable's value.
   *
   * @summary Subscription variables.
   */
  declare variables: Variables<D, V> | null;

  /**
   * @summary A GraphQL document containing a single subscription.
   */
  @hosted()
  @controlled()
  subscription: ComponentDocument<D> | null = null;

  /**
   * @summary If true, the element will not begin querying data until you manually call `subscribe`
   * @attr no-auto-subscribe
   */
  @hosted({ path: 'options' })
  @controlled({ path: 'options' })
  @attr({ mode: 'boolean', attribute: 'no-auto-subscribe' })
  noAutoSubscribe = false;

  /**
   * @summary Whether or not updates to the network status should trigger next on the observer of this subscription.
   */
  @hosted({ path: 'options' })
  @controlled({ path: 'options' })
  @attr({ mode: 'boolean', attribute: 'notify-on-network-status-change' })
  notifyOnNetworkStatusChange?: boolean;

  /**
   * @summary Determines if your subscription should be unsubscribed and subscribed again.
   */
  @hosted({ path: 'options' })
  @controlled({ path: 'options' })
  @attr({ mode: 'boolean', attribute: 'should-resubscribe' })
  shouldResubscribe = false;

  /**
   * @summary If true, the query will be skipped entirely
   */
  @hosted({ path: 'options' })
  @controlled({ path: 'options' })
  @attr({ mode: 'boolean', attribute: 'skip' }) skip = false;

  /**
   * @summary Error policy for the subscription
   */
  @hosted({ path: 'options' })
  @controlled({ path: 'options' })
  @attr({ attribute: 'error-policy' })
  errorPolicy?: C.ErrorPolicy;

  /**
   * @summary Specifies the FetchPolicy to be used for this subscription.
   * @attr fetch-policy
   */
  @hosted({ path: 'options' })
  @controlled({ path: 'options' })
  @attr({ attribute: 'fetch-policy' })
  fetchPolicy?: C.FetchPolicy;


  /**
   * @summary The time interval (in milliseconds) on which this subscription should be refetched from the server.
   */
  @hosted({ path: 'options' })
  @controlled({ path: 'options' })
  @attr({ converter: nullableNumberConverter, attribute: 'poll-interval' })
  pollInterval?: number;

  /**
   * @summary Resets the observable and subscribes.
   */
  subscribe(...args: Parameters<this['controller']['subscribe']>): void {
    return this.controller.subscribe(...args);
  }

  /**
   * @summary Cancels and clears the subscription
   */
  cancel(): void {
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

  /**
   * Callback for when data is updated
   */
  onSubscriptionData?(result: OnSubscriptionDataParams<Data<D>>): void;

  /**
   * Callback for when error is updated
   */
  onError?(error: C.ApolloError): void;

  /**
   * Callback for when subscription completes.
   */
  onSubscriptionComplete?(): void;
}
