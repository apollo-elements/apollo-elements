import { ApolloElement } from "./apollo-element";
import { DocumentNode } from "graphql";
import { FetchResult } from "apollo-link";
import { ModifiableWatchQueryOptions, FetchPolicy } from "apollo-client/core/watchQueryOptions";
import ApolloClient, { ApolloError, ObservableQuery, ApolloQueryResult } from "apollo-client";

export interface SubscriptionResult<TData> {
  loading: boolean;
  data?: TData;
  error?: ApolloError;
}

export interface OnSubscriptionDataOptions<TData> {
  client: ApolloClient<Object>;
  subscriptionData: SubscriptionResult<TData>;
}

declare class ApolloSubscription<TBase, TData, TVariables> extends ApolloElement<TBase, TData> {
  subscription: DocumentNode | null;
  variables?: TVariables;
  fetchPolicy?: FetchPolicy;
  observableQuery: ObservableQuery<TData, TVariables>;
  onSubscriptionData?: (options: OnSubscriptionDataOptions<TData>) => any;
  private nextData(result: { data: TData }): undefined;
  private nextError(error: ApolloError): undefined;
  public setOptions(options: ModifiableWatchQueryOptions): Promise<ApolloQueryResult<TData>>;
  public setVariables<TVariables>(variables: TVariables, tryFetch: boolean, fetchResults: boolean): Promise<ApolloQueryResult<TData>>;
  public subscribe<TVariables>(options?: { query?: DocumentNode, variables?: TVariables, fetchPolicy?: FetchPolicy }): ZenObservable.Observer<SubscriptionResult<TData>> | undefined
}
