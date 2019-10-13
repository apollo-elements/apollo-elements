/** @typedef {import('apollo-client').MutationUpdaterFn} MutationUpdaterFn */
/** @typedef {import('apollo-client').ErrorPolicy} ErrorPolicy */
/** @typedef {import('apollo-client').FetchPolicy} FetchPolicy */
/** @typedef {import('apollo-client').MutationOptions} MutationOptions */
/** @typedef {import('apollo-link').FetchResult} FetchResult */
/** @typedef {import('graphql/language').DocumentNode} DocumentNode */
/**
 * # ApolloMutation
 *
 * 👩‍🚀 A custom element base class to issue mutations via your Apollo cache.
 *
 * ## 👩‍🚀 Usage
 *
 * ```js
 * import { client } from './apollo-client';
 * import { ApolloMutation, html } from 'lit-apollo';
 * import mutation from './mutation-element.graphql';
 *
 * class MutationElement extends ApolloMutation {
 *   client = client;
 *   mutation = mutation;
 *
 *   render() {
 *     return html`<input @keyup="${this.onInput}"/>`
 *   }
 *
 *   onInput({ target: { value: input }, key }) {
 *     this.variables = { input };
 *     if (key === 'Enter') return this.mutate();
 *   }
 * };
 *
 * customElements.define('mutation-element', MutationElement)
 * ```
 *
 * @polymer
 * @element
 * @extends ApolloElement
 * @appliesMixin ApolloMutationMixin
 * @implements {import('@apollo-elements/mixins/apollo-mutation')<TCacheShape, TData>}
 */
export class ApolloMutation extends ApolloElement<any, any> {
    static get properties(): {
        /** If the mutation has been called */
        called: {
            type: BooleanConstructor;
        };
    };
    /**
     * This resolves a single mutation according to the options specified and returns
     * a Promise which is either resolved with the resulting data or rejected with an
     * error.
     *
     * NOTE: this `LitElement` version passes `this.onUpdate` as the update function
     * by default, instead of `this.update`, which is provided by `LitElement`.
     *
     * @param  {MutationOptions}                       [params]
     * @return {Promise<FetchResult>}
     */
    mutate(params?: import("apollo-client").MutationOptions<{
        [key: string]: any;
    }, import("apollo-client").OperationVariables>): Promise<import("apollo-link").FetchResult<{
        [key: string]: any;
    }, Record<string, any>, Record<string, any>>>;
}
export type MutationUpdaterFn = (proxy: import("apollo-cache").DataProxy, mutationResult: import("apollo-link").FetchResult<{
    [key: string]: any;
}, Record<string, any>, Record<string, any>>) => void;
export type ErrorPolicy = "all" | "none" | "ignore";
export type FetchPolicy = "no-cache" | "cache-first" | "network-only" | "cache-only" | "standby";
export type MutationOptions = import("apollo-client").MutationOptions<{
    [key: string]: any;
}, import("apollo-client").OperationVariables>;
export type FetchResult = import("apollo-link").ExecutionResult<{
    [key: string]: any;
}> & {
    extensions?: Record<string, any>;
    context?: Record<string, any>;
};
export type DocumentNode = import("apollo-link").DocumentNode;
import { ApolloElement } from "./apollo-element.js";
