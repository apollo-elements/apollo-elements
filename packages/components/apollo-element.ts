import type * as I from '@apollo-elements/interfaces';

import type { ApolloController } from '@apollo-elements/core';
import type { ReactiveElement } from 'lit';

import type {
  ApolloClient,
  ApolloError,
  NormalizedCacheObject,
} from '@apollo/client/core';

import { controlled } from '@apollo-elements/core/decorators';

import { StampinoRender } from './stampino-render';

import { property, state } from 'lit/decorators.js';

export class ApolloElement<D extends I.MaybeTDN = any, V = I.MaybeVariables<D>>
  extends StampinoRender
  implements I.ApolloElementInterface {
  declare controller: ApolloController<D, V>;

  readyToReceiveDocument = false;

  requestUpdate(name?: string, old?: unknown): void {
    super.requestUpdate(name, (
      this.constructor as typeof ReactiveElement
    ).getPropertyOptions(name as string).type === Boolean ? !!this[name as keyof this] : old);
  }

  /** @summary The Apollo Client instance. */
  @controlled()
  @state()
  client: ApolloClient<NormalizedCacheObject> | null = window.__APOLLO_CLIENT__ ?? null; /* c8 ignore next */ // covered

  /** @summary Whether a request is in flight. */
  @controlled() @property({ reflect: true, type: Boolean }) loading = false;

  /** @summary Latest Data. */
  @controlled() @state() data: I.Data<D> | null = null;

  /**
   * @summary Operation document.
   * GraphQL operation document i.e. query, subscription, or mutation.
   * Must be a parsed GraphQL `DocumentNode`
   */
  @controlled() @state() document: I.ComponentDocument<D> | null = null;

  /** @summary Latest error */
  @controlled() @state() error: Error | ApolloError | null = null;

  /** @summary Latest errors */
  @controlled() @state() errors: readonly I.GraphQLError[] = [];

  /** @summary Operation variables. */
  @controlled() @state() variables: I.Variables<D, V> | null = null;
}
