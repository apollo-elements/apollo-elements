import type { ComponentDocument, MaybeTDN, MaybeVariables } from '@apollo-elements/interfaces';

import { useController } from 'haunted/lib/use-controller';

import {
  ApolloMutationController,
  ApolloMutationControllerOptions,
} from '@apollo-elements/core/apollo-mutation-controller';

export function useMutation<D extends MaybeTDN = any, V = MaybeVariables<D>>(
  mutation: ComponentDocument<D>,
  options?: ApolloMutationControllerOptions<D, V>
): [ApolloMutationController<D, V>['mutate'], ApolloMutationController<D, V>] {
  const controller = useController(host =>
    new ApolloMutationController<D, V>(host, mutation, options));
  return [controller.mutate, controller];
}
