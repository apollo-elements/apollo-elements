import { Hybrids, property } from 'hybrids';
import type { CustomElement, Constructor } from '@apollo-elements/mixins/constructor';

import { ApolloSubscriptionMixin } from '@apollo-elements/mixins/apollo-subscription-mixin';

import { classMethod } from './factories/classMethod';
import { accessors } from './factories/accessors';
import { ApolloElement } from './apollo-element';

export type ApolloSubscriptionElement<D = unknown, V = unknown> =
  HTMLElement & Class<D, V>;

class Class<D, V> extends ApolloSubscriptionMixin(class {} as Constructor<CustomElement>)<D, V> {}

const instance = new Class();

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

  shouldSubscribe: classMethod(instance, 'shouldSubscribe'),
  endSubscription: classMethod(instance, 'endSubscription'),

  initObservable: classMethod(instance, 'initObservable'),
  nextData: classMethod(instance, 'nextData'),
  nextError: classMethod(instance, 'nextError'),
  onComplete: classMethod(instance, 'onComplete'),
};
