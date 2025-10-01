import type { ComponentDocument, VariablesOf } from '@apollo-elements/core';

import { useController } from 'haunted/lib/use-controller';
import { useEffect, useRef, useState } from 'haunted';

import {
  ApolloQueryController,
  ApolloQueryControllerOptions,
} from '@apollo-elements/core/apollo-query-controller';

export function useQuery<D, V = VariablesOf<D>>(
  query: ComponentDocument<D, V>,
  options?: ApolloQueryControllerOptions<D, V>
): ApolloQueryController<D, V> {
  const [, forceUpdate] = useState({});
  const controller = useController(host => new ApolloQueryController<D, V>(host, query, options));
  const prevVariablesRef = useRef<
    ApolloQueryControllerOptions<D, V>['variables']
  >(options?.variables);

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

  // Update variables when they change, using ref to avoid infinite loops
  useEffect(() => {
    const newVariables = options?.variables;
    const prevVariables = prevVariablesRef.current;

    // Check if variables actually changed using deep comparison
    const variablesChanged = JSON.stringify(newVariables) !== JSON.stringify(prevVariables);

    if (variablesChanged) {
      prevVariablesRef.current = newVariables;
      controller.variables = newVariables ?? null;

      // If we transition from no variables to having variables, or variables change
      // and we have an active query, refetch
      if (controller.query && newVariables !== undefined) {
        // Use timeout to avoid immediate re-render loops
        setTimeout(() => controller.refetch(newVariables), 0);
      }
    }
  });

  return controller;
}
