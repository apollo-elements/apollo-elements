import type { ApolloControllerHost, DefineOptions } from '@apollo-elements/core';

import { controlled } from '@apollo-elements/core/decorators';

const dash =
  (str: string): string =>
    str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();

/**
 * Fired when an element property changes
 */
export class PolymerChangeEvent<T> extends CustomEvent<{ value: T }> {
  constructor(key: string, value: T) {
    super(`${dash(key)}-changed`, { detail: { value } });
  }
}

/**
 * Decorator to fire a Polymer-Library-style `*-changed` event;
 */
export function notify(opts: DefineOptions = {}) {
  return function<T extends ApolloControllerHost>(
    proto: T,
    name: keyof T
  ): void {
    return controlled({
      ...opts,
      onSet(this: T, value: unknown) {
        opts.onSet?.call?.(this, value);
        this.dispatchEvent(new PolymerChangeEvent(name as string, value));
      },
    })(proto, name as string & keyof T);
  };
}
