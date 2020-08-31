import type { Hybrids } from 'hybrids';
import type { Constructor, CustomElement } from '@apollo-elements/mixins/constructor';

import { ApolloQueryMixin } from '@apollo-elements/mixins/apollo-query-mixin';

import { classMethod } from './factories/classMethod';
import { accessors } from './factories/accessors';
import { ApolloElement } from './apollo-element';

export type ApolloQueryElement<D = unknown, V = unknown> =
  HTMLElement & Class<D, V>;

class Class<D, V> extends ApolloQueryMixin(class { } as Constructor<CustomElement>)<D, V> { }

const instance = new Class();

export const ApolloQuery: Hybrids<ApolloQueryElement> = {
  ...ApolloElement,

  errorPolicy: 'none',
  noAutoSubscribe: false,

  query: accessors(instance, 'query'),
  options: accessors(instance, 'options'),
  variables: accessors(instance, 'variables'),

  watchQuery: classMethod(instance, 'watchQuery'),
  refetch: classMethod(instance, 'refetch'),
  shouldSubscribe: classMethod(instance, 'shouldSubscribe'),
  subscribeToMore: classMethod(instance, 'subscribeToMore'),
  executeQuery: classMethod(instance, 'executeQuery'),
  fetchMore: classMethod(instance, 'fetchMore'),
  subscribe: classMethod(instance, 'subscribe'),
  nextData: classMethod(instance, 'nextData'),
  nextError: classMethod(instance, 'nextError'),
};
