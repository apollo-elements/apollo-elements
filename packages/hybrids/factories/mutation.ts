import type * as I from '@apollo-elements/interfaces';
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
 * @return Hybrids descriptor for a [ApolloMutationController](/api/core/mutation/)
 */
export function mutation<
  E extends HTMLElement,
  D extends I.MaybeTDN = I.MaybeTDN,
  V = I.MaybeVariables<D>
>(
  mutationDocument?: I.ComponentDocument<D> | null,
  options?: ApolloMutationControllerOptions<D, V>,
): Descriptor<E, ApolloMutationController<D, V>> {
  return controller(
    ApolloMutationController as I.Constructor<ApolloMutationController<D, V>>,
    mutationDocument,
    options,
  );
}
