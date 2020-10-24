import type { Hybrids } from 'hybrids';
import type { Constructor } from '@apollo-elements/interfaces/constructor';

import { ApolloMutationMixin } from '@apollo-elements/mixins/apollo-mutation-mixin';

import { property } from 'hybrids';
import { classMethod } from './factories/classMethod';
import { classAccessors } from './factories/classAccessors';
import { ApolloElement } from './apollo-element';

class ApolloMutationElement<D = unknown, V = unknown> extends
  ApolloMutationMixin(class {} as Constructor)<D, V> { }

function connect<T extends ApolloMutationElement>(host: T): void {
  // @ts-expect-error: hack to assign a static property
  host.constructor.documentType = 'mutation';
}

export const ApolloMutation: Hybrids<ApolloMutationElement> = {
  ...ApolloElement,
  errorPolicy: property(undefined, connect),
  variables: null,

  ignoreResults: false,
  called: false,
  mostRecentMutationId: 0,

  mutation: classAccessors(ApolloMutationElement, 'mutation'),

  variablesChanged: classMethod(ApolloMutationElement, 'variablesChanged'),

  mutate: classMethod(ApolloMutationElement, 'mutate'),
  generateMutationId: classMethod(ApolloMutationElement, 'generateMutationId'),
  isMostRecentMutation: classMethod(ApolloMutationElement, 'isMostRecentMutation'),

  onCompletedMutation: classMethod(ApolloMutationElement, 'onCompletedMutation'),
  onMutationError: classMethod(ApolloMutationElement, 'onMutationError'),
};

export type { ApolloMutationElement };
