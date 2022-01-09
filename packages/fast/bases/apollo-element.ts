import type {
  ComponentDocument,
  Data,
  Entries,
  GraphQLError,
  Variables,
  VariablesOf,
} from '@apollo-elements/core/types';

import type * as C from '@apollo/client/core';

import { FASTElement, attr, observable } from '@microsoft/fast-element';
import { ApolloController, update } from '@apollo-elements/core/apollo-controller';
import { ApolloElementEvent } from '@apollo-elements/core/events';
import { controlled } from '@apollo-elements/core/decorators';
import { hosted } from './decorators';

/**
 * `ApolloElement`
 *
 * 🚀 Single-operation custom-element base class for Apollo FAST elements.
 *
 * See [`ApolloElementInterface`](https://apolloelements.dev/api/core/interfaces/element) for more information on events
 *
 * @element
 */
export class ApolloElement<D = unknown, V = VariablesOf<D>> extends FASTElement {
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

  /** @summary The Apollo Client instance */
  @observable
  @hosted()
  @controlled()
  client: C.ApolloClient<C.NormalizedCacheObject> | null = window.__APOLLO_CLIENT__ ?? null;

  /**
   * @summary Operation document.
   * GraphQL operation document i.e. query, subscription, or mutation.
   * Must be a parsed GraphQL `DocumentNode`
   */
  @hosted()
  @controlled()
  document: ComponentDocument<D, V> | null = null;

  /** @summary Context passed to the link execution chain. */
  @hosted({ path: 'options' })
  @controlled({ path: 'options' })
  context?: Record<string, unknown>;

  /** @summary Whether a request is in flight. */
  @attr({ mode: 'boolean' })
  @hosted()
  @controlled()
  loading = false;

  /** @summary Latest Data. */
  @hosted()
  @controlled()
  data: Data<D> | null = null;

  /** @summary Operation variables. */
  @hosted()
  @controlled()
  variables: Variables<D, V> | null = null;

  /** @summary Latest error */
  @hosted()
  @controlled()
  error: Error | C.ApolloError | null = null;

  /** @summary Latest errors */
  @hosted()
  @controlled()
  errors: readonly GraphQLError[] = [];

  /** @internal */
  [update](properties: Partial<this>): void {
    for (const [k, v] of Object.entries(properties) as Entries<this>)
      (this[k] !== v) && (this[k] = v);
  }
}
