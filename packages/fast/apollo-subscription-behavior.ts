import type { ComponentDocument, Data, Variables, VariablesOf } from '@apollo-elements/core/types';
import type { OperationVariables } from '@apollo/client';

import type { HostBehavior, HostController, FASTElement } from '@microsoft/fast-element';

import {
  ApolloSubscriptionController,
  ApolloSubscriptionControllerOptions,
} from '@apollo-elements/core/apollo-subscription-controller';

import { Observable, observable } from '@microsoft/fast-element';
import { FASTControllerHost } from './fast-controller-host';

/**
 * `ApolloSubscriptionBehavior`
 *
 * 🚀  FAST Behavior that connects to your Apollo cache.
 */
export class ApolloSubscriptionBehavior<D, V extends OperationVariables = OperationVariables & VariablesOf<D>>
  extends ApolloSubscriptionController<D, V> implements HostBehavior {
  /**
   * Latest query data.
   */
  @observable data: Data<D> | null = null;

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
    hostElement: FASTElement & HTMLElement,
    subscription?: ComponentDocument<D, V> | null,
    options?: ApolloSubscriptionControllerOptions<D, V>,
  ) {
    super(new FASTControllerHost(hostElement), subscription, { ...options, hostElement });
    this.variables = options?.variables ?? null;
    hostElement.$fastController.addBehavior(this);
  }

  connectedCallback(_controller: HostController): void {
    this.hostConnected();
  }

  disconnectedCallback(_controller: HostController): void {
    this.hostDisconnected();
  }
}
