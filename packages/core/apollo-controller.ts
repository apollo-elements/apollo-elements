import type * as E from '@apollo/client/core';
import type { CustomElement } from '@apollo-elements/interfaces';
import type { ReactiveController, ReactiveControllerHost } from 'lit';
import type { p } from './decorators';

import type {
  ApolloClient,
  ApolloError,
  ApolloQueryResult,
  NormalizedCacheObject,
} from '@apollo/client/core';


import type {
  ComponentDocument,
  Data,
  MaybeTDN,
  MaybeVariables,
  Variables,
} from '@apollo-elements/interfaces';

import { isValidGql } from './lib/is-valid-gql';

import { ApolloControllerConnectedEvent, ApolloControllerDisconnectedEvent } from './events';

/**
 * An element which uses an ApolloController to implement an ApolloElement interface.
 */
export interface ApolloControllerHost extends ReactiveControllerHost, CustomElement {
  connectedCallback(): void;
  disconnectedCallback(): void;
  requestUpdate(name?: string, value?: unknown): void;
  controller?: ApolloController;
  /** @protected */ [p]?: Map<string, unknown>;
  /** Call to notify the host of controller updates */
  /** @protected */ [update]?(properties: Partial<this>): void
}

export interface ApolloControllerOptions<D, V> {
  client?: ApolloClient<NormalizedCacheObject>;
  variables?: Variables<D, V>;
  context?: any;
  errorPolicy?: E.ErrorPolicy;
  /** When provided, the controller will fall back to this element to fire events */
  hostElement?: HTMLElement;
  /** Host update callback */
  [update]?(properties?: Record<string, unknown>): void;
}

export const update = Symbol('update');

interface DispatchingHost extends ReactiveControllerHost {
  dispatchEvent: EventTarget['dispatchEvent'];
}

function canDispatchEvents(host: ReactiveControllerHost): host is DispatchingHost {
  return 'dispatchEvent' in host;
}

export abstract class ApolloController<D extends MaybeTDN = any, V = MaybeVariables<D>>
implements ReactiveController {
  called = true;

  #options: ApolloControllerOptions<D, V> = {};

  get options(): ApolloControllerOptions<D, V> {
    return this.#options;
  }

  set options(v: ApolloControllerOptions<D, V>) {
    const u = this.#options[update];
    this.#options = { [update]: u, ...v };
  }

  #client: ApolloClient<NormalizedCacheObject> | null = null;

  get client(): ApolloClient<NormalizedCacheObject> | null {
    return this.#client;
  }

  set client(v: ApolloClient<NormalizedCacheObject> | null) {
    this.#client = v;
    this.clientChanged?.(v);
    this.notify('client');
  }

  data: Data<D> | null = null;

  error: ApolloError | null = null;

  errors: ApolloQueryResult<D>['errors'] = [];

  loading = false;

  #document: ComponentDocument<D> | null = null;

  get document(): ComponentDocument<D> | null { return this.#document; }

  set document(document: ComponentDocument<D> | null) {
    if (document === this.#document)
      return;
    else if (!document)
      this.#document = null;
    else if (!isValidGql(document)) {
      const name = (this.constructor.name).replace(/Apollo(\w+)Controller/, '$1') || 'Document';
      throw new TypeError(`${name} must be a parsed GraphQL document.`);
    } else {
      this.#document = document;
      this.options[update]?.({ document });
      this.documentChanged?.(document);/* c8 ignore next */
    }
  }

  get variables(): Variables<D, V> | null {
    return this.options?.variables ?? null;
  }

  set variables(variables: Variables<D, V> | null) {
    if (!variables)
      delete this.options.variables;
    else if (variables === this.options.variables)
      return;
    else
      this.options.variables = variables;
    this.options[update]?.({ variables });
    this.variablesChanged?.(variables);/* c8 ignore next */
  }

  private [update](properties?: Record<string, unknown>): void {
    this.host.requestUpdate();
    this.options[update]?.(properties);
  }

  protected documentChanged?(document?: ComponentDocument<D> | null): void;

  protected variablesChanged?(variables?: Variables<D, V> | null): void;

  protected clientChanged?(client?: ApolloClient<NormalizedCacheObject> | null): void;

  protected notify(...keys: (keyof this)[]): void {
    this[update](Object.fromEntries(keys.map(x => [x, this[x]])));
  }

  constructor(public host: ReactiveControllerHost, options?: ApolloControllerOptions<D, V>) {
    this.options = options ?? {};
    this.client = this.options.client ?? window.__APOLLO_CLIENT__ ?? null;
    host.addController?.(this);
  }

  init(document: ComponentDocument<D> | null): void {
    this.variables ??= this.options.variables ?? null;
    this.document = document;
  }

  hostConnected(): void {
    const event = new ApolloControllerConnectedEvent(this);
    if (canDispatchEvents(this.host))
      this.host.dispatchEvent(event);
    else if (this.options?.hostElement instanceof EventTarget)
      this.options.hostElement.dispatchEvent(event);
  }

  hostDisconnected(): void {
    const event = new ApolloControllerDisconnectedEvent(this);
    dispatchEvent(event);
  }
}
