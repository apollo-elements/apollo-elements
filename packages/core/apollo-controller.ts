import type {
  ApolloClient,
  ApolloError,
  ApolloQueryResult,
  DocumentNode,
  NormalizedCacheObject,
  OperationVariables,
} from '@apollo/client/core';

import type { ReactiveController, ReactiveControllerHost } from 'lit';

import type { ComponentDocument, Data, Variables } from '@apollo-elements/interfaces';

export type ApolloControllerHost = HTMLElement & ReactiveControllerHost;

export interface ApolloControllerOptions<D, V> {
  client?: ApolloClient<NormalizedCacheObject>;
  variables?: Variables<D, V>;
}

export const update = Symbol('update');

export class ApolloControllerEvent extends Event {
  static declare type: `apollo-controller-${'disconnected'|'connected'}`;

  constructor(
    public controller: ApolloController,
    public host: ReactiveControllerHost & EventTarget,
  ) {
    super(ApolloControllerConnectedEvent.type, {
      bubbles: true,
      composed: true,
    });
  }
}

export class ApolloControllerConnectedEvent extends ApolloControllerEvent {
  static type = 'apollo-controller-connected' as const;
}

export class ApolloControllerDisconnectedEvent extends ApolloControllerEvent {
  static type = 'apollo-controller-disconnected' as const;
}

export abstract class ApolloController<
  D = unknown,
  V = OperationVariables,
> implements ReactiveController {
  called = true;

  client?: ApolloClient<NormalizedCacheObject>;

  data?: Data<D>;

  error?: ApolloError | null;

  errors?: ApolloQueryResult<D>['errors'];

  loading = false;

  #document?: DocumentNode | ComponentDocument<D>;

  #variables?: Variables<D, V>;

  get document(): DocumentNode | ComponentDocument<D> | undefined { return this.#document; }

  set document(document: DocumentNode | ComponentDocument<D> | undefined) {
    this.#document = document;
    this.documentChanged?.(document);
  }

  get variables(): Variables<D, V> | undefined { return this.#variables; }

  set variables(variables: Variables<D, V> | undefined) {
    this.#variables = variables;
    this.variablesChanged?.(variables);
  }

  protected abstract documentChanged?(document?: DocumentNode | ComponentDocument<D>): void

  protected abstract variablesChanged?(variables?: Variables<D, V>): void

  constructor(public host: ReactiveControllerHost, public options?: ApolloControllerOptions<D, V>) {
    this.client = this.options?.client ?? window.__APOLLO_CLIENT__;
    host.addController?.(this);
  }

  init<Doc extends DocumentNode>(document?: Doc): void {
    this.document = document;
    this.variables = this.options?.variables;
  }

  hostConnected(): void {
    if (this.host instanceof EventTarget) {
      const event = new ApolloControllerConnectedEvent(this, this.host);
      this.host.dispatchEvent(event);
    }
  }

  [update](): void {
    this.host.requestUpdate();
  }

  hostDisconnected(): void {
    if (this.host instanceof EventTarget) {
      const event = new ApolloControllerDisconnectedEvent(this, this.host);
      this.host.dispatchEvent(event);
    }
  }
}
