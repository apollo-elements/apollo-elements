import type { ReactiveController, ReactiveControllerHost } from 'lit';

import type {
  ApolloClient,
  ApolloError,
  ErrorPolicy,
  NormalizedCacheObject,
} from '@apollo/client/core';


import type {
  ComponentDocument,
  Data,
  GraphQLError,
  MaybeTDN,
  MaybeVariables,
  Variables,
} from '@apollo-elements/core/types';

import { isValidGql } from './lib/is-valid-gql.js';

import { ApolloControllerConnectedEvent, ApolloControllerDisconnectedEvent } from './events.js';

export interface ApolloControllerOptions<D, V> {
  /** The `ApolloClient` instance for the controller. */
  client?: ApolloClient<NormalizedCacheObject>;
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
  /** Host update callback */
  [update]?(properties?: Record<string, unknown>): void;
}

/** @internal */
export const update = Symbol('update');

interface ReflectingReactiveControllerHost extends ReactiveControllerHost {
  [update](properties?: Record<string, unknown>): void;
}

function isReflectingHost(host: ReactiveControllerHost): host is ReflectingReactiveControllerHost {
  return typeof (host as ReactiveControllerHost & { [update]: unknown })[update] === 'function';
}

/**
 * @fires {ApolloControllerConnectedEvent} apollo-controller-connected - The controller's host connected to the DOM.
 * @fires {ApolloControllerDisconnectedEvent} apollo-controller-disconnected - The controller's host disconnected from the DOM.
 */
export abstract class ApolloController<
  D extends MaybeTDN = MaybeTDN,
  V = MaybeVariables<D>
>
implements ReactiveController {
  /** @internal */
  static o(proto: ApolloController, _: string): void {
    Object.defineProperty(proto, 'options', {
      get() { return this.#options; },
      set(v) {
        const u = this.#options[update];
        this.#options = { [update]: u, ...v };
      },
    });
  }

  #options: ApolloControllerOptions<D, V> = {}

  #client: ApolloClient<NormalizedCacheObject> | null = null;

  #document: ComponentDocument<D> | null = null;

  /** @summary The event emitter to use when firing events, usually the host element. */
  protected emitter: EventTarget;

  called = true;

  /** @summary Latest data for the operation, or `null`. */
  data: Data<D> | null = null;

  /** @summary Latest error from the operation, or `null`. */
  error: ApolloError | null = null;

  /** @summary Latest errors from the operation, or `[]`. */
  errors: readonly GraphQLError[] = [];

  /** @summary Whether a request is in-flight. */
  loading = false;

  /** @summary Options for the operation and controller. */
  @ApolloController.o options: ApolloControllerOptions<D, V>;

  /** @summary The `ApolloClient` instance for this controller. */
  get client(): ApolloClient<NormalizedCacheObject> | null {
    return this.#client;
  }

  set client(v: ApolloClient<NormalizedCacheObject> | null) {
    this.#client = v;
    this.clientChanged?.(v); /* c8 ignore next */ // covered
    this.notify('client');
  }

  /** @summary The GraphQL document for the operation. */
  get document(): ComponentDocument<D> | null { return this.#document; }

  set document(document: ComponentDocument<D> | null) {
    if (document === this.#document)
      return; /* c8 ignore next */ // covered
    else if (!document)
      this.#document = null; /* c8 ignore next */ // covered
    else if (!isValidGql(document)) { /* c8 ignore next */ // covered
      const name = (this.constructor.name).replace(/Apollo(\w+)(Controller|Behavior)/, '$1');
      throw new TypeError(`${name} must be a parsed GraphQL document.`);
    } else {
      this.#document = document;
      this[update]({ document });
      this.documentChanged?.(document);/* c8 ignore next */
    }
  }

  /** @summary Variables for the operation. */
  get variables(): Variables<D, V> | null {
    return this.options?.variables ?? null;
  }

  set variables(variables: Variables<D, V> | null) {
    if (!variables)
      delete this.options.variables;/* c8 ignore next */ // covered
    else if (variables === this.options.variables)
      return; /* c8 ignore next */ // covered
    else
      this.options.variables = variables;
    this[update]({ variables });
    this.variablesChanged?.(variables);/* c8 ignore next */
  }

  constructor(public host: ReactiveControllerHost, options?: ApolloControllerOptions<D, V>) {
    /* c8 ignore start */ // these are all covered
    if (host instanceof EventTarget)
      this.emitter = host;
    else if (options?.hostElement instanceof EventTarget)
      this.emitter = options.hostElement;
    else
      this.emitter = new EventTarget();
    this.options = options ?? {};
    this.client = this.options.client ?? window.__APOLLO_CLIENT__ ?? null;
    host.addController?.(this);
    /* c8 ignore stop */
  }

  /** @summary requests an update on the host. */
  private [update](properties?: Record<string, unknown>): void {
    this.host.requestUpdate();
    /* c8 ignore start */ // these are all covered
    if (isReflectingHost(this.host))
      this.host[update](properties);
    else
      this.options[update]?.(properties);
    /* c8 ignore stop */
  }

  /** @summary callback for when the GraphQL document changes. */
  protected documentChanged?(document?: ComponentDocument<D> | null): void;

  /** @summary callback for when the GraphQL variables change. */
  protected variablesChanged?(variables?: Variables<D, V> | null): void;

  /** @summary callback for when the Apollo client changes. */
  protected clientChanged?(client?: ApolloClient<NormalizedCacheObject> | null): void;

  /** @summary Notifies about updated properties. */
  protected notify(...keys: (keyof this)[]): void {
    this[update](Object.fromEntries(keys.map(x => [x, this[x]])));
  }

  /** @summary Assigns the controller's variables and GraphQL document. */
  protected init(document: ComponentDocument<D> | null): void {
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
