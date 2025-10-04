import type { ComponentDocument, Data, Variables } from '@apollo-elements/core/types';

import type { ApolloClient, ApolloLink } from '@apollo/client';

import { useHost, useMemo, useUpdate } from 'atomico';

import {
  ApolloMutationController,
  ApolloMutationControllerOptions,
} from '@apollo-elements/core/apollo-mutation-controller';

import { AtomicoControllerHost } from './atomico-controller-host.js';

export function useMutation<D, V>(
  mutation: ComponentDocument<D, V>,
  options?: ApolloMutationControllerOptions<D, V>
): [
  (params?: Partial<ApolloClient.MutateOptions<Data<D>, Variables<D, V>>>) => Promise<ApolloLink.Result<Data<D>>>,
  ApolloMutationController<D, V>
] {
  const host = useHost();
  const update = useUpdate();
  const controller = useMemo(() =>
    new ApolloMutationController<D, V>(
      new AtomicoControllerHost(host.current, update),
      mutation,
      options
    ), []);
  return [controller.mutate, controller];
}
