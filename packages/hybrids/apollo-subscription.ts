import type { Hybrids } from 'hybrids';
import type { Constructor } from '@apollo-elements/interfaces/constructor';

import { property } from 'hybrids';

import { ApolloSubscriptionMixin } from '@apollo-elements/mixins/apollo-subscription-mixin';

import { classMethod } from './factories/classMethod';
import { classAccessors } from './factories/classAccessors';
import { ApolloElement } from './apollo-element';

class ApolloSubscriptionElement<D = unknown, V = unknown>
  extends ApolloSubscriptionMixin(class { } as Constructor)<D, V> { }


function connect<T extends ApolloSubscriptionElement>(host: T): void {
  // @ts-expect-error: hack to assign a static property
  host.constructor.documentType = 'subscription';
}

export const ApolloSubscription: Hybrids<ApolloSubscriptionElement> = {
  ...ApolloElement,

  fetchPolicy: property(undefined, connect),
  pollInterval: property(undefined),
  notifyOnNetworkStatusChange: false,
  noAutoSubscribe: false,
  skip: property(undefined),

  subscription: classAccessors(ApolloSubscriptionElement, 'subscription'),
  variables: classAccessors(ApolloSubscriptionElement, 'variables'),

  subscribe: classMethod(ApolloSubscriptionElement, 'subscribe'),
  cancel: classMethod(ApolloSubscriptionElement, 'cancel'),

  documentChanged: classMethod(ApolloSubscriptionElement, 'documentChanged'),
  variablesChanged: classMethod(ApolloSubscriptionElement, 'variablesChanged'),

  canSubscribe: classMethod(ApolloSubscriptionElement, 'canSubscribe'),
  shouldSubscribe: classMethod(ApolloSubscriptionElement, 'shouldSubscribe'),
  endSubscription: classMethod(ApolloSubscriptionElement, 'endSubscription'),

  initObservable: classMethod(ApolloSubscriptionElement, 'initObservable'),
  nextData: classMethod(ApolloSubscriptionElement, 'nextData'),
  nextError: classMethod(ApolloSubscriptionElement, 'nextError'),
  onComplete: classMethod(ApolloSubscriptionElement, 'onComplete'),
};

export type { ApolloSubscriptionElement };
