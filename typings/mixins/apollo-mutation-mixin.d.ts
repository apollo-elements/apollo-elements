export const ApolloMutationMixin: any;
export type ApolloClient = import("apollo-client").ApolloClient<any>;
export type ErrorPolicy = "all" | "none" | "ignore";
export type FetchPolicy = "no-cache" | "cache-first" | "network-only" | "cache-only" | "standby";
export type MutationUpdaterFn = (proxy: import("apollo-cache").DataProxy, mutationResult: import("apollo-link").FetchResult<{
    [key: string]: any;
}, Record<string, any>, Record<string, any>>) => void;
export type FetchResult = import("apollo-link").ExecutionResult<{
    [key: string]: any;
}> & {
    extensions?: Record<string, any>;
    context?: Record<string, any>;
};
export type DocumentNode = import("apollo-link").DocumentNode;
