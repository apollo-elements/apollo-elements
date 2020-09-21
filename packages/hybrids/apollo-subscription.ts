import { Hybrids, property } from 'hybrids';
import type { Constructor } from '@apollo-elements/interfaces';

import { ApolloSubscriptionMixin } from '@apollo-elements/mixins/apollo-subscription-mixin';

import { classMethod } from './factories/classMethod';
import { accessors } from './factories/accessors';
import { ApolloElement } from './apollo-element';

class ApolloSubscriptionElement<D = unknown, V = unknown>
  extends ApolloSubscriptionMixin(class { } as Constructor)<D, V> { }

const instance = new ApolloSubscriptionElement();

export const ApolloSubscription: Hybrids<ApolloSubscriptionElement> = {
  ...ApolloElement,

  fetchPolicy: property(undefined),
  pollInterval: property(undefined),
  notifyOnNetworkStatusChange: false,
  noAutoSubscribe: false,
  skip: property(undefined),

  subscription: accessors(instance, 'subscription'),
  variables: accessors(instance, 'variables'),

  subscribe: classMethod(instance, 'subscribe'),
  cancel: classMethod(instance, 'cancel'),

  canSubscribe: classMethod(instance, 'canSubscribe'),
  shouldSubscribe: classMethod(instance, 'shouldSubscribe'),
  endSubscription: classMethod(instance, 'endSubscription'),

  initObservable: classMethod(instance, 'initObservable'),
  nextData: classMethod(instance, 'nextData'),
  nextError: classMethod(instance, 'nextError'),
  onComplete: classMethod(instance, 'onComplete'),
};

export type { ApolloSubscriptionElement };
