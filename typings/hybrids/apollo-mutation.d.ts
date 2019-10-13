export namespace ApolloMutation {
    export const client: {
        get: (_: any, last: any) => any;
        set: (_: any, v: any) => any;
    };
    export const data: any;
    export const errorPolicy: string;
    export const ignoreResults: boolean;
    export const mostRecentMutationId: number;
    export { mutate };
    export const mutation: {
        connect: (host: any, key: any) => () => void;
        get: (host: any, previous: any) => any;
        set: (_host: any, next: any) => any;
    };
    export const onCompleted: {
        get: (_: any, last: any) => any;
        set: (_: any, v: any) => any;
    };
    export const onError: {
        get: (_: any, last: any) => any;
        set: (_: any, v: any) => any;
    };
}
declare const mutate: {
    get: (host: any) => ({ context, errorPolicy, fetchPolicy, mutation, optimisticResponse, refetchQueries, update, awaitRefetchQueries, variables, }?: any) => Promise<any>;
};
export {};
