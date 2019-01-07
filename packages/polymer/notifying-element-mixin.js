/**
 * `NotifyingElementMixin`: mixin which fires Polymer-style
 * notification events when properties named in its `notifyingProps`
 * array update.
 *
 * Override `this.notifyingProps` array to control which properties notify;
 *
 * @mixinFunction
 *
 * @param {Class}    superclass
 * @return {Class}
 */
export const NotifyingElementMixin = superclass =>
  class extends superclass {
    /**
     * Fires a `${propName}-changed` event.
     * @param  {String}     propName Name of the property.
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
