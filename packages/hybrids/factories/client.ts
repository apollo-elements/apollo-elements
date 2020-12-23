import type { ApolloClient, NormalizedCacheObject, OperationVariables } from '@apollo/client/core';
import { Descriptor } from 'hybrids';

import { hookElementIntoHybridsCache } from '../helpers/cache';
import { applyPrototype, getDescriptor } from '@apollo-elements/lib/prototypes';
import { ApolloElementElement } from '@apollo-elements/interfaces/apollo-element';

interface ClientHybridsFactoryOptions {
  /** if false, do not use `window.__APOLLO_CLIENT__` by default */
  useGlobal: boolean;
}

/**
 * @summary Hybrids descriptor factory for an [ApolloElement](/api/interfaces/element/).
 *
 * @param  [client=window.__APOLLO_CLIENT] Apollo client instance.
 * @param  [options={ useGlobal: true }] Options to configure the factory.
 * @return Hybrids descriptor which mixes the [ApolloElementInterface](/api/interfaces/element/) in on connect
 */
export function client<D = unknown, V = OperationVariables>(
  client?: ApolloClient<NormalizedCacheObject> | null,
  options?: ClientHybridsFactoryOptions
): Descriptor<ApolloElementElement<D, V>> {
  return {
    connect(host) {
      applyPrototype(host, ApolloElementElement, 'client', hookElementIntoHybridsCache);

      const useGlobal = options?.useGlobal ?? true;

      const fallback = useGlobal ? window.__APOLLO_CLIENT__ : null; /* c8 ignore next */ // this is definitely covered

      host.client = client ?? fallback ?? null;

      getDescriptor(host).connectedCallback.value.call(host);

      return () => {
        getDescriptor(host).disconnectedCallback?.value?.call?.(host);
      };
    },
  };
}
