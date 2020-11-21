import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core';
import { Descriptor } from 'hybrids';

import { hookElementIntoHybridsCache } from '../helpers/cache';
import { apply, getDescriptor } from '@apollo-elements/lib/prototypes';
import { ApolloElementElement } from '@apollo-elements/interfaces/apollo-element';

interface Opts {
  useGlobal: boolean;
}

export function client<TData, TVariables>(
  client?: ApolloClient<NormalizedCacheObject>,
  opts?: Opts
): Descriptor<ApolloElementElement<TData, TVariables>> {
  return {
    connect(host) {
      apply(host, ApolloElementElement, 'client', hookElementIntoHybridsCache);

      host.client = client ?? (opts?.useGlobal === false ? null : window.__APOLLO_CLIENT__ ?? null);

      getDescriptor(host).connectedCallback.value.call(host);

      return () => {
        getDescriptor(host).disconnectedCallback?.value?.call?.(host);
      };
    },
  };
}

export const __testing_escape_hatch__ = Symbol('__testing_escape_hatch__');
