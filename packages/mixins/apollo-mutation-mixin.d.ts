import ApolloClient, { OperationVariables, MutationOptions, ApolloError, MutationUpdaterFn, PureQueryOptions, ErrorPolicy, FetchPolicy } from "apollo-client";
import { FetchResult, DocumentNode } from "apollo-link";
import { ApolloElement } from "./apollo-element-mixin";

export type RefetchQueriesProviderFn = (...args: any[]) => Array<string | PureQueryOptions>;

export interface MutationResult<TData> {
  called: boolean;
  client?: ApolloClient<Object>;
  data?: TData;
  error?: ApolloError;
  loading: boolean;
}

export interface MutationContext<TVariables> {
  client?: ApolloClient<Object>;
  operations: Map<string, { query: DocumentNode; variables: TVariables }>;
}

declare class ApolloMutation<TCacheShape, TData, TVariables> extends ApolloElement<TCacheShape, TData> {
  awaitRefetchQueries?: boolean;
  context: MutationContext<TVariables>;
  errorPolicy: ErrorPolicy;
  fetchPolicy: FetchPolicy;
  ignoreResults?: boolean;
  mutation: DocumentNode;
  optimisticResponse?: TData;
  refetchQueries?: (string | PureQueryOptions)[] | RefetchQueriesProviderFn;
  update?: MutationUpdaterFn<TData>;
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

type Constructor = new (...args: any[]) => HTMLElement;

type ReturnConstructor<TCacheShape, TData, TVariables> = new (...args: any[]) =>
HTMLElement & ApolloMutation<TCacheShape, TData, TVariables>;

export function ApolloMutationMixin<
  TBase extends Constructor,
  TCacheShape,
  TData,
  TVariables
>(superclass: TBase):
  TBase & ReturnConstructor<TCacheShape, TData, TVariables>;
