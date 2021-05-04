import type { DocumentNode, TypedDocumentNode } from '@apollo/client/core';

import { useController } from './useController';

import {
  ApolloQueryController,
  ApolloQueryControllerOptions,
} from '@apollo-elements/core/apollo-query-controller';

export function useQuery<D, V>(
  query: D extends TypedDocumentNode ? D : DocumentNode,
  options?: ApolloQueryControllerOptions<D, V>
): ApolloQueryController<D, V> {
  return useController(host => new ApolloQueryController<D, V>(host, query, options));
}
