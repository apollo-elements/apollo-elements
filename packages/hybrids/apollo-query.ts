import type { Hybrids } from 'hybrids';
import type { Constructor } from '@apollo-elements/interfaces/constructor';

import { ApolloQueryMixin } from '@apollo-elements/mixins/apollo-query-mixin';

import { classMethod } from './factories/classMethod';
import { classAccessors } from './factories/classAccessors';
import { ApolloElement } from './apollo-element';

class ApolloQueryElement<D = unknown, V = unknown>
  extends ApolloQueryMixin(class { } as Constructor)<D, V> { }

export const ApolloQuery: Hybrids<ApolloQueryElement> = {
  ...ApolloElement,

  errorPolicy: 'none',
  noAutoSubscribe: false,

  query: classAccessors(ApolloQueryElement, 'query'),
  options: classAccessors(ApolloQueryElement, 'options'),
  variables: classAccessors(ApolloQueryElement, 'variables'),

  watchQuery: classMethod(ApolloQueryElement, 'watchQuery'),
  refetch: classMethod(ApolloQueryElement, 'refetch'),
  canSubscribe: classMethod(ApolloQueryElement, 'canSubscribe'),
  shouldSubscribe: classMethod(ApolloQueryElement, 'shouldSubscribe'),
  subscribeToMore: classMethod(ApolloQueryElement, 'subscribeToMore'),
  executeQuery: classMethod(ApolloQueryElement, 'executeQuery'),
  fetchMore: classMethod(ApolloQueryElement, 'fetchMore'),
  subscribe: classMethod(ApolloQueryElement, 'subscribe'),
  nextData: classMethod(ApolloQueryElement, 'nextData'),
  nextError: classMethod(ApolloQueryElement, 'nextError'),
};
