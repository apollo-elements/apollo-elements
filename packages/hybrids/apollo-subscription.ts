import type { Hybrids } from 'hybrids';
import type { ApolloSubscriptionController } from '@apollo-elements/core';
import type * as I from '@apollo-elements/interfaces';

import { ApolloElement } from './apollo-element';
import { subscription } from './factories/subscription';
import { controlled, option, method } from './factories/controlled';

type Omitted =
  |'shouldSubscribe'
  |'canAutoSubscribe'
  |'document'
  |'readyToReceiveDocument'
  |'connectedCallback'
  |'disconnectedCallback'
  |'adoptedCallback'
  |'attributeChangedCallback'

type SubscriptionHybrid = Omit<I.ApolloSubscriptionInterface, Omitted>;

/**
 * Hybrids descriptor bag.
 *
 * Spread into your hybrids to implement the [ApolloSubscriptionInterface](/api/interfaces/subscription/) interface.
 */
export const ApolloSubscription: Hybrids<SubscriptionHybrid> = {
  controller: subscription(null),

  ...ApolloElement,

  subscription: controlled(),

  subscribe: method(),
  cancel: method(),

  fetchPolicy: option(),
  noAutoSubscribe: option(false),
  onSubscriptionData: option(),
  onSubscriptionComplete: option(),
  onError: option(),
  shouldResubscribe: option(false),
  notifyOnNetworkStatusChange: option(false),
  pollInterval: option(),
  skip: option(false),
};

export type ApolloSubscriptionElement<D extends I.MaybeTDN = I.MaybeTDN, V = I.MaybeVariables<D>> =
  HTMLElement & Omit<I.ApolloSubscriptionInterface<D, V>, Omitted> & {
    controller: ApolloSubscriptionController<D, V>;
  };
