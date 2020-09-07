import { ApolloElementInterface, CustomElement, Constructor } from '@apollo-elements/interfaces';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client/core';

export function ApolloClientMixin<B extends Constructor<ApolloElementInterface & CustomElement>>(
  client: ApolloClient<NormalizedCacheObject>,
  superclass: B
): B {
  return class extends superclass {
    client = client;
  };
}
