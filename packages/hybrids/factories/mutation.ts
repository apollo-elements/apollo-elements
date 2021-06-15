import type {
  Constructor,
  ComponentDocument,
  MaybeTDN,
  MaybeVariables,
} from '@apollo-elements/core/types';

import type { Descriptor } from 'hybrids';

import { controller } from './controller';

import {
  ApolloMutationController,
  ApolloMutationControllerOptions,
} from '@apollo-elements/core/apollo-mutation-controller';

/**
 * Hybrids property descriptor factory for GraphQL mutations.
 *
 * @param  mutationDocument The mutation document.
 * @param  options Options to control the mutation.
 * @return Hybrids descriptor for a [ApolloMutationController](/api/core/controllers/mutation/)
 */
export function mutation<
  E extends HTMLElement,
  D extends MaybeTDN = MaybeTDN,
  V = MaybeVariables<D>
>(
  mutationDocument?: ComponentDocument<D> | null,
  options?: ApolloMutationControllerOptions<D, V>,
): Descriptor<E, ApolloMutationController<D, V>> {
  return controller(
    ApolloMutationController as Constructor<ApolloMutationController<D, V>>,
    mutationDocument,
    options,
  );
}
