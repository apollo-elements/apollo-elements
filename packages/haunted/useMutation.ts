import type {
  ApolloClient,
  ApolloError,
  DocumentNode,
  NormalizedCacheObject,
} from '@apollo/client/core';

import type {
  MutationHookOptions as ReactMutationHookOptions,
  MutationTuple as ReactMutationTuple,
} from '@apollo/client/react/types/types';

import type { State } from 'haunted';

import { ApolloMutationElement } from '@apollo-elements/interfaces/apollo-mutation';

import { hook } from 'haunted';

import { ApolloHook } from './ApolloHook';

type MutationHookOptions<TData, TVariables> =
  Omit<ReactMutationHookOptions<TData, TVariables>, 'client'> & {
  client: ApolloClient<NormalizedCacheObject>,
}

type MutationTuple<TData, TVariables> = [
  ReactMutationTuple<TData, TVariables>[0],
  Omit<ReactMutationTuple<TData, TVariables>[1], 'error'> & {
    error: Error | ApolloError,
  }
]

class UseMutationHook<TData, TVariables> extends ApolloHook<
  TData,
  TVariables,
  MutationHookOptions<TData, TVariables>,
  MutationTuple<TData, TVariables>,
  ApolloMutationElement<TData, TVariables>
> {
  readonly componentClass = ApolloMutationElement;

  readonly type = 'mutation';

  readonly reactiveProps = ['called' as const];

  readonly defaults: Partial<ApolloMutationElement<TData, TVariables>> = {
    called: false,
  };

  pollingInterval: number;

  constructor(
    id: number,
    state: State<ApolloMutationElement<TData, TVariables>>,
    mutation: DocumentNode,
    options?: MutationHookOptions<TData, TVariables>
  ) {
    super(id, state, mutation, options);
    this.init();
    this.update();
  }

  protected optionsToProperties() {
    const {
      onCompleted, onError, update,
      ignoreResults = false,
      optimisticResponse = null,
      variables = null,
      refetchQueries = null,
      ...options
    } = this.options;
    const mutation = this.document ?? options.mutation;
    return {
      mutation,
      ignoreResults,
      optimisticResponse,
      variables,
      refetchQueries,
      ...options,
    };
  }

  protected optionsToOptionalMethods() {
    const { options: { onCompleted, onError, update: updater } } = this;
    return { onCompleted, onError, updater };
  }

  update(_ = this.document, { variables } = this.options): MutationTuple<TData, TVariables> {
    if (this.disconnected) this.connect();

    const { host } = this.state;

    host.variables = variables ?? null;

    const { called, client, data, error, loading } = this.state.host;

    return [host.mutate.bind(host), { called, client, data, error, loading }];
  }
}

export const useMutation = hook(UseMutationHook);
