import type { DocumentNode, GraphQLError } from 'graphql';
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core';

export declare class ApolloElementInterface<TData> {
  /** The apollo client instance. */
  client: ApolloClient<NormalizedCacheObject>;

  /** GraphQL Document */
  document: DocumentNode;

  /** Context to be passed to link execution chain. */
  context?: Record<string, unknown>;

  /** Latest Data */
  data: TData;

  /** Latest Error */
  error: Error;

  /** Latest Errors */
  errors: readonly GraphQLError[];

  /** Whether a request is in flight. */
  loading: boolean;
}
