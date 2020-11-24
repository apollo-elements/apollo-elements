import type { GraphQLError } from 'graphql';

import type {
  ApolloClient,
  ApolloError,
  DocumentNode,
  NormalizedCacheObject,
  OperationVariables,
} from '@apollo/client/core';

import type { CustomElement } from './constructor';
import type { ComponentDocument, Data, Variables } from './operation';

import { ApolloElementMixin } from '@apollo-elements/mixins/apollo-element-mixin';

/**
 * Common base interface for apollo elements
 *
 * @element
 *
 * @fires 'apollo-element-connected' when the element connects to the dom
 * @fires 'apollo-element-disconnected' when the element disconnects from the dom
 */
export declare class ApolloElementInterface<D = unknown, V = OperationVariables>
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
  declare document: DocumentNode | ComponentDocument<D> | null;

  /** Context to be passed to link execution chain. */
  declare context?: Record<string, unknown>;

  /** data */
  declare data: Data<D> | null;

  /** Operation variables */
  declare variables: Variables<D, V> | null;

  /** Latest error */
  declare error: Error | ApolloError | null;

  /** Latest errors */
  declare errors: readonly GraphQLError[] | null;

  /** Whether a request is in flight. */
  declare loading: boolean;
}

export class ApolloElementElement<D = unknown, V = OperationVariables>
  extends ApolloElementMixin(HTMLElement)<D, V> { }
