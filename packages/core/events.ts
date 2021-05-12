import type * as I from '@apollo-elements/interfaces';

/**
 * Fired when an element connects to or disconnects from the DOM
 */
export class ApolloElementEvent<T = I.ApolloElementElement> extends CustomEvent<T> {
  declare type: 'apollo-element-connected'|'apollo-element-disconnected';

  constructor(type: 'apollo-element-connected'|'apollo-element-disconnected', detail: T) {
    super(type, {
      bubbles: true,
      composed: true,
      detail,
    });
  }
}
