import type { ComponentDocument, VariablesOf } from '@apollo-elements/core/types';
import type { OperationVariables } from '@apollo/client';

import { useController } from 'haunted/lib/use-controller';

import {
  ApolloSubscriptionController,
  ApolloSubscriptionControllerOptions,
} from '@apollo-elements/core/apollo-subscription-controller';

export function useSubscription<D, V extends OperationVariables = OperationVariables & VariablesOf<D>>(
  query: ComponentDocument<D, V>,
  options?: ApolloSubscriptionControllerOptions<D, V>
): ApolloSubscriptionController<D, V> {
  return useController(host => new ApolloSubscriptionController<D, V>(host, query, options));
}
