import type { Hybrids } from 'hybrids';
import type { Constructor } from '@apollo-elements/interfaces/constructor';

import { ApolloMutationMixin } from '@apollo-elements/mixins/apollo-mutation-mixin';

import { property } from 'hybrids';
import { classMethod } from './factories/classMethod';
import { classAccessors } from './factories/classAccessors';
import { ApolloElement } from './apollo-element';

class ApolloMutationElement<D = unknown, V = unknown> extends
  ApolloMutationMixin(class {} as Constructor)<D, V> { }

export const ApolloMutation: Hybrids<ApolloMutationElement> = {
  ...ApolloElement,
  errorPolicy: property(undefined),
  variables: null,

  ignoreResults: false,
  called: false,
  mostRecentMutationId: 0,

  mutation: classAccessors(ApolloMutationElement, 'mutation'),

  mutate: classMethod(ApolloMutationElement, 'mutate'),
  generateMutationId: classMethod(ApolloMutationElement, 'generateMutationId'),
  isMostRecentMutation: classMethod(ApolloMutationElement, 'isMostRecentMutation'),
  onCompletedMutation: classMethod(ApolloMutationElement, 'onCompletedMutation'),
  onMutationError: classMethod(ApolloMutationElement, 'onMutationError'),
};

export type { ApolloMutationElement };
