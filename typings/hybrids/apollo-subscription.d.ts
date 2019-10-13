export namespace ApolloSubscription {
    export const client: {
        get: (_: any, last: any) => any;
        set: (_: any, v: any) => any;
    };
    export const data: any;
    export const errorPolicy: string;
    export const fetchPolicy: string;
    export const subscription: {
        connect: (host: any, key: any) => () => void;
        get: (host: any, previous: any) => any;
        set: (_host: any, next: any) => any;
    };
    export { variables };
    export { subscribe };
    export const nextData: {
        get: (host: any) => ({ data }: {
            data: any;
        }) => void;
    };
    export const nextError: {
        get: (host: any) => (error: any) => void;
    };
}
declare namespace variables {
    export function connect(host: any, key: any): () => any;
}
declare const subscribe: {
    get: (host: any) => ({ fetchPolicy, query, variables, }?: {
        fetchPolicy?: any;
        query?: any;
        variables?: any;
    }) => any;
};
export {};
