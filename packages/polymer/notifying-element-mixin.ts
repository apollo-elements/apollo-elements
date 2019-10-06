import { dedupeMixin } from '@apollo-elements/mixins/dedupe-mixin.js';

type Constructor<T = HTMLElement> = new (...args: any[]) => T;

function NotifyingElementMixinImplementation<TBase extends Constructor>(superclass: TBase) {
  /**
   * @mixin NotifyingElement
   * @extends superclass
   */
  return class NotifyingElement extends superclass {
    /**
     * Fires a `*-changed` event.
     *
     * @param  {string}     propName Name of the property.
     * @param  {any} value  property value
     * @protected
     */
    notify(propName: string, value: any) {
      this.dispatchEvent(
        new CustomEvent(`${propName}-changed`, {
          detail: { value },
        })
      );
    }
  }
};

/**
 * `NotifyingElementMixin`: mixin which fires Polymer-style notification events.
 *
 * @polymer
 * @mixinFunction
 *
 * @template T
 * @param {typeof HTMLElement & T}    superclass the class to extend
 * @return {NotifyingElement & T}
 */
export const NotifyingElementMixin = dedupeMixin(NotifyingElementMixinImplementation);
