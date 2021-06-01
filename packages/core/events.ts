import type * as I from '@apollo-elements/interfaces';
import type { ApolloController } from './apollo-controller';

/**
 * @summary Fired when an ApolloElement connects to or disconnects from the DOM
 */
export class ApolloElementEvent<T = I.ApolloElementElement> extends CustomEvent<T> {
  declare static type: 'apollo-element-connected'|'apollo-element-disconnected';
  declare type: 'apollo-element-connected'|'apollo-element-disconnected';

  constructor(type: 'apollo-element-connected'|'apollo-element-disconnected', detail: T) {
    super(type, {
      bubbles: true,
      composed: true,
      detail,
    });
  }
}

export abstract class ApolloControllerEvent extends Event {
  public abstract controller: ApolloController;
  public abstract type: 'apollo-controller-connected'|'apollo-controller-disconnected'

  constructor(type: 'apollo-controller-connected'|'apollo-controller-disconnected') {
    super(type, { bubbles: true, composed: true });
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
