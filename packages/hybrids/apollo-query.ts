import type { Hybrids } from 'hybrids';
import type { Constructor } from '@apollo-elements/interfaces/constructor';

import { ApolloQueryMixin } from '@apollo-elements/mixins/apollo-query-mixin';

import { classMethod } from './factories/classMethod';
import { accessors } from './factories/accessors';
import { ApolloElement } from './apollo-element';

class ApolloQueryElement<D = unknown, V = unknown>
  extends ApolloQueryMixin(class { } as Constructor)<D, V> { }

const instance = new ApolloQueryElement();

export const ApolloQuery: Hybrids<ApolloQueryElement> = {
  ...ApolloElement,

  errorPolicy: 'none',
  noAutoSubscribe: false,

  query: accessors(instance, 'query'),
  options: accessors(instance, 'options'),
  variables: accessors(instance, 'variables'),

  watchQuery: classMethod(instance, 'watchQuery'),
  refetch: classMethod(instance, 'refetch'),
  canSubscribe: classMethod(instance, 'canSubscribe'),
  shouldSubscribe: classMethod(instance, 'shouldSubscribe'),
  subscribeToMore: classMethod(instance, 'subscribeToMore'),
  executeQuery: classMethod(instance, 'executeQuery'),
  fetchMore: classMethod(instance, 'fetchMore'),
  subscribe: classMethod(instance, 'subscribe'),
  nextData: classMethod(instance, 'nextData'),
  nextError: classMethod(instance, 'nextError'),
};
