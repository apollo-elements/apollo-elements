import type { ApolloElementInterface } from '@apollo-elements/interfaces';
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core';

type ApolloElementEvent = CustomEvent & {
  detail: ApolloElementInterface
}

declare global {
  interface HTMLElementTagNameMap {
    'apollo-client': ApolloClientElement;
  }

  interface HTMLElementEventMap {
    'apollo-element-connected': ApolloElementEvent
    'apollo-element-disconnected': ApolloElementEvent
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
 * @example <caption>Providing a client to a tree of Nodes</caption>
```html
<apollo-client id="client-a">
  <apollo-mutation>
    <!--...-->
  </apollo-mutation>
</apollo-client>
```
 *
 * @example <caption>Nesting separate clients</caption>
```html
<apollo-client id="client-a">
  <query-element>
    <!-- This element queries from client-a's endpoint -->
  </query-element>
  <apollo-client id="client-b">
    <query-element>
      <!-- This element queries from client-b's endpoint -->
    </query-element>
  </apollo-client>
</apollo-client>
```
 */
export class ApolloClientElement extends HTMLElement {
  #client: ApolloClient<NormalizedCacheObject>;

  #instances: Set<ApolloElement> = new Set();

  get client(): ApolloClient<NormalizedCacheObject> {
    return this.#client;
  }

  set client(value: ApolloClient<NormalizedCacheObject>) {
    this.#client = value;
    this.#instances
      .forEach(x => x.client = value);
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(template.content.cloneNode(true));
    this.client = this.client ?? window.__APOLLO_CLIENT__;
    this.addEventListener('apollo-element-connected', this.onElementConnected.bind(this));
    this.addEventListener('apollo-element-disconnected', this.onElementDisconnected.bind(this));
  }

  private onElementConnected(event: ApolloElementEvent): void {
    const target = claimApolloElement(event);
    if (!target) return;
    this.#instances.add(target);
    target.client = this.client;
  }

  private onElementDisconnected(event: ApolloElementEvent): void {
    const target = claimApolloElement(event);
    if (!target) return;
    this.#instances.delete(target);
    delete target.client;
  }
}

customElements.define('apollo-client', ApolloClientElement);
