/**
 * `NotifyingElementMixin`: mixin which fires Polymer-style notification events.
 *
 * @polymer
 * @mixinFunction
 *
 * @param {class}    superclass the class to extend
 * @return {class}
 */
export const NotifyingElementMixin = superclass => class extends superclass {
  /**
   * Fires a `*-changed` event.
   *
   * @param  {string}     propName Name of the property.
   * @param  {any} value  property value
   */
  notify(propName, value) {
    this.dispatchEvent(
      new CustomEvent(`${propName}-changed`, {
        bubbles: true,
        composed: true,
        detail: { value },
      })
    );
  }
};
