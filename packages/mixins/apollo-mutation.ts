import type { DocumentNode } from 'graphql/language/ast';
import type { ApolloError } from 'apollo-client';
import type { MutationOptions, MutationUpdaterFn } from 'apollo-client/core/watchQueryOptions';
import type { ApolloElement } from './apollo-element';
import type { FetchResult } from 'apollo-link';

export interface ApolloMutation<TData, TVariables> extends ApolloElement<TData> {
    mutation: DocumentNode;

    called: boolean;

    ignoreResults: boolean;

    mostRecentMutationId: number;

    optimisticResponse: MutationOptions['optimisticResponse'];

    updater?(...params: Parameters<MutationUpdaterFn<TVariables>>):
      ReturnType<MutationUpdaterFn<TVariables>>;

    variables: TVariables;

    generateMutationId(): number;

    isMostRecentMutation(mutationId: number): boolean;

    mutate(params?: Partial<MutationOptions<TVariables>>): Promise<FetchResult<TData>>;

    onCompletedMutation(response: FetchResult<TData>, mutationId: number): FetchResult<TData>;

    onMutationError(error: ApolloError, mutationId: number): never;

    onCompleted?(_data: FetchResult<TData>): void;

    onError?(_error: Error): void;
}
