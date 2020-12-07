import type {
  ApolloClient,
  ApolloError,
  DocumentNode,
  OperationVariables,
  PureQueryOptions,
  MutationUpdaterFn,
  NormalizedCacheObject,
  ErrorPolicy,
  WatchQueryFetchPolicy,
} from '@apollo/client/core';

import type { State } from 'haunted';

import { ApolloMutationElement } from '@apollo-elements/interfaces/apollo-mutation';

import { hook } from 'haunted';

import { ApolloHook } from './ApolloHook';
import { ComponentDocument, Data, Variables } from '@apollo-elements/interfaces';

export interface MutationHookOptions<D, V> {
  mutation?: ComponentDocument<D> | null;
  variables?: Variables<D, V>;
  optimisticResponse?: Data<D> | ((vars: Variables<D, V>) => Data<D>);
  refetchQueries?: Array<string | PureQueryOptions> |
    ((...args: any[]) => Array<string | PureQueryOptions>);
  awaitRefetchQueries?: boolean;
  errorPolicy?: ErrorPolicy;
  update?: MutationUpdaterFn<Data<D>>;
  client?: ApolloClient<NormalizedCacheObject>;
  notifyOnNetworkStatusChange?: boolean;
  context?: Record<string, any>;
  onCompleted?: (data: Data<D>) => void;
  onError?: (error: ApolloError) => void;
  fetchPolicy?: Extract<WatchQueryFetchPolicy, 'no-cache'>;
  ignoreResults?: boolean;
}

export interface MutationHookResult<D, V> {
  called: boolean;
  client: ApolloMutationElement<D, V>['client'] | null;
  data: Data<D> | null;
  error: Error | ApolloError | null,
  loading: boolean;
}

export type MutateFn<D, V> = ApolloMutationElement<D, V>['mutate'];

export type MutationTuple<D, V> = [MutateFn<D, V>, MutationHookResult<D, V>]

class UseMutationHook<D = unknown, V = OperationVariables> extends ApolloHook<
  D,
  V,
  MutationHookOptions<D, V>,
  MutationTuple<D, V>,
  ApolloMutationElement<D, V>
> {
  readonly componentClass = ApolloMutationElement;

  readonly type = 'mutation';

  readonly reactiveProps = ['called' as const];

  readonly defaults: Partial<ApolloMutationElement<D, V>> = {
    called: false,
  };

  pollingInterval?: number;

  constructor(
    id: number,
    state: State<ApolloMutationElement<D, V>>,
    mutation: DocumentNode | ComponentDocument<D>,
    options?: MutationHookOptions<D, V>
  ) {
    super(id, state, mutation, options);
    this.init();
    this.update();
  }

  protected optionsToProperties(): Partial<ApolloMutationElement<D, V>> {
    const {
      onCompleted, onError, update,
      ignoreResults = false,
      variables = null,
      refetchQueries = null,
      ...options
    } = this.options;
    const mutation = this.document ?? options.mutation;
    return {
      mutation,
      ignoreResults,
      variables,
      refetchQueries,
      ...options,
    };
  }

  protected optionsToOptionalMethods(): Partial<ApolloMutationElement<D, V>> {
    const { options: { onCompleted, onError, update: updater } } = this;
    return { onCompleted, onError, updater };
  }

  update(_ = this.document, { variables } = this.options): MutationTuple<D, V> {
    if (this.disconnected) this.connect();

    const { host } = this.state;

    host.variables = variables ?? null;

    const { called, client, data, error, loading } = this.state.host;

    return [host.mutate.bind(host), { called, client, data, error, loading }];
  }
}

export const useMutation = hook(UseMutationHook);
