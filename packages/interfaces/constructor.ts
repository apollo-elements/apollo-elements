/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Custom Element Interface
 * @noInheritDoc
 */
export declare class CustomElement extends HTMLElement {
  static readonly observedAttributes?: string[];

  /**
   * Called when one of the element's `observedAttributes` changes.
   * @param name name of the observed attribute
   * @param oldValue previous value of the attribute. null if it was nonexistent
   * @param newValue current value of the attribute. null if removed.
   */
  attributeChangedCallback?(name: string, oldValue: string, newValue: string): void;

  /**
   * Called when the element is adopted to a document.
   */
  adoptedCallback?(): void;

  /**
   * Called when the element connects to a document, when the element has access to it's own DOM.
   */
  connectedCallback?(): void;

  /**
   * Called when the element is removed from a document.
   */
  disconnectedCallback?(): void;
}

/**
 * Type that represents a class
 */
export type Constructor<T = CustomElement> = {
  new (...a: any[]): T;
  observedAttributes?: string[];
}

// BUG: https://github.com/modernweb-dev/web/issues/993#issuecomment-731726688
null;
