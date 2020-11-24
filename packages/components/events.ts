import { DataOf, VariablesOf } from '@apollo-elements/interfaces/operation';
import type { ApolloError } from '@apollo/client/core';
import type { DocumentNode } from 'graphql';
import type { ApolloMutationElement } from './apollo-mutation';

export type MutationEventType = (
    'mutation-completed'
  | 'mutation-error'
  | 'will-mutate'
  | 'will-navigate'
);

export interface MutationEventDetail<E extends ApolloMutationElement<any, any>> {
  data?: DataOf<E> | null;
  error?: Error | ApolloError | null;
  variables?: VariablesOf<E> | null;
  element: E;
  mutation: DocumentNode | null;
}

export class MutationEvent<E extends ApolloMutationElement<any, any>> extends CustomEvent<unknown> {
  declare type: MutationEventType;

  declare detail: MutationEventDetail<E>;

  constructor(type: MutationEventType, init: CustomEventInit) {
    super(type, {
      ...init,
      bubbles: true,
      composed: true,
    });
  }
}

/**
 * Fired when the element is about to mutate.
 * Useful for setting variables or cancelling the mutation by calling `preventDefault`
 * Prevent default to prevent mutation. Detail is `{ element: this }`
 * @typeParam Data Element's Data type
 * @typeParam Variables Element's Variables type
 */
export class WillMutateEvent<E extends ApolloMutationElement<any, any>> extends MutationEvent<E> {
  static type: 'will-mutate' = 'will-mutate';

  constructor(element: E) {
    const { mutation, variables } = element;
    super(WillMutateEvent.type, {
      cancelable: true,
      detail: {
        element,
        mutation,
        variables,
      },
    });
  }
}

/**
 * Fired when a mutation completes.
 * `detail` is the mutation data.
 * @typeParam Data Element's Data type
 * @typeParam Variables Element's Variables type
 */
export class MutationCompletedEvent<E extends ApolloMutationElement<any, any>>
  extends MutationEvent<E> {
  static type: 'mutation-completed' = 'mutation-completed';

  constructor(element: E) {
    const { data, mutation, variables } = element;
    super(MutationCompletedEvent.type, {
      detail: {
        data,
        element,
        mutation,
        variables,
      },
    });
  }
}

/**
 * Fired before an <apollo-element> with a link trigger mutates.
 * Cancel the event with `event.preventDefault()` to prevent navigation.
 * @typeParam Data Element's Data type
 * @typeParam Variables Element's Variables type
 */
export class WillNavigateEvent<E extends ApolloMutationElement<any, any>> extends MutationEvent<E> {
  static type: 'will-navigate' = 'will-navigate'

  constructor(element: E) {
    const { data, mutation, variables } = element;
    super(WillNavigateEvent.type, {
      cancelable: true,
      detail: {
        data,
        element,
        mutation,
        variables,
      },
    });
  }
}

/**
 * Fired when the mutation rejects.
 * @typeParam Data Element's Data type
 * @typeParam Variables Element's Variables type
 */
export class MutationErrorEvent<E extends ApolloMutationElement<any, any>>
  extends MutationEvent<E> {
  static type: 'mutation-error' = 'mutation-error';

  constructor(element: E) {
    const { mutation, variables, error } = element;
    super(MutationErrorEvent.type, {
      detail: {
        element,
        error,
        mutation,
        variables,
      },
    });
  }
}

declare global {
  interface HTMLElementEventMap {
    'will-mutate': WillMutateEvent<ApolloMutationElement>;
    'will-navigate': WillNavigateEvent<ApolloMutationElement>;
    'mutation-completed': MutationCompletedEvent<ApolloMutationElement>;
    'mutation-error': MutationErrorEvent<ApolloMutationElement>;
  }
}
