declare module '*.graphql' {
  import { DocumentNode } from '@apollo/client/core';
  const defaultDocument: DocumentNode;
  export default defaultDocument;
}


declare module '*.css' {
  import { CSSResult } from 'lit-element';
  const css: CSSResult;
  export default css;
}

declare module '@gluon/gluon' {
  export class GluonElement extends HTMLElement {
    static readonly is: string;

    createRenderRoot(): ReturnType<HTMLElement['attachShadow']>|Node;

    render(options?: { sync: boolean }): Promise<void>
  }

  export { html, render } from 'lit-html';
}

declare module 'hybrids/esm/cache' {
  import type { Descriptor } from 'hybrids';

  export interface CacheEntry<T extends HTMLElement = HTMLElement> {
      target: T,
      key: keyof T,
      value: T[keyof T],
      contexts: unknown,
      deps: unknown,
      state: number,
      checksum: number,
      observed: boolean
  }

  export function getEntry<T extends HTMLElement>(
    target: CacheEntry<T>,
    key: keyof T
  ): CacheEntry<T>;

  export function getEntries<T extends HTMLElement>(target: CacheEntry<T>): CacheEntry<T>[];

  export function get<T extends HTMLElement>(
    target: T,
    key: keyof T,
    getter: Descriptor<T>['get'],
    validate?: <V>(value: V) => boolean
  ): T[keyof T];

  export function set<T extends HTMLElement>(
    target: T,
    key: keyof T,
    setter: Descriptor<T>['set'],
    validate?: <V>(value: V) => boolean
  ): T[keyof T];

  export function invalidate<T extends HTMLElement>(
    target: T,
    key: keyof T,
    clearValue: (...args: any[]) => void,
    deleteValue: (...args: any[]) => void,
  ): void

  export function invalidateAll<T extends HTMLElement>(
    target: T,
    key: keyof T,
    clearValue: (...args: any[]) => void,
    deleteValue: (...args: any[]) => void,
  ): void

  export function observe<T extends HTMLElement>(
    target: T,
    key: keyof T,
    getter: (key: keyof T) => T[keyof T],
    fn: (...args: any[]) => void
  ): () => void
}
