import { dedupeMixin } from '@apollo-elements/mixins/dedupe-mixin.js';

/**
 * `NotifyingElementMixin`: mixin which fires Polymer-style notification events.
 *
 * @polymer
 * @mixinFunction
 *
 */
export const NotifyingElementMixin = dedupeMixin(
  function(superclass) {
    return class NotifyingElement extends superclass {
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
    };
  });
