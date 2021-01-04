import type { GraphQLError } from '@apollo-elements/interfaces';

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
  declare static documentType: 'document'|'query'|'mutation'|'subscription';

  /** The Apollo Client instance. */
  declare client: ApolloClient<NormalizedCacheObject> | null;

  /**
   * GraphQL operation document i.e. query, subscription, or mutation.
   * Must be a parsed GraphQL DocumentNode, so use `graphql-tag`.
   * If unset, the element can derive the document from the first
   * light-DOM `<script type="application/graphql">` child.
   */
  declare document: DocumentNode | ComponentDocument<D> | null;

  /** Context passed to the link execution chain. */
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

  connectedCallback(): void;

  protected mo?: MutationObserver;

  /**
   * Lifecycle callback that reacts to changes in the GraphQL document
   */
  protected documentChanged?(document: DocumentNode | ComponentDocument<D> | null): void;

  /**
   * Lifecycle callback that reacts to changes in the operation variables
   */
  protected variablesChanged?(variables: Variables<D, V> | null): void;

  /**
   * Gets operation variables from the element's JSON script child
   */
  protected getDOMVariables(): Variables<D, V> | null;

  /**
   * Get a GraphQL DocumentNode from the element's GraphQL script child
   */
  protected getDOMGraphQLDocument(): DocumentNode | ComponentDocument<D> | null;

  private onDOMMutation(records: MutationRecord[]): void;
}

export class ApolloElementElement<D = unknown, V = OperationVariables>
  extends ApolloElementMixin(HTMLElement)<D, V> { }
