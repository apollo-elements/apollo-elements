import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core';
import type {
  ApolloElementElement,
  Constructor,
} from '@apollo-elements/interfaces';

export function ApolloClientMixin<B extends Constructor<ApolloElementElement<any, any>>>(
  client: ApolloClient<NormalizedCacheObject>,
  superclass: B
): B {
  return class extends superclass {
    client = client;
  };
}
