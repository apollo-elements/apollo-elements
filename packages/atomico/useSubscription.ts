import type { ComponentDocument, VariablesOf } from '@apollo-elements/core/types';
import type { OperationVariables } from '@apollo/client/core';

import { useController } from '@atomico/hooks/use-controller';

import {
  ApolloSubscriptionController,
  ApolloSubscriptionControllerOptions,
} from '@apollo-elements/core/apollo-subscription-controller';

export function useSubscription<D, V extends OperationVariables = VariablesOf<D>>(
  query: ComponentDocument<D>,
  options?: ApolloSubscriptionControllerOptions<D, V>
): ApolloSubscriptionController<D, V> {
  return useController(host => new ApolloSubscriptionController<D, V>(host, query, options));
}
