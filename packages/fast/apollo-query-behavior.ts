import type {
  ComponentDocument,
  Data,
  MaybeTDN,
  MaybeVariables,
  Variables,
} from '@apollo-elements/core/types';

import type { Behavior, ExecutionContext, FASTElement } from '@microsoft/fast-element';

import {
  ApolloQueryController,
  ApolloQueryControllerOptions,
} from '@apollo-elements/core/apollo-query-controller';

import { Observable, observable } from '@microsoft/fast-element';
import { FASTControllerHost } from './fast-controller-host';

/**
 * `ApolloQueryBehavior`
 *
 * 🚀  FAST Behavior that connects to your Apollo cache.
 */
export class ApolloQueryBehavior<D extends MaybeTDN = MaybeTDN, V = MaybeVariables<D>>
  extends ApolloQueryController<D, V> implements Behavior {
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
    query?: ComponentDocument<D> | null,
    options?: ApolloQueryControllerOptions<D, V>,
  ) {
    super(new FASTControllerHost(hostElement), query, { ...options, hostElement });
    this.variables = options?.variables ?? null;
    hostElement.$fastController.addBehaviors([this]);
  }

  bind(_source: FASTElement & HTMLElement, _context: ExecutionContext): void {
    this.hostConnected();
  }

  unbind(_source: FASTElement): void {
    this.hostDisconnected();
  }
}
