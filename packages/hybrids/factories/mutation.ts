import type { DocumentNode, TypedDocumentNode } from '@apollo/client';

// @ts-ignore: hybrids does not have TypeScript declarations
import type { Descriptor } from 'hybrids';

import { controller } from './controller.js';

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
export function mutation<E extends HTMLElement, D, V>(
  mutationDocument?: DocumentNode | null,
  options?: ApolloMutationControllerOptions<D, V>,
): Descriptor<E, ApolloMutationController<D, V>>
export function mutation<E extends HTMLElement, D extends TypedDocumentNode>(
  mutationDocument?: D | null,
  options?: ApolloMutationControllerOptions<D>,
): Descriptor<E, ApolloMutationController<D>> {
  return controller<E, ApolloMutationController<D>>(
    ApolloMutationController,
    mutationDocument,
    options
  );
}
