import type * as I from '@apollo-elements/interfaces';

import type { ApolloController, p } from '@apollo-elements/core';

import type {
  ApolloClient,
  ApolloError,
  DocumentNode,
  ErrorPolicy,
  NormalizedCacheObject,
  TypedDocumentNode,
} from '@apollo/client/core';

import type { CustomElement } from './constructor';

import { ApolloElementMixin } from '@apollo-elements/mixins/apollo-element-mixin';

/**
 * Common base interface for apollo elements
 *
 * @element
 *
 * @fires 'apollo-element-connected' when the element connects to the dom
 * @fires 'apollo-element-disconnected' when the element disconnects from the dom
 */
export declare class ApolloElementInterface<
  D extends I.MaybeTDN = I.MaybeTDN,
  V = I.MaybeVariables<D>
> extends CustomElement {
  /** @protected */
  declare [p]?: Map<string, unknown>;

  declare static documentType: 'document'|'query'|'mutation'|'subscription';

  declare controller: ApolloController<D, V>;

  /** @summary Latest Data. */
  declare data: I.Data<D> | null;

  /** @summary Operation variables. */
  declare variables: I.Variables<D, V> | null;

  /** @summary The Apollo Client instance. */
  declare client: ApolloClient<NormalizedCacheObject> | null;

  /**
   * @summary Operation document.
   * GraphQL operation document i.e. query, subscription, or mutation.
   * Must be a parsed GraphQL DocumentNode, so use `graphql-tag`.
   */
  declare document: DocumentNode | TypedDocumentNode | null;

  /** @summary Context passed to the link execution chain. */
  declare context?: Record<string, unknown>;

  /** @summary Latest error */
  declare error: Error | ApolloError | null;

  /** @summary Latest errors */
  declare errors: readonly I.GraphQLError[] | null;

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

  /** @summary True when the element is connected and ready to receive its GraphQL document */
  declare readyToReceiveDocument: boolean;

  constructor(...a: any[]);

  connectedCallback(): void;

  disconnectedCallback(): void;

  /**
   * Lifecycle callback that reacts to changes in the GraphQL document
   */
  protected documentChanged?(document: this['document']): void;

  /**
   * Lifecycle callback that reacts to changes in the operation variables
   */
  protected variablesChanged?(variables: this['variables']): void;
}

export class ApolloElementElement<D extends I.MaybeTDN = I.MaybeTDN, V = I.MaybeVariables<D>>
  extends ApolloElementMixin(HTMLElement)<D, V> {
}
