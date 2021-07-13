import type {
  ComponentDocument,
  Data,
  MaybeTDN,
  MaybeVariables,
  Variables,
} from '@apollo-elements/core/types';

import type { FetchResult, MutationOptions } from '@apollo/client/core';

import { useController } from '@atomico/hooks/use-controller';

import {
  ApolloMutationController,
  ApolloMutationControllerOptions,
} from '@apollo-elements/core/apollo-mutation-controller';

export function useMutation<D extends MaybeTDN = MaybeTDN, V = MaybeVariables<D>>(
  mutation: ComponentDocument<D>,
  options?: ApolloMutationControllerOptions<D, V>
): [
  (params?: Partial<MutationOptions<Data<D>, Variables<D, V>>>) => Promise<FetchResult<Data<D>>>,
  ApolloMutationController<D, V>
] {
  const controller = useController(host =>
    new ApolloMutationController<D, V>(host, mutation, options));
  return [controller.mutate, controller];
}
