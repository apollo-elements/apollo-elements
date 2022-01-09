import type {
  Data,
  Variables,
  GraphQLError,
  ComponentDocument,
} from '@apollo-elements/core/types';

import type { ApolloController, VariablesOf } from '@apollo-elements/core';
import type { ReactiveElement } from 'lit';

import type {
  ApolloClient,
  ApolloError,
  NormalizedCacheObject,
} from '@apollo/client/core';

import { controlled } from '@apollo-elements/core/decorators';

import { StampinoRender } from './stampino-render.js';

import { property, state } from 'lit/decorators.js';

export class ApolloElement<D, V = VariablesOf<D>> extends StampinoRender {
  declare controller: ApolloController<D, V>;

  readyToReceiveDocument = false;

  /** @summary The Apollo Client instance. */
  @controlled()
  @state()
  client: ApolloClient<NormalizedCacheObject> | null = window.__APOLLO_CLIENT__ ?? null; /* c8 ignore next */ // covered

  /** @summary Whether a request is in flight. */
  @controlled() @property({ reflect: true, type: Boolean }) loading = false;

  /** @summary Latest Data. */
  @controlled() @state() data: Data<D> | null = null;

  /**
   * @summary Operation document.
   * GraphQL operation document i.e. query, subscription, or mutation.
   * Must be a parsed GraphQL `DocumentNode`
   */
  @controlled() @state() document: ComponentDocument<D, V> | null = null;

  /** @summary Latest error */
  @controlled() @state() error: Error | ApolloError | null = null;

  /** @summary Latest errors */
  @controlled() @state() errors: readonly GraphQLError[] = [];

  /** @summary Operation variables. */
  @controlled() @state() variables: Variables<D, V> | null = null;

  requestUpdate(name?: string, old?: unknown): void {
    super.requestUpdate(name, (
      this.constructor as typeof ReactiveElement
    ).getPropertyOptions(name as string).type === Boolean ? !!this[name as keyof this] : old);
  }
}
