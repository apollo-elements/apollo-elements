import { ApolloElement } from "./apollo-element-mixin";
import ApolloClient, { ErrorPolicy, FetchPolicy, ObservableQuery, ApolloQueryResult, ApolloError, FetchMoreOptions } from "apollo-client";
import { DocumentNode } from "graphql";
import { ModifiableWatchQueryOptions, SubscribeToMoreOptions, UpdateQueryFn } from "apollo-client/core/watchQueryOptions";
import { FetchResult } from "apollo-link";

export interface QueryContext<TVariables> {
  client?: ApolloClient<Object>;
  operations?: Map<string, { query: DocumentNode; variables: TVariables }>;
}

export interface ApolloQueryProperties<TData, TVariables> {
  context: QueryContext<TVariables>;
  errorPolicy: ErrorPolicy;
  fetchPolicy: FetchPolicy;
  fetchResults: boolean;
  metadata: any;
  notifyOnNetworkStatusChange: Boolean;
  observableQuery: ObservableQuery<TData, TVariables>;
  pollInterval: Number;
  query: DocumentNode;
  tryFetch: Boolean;
  variables: TVariables;
}

export declare class ApolloQuery<TBase, TData, TVariables, TSubscriptionData = TData> extends ApolloElement<TBase, TData> implements ApolloQueryProperties<TData, TVariables> {
  variables: TVariables;
  tryFetch: Boolean;
  query: DocumentNode;
  pollInterval: Number;
  observableQuery: ObservableQuery<TData, TVariables>;
  errorPolicy: ErrorPolicy;
  metadata: any;
  fetchResults: boolean;
  fetchPolicy: FetchPolicy;
  context: QueryContext<TVariables>;
  notifyOnNetworkStatusChange: Boolean;
  updateQuery?: UpdateQueryFn<TData, TVariables, TSubscriptionData>
  private nextData(result: ApolloQueryResult<TData>): undefined;
  private nextError(error: ApolloError): undefined;
  private watchQuery(params: ApolloQueryProperties<TData, TVariables>): ObservableQuery<TData>
  public setOptions(options: ModifiableWatchQueryOptions): Promise<ApolloQueryResult<TData>>;
  public setVariables<TVariables>(variables: TVariables, tryFetch: boolean, fetchResults: boolean): Promise<ApolloQueryResult<TData>>;
  public subscribe(params?: { query?: DocumentNode, variables?: TVariables }): Promise<ZenObservable.Observer<ApolloQueryResult<TData>>>;
  public subscribeToMore<TSubscriptionData>(options: SubscribeToMoreOptions<TData, TVariables, TSubscriptionData>): () => void;
  public executeQuery(): Promise<FetchResult<TData>>;
  public fetchMore(params: FetchMoreOptions<TData, TVariables>): Promise<ApolloQueryResult<TData>>
}

type Constructor<T = {}> = new (...args: any[]) => T;

export function ApolloQueryMixin<TBase extends Constructor, TData, TVariables>(superclass: TBase): ApolloQuery<TBase, TData, TVariables>;
