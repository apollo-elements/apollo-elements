import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core';
import { Descriptor } from 'hybrids';

import { hookElementIntoHybridsCache } from '../helpers/cache';
import { apply, getDescriptor } from '@apollo-elements/lib/prototypes';
import { ApolloElementElement } from '@apollo-elements/interfaces/apollo-element';

interface Opts {
  useGlobal: boolean;
}

export function client<TData, TVariables>(
  client?: ApolloClient<NormalizedCacheObject> | null,
  opts?: Opts
): Descriptor<ApolloElementElement<TData, TVariables>> {
  return {
    connect(host) {
      apply(host, ApolloElementElement, 'client', hookElementIntoHybridsCache);

      const useGlobal = opts?.useGlobal ?? true;

      const fallback = useGlobal ? window.__APOLLO_CLIENT__ : null; /* c8 ignore next */ // this is definitely covered

      host.client = client ?? fallback ?? null;

      getDescriptor(host).connectedCallback.value.call(host);

      return () => {
        getDescriptor(host).disconnectedCallback?.value?.call?.(host);
      };
    },
  };
}
