import type { ComponentDocument, MaybeTDN, MaybeVariables } from '@apollo-elements/interfaces';

import { useController } from 'haunted/lib/use-controller';

import {
  ApolloSubscriptionController,
  ApolloSubscriptionControllerOptions,
} from '@apollo-elements/core/apollo-subscription-controller';

export function useSubscription<D extends MaybeTDN, V = MaybeVariables<D>>(
  query: ComponentDocument<D>,
  options?: ApolloSubscriptionControllerOptions<D, V>
): ApolloSubscriptionController<D, V> {
  return useController(host => new ApolloSubscriptionController<D, V>(host, query, options));
}
