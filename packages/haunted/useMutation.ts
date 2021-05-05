import type { DocumentNode } from '@apollo/client/core';

import { useController } from 'haunted/lib/use-controller';

import {
  ApolloMutationController,
  ApolloMutationControllerOptions,
} from '@apollo-elements/core/apollo-mutation-controller';

export function useMutation<D extends DocumentNode, V>(
  query: D,
  options?: ApolloMutationControllerOptions<D, V>
): [ApolloMutationController<D, V>['mutate'], ApolloMutationController<D, V>] {
  const controller = useController(host =>
    new ApolloMutationController<D, V>(host, query, options));
  return [controller.mutate, controller];
}
