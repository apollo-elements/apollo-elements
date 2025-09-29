import type { ComponentDocument, Data, Variables } from '@apollo-elements/core/types';

import type { FetchResult, MutationOptions } from '@apollo/client';

import { useController } from '@atomico/hooks/use-controller';

import {
  ApolloMutationController,
  ApolloMutationControllerOptions,
} from '@apollo-elements/core/apollo-mutation-controller';

export function useMutation<D, V>(
  mutation: ComponentDocument<D, V>,
  options?: ApolloMutationControllerOptions<D, V>
): [
  (params?: Partial<MutationOptions<Data<D>, Variables<D, V>>>) => Promise<FetchResult<Data<D>>>,
  ApolloMutationController<D, V>
] {
  const controller = useController(host =>
    new ApolloMutationController<D, V>(host, mutation, options));
  return [controller.mutate, controller];
}
