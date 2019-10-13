/**
 * `ApolloElementMixin`: class mixin for apollo custom elements.
 * @function
 * @template {import('./constructor').Constructor<import('./custom-element')>} TBase
 * @template TCacheShape, TData
 * @param {import('./constructor').Constructor<TBase>} superclass
 * @return {import('./return-constructor').ReturnConstructor<TBase, import('./apollo-element')<TCacheShape, TData>>}
 */
export function ApolloElementMixinFunction<TBase extends import("./constructor.js").Constructor<typeof import("./custom-element.js")>, TCacheShape, TData>(superclass: import("./constructor.js").Constructor<TBase>): import("./return-constructor.js").ReturnConstructor<TBase, typeof import("./apollo-element.js")>;
/**
 * `ApolloElementMixin`: class mixin for apollo custom elements.
 * @function
 * @template {import('./constructor').Constructor<import('./custom-element')>} TBase
 * @template TCacheShape, TData
 * @param {import('./constructor').Constructor<TBase>} superclass
 * @return {import('./return-constructor').ReturnConstructor<TBase, import('./apollo-element')<TCacheShape, TData>>}
 */
export function ApolloElementMixin<TBase extends import("./constructor.js").Constructor<typeof import("./custom-element.js")>, TCacheShape, TData>(superclass: import("./constructor.js").Constructor<TBase>): import("./return-constructor.js").ReturnConstructor<TBase, typeof import("./apollo-element.js")>;
