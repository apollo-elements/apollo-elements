import type { ComponentDocument } from '@apollo-elements/core/types';

import { useEffect, useState, useHost, useMemo, useUpdate } from 'atomico';

import {
  ApolloQueryController,
  ApolloQueryControllerOptions,
} from '@apollo-elements/core/apollo-query-controller';

import { AtomicoControllerHost } from './atomico-controller-host.js';

export function useQuery<D, V>(
  query: ComponentDocument<D, V>,
  options?: ApolloQueryControllerOptions<D, V>
): ApolloQueryController<D, V> {
  const [, forceUpdate] = useState({});
  const host = useHost();
  const update = useUpdate();
  const controller = useMemo(() =>
    new ApolloQueryController<D, V>(
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
    controller.emitter.addEventListener('apollo-query-result', handleUpdate);
    controller.emitter.addEventListener('apollo-error', handleUpdate);

    return () => {
      controller.emitter.removeEventListener('apollo-query-result', handleUpdate);
      controller.emitter.removeEventListener('apollo-error', handleUpdate);
    };
  }, [controller]);

  return controller;
}
