import type { ApolloError, OperationVariables } from '@apollo/client/core';
import type { DocumentNode } from 'graphql';
import type { ApolloMutationElement } from './apollo-mutation';

export type MutationEventType = (
    'mutation-completed'
  | 'mutation-error'
  | 'will-mutate'
  | 'will-navigate'
);

export interface MutationEventDetail<Data extends unknown, Variables extends OperationVariables> {
  data?: Data | null;
  error?: Error | ApolloError | null;
  element: ApolloMutationElement<Data, Variables>;
  mutation: DocumentNode | null;
  variables: Variables | null;
}

export class MutationEvent<Data, Variables>
  extends CustomEvent<MutationEventDetail<Data, Variables>> {
  declare type: MutationEventType;

  constructor(
    type: MutationEventType,
    init: CustomEventInit<MutationEventDetail<Data, Variables>>
  ) {
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
export class WillMutateEvent<Data = unknown, Variables = OperationVariables>
  extends MutationEvent<Data, Variables> {
  static type: 'will-mutate' = 'will-mutate';

  declare detail: MutationEventDetail<Data, Variables>;

  constructor(element: ApolloMutationElement<Data, Variables>) {
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

export interface MutationCompletedEventDetail<Data, Variables>
extends MutationEventDetail<Data, Variables> {
 data: Data
}

/**
 * Fired when a mutation completes.
 * `detail` is the mutation data.
 * @typeParam Data Element's Data type
 * @typeParam Variables Element's Variables type
 */
export class MutationCompletedEvent<
  Data = unknown,
  Variables = OperationVariables
> extends MutationEvent<Data, Variables> {
  static type: 'mutation-completed' = 'mutation-completed';

  declare detail: MutationCompletedEventDetail<Data, Variables>;

  constructor(element: ApolloMutationElement<Data, Variables>, data: Data) {
    const { mutation, variables } = element;
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

export interface MutationErrorEventDetail<Data, Variables>
extends MutationEventDetail<Data, Variables> {
  error: ApolloError;
}

/**
 * Fired before an <apollo-element> with a link trigger mutates.
 * Cancel the event with `event.preventDefault()` to prevent navigation.
 * @typeParam Data Element's Data type
 * @typeParam Variables Element's Variables type
 */
export class WillNavigateEvent<
  Data = unknown,
  Variables = OperationVariables,
> extends MutationEvent<Data, Variables> {
  static type: 'will-navigate' = 'will-navigate'

  declare detail: MutationCompletedEventDetail<Data, Variables>;

  constructor(element: ApolloMutationElement<Data, Variables>, data: Data) {
    const { mutation, variables } = element;
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
export class MutationErrorEvent<
  Data = unknown,
  Variables = unknown
> extends MutationEvent<Data, Variables> {
  static type: 'mutation-error' = 'mutation-error';

  declare detail: MutationErrorEventDetail<Data, Variables>;

  constructor(element: ApolloMutationElement<Data, Variables>, error: ApolloError) {
    const { mutation, variables } = element;
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
