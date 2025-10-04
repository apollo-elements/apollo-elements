import type { ComponentDocument } from '@apollo-elements/core/types';
import type { OperationVariables } from '@apollo/client';

import { useEffect, useState, useHost, useMemo, useUpdate } from 'atomico';

import {
  ApolloSubscriptionController,
  ApolloSubscriptionControllerOptions,
} from '@apollo-elements/core/apollo-subscription-controller';

import { AtomicoControllerHost } from './atomico-controller-host.js';

export function useSubscription<D, V extends OperationVariables = OperationVariables>(
  query: ComponentDocument<D, V>,
  options?: ApolloSubscriptionControllerOptions<D, V>
): ApolloSubscriptionController<D, V> {
  const [, forceUpdate] = useState({});
  const host = useHost();
  const update = useUpdate();
  const controller = useMemo(() =>
    new ApolloSubscriptionController<D, V>(
      new AtomicoControllerHost(host.current, update),
      query,
      options
    ), []);

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
