import type { ReactiveController, ReactiveControllerHost } from '@lit/reactive-element';

import type {
  ApolloClient,
  ApolloError,
  ApolloQueryResult,
  DocumentNode,
  ErrorPolicy,
  FetchPolicy,
  FetchResult,
  MutationOptions,
  MutationUpdaterFn,
  NetworkStatus,
  NormalizedCacheObject,
  QueryOptions,
  SubscribeToMoreOptions,
  SubscriptionOptions,
  WatchQueryFetchPolicy,
} from '@apollo/client/core';

import type {
  ComponentDocument,
  Data,
  FetchMoreParams,
  GraphQLError,
  OnSubscriptionDataParams,
  MaybeTDN,
  MaybeVariables,
  NextFetchPolicyFunction,
  OptimisticResponseType,
  RefetchQueriesType,
  SubscriptionDataOptions,
  Variables,
} from '@apollo-elements/interfaces';

import type {
  ApolloController,
  ApolloMutationController,
  ApolloQueryController,
  ApolloSubscriptionController,
  ApolloQueryControllerOptions,
} from '@apollo-elements/core';

export declare class CustomElement extends HTMLElement {
  static readonly observedAttributes?: string[];

  /**
   * Called when one of the element's `observedAttributes` changes.
   * @param name name of the observed attribute
   * @param oldValue previous value of the attribute. null if it was nonexistent
   * @param newValue current value of the attribute. null if removed.
   */
  attributeChangedCallback?(name: string, oldValue: string, newValue: string): void;

  /**
   * Called when the element is adopted to a document.
   */
  adoptedCallback?(): void;

  /**
   * Called when the element connects to a document, when the element has access to it's own DOM.
   */
  connectedCallback?(): void;

  /**
   * Called when the element is removed from a document.
   */
  disconnectedCallback?(): void;
}

/**
 * Type that represents a class
 */
export type Constructor<T = CustomElement> = {
  new (...a: any[]): T;
}

export declare class ControllerHost extends HTMLElement implements ReactiveControllerHost {
  connectedCallback(): void;
  disconnectedCallback(): void;
  requestUpdate(name?: string, value?: unknown): void;
  addController(controller: ReactiveController): void
  removeController(controller: ReactiveController): void
  get updateComplete(): Promise<boolean>;
  protected update(...args: any[]): void
  protected updated(...args: any[]): void
}

export declare class ApolloElementElement<
  D extends MaybeTDN = MaybeTDN,
  V = MaybeVariables<D>
> extends ControllerHost {
  static documentType: 'document'|'query'|'mutation'|'subscription';
  static get observedAttributes(): string[]
  client: ApolloClient<NormalizedCacheObject> | null;
  controller: ApolloController<D, V>;
  document: ComponentDocument<D> | null;
  data: Data<D> | null;
  variables: Variables<D, V> | null;
  error: Error | ApolloError | null;
  errors: readonly GraphQLError[];
  loading: boolean;
  fetchPolicy?: string;
  context?: Record<string, unknown>;
  errorPolicy?: ErrorPolicy;
  public readyToReceiveDocument: boolean;
  attributeChangedCallback(name: string, oldVal: string, newVal: string): void;
  protected documentChanged?(document: ComponentDocument<D> | null): void
  protected variablesChanged?(variables: Variables<D, V> | null): void
}

export declare class ApolloMutationElement<
  D extends MaybeTDN = MaybeTDN,
  V = MaybeVariables<D>
> extends ApolloElementElement<D, V> {
  static documentType: 'mutation';
  static readonly observedAttributes: string[];
  controller: ApolloMutationController<D, V>;
  readonly called: boolean;
  mutation: ComponentDocument<D> | null;
  optimisticResponse?: OptimisticResponseType<D, V>;
  refetchQueries: RefetchQueriesType<D> | null;
  context?: Record<string, unknown>;
  fetchPolicy?: Extract<FetchPolicy, 'no-cache'>;
  awaitRefetchQueries?: boolean;
  ignoreResults: boolean;
  onCompleted?(_data: Data<D>): void;
  onError?(_error: Error): void;
  updater?(
    ...params: Parameters<MutationUpdaterFn<Data<D>>>
  ): ReturnType<MutationUpdaterFn<Data<D>>>;

  public mutate(
    params?: Partial<MutationOptions<Data<D>, Variables<D, V>>>
  ): Promise<FetchResult<Data<D>>>;
}

export declare class ApolloQueryElement<
  D extends MaybeTDN = MaybeTDN,
  V = MaybeVariables<D>
> extends ApolloElementElement<D, V> {
  static documentType: 'mutation';
  static readonly observedAttributes: string[];
  controller: ApolloQueryController<D, V>;
  query: DocumentNode | ComponentDocument<D> | null;
  get options(): ApolloQueryControllerOptions<D, V>
  set options(options: ApolloQueryControllerOptions<D, V>)
  get canAutoSubscribe(): boolean;
  readonly partial: boolean;
  networkStatus: NetworkStatus;
  fetchPolicy?: WatchQueryFetchPolicy;
  partialRefetch?: boolean;
  returnPartialData?: boolean;
  nextFetchPolicy?: WatchQueryFetchPolicy | NextFetchPolicyFunction<D, V>;
  noAutoSubscribe: boolean;
  notifyOnNetworkStatusChange?: boolean;
  pollInterval?: number;
  onData?(data: Data<D>): void
  onError?(error: Error): void
  refetch(variables: Variables<D, V>): Promise<ApolloQueryResult<Data<D>>>
  shouldSubscribe(
    options?: Partial<SubscriptionOptions<Variables<D, V>, Data<D>>>
  ): boolean

  subscribe(
    params?: Partial<SubscriptionOptions<Variables<D, V>, Data<D>>>
  ): ZenObservable.Subscription

  subscribeToMore<TSubscriptionVariables, TSubscriptionData>(
    options: SubscribeToMoreOptions<Data<D>, TSubscriptionVariables, TSubscriptionData>
  ): void | (() => void)

  executeQuery(
    params?: Partial<QueryOptions<Variables<D, V>, Data<D>>> | undefined
  ): Promise<ApolloQueryResult<Data<D>>>

  fetchMore(
    params?: Partial<FetchMoreParams<D, V>> | undefined
  ): Promise<ApolloQueryResult<Data<D>>>
}

export declare class ApolloSubscriptionElement<
  D extends MaybeTDN = MaybeTDN,
  V = MaybeVariables<D>
> extends ApolloElementElement<D, V> {
  static documentType: 'mutation';
  static readonly observedAttributes: string[];
  controller: ApolloSubscriptionController<D, V>;
  subscription: ComponentDocument<D> | null;
  declare readonly canAutoSubscribe: boolean;
  context?: Record<string, unknown>;
  fetchPolicy?: FetchPolicy;
  pollInterval?: number;
  noAutoSubscribe: boolean;
  notifyOnNetworkStatusChange?: boolean;
  shouldResubscribe: SubscriptionDataOptions['shouldResubscribe'];
  skip: boolean;
  onSubscriptionData?(_result: OnSubscriptionDataParams<Data<D>>): void
  onSubscriptionComplete?(): void
  onError?(error: ApolloError): void
  public subscribe(params?: Partial<SubscriptionDataOptions<D, V>>): void
  public cancel(): void
  shouldSubscribe(
    options?: Partial<SubscriptionOptions<Variables<D, V>, Data<D>>>
  ): boolean;
}
