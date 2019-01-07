import { ApolloElement } from "./apollo-element-mixin";
import { DocumentNode } from "graphql";
import { FetchResult } from "apollo-link";
import { ModifiableWatchQueryOptions, FetchPolicy } from "apollo-client/core/watchQueryOptions";
import ApolloClient, { ApolloError, ApolloQueryResult } from "apollo-client";
import { Observable } from "apollo-link";

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
  observable: Observable<TData>;
  onSubscriptionData?: (options: OnSubscriptionDataOptions<TData>) => any;
  private nextData(result: { data: TData }): undefined;
  private nextError(error: ApolloError): undefined;
  public setOptions(options: ModifiableWatchQueryOptions): Promise<ApolloQueryResult<TData>>;
  public setVariables<TVariables>(variables: TVariables, tryFetch: boolean, fetchResults: boolean): Promise<ApolloQueryResult<TData>>;
  public subscribe<TVariables>(options?: { query?: DocumentNode, variables?: TVariables, fetchPolicy?: FetchPolicy }): ZenObservable.Observer<SubscriptionResult<TData>> | undefined
}

type Constructor<T = {}> = new (...args: any[]) => T;

export function ApolloSubscriptionMixin<TBase extends Constructor, TData, TVariables>(superclass: TBase): ApolloSubscription<TBase, TData, TVariables>;
