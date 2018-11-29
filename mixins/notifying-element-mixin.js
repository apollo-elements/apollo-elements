const defaultNotifyingProps = [
  'data',
  'error',
  'loading',
  'networkStatus',
];

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
 * @param {String[]} notifyingProps list of props to notify on change.
 * @return {Class}
 */
export const NotifyingElementMixin = (superclass, notifyingProps = defaultNotifyingProps) =>
  class extends superclass {
    constructor() {
      super();
      /**
       * Array of property names to notify on change.
       * @type {String[]}
       */
      this.notifyingProps = notifyingProps;
    }

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

    update(changedProps) {
      super.update(changedProps);
      const shouldUpdate = propName =>
      !changedProps.has(propName) ? undefined :
      this.notify(propName, changedProps.get(propName));
      this.notifyingProps.forEach(shouldUpdate);
    }
  };
