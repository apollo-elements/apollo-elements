const INSTANCES = new WeakMap();

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
export function notify<Class extends HTMLElement>(
  target: Class,
  key: keyof Class extends string ? keyof Class : never
): void {
  Object.defineProperty(target, key, {
    enumerable: true,
    configurable: true,

    set<T>(this: Class, init: T) {
      if (!INSTANCES.get(this))
        INSTANCES.set(this, {});

      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,

        get(this: Class) {
          return INSTANCES.get(this)[key];
        },

        set<T>(this: Class, value: T) {
          INSTANCES.get(this)[key] = value;
          this.dispatchEvent(new PolymerChangeEvent(key, value));
        },
      });

      this[key as string] = init;

      this.dispatchEvent(new PolymerChangeEvent(key, init));
    },
  });
}
