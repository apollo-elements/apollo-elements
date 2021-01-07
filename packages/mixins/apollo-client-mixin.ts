import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core';
import type {
  ApolloElementInterface,
  CustomElement,
  Constructor,
} from '@apollo-elements/interfaces';

export function ApolloClientMixin<B extends Constructor<ApolloElementInterface & CustomElement>>(
  client: ApolloClient<NormalizedCacheObject>,
  superclass: B
): B {
  return class extends superclass {
    client = client;
  };
}
