import type { ComponentDocument, VariablesOf } from '@apollo-elements/core/types';

import type { OperationVariables } from '@apollo/client/core';

import { useController } from 'haunted/lib/use-controller';

import {
  ApolloMutationController,
  ApolloMutationControllerOptions,
} from '@apollo-elements/core/apollo-mutation-controller';

export type MutationHookTuple<D, V extends OperationVariables = VariablesOf<D>> = [
  ApolloMutationController<D, V>['mutate'],
  ApolloMutationController<D, V>
]

export function useMutation<D, V extends OperationVariables = VariablesOf<D>>(
  mutation: ComponentDocument<D>,
  options?: ApolloMutationControllerOptions<D, V>
): MutationHookTuple<D, V> {
  const controller = useController(host =>
    new ApolloMutationController<D, V>(host, mutation, options));
  return [controller.mutate, controller];
}
