/* eslint-disable @typescript-eslint/no-explicit-any */

export interface CustomElement extends HTMLElement {
    attributeChangedCallback?(name: string, oldValue: string, newValue: string): void;
    adoptedCallback?(): void;
    connectedCallback?(): void;
    disconnectedCallback?(): void;
}

export type Constructor<T = {}> = new (...a: any[]) => T
