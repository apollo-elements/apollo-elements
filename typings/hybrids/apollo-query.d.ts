export const ApolloQuery: any;
export type DocumentNode = import("graphql/language").DocumentNode;
export type UpdateQueryFn = (previousQueryResult: any, options: {
    subscriptionData: {
        data: any;
    };
    variables?: import("apollo-client").OperationVariables;
}) => any;
export type SubscribeToMoreOptions = {
    document: import("graphql/language").DocumentNode;
    variables?: import("apollo-client").OperationVariables;
    updateQuery?: import("apollo-client/core/watchQueryOptions").UpdateQueryFn<any, import("apollo-client").OperationVariables, any>;
    onError?: (error: Error) => void;
};
export type FetchMoreOptions = import("apollo-client").FetchMoreOptions<any, import("apollo-client").OperationVariables>;
export type FetchMoreQueryOptions = import("apollo-client").FetchMoreQueryOptions<any, any>;
