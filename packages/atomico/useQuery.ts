import type { ComponentDocument } from '@apollo-elements/core/types';
import type { OperationVariables } from '@apollo/client/core';

import { useController } from '@atomico/hooks/use-controller';

import {
  ApolloQueryController,
  ApolloQueryControllerOptions,
} from '@apollo-elements/core/apollo-query-controller';

export function useQuery<D, V extends OperationVariables>(
  query: ComponentDocument<D>,
  options?: ApolloQueryControllerOptions<D, V>
): ApolloQueryController<D, V> {
  return useController(host => new ApolloQueryController<D, V>(host, query, options));
}
