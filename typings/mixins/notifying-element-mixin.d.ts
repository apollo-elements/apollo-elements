/**
 * `NotifyingElementMixin`: mixin which fires Polymer-style notification events.
 *
 * @function
 * @template {import('./constructor').Constructor<import('./custom-element')>} TBase
 * @template TCacheShape, TData
 * @param {import('./constructor').Constructor<TBase>} superclass
 * @return {import('./return-constructor').ReturnConstructor<TBase, import('./notifying-element')<TCacheShape, TData>>}
 */
export function NotifyingElementMixin<TBase_1 extends import("./constructor.js").Constructor<typeof import("./custom-element.js")>, TCacheShape, TData>(superclass: import("./constructor.js").Constructor<TBase_1>): import("./return-constructor.js").ReturnConstructor<TBase_1, typeof import("./notifying-element.js")>;
