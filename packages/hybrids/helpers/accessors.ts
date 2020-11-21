import type { DocumentNode } from '@apollo/client/core';
import type { ApolloElementElement } from '../apollo-element';
import { getDescriptor } from '@apollo-elements/lib/prototypes';
import { hookPropertyIntoHybridsCache } from './cache';

export const __testing_escape_hatch__ = Symbol('__testing_escape_hatch__');

const VALUES = new WeakMap<ApolloElementElement, DocumentNode>();

interface Options<T> {
  host: T,
  document: DocumentNode,
  // can't be helped as hybrids' types are set
  // eslint-disable-next-line @typescript-eslint/ban-types
  invalidate: Function,
  defaults?: Partial<Record<keyof T, T[keyof T]>>
}
export function initDocument<T extends ApolloElementElement>(opts: Options<T>): () => void {
  const { host, document, invalidate, defaults = {} } = opts;

  if (!VALUES.has(host))
    VALUES.set(host, document);

  for (const [key, init] of Object.entries(defaults))
    hookPropertyIntoHybridsCache({ host, key, init }); /* c8 ignore next */ // this is certaily being called

  host?.[__testing_escape_hatch__]?.(host);

  const mo = new MutationObserver(() => invalidate());
  mo.observe(host, { characterData: true, childList: true, subtree: true });

  // If we don't do this, `parentNode.append(host)` will not preserve the value of `mutation`
  host.document ??= VALUES.get(host) ?? document ?? null;

  // NB: we'd prefer to use the connectedCallback, but in our case we can't
  // because of the previous note, so instead we're copying the contents here
  // getDescriptor(host).connectedCallback.value.call(host);
  host.documentChanged?.(host.document);

  return () => {
    VALUES.set(host, host.document);
    mo.disconnect();
    getDescriptor(host).disconnectedCallback?.value?.call?.(host);
  };
}