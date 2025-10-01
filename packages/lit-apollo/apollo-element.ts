import type { ApolloClient } from '@apollo/client';

import type { PropertyDeclaration } from 'lit';

import type { ApolloController, VariablesOf } from '@apollo-elements/core';

import type {
  ComponentDocument,
  Data,
  GraphQLError,
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
 * 🚀 Single-operation custom-element base class for apollo lit elements.
 *
 * See [`ApolloElementInterface`](https://apolloelements.dev/api/core/interfaces/element) for more information on events
 */
export class ApolloElement<D = unknown, V = VariablesOf<D>> extends LitElement {
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
    super.disconnectedCallback?.();  // manual testing showed that both cases were hit
  }

  /** @summary The Apollo Client instance. */
  @controlled()
  @state()
    client: ApolloClient | null = window.__APOLLO_CLIENT__ ?? null;

  /**
   * @summary Operation document.
   * GraphQL operation document i.e. query, subscription, or mutation.
   * Must be a parsed GraphQL `DocumentNode`
   */
  @controlled()
  @state()
    document: ComponentDocument<D, V> | null = null;

  /** @summary Context passed to the link execution chain. */
  @controlled({ path: 'options' })
  @state()
    context?: Record<string, unknown>;

  /** @summary Whether a request is in flight. */
  @controlled()
  @property({ reflect: true, type: Boolean })
    loading = false;

  /** @summary Latest Data. */
  @controlled()
  @state()
    data: Data<D> | null = null;

  /** @summary Operation variables. */
  @controlled()
  @state()
    variables: Variables<D, V> | null = null;

  /** @summary Latest error */
  @controlled()
  @state()
    error: Error | null = null;

  /** @summary Latest errors */
  @controlled()
  @state()
    errors: readonly GraphQLError[] = [];
}
