import type * as I from '@apollo-elements/interfaces';
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
 * @return Hybrids descriptor for a [ApolloMutationController](/api/core/query/)
 */
export function query<
  E extends HTMLElement,
  D extends I.MaybeTDN = I.MaybeTDN,
  V = I.MaybeVariables<D>
>(
  queryDocument?: I.ComponentDocument<D> | null,
  options?: ApolloQueryControllerOptions<D, V>,
): Descriptor<E, ApolloQueryController<D, V>> {
  return controller(
    ApolloQueryController as I.Constructor<ApolloQueryController<D, V>>,
    queryDocument,
    options,
  );
}
