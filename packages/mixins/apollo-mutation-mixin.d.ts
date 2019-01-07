import ApolloClient, { OperationVariables, MutationOptions, ApolloError, MutationUpdaterFn, PureQueryOptions, ErrorPolicy, FetchPolicy } from "apollo-client";
import { FetchResult, DocumentNode } from "apollo-link";
import { ApolloElement } from "./apollo-element-mixin";

type Constructor<T = {}> = new (...args: any[]) => T;

export type RefetchQueriesProviderFn = (...args: any[]) => Array<string | PureQueryOptions>;

export interface MutationResult<TData> {
  data?: TData;
  error?: ApolloError;
  loading: boolean;
  called: boolean;
  client: ApolloClient<Object>;
}

export interface MutationContext<TVariables> {
  client?: ApolloClient<Object>;
  operations: Map<string, { query: DocumentNode; variables: TVariables }>;
}

export declare class ApolloMutation<TBase, TData, TVariables> extends ApolloElement<TBase, TData> {
  awaitRefetchQueries?: boolean;
  context: MutationContext<TVariables>;
  errorPolicy: ErrorPolicy;
  fetchPolicy: FetchPolicy;
  ignoreResults?: boolean;
  mutation: DocumentNode;
  onUpdate?: MutationUpdaterFn<TData>;
  optimisticResponse?: TData;
  refetchQueries?: (string | PureQueryOptions)[] | RefetchQueriesProviderFn;
  variables?: TVariables;
  private generateMutationId: number;
  private isMostRecentMutation: number;
  private mostRecentMutationId: number;
  private nextData(result: MutationResult<TData>): undefined;
  private nextError(error: ApolloError): undefined;
  private onCompletedMutation(response: FetchResult<TData>, mutationId: number): any;
  private onMutationError(error: ApolloError, mutationId: number): any;
  public mutate(options: MutationOptions<TData, TVariables>): Promise<FetchResult<TData>>
  public onCompleted?(data: TData): any;
  public onError?(error: ApolloError): any;
}

export function ApolloMutationMixin<TBase extends Constructor, TData, TVariables>(superclass: TBase): ApolloMutation<TBase, TData, TVariables>;
