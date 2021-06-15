import type {
  Constructor,
  MaybeTDN,
  MaybeVariables,
  ComponentDocument,
} from '@apollo-elements/core/types';

import type { Descriptor } from 'hybrids';

import { controller } from './controller';

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
export function query<
  E extends HTMLElement,
  D extends MaybeTDN = MaybeTDN,
  V = MaybeVariables<D>
>(
  queryDocument?: ComponentDocument<D> | null,
  options?: ApolloQueryControllerOptions<D, V>,
): Descriptor<E, ApolloQueryController<D, V>> {
  return controller(
    ApolloQueryController as Constructor<ApolloQueryController<D, V>>,
    queryDocument,
    options,
  );
}
