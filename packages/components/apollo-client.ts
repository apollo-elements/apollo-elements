import type {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  TypePolicies,
} from '@apollo/client/core';

import type { ApolloElementElement } from '@apollo-elements/interfaces';

import type { ApolloController, ApolloEvent } from '@apollo-elements/core';

import { bound } from '@apollo-elements/core/lib/bound';

declare global { interface HTMLElementTagNameMap { 'apollo-client': ApolloClientElement; } }

const template = document.createElement('template');
template.innerHTML = /* html */`
  <style>:host { display: block; }</style>
  <slot></slot>
`;

const DOCUMENT_TYPES = ['document', 'query', 'mutation', 'subscription'];

function isInMemoryCache(
  cache?: ApolloClient<NormalizedCacheObject>['cache']
): cache is InMemoryCache {
  return !!cache && ('policies' in cache);
}

function isApolloElement(element: Node): element is ApolloElementElement {
  return element instanceof HTMLElement && (
    DOCUMENT_TYPES.includes((element.constructor as typeof ApolloElementElement).documentType)
  );
}

function hasShadowRoot(node: Node): node is HTMLElement & { shadowRoot: ShadowRoot } {
  return node instanceof HTMLElement && !!node.shadowRoot;
}

function claimApolloElement(event: ApolloEvent): ApolloController | void {
  event.stopPropagation();
  if (event.controller)
    return event.controller;
  else if (isApolloElement(event.detail))
    return event.detail.controller;
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
  #instances: Set<ApolloController> = new Set();

  #typePolicies: TypePolicies | undefined = undefined;

  /**
   * Reference to the `ApolloClient` instance.
   */
  get client(): ApolloClient<NormalizedCacheObject> | null {
    return this.#client;
  }

  set client(client: ApolloClient<NormalizedCacheObject> | null) {
    this.#client = client;
    this.dispatchEvent(new CustomEvent('client-changed', { detail: {
      // to support Polymer-style 2-way binding
      value: client,
      client,
    } }));
    for (const instance of this.#instances)
      this.initialize(instance);
  }

  /** List of all Apollo Controllers registered to this client. */
  get controllers(): readonly (ApolloController)[] {
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
    this.addEventListener('apollo-element-connected', this.onElementConnected);
    this.addEventListener('apollo-controller-connected', this.onElementConnected);
    this.addEventListener('apollo-element-disconnected', this.onElementDisconnected);
    window.addEventListener('apollo-element-disconnected', this.onElementDisconnected);
    window.addEventListener('apollo-controller-disconnected', this.onElementDisconnected);
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
    const { createApolloClient } = await import('@apollo-elements/core/lib/create-apollo-client');
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
      this.#instances.add(child.controller);
    if (!hasShadowRoot(child)) return;
    for (const grandchild of child.shadowRoot.children)
      this.addDeepInstance(grandchild);
  }

  /**
   * Assigns the element controller's client instance to the child,
   * and registers the child to receive the element's new client when its set.
   */
  @bound private onElementConnected(event: ApolloEvent): void {
    const controller = claimApolloElement(event);
    if (!controller) return;
    this.#instances.add(controller);
    this.initialize(controller);
  }

  /**
   * Performs clean up when the child disconnects
   */
  @bound private onElementDisconnected(event: ApolloEvent): void {
    const controller = event.controller ?? event.detail.controller;
    if (!controller || !this.#instances.has(controller)) return;
    this.#instances.delete(controller);
    controller.client = null;
  }

  /**
   * Set the client on the element's controller,
   * and if it's a query or subscription controller, attempt to subscribe
   */
  private initialize(controller: ApolloController): void {
    controller.client = this.client;
  }
}

customElements.define('apollo-client', ApolloClientElement);
