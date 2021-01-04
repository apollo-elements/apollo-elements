import { Data, Variables } from '@apollo-elements/interfaces/operation';
import type { ApolloError, DocumentNode } from '@apollo/client/core';
import type { ApolloMutationElement } from './apollo-mutation';

export type MutationEventType = (
    'mutation-completed'
  | 'mutation-error'
  | 'will-mutate'
  | 'will-navigate'
);

export interface MutationEventDetail<D, V> {
  data?: Data<D> | null;
  error?: Error | ApolloError | null;
  variables?: Variables<D, V> | null;
  element: ApolloMutationElement<D, V>;
  mutation: DocumentNode | null;
}

export class MutationEvent<D, V> extends CustomEvent<MutationEventDetail<D, V>> {
  declare type: MutationEventType;

  declare detail: MutationEventDetail<D, V>;

  constructor(type: MutationEventType, init: CustomEventInit) {
    super(type, {
      ...init,
      bubbles: true,
      composed: true,
    });
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Fired when the element is about to mutate.
 * Useful for setting variables or cancelling the mutation by calling `preventDefault`
 * Prevent default to prevent mutation. Detail is `{ element: this }`
 * @typeParam Data Element's Data type
 * @typeParam Variables Element's Variables type
 */
export class WillMutateEvent<D = any, V = any> extends MutationEvent<D, V> {
  static type: 'will-mutate' = 'will-mutate';

  constructor(element: ApolloMutationElement<D, V>) {
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
export class MutationCompletedEvent<D = any, V = any> extends MutationEvent<D, V> {
  static type: 'mutation-completed' = 'mutation-completed';

  constructor(element: ApolloMutationElement<D, V>) {
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
export class WillNavigateEvent<D = any, V = any> extends MutationEvent<D, V> {
  static type: 'will-navigate' = 'will-navigate'

  constructor(element: ApolloMutationElement<D, V>) {
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
export class MutationErrorEvent<D = any, V = any> extends MutationEvent<D, V> {
  static type: 'mutation-error' = 'mutation-error';

  constructor(element: ApolloMutationElement<D, V>) {
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
    'will-mutate': WillMutateEvent;
    'will-navigate': WillNavigateEvent;
    'mutation-completed': MutationCompletedEvent;
    'mutation-error': MutationErrorEvent;
  }
}
