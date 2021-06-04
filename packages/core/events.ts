import type * as C from '@apollo/client/core';
import type { ApolloController, ApolloControllerHost } from './apollo-controller';

type ApolloEventType =
  | 'apollo-controller-connected'
  | 'apollo-controller-disconnected'
  | 'apollo-element-connected'
  | 'apollo-element-disconnected';

export abstract class ApolloEvent<T = ApolloControllerHost> extends CustomEvent<T> {
  public abstract type: ApolloEventType
  public declare controller?: ApolloController;
  constructor(type: ApolloEventType, options?: CustomEventInit) {
    super(type, { ...options, bubbles: true, composed: true });
  }
}

/**
 * @summary Fired when an ApolloElement connects to or disconnects from the DOM
 */
export class ApolloElementEvent<T = ApolloControllerHost> extends ApolloEvent<T> {
  declare static type: 'apollo-element-connected'|'apollo-element-disconnected';
  declare type: 'apollo-element-connected'|'apollo-element-disconnected';
  constructor(type: 'apollo-element-connected'|'apollo-element-disconnected', detail: T) {
    super(type, { detail });
  }
}

export abstract class ApolloControllerEvent extends ApolloEvent {
  public abstract controller: ApolloController;
  public abstract type: 'apollo-controller-connected'|'apollo-controller-disconnected'
  constructor(type: 'apollo-controller-connected'|'apollo-controller-disconnected') {
    super(type);
  }
}

/**
 * @summary Fired when a controlled element connects to the DOM
 */
export class ApolloControllerConnectedEvent extends ApolloControllerEvent {
  public static type = 'apollo-controller-connected' as const;
  public declare type: 'apollo-controller-connected';
  constructor(public controller: ApolloController) {
    super(ApolloControllerConnectedEvent.type);
  }
}

/**
 * @summary Fired when a controlled element disconnects from the DOM
 */
export class ApolloControllerDisconnectedEvent extends ApolloControllerEvent {
  public static type = 'apollo-controller-disconnected' as const;
  public declare type: 'apollo-controller-disconnected';
  constructor(public controller: ApolloController) {
    super(ApolloControllerDisconnectedEvent.type);
  }
}

declare global {
  interface HTMLElementEventMap {
    'apollo-controller-connected': ApolloControllerConnectedEvent;
    'apollo-controller-disconnected': ApolloControllerDisconnectedEvent;
    'apollo-element-connected': ApolloElementEvent;
    'apollo-element-disconnected': ApolloElementEvent;
    'apollo-error': CustomEvent<C.ApolloError>;
  }
  interface WindowEventMap {
    'apollo-element-disconnected': ApolloElementEvent;
    'apollo-controller-disconnected': ApolloElementEvent;
  }
}
