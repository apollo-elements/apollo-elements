/// <reference types="zen-observable" />
import ApolloClient, { NetworkStatus, ObservableQuery, ApolloQueryResult, FetchMoreOptions } from "apollo-client";
import { DocumentNode } from "graphql";
import ApolloElement from "./apollo-element";
import { ModifiableWatchQueryOptions, ErrorPolicy, SubscriptionOptions, SubscribeToMoreOptions, QueryOptions, FetchMoreQueryOptions, WatchQueryOptions } from "apollo-client/core/watchQueryOptions";
export default interface ApolloQuery<TCacheShape, TData, TVariables, TOptimisticResponse = {
    [key: string]: any;
}> extends ApolloElement<TCacheShape, TData> {
    query: DocumentNode;
    variables: TVariables;
    options: ModifiableWatchQueryOptions<TVariables>;
    errorPolicy: ErrorPolicy;
    fetchResults: boolean;
    pollInterval: number;
    notifyOnNetworkStatusChange: boolean;
    networkStatus: NetworkStatus;
    tryFetch: boolean;
    observableQuery: ObservableQuery<TData, TVariables>;
    client: ApolloClient<TCacheShape>;
    refetch(variables: TVariables): Promise<ApolloQueryResult<TData>>;
    setVariables(variables: TVariables, tryFetch: boolean, fetchResults: boolean): Promise<ApolloQueryResult<TData>>;
    subscribe(options: SubscriptionOptions<TVariables>): ZenObservable.Subscription;
    subscribeToMore(options: SubscribeToMoreOptions<TData, TVariables>): () => void;
    executeQuery(options: QueryOptions<TVariables>): Promise<ApolloQueryResult<TData>>;
    fetchMore(options: FetchMoreQueryOptions<TVariables, keyof TVariables> & FetchMoreOptions<TData, TVariables>): Promise<ApolloQueryResult<TData>>;
    watchQuery(options: WatchQueryOptions<TVariables>): ObservableQuery<TData, TVariables>;
    onCompleted(data: TData): void;
    onError(error: Error): void;
}
