import type { ApolloController } from './apollo-controller.js';
import type { Data } from '@apollo-elements/core/types';
import type {
  ApolloClient,
  ApolloError,
  ApolloQueryResult,
  FetchResult,
  NormalizedCacheObject,
} from '@apollo/client/core';

type ApolloEventType = `apollo-${'controller'|'element'}-${'connected'|'disconnected'}`;
type ApolloElementEventType = `apollo-element-${'disconnected'|'connected'}`;
type ApolloControllerEventType = `apollo-controller-${'disconnected'|'connected'}`;

interface ApolloControllerHost extends HTMLElement {
  controller: ApolloController;
}

export type ApolloQueryResultEvent<TData = unknown> =
  CustomEvent<ApolloQueryResult<TData>>;

export type ApolloMutationResultEvent<TData = unknown> =
  CustomEvent<FetchResult<TData>>;

export type ApolloSubscriptionResultEvent<D = unknown> = CustomEvent<{
  client: ApolloClient<NormalizedCacheObject>;
  subscriptionData: {
    data: Data<D> | null;
    loading: boolean;
    error: null;
  };
}>;

export abstract class ApolloEvent<T = ApolloControllerHost> extends CustomEvent<T> {
  public abstract type: ApolloEventType
  public declare controller?: ApolloController;
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

export abstract class ApolloControllerEvent extends ApolloEvent {
  public abstract controller: ApolloController;
  public abstract type: ApolloControllerEventType
  constructor(type: ApolloControllerEventType) {
    super(type);
  }
}

/**
 * @summary Fired when a controlled element connects to the DOM
 */
export class ApolloControllerConnectedEvent extends ApolloControllerEvent {
  public static type = 'apollo-controller-connected' as const;
  public declare type: 'apollo-controller-connected';
  constructor(public controller: ApolloController) {
    super(ApolloControllerConnectedEvent.type);
  }
}

/**
 * @summary Fired when a controlled element disconnects from the DOM
 */
export class ApolloControllerDisconnectedEvent extends ApolloControllerEvent {
  public static type = 'apollo-controller-disconnected' as const;
  public declare type: 'apollo-controller-disconnected';
  constructor(public controller: ApolloController) {
    super(ApolloControllerDisconnectedEvent.type);
  }
}

declare global {
  interface HTMLElementEventMap {
    'apollo-controller-connected': ApolloControllerConnectedEvent;
    'apollo-controller-disconnected': ApolloControllerDisconnectedEvent;
    'apollo-element-connected': ApolloElementEvent;
    'apollo-element-disconnected': ApolloElementEvent;
    'apollo-error': CustomEvent<ApolloError>;
    'apollo-mutation-result': ApolloMutationResultEvent;
    'apollo-query-result': ApolloQueryResultEvent;
    'apollo-subscription-result': ApolloSubscriptionResultEvent;
  }

  interface WindowEventMap {
    'apollo-element-disconnected': ApolloElementEvent;
    'apollo-controller-disconnected': ApolloControllerDisconnectedEvent;
  }
}
