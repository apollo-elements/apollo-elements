import type { ApolloClient, ApolloError, NormalizedCacheObject } from '@apollo/client/core';

import type { PropertyDeclaration } from 'lit';

import type { ApolloController } from '@apollo-elements/core';

import type {
  ComponentDocument,
  Data,
  GraphQLError,
  MaybeTDN,
  MaybeVariables,
  Variables,
} from '@apollo-elements/core/types';

import { LitElement } from 'lit';

import { controlled } from '@apollo-elements/core/decorators';
import { ApolloElementEvent } from '@apollo-elements/core/events';

import { property, state } from 'lit/decorators.js';

export interface ControlledPropertyDeclaration extends PropertyDeclaration {
  controlled?: boolean|string;
  readonly?: boolean;
}

/**
 * `ApolloElement`
 *
 * 🚀 Custom element base class for apollo lit elements.
 *
 * See [`ApolloElementInterface`](https://apolloelements.dev/api/core/interfaces/element) for more information on events
 */
export class ApolloElement<
  D extends MaybeTDN = MaybeTDN,
  V = MaybeVariables<D>
> extends LitElement {
  declare controller: ApolloController<D, V>;

  readyToReceiveDocument = false;

  connectedCallback(): void {
    this.readyToReceiveDocument = true;
    super.connectedCallback();
    this.dispatchEvent(new ApolloElementEvent('apollo-element-connected', this));
  }

  disconnectedCallback(): void {
    this.readyToReceiveDocument = false;
    this.dispatchEvent(new ApolloElementEvent('apollo-element-disconnected', this));
    window.dispatchEvent(new ApolloElementEvent('apollo-element-disconnected', this));
    super.disconnectedCallback?.(); /* c8 ignore start */ // manual testing showed that both cases were hit
  }

  /** @summary The Apollo Client instance. */
  @controlled()
  @state()
  client: ApolloClient<NormalizedCacheObject> | null = window.__APOLLO_CLIENT__ ?? null;

  /** @summary Context passed to the link execution chain. */
  @controlled({ path: 'options' }) @state() context?: Record<string, unknown>;

  /** @summary Whether a request is in flight. */
  @controlled() @property({ reflect: true, type: Boolean }) loading = false;

  /** @summary Latest Data. */
  @controlled() @state() data: Data<D>|null = null;

  /**
   * @summary Operation document.
   * GraphQL operation document i.e. query, subscription, or mutation.
   * Must be a parsed GraphQL `DocumentNode`
   */
  @controlled() @state() document: ComponentDocument<D>|null = null;

  /** @summary Latest error */
  @controlled() @state() error: Error|ApolloError|null = null;

  /** @summary Latest errors */
  @controlled() @state() errors: readonly GraphQLError[] = [];

  /** @summary Operation variables. */
  @controlled() @state() variables: Variables<D, V>|null = null;
}
