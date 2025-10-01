import type { ReactiveController, ReactiveControllerHost, ReactiveElement } from 'lit';

import type {
  ApolloClient,
  ErrorPolicy,
} from '@apollo/client';

import type { GraphQLFormattedError } from 'graphql';

import type {
  ComponentDocument,
  Data,
  Variables,
  VariablesOf,
} from '@apollo-elements/core/types';

import { isValidGql } from './lib/is-valid-gql.js';

import { ApolloControllerConnectedEvent, ApolloControllerDisconnectedEvent } from './events.js';

export interface ApolloControllerOptions<D, V> {
  /** The `ApolloClient` instance for the controller. */
  client?: ApolloClient;
  /** Variables for the operation. */
  variables?: Variables<D, V>;
  /** Context passed to the link execution chain. */
  context?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  /**
   * errorPolicy determines the level of events for errors in the execution result. The options are:
   * - `none` (default): any errors from the request are treated like runtime errors and the observable is stopped (XXX this is default to lower breaking changes going from AC 1.0 => 2.0)
   * - `ignore`: errors from the request do not stop the observable, but also don't call `next`
   * - `all`: errors are treated like data and will notify observables
   * @summary [Error Policy](https://www.apollographql.com/docs/react/api/core/ApolloClient/#ErrorPolicy) for the query.
   */
  errorPolicy?: ErrorPolicy;
  /** When provided, the controller will fall back to this element to fire events */
  hostElement?: HTMLElement;
}

/**
 * @fires {ApolloControllerConnectedEvent} apollo-controller-connected - The controller's host connected to the DOM.
 * @fires {ApolloControllerDisconnectedEvent} apollo-controller-disconnected - The controller's host disconnected from the DOM.
 */
export abstract class ApolloController<D = unknown, V = VariablesOf<D>>
implements ReactiveController {
  /** @internal */
  static o(
    // we need to let tsc infer types downstream
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    proto: ApolloController<any, any>,
    _: string,
  ): void {
    Object.defineProperty(proto, 'options', {
      get() { return this.#options; },
      set(v) {
        this.#options = v;
        this.optionsChanged?.(v);
      },
    });
  }

  #options: ApolloControllerOptions<D, V> = {};

  #client: ApolloClient | null = null;

  #document: ComponentDocument<D, V> | null = null;

  /** @summary The event emitter to use when firing events, usually the host element. */
  public emitter: EventTarget;

  called = true;

  /** @summary Latest data for the operation, or `null`. */
  data: Data<D> | null = null;

  /** @summary Latest error from the operation, or `null`. */
  error: Error | null = null;

  /** @summary Latest errors from the operation, or `[]`. */
  errors: readonly GraphQLFormattedError[] = [];

  /** @summary Whether a request is in-flight. */
  loading = false;

  /** @summary Options for the operation and controller. */
  @ApolloController.o options: ApolloControllerOptions<D, V>;

  /** @summary The `ApolloClient` instance for this controller. */
  get client(): ApolloClient | null {
    return this.#client;
  }

  set client(v: ApolloClient | null) {
    const client = this.#client;
    this.#client = v;
    this.clientChanged?.(v);  // covered
    this.notify({ client });
  }

  /** @summary The GraphQL document for the operation. */
  get document(): ComponentDocument<D, V> | null { return this.#document; }

  set document(document: ComponentDocument<D, V> | null) {
    if (document === this.#document)
      return;  // covered
    else if (!document)
      this.#document = null;  // covered
    else if (!isValidGql(document)) {  // covered
      const name = (this.constructor.name).replace(/Apollo(\w+)(Controller|Behavior)/, '$1');
      throw new TypeError(`${name} must be a parsed GraphQL document.`);
    } else {
      this.#document = document;
      this.notify({ document });
      this.documentChanged?.(document);
    }
  }

  /** @summary Variables for the operation. */
  get variables(): Variables<D, V> | null {
    return this.options?.variables ?? null;
  }

  set variables(variables: Variables<D, V> | null) {
    if (!variables)
      delete this.options.variables; // covered
    else if (variables === this.options.variables)
      return;  // covered
    else
      this.options.variables = variables;
    this.notify({ variables });
    this.variablesChanged?.(variables);
  }

  constructor(public host: ReactiveControllerHost, options?: ApolloControllerOptions<D, V>) {
     // these are all covered
    if (host instanceof EventTarget)
      this.emitter = host;
    else if (options?.hostElement instanceof EventTarget)
      this.emitter = options.hostElement;
    else
      this.emitter = new EventTarget();
    this.options = options ?? {};
    this.client = this.options.client ?? window.__APOLLO_CLIENT__ ?? null;
    host.addController?.(this);

  }

  /** @summary requests an update on the host with the provided properties. */
  protected notify(properties?: Record<string, unknown>): void {
    if (properties && this.host.requestUpdate.length > 0) {
      for (const [key, value] of Object.entries(properties))
        (this.host as ReactiveElement).requestUpdate(key, value);
    } else
      this.host.requestUpdate();
  }

  /** @summary callback for when the GraphQL document changes. */
  protected documentChanged?(document?: ComponentDocument<D, V> | null): void;

  /** @summary callback for when the GraphQL variables change. */
  protected variablesChanged?(variables?: Variables<D, V> | null): void;

  /** @summary callback for when the Apollo client changes. */
  protected clientChanged?(client?: ApolloClient | null): void;

  /** @summary callback for when the options change. */
  protected optionsChanged?(options?: ApolloControllerOptions<D, V>): void;

  /** @summary Assigns the controller's variables and GraphQL document. */
  protected init(document: ComponentDocument<D, V> | null): void {
    this.variables ??= this.options.variables ?? null;
    this.document = document;
  }

  hostConnected(): void {
    this.emitter.dispatchEvent(new ApolloControllerConnectedEvent(this));
  }

  hostDisconnected(): void {
    this.emitter.dispatchEvent(new ApolloControllerDisconnectedEvent(this));
    window.dispatchEvent(new ApolloControllerDisconnectedEvent(this));
  }
}
