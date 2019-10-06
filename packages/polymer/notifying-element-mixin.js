import { dedupeMixin } from '@apollo-elements/mixins/dedupe-mixin.js';

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
export const NotifyingElementMixin = dedupeMixin(superclass =>
  /**
   * @mixin NotifyingElement
   * @extends superclass
   */
  class NotifyingElement extends superclass {
    /**
     * Fires a `*-changed` event.
     *
     * @param  {string}     propName Name of the property.
     * @param  {any} value  property value
     * @protected
     */
    notify(propName, value) {
      this.dispatchEvent(
        new CustomEvent(`${propName}-changed`, {
          detail: { value },
        })
      );
    }
  });
