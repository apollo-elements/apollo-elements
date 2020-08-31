import type { Hybrids } from 'hybrids';
import type { CustomElement, Constructor } from '@apollo-elements/mixins/constructor';

import { ApolloMutationMixin } from '@apollo-elements/mixins/apollo-mutation-mixin';

import { property } from 'hybrids';
import { classMethod } from './factories/classMethod';
import { accessors } from './factories/accessors';
import { ApolloElement } from './apollo-element';

class Class<D, V> extends ApolloMutationMixin(class {} as Constructor<CustomElement>)<D, V> {}

const instance = new Class() as ApolloMutationElement;

export type ApolloMutationElement<D = unknown, V = unknown> =
  HTMLElement & Class<D, V>;

export const ApolloMutation: Hybrids<ApolloMutationElement> = {
  ...ApolloElement,
  errorPolicy: property(undefined),
  variables: null,

  ignoreResults: false,
  called: false,
  mostRecentMutationId: 0,

  mutation: accessors(instance, 'mutation'),

  mutate: classMethod(instance, 'mutate'),
  generateMutationId: classMethod(instance, 'generateMutationId'),
  isMostRecentMutation: classMethod(instance, 'isMostRecentMutation'),
  onCompletedMutation: classMethod(instance, 'onCompletedMutation'),
  onMutationError: classMethod(instance, 'onMutationError'),
};
