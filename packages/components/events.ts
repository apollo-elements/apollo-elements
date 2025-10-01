import type { Data, Variables, VariablesOf } from '@apollo-elements/core/types';
import type { DocumentNode } from '@apollo/client';
import type { ApolloMutationElement } from './apollo-mutation.js';

export type MutationEventType = (
    'mutation-completed'
  | 'mutation-error'
  | 'will-mutate'
  | 'will-navigate'
);

export interface MutationEventDetail<D, V = VariablesOf<D>> {
  data?: Data<D> | null;
  error?: Error | null;
  variables?: Variables<D, V> | null;
  element: ApolloMutationElement<D, V>;
  mutation: DocumentNode | null;
}

export class MutationEvent<D, V = VariablesOf<D>> extends CustomEvent<MutationEventDetail<D, V>> {
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

 

/**
 * Fired when the element is about to mutate.
 * Useful for setting variables or cancelling the mutation by calling `preventDefault`
 * Prevent default to prevent mutation. Detail is `{ element: this }`
 * @typeParam Data Element's Data type
 * @typeParam Variables Element's Variables type
 */
export class WillMutateEvent<D = unknown, V = VariablesOf<D>> extends MutationEvent<D, V> {
  static type = 'will-mutate' as const;
  public declare type: 'will-mutate';

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
export class MutationCompletedEvent<D = unknown, V = VariablesOf<D>> extends MutationEvent<D, V> {
  static type = 'mutation-completed' as const;
  public declare type: 'mutation-completed';

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
export class WillNavigateEvent<D = unknown, V = VariablesOf<D>> extends MutationEvent<D, V> {
  public static type = 'will-navigate' as const;
  public declare type: 'will-navigate';

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
export class MutationErrorEvent<D = unknown, V = VariablesOf<D>> extends MutationEvent<D, V> {
  public static type = 'mutation-error' as const;
  public declare type: 'mutation-error';

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
