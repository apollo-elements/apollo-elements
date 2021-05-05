import type { DocumentNode } from '@apollo/client/core';

import { useController } from 'haunted/lib/use-controller';

import {
  ApolloQueryController,
  ApolloQueryControllerOptions,
} from '@apollo-elements/core/apollo-query-controller';

export function useQuery<D extends DocumentNode, V>(
  query: D,
  options?: ApolloQueryControllerOptions<D, V>
): ApolloQueryController<D, V> {
  return useController(host => new ApolloQueryController<D, V>(host, query, options));
}
