import type { DocumentNode, GraphQLError } from 'graphql';
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core';
import type { CustomElement } from './constructor';

/** @noInheritDoc */
export declare class ApolloElementInterface<TData = unknown> extends CustomElement {
  /** The Apollo Client instance. */
  client: ApolloClient<NormalizedCacheObject>;

  /**
   * GraphQL operation document i.e. query, subscription, or mutation.
   * Must be a parsed GraphQL DocumentNode, so use `graphql-tag`.
   * If unset, the element can derive the document from the first
   * light-DOM `<script type="application/graphql">` child.
   */
  document: DocumentNode;

  /** Context to be passed to link execution chain. */
  context?: Record<string, unknown>;

  /** Latest data */
  data: TData;

  /** Latest error */
  error: Error;

  /** Latest errors */
  errors: readonly GraphQLError[];

  /** Whether a request is in flight. */
  loading: boolean;
}
