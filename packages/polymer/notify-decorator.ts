const INSTANCES = new WeakMap();

const dash =
  (str: string): string =>
    str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();

/**
 * Fired when an element property changes
 */
class PolymerChangeEvent<T> extends CustomEvent<{ value: T }> {
  constructor(key: string, value: T) {
    super(`${dash(key)}-changed`, { detail: { value } });
  }
}

/**
 * Decorator to fire a Polymer-Library-style `*-changed` event;
 */
export function notify<Class extends HTMLElement>(target: Class, key: string): void {
  Object.defineProperty(target, key, {
    enumerable: true,
    configurable: true,

    set<T>(init: T) {
      if (!INSTANCES.get(this))
        INSTANCES.set(this, {});

      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,

        get() {
          return INSTANCES.get(this)[key];
        },

        set<T>(value: T) {
          INSTANCES.get(this)[key] = value;
          this.dispatchEvent(new PolymerChangeEvent(key, value ));
        },
      });

      this[key] = init;
      this.dispatchEvent(new PolymerChangeEvent(key, init));
    },
  });
}
