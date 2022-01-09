import type { DocumentNode, TypedDocumentNode } from '@apollo/client/core';

import type { Descriptor } from 'hybrids';

import { controller } from './controller.js';

import {
  ApolloQueryController,
  ApolloQueryControllerOptions,
} from '@apollo-elements/core/apollo-query-controller';

/**
 * Hybrids property descriptor factory for GraphQL querys.
 *
 * @param  queryDocument The query document.
 * @param  options Options to control the query.
 * @return Hybrids descriptor for a [`ApolloQueryController`](/api/core/controllers/query/)
 */
export function query<E extends HTMLElement, D, V>(
 queryDocument?: DocumentNode | null,
 options?: ApolloQueryControllerOptions<D, V>,
): Descriptor<E, ApolloQueryController<D, V>>
export function query<E extends HTMLElement, D extends TypedDocumentNode>(
  queryDocument?: D | null,
  options?: ApolloQueryControllerOptions<D>
): Descriptor<E, ApolloQueryController<D>> {
  return controller<E, ApolloQueryController<D>>(ApolloQueryController, queryDocument, options);
}
