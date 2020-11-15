import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core';
import { Descriptor } from 'hybrids';

import { ApolloElementMixin } from '@apollo-elements/mixins/apollo-element-mixin';
import { hookElementIntoHybridsCache } from '../helpers/cache';
import { apply, getDescriptor } from '@apollo-elements/lib/prototypes';

export class ApolloElementElement<D = unknown, V = unknown>
  extends ApolloElementMixin(HTMLElement)<D, V> { }

interface Opts {
  useGlobal: boolean;
}

export function client<TData, TVariables>(
  client: ApolloClient<NormalizedCacheObject>,
  { useGlobal }: Opts
): Descriptor<ApolloElementElement<TData, TVariables>> {
  return {
    connect(host) {
      apply(host, ApolloElementElement, 'client', hookElementIntoHybridsCache);
      host.client = (client ?? (useGlobal && window.__APOLLO_CLIENT__)) || null;
      getDescriptor(host).connectedCallback.value.call(host);
    },
  };
}
