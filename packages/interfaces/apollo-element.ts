import type { GraphQLError } from '@apollo-elements/interfaces';

import type {
  ApolloClient,
  ApolloError,
  DocumentNode,
  ErrorPolicy,
  NormalizedCacheObject,
  OperationVariables,
  TypedDocumentNode,
} from '@apollo/client/core';

import type { CustomElement } from './constructor';
import type { Data, Variables } from './operation';

import { ApolloElementMixin } from '@apollo-elements/mixins/apollo-element-mixin';

/**
 * Common base interface for apollo elements
 *
 * @element
 *
 * @fires 'apollo-element-connected' when the element connects to the dom
 * @fires 'apollo-element-disconnected' when the element disconnects from the dom
 */
export declare abstract class ApolloElementInterface extends CustomElement {
  declare static documentType: 'document'|'query'|'mutation'|'subscription';

  /** @summary Latest Data. */
  abstract data: unknown | null;

  /** @summary Operation variables. */
  abstract variables: unknown | null;

  /** @summary The Apollo Client instance. */
  declare client: ApolloClient<NormalizedCacheObject> | null;

  /**
   * @summary Operation document.
   * GraphQL operation document i.e. query, subscription, or mutation.
   * Must be a parsed GraphQL DocumentNode, so use `graphql-tag`.
   * If unset, the element can derive the document from the first
   * light-DOM `<script type="application/graphql">` child.
   */
  declare document: DocumentNode | TypedDocumentNode | null;

  /** @summary Context passed to the link execution chain. */
  declare context?: Record<string, unknown>;

  /** @summary Latest error */
  declare error: Error | ApolloError | null;

  /** @summary Latest errors */
  declare errors: readonly GraphQLError[] | null;

  /**
   * @summary [Error Policy](https://www.apollographql.com/docs/react/api/core/ApolloClient/#ErrorPolicy) for the operation.
   * @attr error-policy
   */
  declare errorPolicy?: ErrorPolicy;

  /**
   * @summary Fetch Policy for the operation.
   * @attr fetch-policy
   */
  declare fetchPolicy?: string;

  /** @summary Whether a request is in flight. */
  declare loading: boolean;

  constructor(...a: any[]);

  connectedCallback(): void;

  declare protected mo?: MutationObserver;

  /**
   * Lifecycle callback that reacts to changes in the GraphQL document
   */
  protected documentChanged?(document: this['document']): void;

  /**
   * Lifecycle callback that reacts to changes in the operation variables
   */
  protected variablesChanged?(variables: this['variables']): void;

  /**
   * Gets operation variables from the element's JSON script child
   */
  protected getDOMVariables(): this['variables'];

  /**
   * Get a GraphQL DocumentNode from the element's GraphQL script child
   */
  protected getDOMGraphQLDocument(): this['document'];

  private onDOMMutation(records: MutationRecord[]): void;
}

export class ApolloElementElement<D = unknown, V = OperationVariables>
  extends ApolloElementMixin(HTMLElement) {
    declare data: Data<D> | null;

    declare variables: Variables<D, V> | null;
}
