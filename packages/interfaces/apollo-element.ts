import type { DocumentNode, GraphQLError } from 'graphql';
import type { ApolloClient, ApolloError, NormalizedCacheObject } from '@apollo/client/core';
import type { CustomElement } from './constructor';

/** @noInheritDoc */
export declare class ApolloElementInterface<TData = unknown, TVariables = unknown>
  extends CustomElement {
  declare static documentType: 'query'|'mutation'|'subscription';

  /** The Apollo Client instance. */
  declare client: ApolloClient<NormalizedCacheObject>;

  /**
   * GraphQL operation document i.e. query, subscription, or mutation.
   * Must be a parsed GraphQL DocumentNode, so use `graphql-tag`.
   * If unset, the element can derive the document from the first
   * light-DOM `<script type="application/graphql">` child.
   */
  declare document: DocumentNode;

  /** Context to be passed to link execution chain. */
  declare context?: Record<string, unknown>;

  /** Latest data */
  declare data: TData;

  /** Operation variables */
  declare variables: TVariables;

  /** Latest error */
  declare error: Error|ApolloError;

  /** Latest errors */
  declare errors: readonly GraphQLError[];

  /** Whether a request is in flight. */
  declare loading: boolean;
}
