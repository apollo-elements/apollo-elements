import type { GraphQLError } from 'graphql';
import type {
  ApolloClient,
  ApolloError,
  DocumentNode,
  NormalizedCacheObject,
} from '@apollo/client/core';
import type { CustomElement } from './constructor';

import { ApolloElementMixin } from '@apollo-elements/mixins/apollo-element-mixin';

/** @noInheritDoc */
export declare class ApolloElementInterface<TData = unknown, TVariables = unknown>
  extends CustomElement {
  declare static documentType: 'query'|'mutation'|'subscription';

  /** The Apollo Client instance. */
  declare client: ApolloClient<NormalizedCacheObject> | null;

  /**
   * GraphQL operation document i.e. query, subscription, or mutation.
   * Must be a parsed GraphQL DocumentNode, so use `graphql-tag`.
   * If unset, the element can derive the document from the first
   * light-DOM `<script type="application/graphql">` child.
   */
  declare document: DocumentNode | null;

  /** Context to be passed to link execution chain. */
  declare context?: Record<string, unknown>;

  /** Latest data */
  declare data: TData | null;

  /** Operation variables */
  declare variables: TVariables | null;

  /** Latest error */
  declare error: Error | ApolloError | null;

  /** Latest errors */
  declare errors: readonly GraphQLError[] | null;

  /** Whether a request is in flight. */
  declare loading: boolean;
}

export class ApolloElementElement<TData = unknown, TVariables = unknown>
  extends ApolloElementMixin(HTMLElement)<TData, TVariables> { }
