import type { DocumentNode } from 'graphql';
import type { ApolloClient } from 'apollo-client';

export declare class ApolloElement<TData> {
  /** Context to be passed to link execution chain. */
  declare context?: Record<string, unknown>;

  /** Latest Data */
  declare data: TData;

  /** Latest Error */
  declare error: Error;

  /** Whether a request is in flight. */
  declare loading: boolean;

  /** The apollo client instance. */
  declare client: ApolloClient<unknown>;

  /** GraphQL Document */
  declare document: DocumentNode;
}
