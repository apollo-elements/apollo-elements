export * from "lit-element";
/**
 * # ApolloElement
 *
 * Custom Element base class for apollo custom elements.
 *
 * @template TCacheShape
 * @template TData
 *
 * @element
 * @polymer
 * @extends LitElement
 * @appliesMixin ApolloElementMixin
 * @implements {import('@apollo-elements/mixins/apollo-element')<TCacheShape, TData>}
 */
export class ApolloElement<TCacheShape, TData> extends LitElement {
    static get properties(): {
        /**
         * The Apollo client.
         * See https://github.com/apollo-elements/apollo-elements#-bundling
         */
        client: {
            type: ObjectConstructor;
        };
        /**
         * The latest data for the query from the Apollo cache
         */
        data: {
            type: ObjectConstructor;
        };
        /**
         * The latest error for the query from the Apollo cache
         */
        error: {
            type: ObjectConstructor;
        };
        /**
         * If the query is currently in-flight.
         */
        loading: {
            type: BooleanConstructor;
        };
    };
}
import { LitElement } from "lit-element";
