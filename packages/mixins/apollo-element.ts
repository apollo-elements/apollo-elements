import type { DocumentNode } from 'graphql';
import type { ApolloClient } from 'apollo-client';

export interface ApolloElement<TData> {
  /** Context to be passed to link execution chain. */
  context: object;

  /** Latest Data */
  data: TData;

  /** Latest Error */
  error: Error;

  /** Whether a request is in flight. */
  loading: boolean;

  /** The apollo client instance. */
  client: ApolloClient<unknown>;

  /** GraphQL Document */
  document: DocumentNode;
}
