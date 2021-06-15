import type {
  ComponentDocument,
  Data,
  MaybeTDN,
  MaybeVariables,
  OnSubscriptionDataParams,
  Variables,
} from '@apollo-elements/core/types';

import type * as C from '@apollo/client/core';

import { ApolloElement } from './apollo-element';

import { ApolloSubscriptionController } from '@apollo-elements/core/apollo-subscription-controller';

import { controlled } from '@apollo-elements/core/decorators';

import { state, property } from '@lit/reactive-element/decorators.js';

/**
 * `ApolloSubscription`
 *
 * 🚀 Custom element base class that updates with an Apollo GraphQL subscription.
 *
 * See [`ApolloSubscriptionInterface`](https://apolloelements.dev/api/core/interfaces/subscription) for more information on events
 *
 */
export class ApolloSubscription<
  D extends MaybeTDN = MaybeTDN,
  V = MaybeVariables<D>
> extends ApolloElement<D, V> {
  static readonly is = 'apollo-subscription';

  controller = new ApolloSubscriptionController<D, V>(this, null, {
    shouldSubscribe: x => this.readyToReceiveDocument && this.shouldSubscribe(x),
    onData: data => this.onSubscriptionData?.(data),
    onComplete: () => this.onSubscriptionComplete?.(),
    onError: error => this.onError?.(error),
  });

  /** @summary Flags an element that's ready and able to auto subscribe */
  get canAutoSubscribe(): boolean { return this.controller?.canAutoSubscribe ?? false; }

  /**
   * @summary A GraphQL document containing a single subscription.
   */
  @controlled() @state() subscription: ComponentDocument<D> | null = null;

  /**
   * @summary If true, the element will not begin querying data until you manually call `subscribe`
   * @attr no-auto-subscribe
   */
  @controlled({ path: 'options' })
  @property({ type: Boolean, attribute: 'no-auto-subscribe' })
  noAutoSubscribe = false;

  /**
   * @summary Whether or not updates to the network status should trigger next on the observer of this subscription.
   */
  @controlled({ path: 'options' })
  @property({ type: Boolean, attribute: 'notify-on-network-status-change' })
  notifyOnNetworkStatusChange?: boolean;

  /**
   * @summary Determines if your subscription should be unsubscribed and subscribed again.
   */
  @controlled({ path: 'options' })
  @property({ type: Boolean, attribute: 'should-resubscribe' })
  shouldResubscribe = false;

  /**
   * @summary If true, the query will be skipped entirely
   */
  @controlled({ path: 'options' })
  @property({ type: Boolean, attribute: 'skip' }) skip = false;

  /**
   * @summary Error policy for the subscription
   */
  @controlled({ path: 'options' })
  @property({ attribute: 'error-policy' })
  errorPolicy?: this['controller']['options']['errorPolicy'];

  /**
   * @summary Specifies the FetchPolicy to be used for this subscription.
   * @attr fetch-policy
   */
  @controlled({ path: 'options' })
  @property({ attribute: 'fetch-policy' })
  fetchPolicy?: this['controller']['options']['fetchPolicy'];

  /**
   * @summary The time interval (in milliseconds) on which this subscription should be refetched from the server.
   */
  @controlled({ path: 'options' })
  @property({ type: Number, attribute: 'poll-interval' })
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
   * @override
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
