import type { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import type { ApolloElementElement, Constructor } from '@apollo-elements/core/types';

/**
 * Mixin which applies a specific `ApolloClient` instance to the element.
 * @param client The specific `ApolloClient` instance.
 * @param superclass An element that implements the `ApolloElementInterface`.
 */
export function ApolloClientMixin<B extends Constructor<ApolloElementElement<any, any>>>( // eslint-disable-line @typescript-eslint/no-explicit-any
  client: ApolloClient,
  superclass: B
): B {
  return class extends superclass {
    /** The client specified with `ApolloClientMixin`. */
    client: ApolloClient = client;
  };
}
