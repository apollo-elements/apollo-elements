import type { ApolloController } from './apollo-controller.js';
import type { Data } from '@apollo-elements/core/types';
import type {
  ApolloClient,
  ObservableQuery,
  ApolloLink,
} from '@apollo/client';

type ApolloEventType = `apollo-${'controller'|'element'}-${'connected'|'disconnected'}`;
type ApolloElementEventType = `apollo-element-${'disconnected'|'connected'}`;
type ApolloControllerEventType = `apollo-controller-${'disconnected'|'connected'}`;

interface ApolloControllerHost extends HTMLElement {
  controller: ApolloController<unknown, unknown>;
}

export type ApolloQueryResultEvent<TData = unknown> =
  CustomEvent<ObservableQuery.Result<TData>>;

export type ApolloMutationResultEvent<TData = unknown> =
  CustomEvent<ApolloLink.Result<TData>>;

export type ApolloSubscriptionResultEvent<D = unknown> = CustomEvent<{
  client: ApolloClient;
  subscriptionData: {
    data: Data<D> | null;
    loading: boolean;
    error: null;
  };
}>;

export abstract class ApolloEvent<T = ApolloControllerHost> extends CustomEvent<T> {
  public abstract type: ApolloEventType
  public declare controller?: ApolloController<unknown, unknown>;
  constructor(type: ApolloEventType, options?: CustomEventInit) {
    super(type, { ...options, bubbles: true, composed: true });
  }
}

/**
 * @summary Fired when an ApolloElement connects to or disconnects from the DOM
 */
export class ApolloElementEvent<T = ApolloControllerHost> extends ApolloEvent<T> {
  public declare static type: ApolloElementEventType;
  public declare type: ApolloElementEventType;
  constructor(type: ApolloElementEventType, detail: T) {
    super(type, { detail });
  }
}

export abstract class ApolloControllerEvent<T extends ApolloController> extends ApolloEvent {
  public abstract controller: T;
  public abstract type: ApolloControllerEventType
  constructor(type: ApolloControllerEventType) {
    super(type);
  }
}

/**
 * @summary Fired when a controlled element connects to the DOM
 */
export class ApolloControllerConnectedEvent<T extends ApolloController>
  extends ApolloControllerEvent<T> {
  public static type = 'apollo-controller-connected' as const;
  public declare type: 'apollo-controller-connected';
  constructor(public controller: T) {
    super(ApolloControllerConnectedEvent.type);
  }
}

/**
 * @summary Fired when a controlled element disconnects from the DOM
 */
export class ApolloControllerDisconnectedEvent<T extends ApolloController>
  extends ApolloControllerEvent<T> {
  public static type = 'apollo-controller-disconnected' as const;
  public declare type: 'apollo-controller-disconnected';
  constructor(public controller: T) {
    super(ApolloControllerDisconnectedEvent.type);
  }
}

declare global {
  interface HTMLElementEventMap {
    'apollo-controller-connected': ApolloControllerConnectedEvent<ApolloController>;
    'apollo-controller-disconnected': ApolloControllerDisconnectedEvent<ApolloController>;
    'apollo-element-connected': ApolloElementEvent;
    'apollo-element-disconnected': ApolloElementEvent;
    'apollo-error': CustomEvent<Error>;
    'apollo-mutation-result': ApolloMutationResultEvent;
    'apollo-query-result': ApolloQueryResultEvent;
    'apollo-subscription-result': ApolloSubscriptionResultEvent;
  }

  interface WindowEventMap {
    'apollo-element-disconnected': ApolloElementEvent;
    'apollo-controller-disconnected': ApolloControllerDisconnectedEvent<ApolloController>;
  }
}
