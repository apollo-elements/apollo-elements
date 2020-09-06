const INSTANCES = new WeakMap();

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
          this.dispatchEvent(new CustomEvent(`${key}-changed`, { detail: { value } }));
        },
      });

      this[key] = init;
      this.dispatchEvent(new CustomEvent(`${key}-changed`, { detail: { value: init } }));
    },
  });
}
