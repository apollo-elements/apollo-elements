/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * @noInheritDoc
 */
export declare class CustomElement extends HTMLElement {
  attributeChangedCallback?(name: string, oldValue: string, newValue: string): void;

  adoptedCallback?(): void;

  connectedCallback?(): void;

  disconnectedCallback?(): void;
}

export type Constructor<T = CustomElement> =
  new (...a: any[]) => T
