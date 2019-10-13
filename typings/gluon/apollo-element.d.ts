declare const ApolloElement_base: import("@apollo-elements/mixins/return-constructor").ReturnConstructor<import("@apollo-elements/mixins/constructor").Constructor<typeof import("@apollo-elements/mixins/custom-element")>, typeof import("@apollo-elements/mixins/apollo-element")>;
/**
 * # ApolloElement
 *
 * Custom Element base class for apollo custom elements.
 *
 * @polymer
 * @appliesMixin ApolloElementMixin
 * @element
 * @inheritdoc
 * @template TData
 */
export class ApolloElement<TData> extends ApolloElement_base {
    constructor(...args: any[]);
    set data(arg: TData);
    /**
     * The latest data for the query from the Apollo cache
     *
     * @return {TData}
     */
    get data(): TData;
    __data: TData;
    set error(arg: any);
    /**
     * The latest error for the query from the Apollo cache
     *
     * @return {Object}
     */
    get error(): any;
    __error: any;
    set loading(arg: boolean);
    /**
     * Whether the query is currently in-flight.
     *
     * @return {boolean}
     */
    get loading(): boolean;
    __loading: boolean;
}
export {};
