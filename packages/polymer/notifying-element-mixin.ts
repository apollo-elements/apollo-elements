import { dedupeMixin } from '@open-wc/dedupe-mixin';

import type { Constructor } from '@apollo-elements/interfaces/constructor';

/**
 * `NotifyingElementMixin`: mixin which fires Polymer-style notification events.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function NotifyingElementMixinImplementation<
  TBase extends Constructor
>(superclass: TBase) {
  return class NotifyingElement extends superclass {
    /**
     * Fires a `*-changed` event.
     *
     * @param propName Name of the property.
     * @param value  property value
     */
    notify(propName: string, value: unknown): void {
      this.dispatchEvent(new CustomEvent(`${propName}-changed`, { detail: { value } }));
    }
  };
}

export const NotifyingElementMixin =
  dedupeMixin(NotifyingElementMixinImplementation);
