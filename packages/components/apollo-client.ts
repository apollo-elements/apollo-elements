import type { ApolloElementInterface, ApolloQueryInterface } from '@apollo-elements/interfaces';
import type { ApolloElementEvent } from '@apollo-elements/mixins/apollo-element-mixin';
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core';

declare global {
  interface HTMLElementTagNameMap {
    'apollo-client': ApolloClientElement;
  }
}

const template = document.createElement('template');
template.innerHTML = /* html */`
  <style>:host { display: block; }</style>
  <slot></slot>
`;

type ApolloElement = (HTMLElement & ApolloElementInterface);

function isApolloElement(e: EventTarget): e is ApolloElement {
  return e instanceof HTMLElement && (
    'data' in e &&
    'error' in e &&
    'errors' in e &&
    'loading' in e
  );
}

function isApolloQuery(e: EventTarget): e is ApolloQueryInterface<unknown, unknown> {
  // @ts-expect-error: disambiguating
  return typeof e.shouldSubscribe === 'function' && typeof e.subscribe === 'function';
}

function claimApolloElement(event: ApolloElementEvent): ApolloElement {
  event.stopPropagation();
  return isApolloElement(event.detail) ? event.detail : null;
}

/**
 * @element apollo-client
 *
 * Provides an ApolloClient instance to all nested ApolloElement children,
 * even across (open) shadow boundaries.
 *
 * @example Providing a client to a tree of Nodes
 * ```html
 * <apollo-client id="client-a">
 *   <apollo-mutation>
 *     <!--...-->
 *   </apollo-mutation>
 * </apollo-client>
 * ```
 *
 * @example Nesting separate clients
 * ```html
 * <apollo-client id="client-a">
 *   <query-element>
 *     <!-- This element queries from client-a's endpoint -->
 *   </query-element>
 *   <apollo-client id="client-b">
 *     <query-element>
 *       <!-- This element queries from client-b's endpoint -->
 *     </query-element>
 *   </apollo-client>
 * </apollo-client>
 * ```
 */
export class ApolloClientElement extends HTMLElement {
  /** Private reference to the `ApolloClient` instance */
  #client: ApolloClient<NormalizedCacheObject>;

  /** Private cache of child `ApolloElement`s */
  #instances: Set<ApolloElement> = new Set();

  /**
   * Reference to the `ApolloClient` instance.
   */
  get client(): ApolloClient<NormalizedCacheObject> {
    return this.#client;
  }

  set client(value: ApolloClient<NormalizedCacheObject>) {
    this.#client = value;
    this.#instances
      .forEach(x => x.client = value);
  }

  /**
   * Set of elements subscribed to changes on this element's client
   */
  get instances(): Set<ApolloElement> {
    return this.#instances;
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(template.content.cloneNode(true));
    this.addEventListener('apollo-element-connected', this.onElementConnected.bind(this));
    this.addEventListener('apollo-element-disconnected', this.onElementDisconnected.bind(this));
  }

  /**
   * Assigns the element's client instance to the child,
   * and registers the child to receive the element's new client when its set.
   */
  private onElementConnected(event: ApolloElementEvent): void {
    const target = claimApolloElement(event);
    if (!target) return;
    this.#instances.add(target);
    target.client = this.client;
    if (isApolloQuery(target) && !target.noAutoSubscribe && target.shouldSubscribe())
      target.subscribe();
  }

  /**
   * Performs clean up when the child disconnects
   */
  private onElementDisconnected(event: ApolloElementEvent): void {
    const target = claimApolloElement(event);
    if (!target) return;
    this.#instances.delete(target);
    delete target.client;
  }
}

customElements.define('apollo-client', ApolloClientElement);
