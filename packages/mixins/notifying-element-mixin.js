import { dedupeMixin } from './dedupe-mixin.js';

/**
 * `NotifyingElementMixin`: mixin which fires Polymer-style notification events.
 *
 * @function
 * @template {import('./constructor').Constructor<import('./custom-element')>} TBase
 * @template TCacheShape, TData
 * @param {import('./constructor').Constructor<TBase>} superclass
 * @return {import('./return-constructor').ReturnConstructor<TBase, import('./notifying-element')<TCacheShape, TData>>}
 */
function NotifyingElementMixinFunction(superclass) {
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
}

/**
 * `NotifyingElementMixin`: mixin which fires Polymer-style notification events.
 *
 * @polymer
 * @mixinFunction
 * @function
 * @template {import('./constructor').Constructor<import('./custom-element')>} TBase
 * @template X, Y
 * @param {import('./constructor').Constructor<TBase>} superclass
 * @return {import('./return-constructor').ReturnConstructor<TBase, import('./apollo-element')<X, Y>>}
 */
export const NotifyingElementMixin = dedupeMixin(NotifyingElementMixinFunction);
