import type {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  TypePolicies,
} from '@apollo/client/core';

import type { ApolloElementElement, ApolloQueryElement } from '@apollo-elements/interfaces';
import type { ApolloElementEvent } from '@apollo-elements/mixins/apollo-element-mixin';

declare global { interface HTMLElementTagNameMap { 'apollo-client': ApolloClientElement; } }

const template = document.createElement('template');
template.innerHTML = /* html */`
  <style>:host { display: block; }</style>
  <slot></slot>
`;

const DOCUMENT_TYPES = ['document', 'query', 'mutation', 'subscription'];

function isInMemoryCache(
  cache: ApolloClient<NormalizedCacheObject>['cache']
): cache is InMemoryCache {
  return !!cache && ('policies' in cache);
}

function isApolloElement(element: Node): element is ApolloElementElement {
  return element instanceof HTMLElement && (
    // @ts-expect-error: it's fine
    DOCUMENT_TYPES.includes(element.constructor.documentType)
  );
}

function hasShadowRoot(node: Node): node is HTMLElement & { shadowRoot: ShadowRoot } {
  return node instanceof HTMLElement && !!node.shadowRoot;
}

function isApolloQuery(e: EventTarget): e is ApolloQueryElement {
  // @ts-expect-error: disambiguating
  return typeof e.shouldSubscribe === 'function' && typeof e.subscribe === 'function';
}

function claimApolloElement(
  event: ApolloElementEvent
): ApolloElementElement | void {
  event.stopPropagation();
  if (isApolloElement(event.detail))
    return event.detail;
}

function isSubscribable(element: ApolloElementElement): element is ApolloQueryElement {
  return (
    isApolloQuery(element) &&
    !!element.client &&
    !element.noAutoSubscribe &&
    element.shouldSubscribe()
  );
}

/**
 * @element apollo-client
 *
 * Provides an ApolloClient instance to all nested ApolloElement children,
 * even across (open) shadow boundaries.
 *
 * @example
 * Generate a simple ApolloClient instance
 * ```html
 * <apollo-client uri="/graphql"></apollo-client>
 * ```
 *
 * @example
 * Prevent network calls when required variables are absent
 * ```html
 * <apollo-client uri="/graphql" validate-variables></apollo-client>
 * ```
 *
 * @example
 * Providing a client to a tree of Nodes
 * ```html
 * <apollo-client id="client-a">
 *   <apollo-mutation>
 *     <!--...-->
 *   </apollo-mutation>
 * </apollo-client>
 * ```
 *
 * @example
 * Nesting separate clients
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
  static readonly observedAttributes = ['uri'];

  /** Private reference to the `ApolloClient` instance */
  #client: ApolloClient<NormalizedCacheObject> | null = null;

  /** Private cache of child `ApolloElement`s */
  #instances: Set<ApolloElementElement> = new Set();

  #typePolicies: TypePolicies | undefined = undefined;

  /**
   * Reference to the `ApolloClient` instance.
   */
  get client(): ApolloClient<NormalizedCacheObject> | null {
    return this.#client;
  }

  set client(value: ApolloClient<NormalizedCacheObject> | null) {
    this.#client = value;
    this.dispatchEvent(new CustomEvent('client-changed', { detail: { value, client: value } }));
    for (const instance of this.#instances)
      this.initialize(instance);
  }

  /** List of all ApolloElements registered to this client. */
  get elements(): readonly ApolloElementElement[] {
    return [...this.#instances];
  }

  /**
   * Type Policies for the client.
   */
  get typePolicies(): TypePolicies | undefined {
    return this.#typePolicies ?? undefined;
  }

  set typePolicies(typePolicies: TypePolicies | undefined) {
    this.#typePolicies = typePolicies;
    if (typePolicies && this.client && isInMemoryCache(this.client?.cache))
      this.client.cache.policies.addTypePolicies(typePolicies);
  }

  /**
   * When the URI attribute is set, `<apollo-client>` will asynchronously
   * create a new ApolloClient instance with some default parameters
   * @attr uri
   */
  get uri(): string | undefined {
    return this.getAttribute('uri') ?? undefined;
  }

  set uri(uri: string | undefined) {
    if (typeof uri !== 'string') return;
    this.setAttribute('uri', uri);
    this.createApolloClient();
  }

  /**
   * When true, client will not fetch operations that do not have all their non-nullable variables set.
   * @attr validate-variables
   */
  get validateVariables(): boolean {
    return this.hasAttribute('validate-variables');
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).append(template.content.cloneNode(true));
    this.addEventListener('apollo-element-connected', this.onElementConnected.bind(this));
    this.addEventListener('apollo-element-disconnected', this.onElementDisconnected.bind(this));
    window.addEventListener('apollo-element-disconnected', this.onElementDisconnected.bind(this));
  }

  attributeChangedCallback(attr: string, oldValue: string, newValue: string): void {
    if (oldValue === newValue) return;
    switch (attr) {
      case 'uri': this.uri = newValue;
    }
  }

  connectedCallback(): void {
    this.findDeepInstances();
  }

  async createApolloClient(): Promise<ApolloClientElement['client']> {
    const { typePolicies, validateVariables } = this;
    const { uri } = this;
    const { createApolloClient } = await import('@apollo-elements/lib/create-apollo-client');
    this.client = createApolloClient({ uri, typePolicies, validateVariables });
    return this.client;
  }

  private findDeepInstances(): void {
    for (const child of this.children)
      this.addDeepInstance(child);
  }

  private async addDeepInstance(child: Node): Promise<void> {
    await new Promise(requestAnimationFrame);
    if (isApolloElement(child))
      this.#instances.add(child);
    if (!hasShadowRoot(child)) return;
    for (const grandchild of child.shadowRoot.children)
      this.addDeepInstance(grandchild);
  }

  /**
   * Assigns the element's client instance to the child,
   * and registers the child to receive the element's new client when its set.
   */
  private onElementConnected(event: ApolloElementEvent): void {
    const target = claimApolloElement(event);
    if (!target) return;
    this.#instances.add(target);
    this.initialize(target);
  }

  /**
   * Performs clean up when the child disconnects
   */
  private onElementDisconnected(event: ApolloElementEvent): void {
    const target = event.detail;
    if (!this.#instances.has(target)) return;
    this.#instances.delete(target);
    target.client = null;
  }

  /**
   * Set the client on the element, and if it's a query or subscription element, attemp to subscribe
   */
  private initialize(element: ApolloElementElement): void {
    element.client = this.client;
    if (isSubscribable(element))
      element.subscribe();
  }
}

customElements.define('apollo-client', ApolloClientElement);
