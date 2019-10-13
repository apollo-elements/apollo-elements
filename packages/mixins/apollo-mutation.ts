import CustomElement from "./custom-element";
import ApolloClient, { ApolloError, MutationUpdaterFn, MutationOptions } from "apollo-client";
import { DocumentNode } from "graphql";
import ApolloElement from "./apollo-element";
import { FetchResult } from "apollo-link";

export default interface ApolloMutation<TCacheShape, TData, TVariables, TOptimisticResponse = { [key: string]: any }> extends ApolloElement<TCacheShape, TData> {
    mutation: DocumentNode;
    called: boolean;
    ignoreResults: boolean;
    mostRecentMutationId: number
    optimisticResponse: TOptimisticResponse;
    update: MutationUpdaterFn;
    variables: TVariables;
    client: ApolloClient<TCacheShape>;
    mutate(options: MutationOptions<TOptimisticResponse, TVariables>): Promise<FetchResult<TData>>
    onCompleted(data: TData): void   
    onError(data: TData): void   
}
