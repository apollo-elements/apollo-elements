import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core';
import { Descriptor } from 'hybrids';

import { ApolloElementMixin } from '@apollo-elements/mixins/apollo-element-mixin';
import { apply, getDescriptor } from '../helpers/prototypes';

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
      apply(host, ApolloElementElement, 'client');
      host.client = (client ?? (useGlobal && window.__APOLLO_CLIENT__)) || null;
      getDescriptor(host).connectedCallback.value.call(host);
    },
  };
}
