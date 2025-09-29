import type { ComponentDocument } from '@apollo-elements/core/types';

import { useController } from '@atomico/hooks/use-controller';
import { useEffect, useState } from 'atomico';

import {
  ApolloQueryController,
  ApolloQueryControllerOptions,
} from '@apollo-elements/core/apollo-query-controller';

export function useQuery<D, V>(
  query: ComponentDocument<D, V>,
  options?: ApolloQueryControllerOptions<D, V>
): ApolloQueryController<D, V> {
  const [, forceUpdate] = useState({});
  const controller = useController(host => new ApolloQueryController<D, V>(host, query, options));

  // Force component updates when controller data changes
  useEffect(() => {
    const handleUpdate = () => {
      forceUpdate({});
    };

    // Listen to controller events
    controller.emitter.addEventListener('apollo-query-result', handleUpdate);
    controller.emitter.addEventListener('apollo-error', handleUpdate);

    return () => {
      controller.emitter.removeEventListener('apollo-query-result', handleUpdate);
      controller.emitter.removeEventListener('apollo-error', handleUpdate);
    };
  }, [controller]);

  return controller;
}
