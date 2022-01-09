import type { ComponentDocument, VariablesOf } from '@apollo-elements/core';

import { useController } from 'haunted/lib/use-controller';

import {
  ApolloQueryController,
  ApolloQueryControllerOptions,
} from '@apollo-elements/core/apollo-query-controller';

export function useQuery<D, V = VariablesOf<D>>(
  query: ComponentDocument<D, V>,
  options?: ApolloQueryControllerOptions<D, V>
): ApolloQueryController<D, V> {
  return useController(host => new ApolloQueryController<D, V>(host, query, options));
}
