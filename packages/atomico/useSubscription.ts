import type { ComponentDocument } from '@apollo-elements/core/types';
import type { OperationVariables } from '@apollo/client';

import { useController } from '@atomico/hooks/use-controller';
import { useEffect, useState } from 'atomico';

import {
  ApolloSubscriptionController,
  ApolloSubscriptionControllerOptions,
} from '@apollo-elements/core/apollo-subscription-controller';

export function useSubscription<D, V extends OperationVariables = OperationVariables>(
  query: ComponentDocument<D, V>,
  options?: ApolloSubscriptionControllerOptions<D, V>
): ApolloSubscriptionController<D, V> {
  const [, forceUpdate] = useState({});
  const controller = useController(host => new ApolloSubscriptionController<D, V>(host, query, options));

  // Force component updates when controller data changes
  useEffect(() => {
    const handleUpdate = () => {
      forceUpdate({});
    };

    // Listen to controller events
    controller.emitter.addEventListener('apollo-subscription-result', handleUpdate);
    controller.emitter.addEventListener('apollo-error', handleUpdate);

    return () => {
      controller.emitter.removeEventListener('apollo-subscription-result', handleUpdate);
      controller.emitter.removeEventListener('apollo-error', handleUpdate);
    };
  }, [controller]);

  return controller;
}
