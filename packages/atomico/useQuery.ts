import type { ComponentDocument, MaybeTDN, MaybeVariables } from '@apollo-elements/core/types';

import { useController } from '@atomico/hooks/use-controller';

import {
  ApolloQueryController,
  ApolloQueryControllerOptions,
} from '@apollo-elements/core/apollo-query-controller';

export function useQuery<D extends MaybeTDN = MaybeTDN, V = MaybeVariables<D>>(
  query: ComponentDocument<D>,
  options?: ApolloQueryControllerOptions<D, V>
): ApolloQueryController<D, V> {
  return useController(host => new ApolloQueryController<D, V>(host, query, options));
}
