import type { ComponentDocument, Data, Variables, VariablesOf } from '@apollo-elements/core/types';

import type { HostBehavior, HostController, FASTElement } from '@microsoft/fast-element';

import {
  ApolloMutationController as AMC,
  ApolloMutationControllerOptions,
} from '@apollo-elements/core/apollo-mutation-controller';

import { Observable, observable } from '@microsoft/fast-element';
import { FASTControllerHost } from './fast-controller-host';

/**
 * `ApolloMutationBehavior`
 *
 * 🚀  FAST Behavior that connects to your Apollo cache.
 */
export class ApolloMutationBehavior<D, V = VariablesOf<D>> extends AMC<D, V> implements HostBehavior {
  /**
   * Latest query data.
   */
  @observable data: Data<D> | null = null;

  @observable called = false;

  @observable loading = false;

  @observable error = null;

  @observable errors = [];

  get variables(): Variables<D, V> | null {
    Observable.track(this, 'variables');
    return super.variables;
  }

  set variables(value: Variables<D, V> | null) {
    super.variables = value;
    Observable.notify(this, 'variables');
  }

  constructor(
    public hostElement: FASTElement & HTMLElement,
    mutation?: ComponentDocument<D, V> | null,
    options?: ApolloMutationControllerOptions<D, V>,
  ) {
    super(new FASTControllerHost(hostElement), mutation, { ...options, hostElement });
    this.variables = options?.variables ?? null;
    hostElement.$fastController.addBehavior(this);
  }

  connectedCallback(_controller: HostController): void {
    this.hostConnected();
  }

  disconnectedCallback(_controller: HostController): void {
    this.hostDisconnected();
    this.host.removeController(this);
  }
}
