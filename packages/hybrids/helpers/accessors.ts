import type { Constructor } from '@apollo-elements/interfaces';
import type { DocumentNode } from '@apollo/client/core';
import type { ApolloElementElement } from '../apollo-element';
import type { Descriptor } from 'hybrids';

import { apply, getDescriptor } from '@apollo-elements/lib/prototypes';
import { hookPropertyIntoHybridsCache } from './cache';

export const __testing_escape_hatch__ = Symbol('__testing_escape_hatch__');

export function makeGet<K extends ApolloElementElement>(
  Class: Constructor<K> & typeof ApolloElementElement
): Descriptor<K>['get'] {
  const type = Class.documentType as 'query'|'mutation'|'subscription';
  return function get(host: K): DocumentNode {
    apply(host, Class, type);
    return getDescriptor(host)[type].get.call(host);
  };
}

export function makeSet<K extends ApolloElementElement>(
  Class: Constructor<K> & typeof ApolloElementElement
): Descriptor<K>['set'] {
  const type = Class.documentType as 'query'|'mutation'|'subscription';
  return function set(host: K, val: DocumentNode): DocumentNode {
    apply(host, Class, type);
    getDescriptor(host)[type].set.call(host, val);
    return val;
  };
}

const lastKnown = new WeakMap<ApolloElementElement, DocumentNode>();

interface Options<T> {
  host: T,
  document: DocumentNode,
  // can't be helped as hybrids' types are set
  // eslint-disable-next-line @typescript-eslint/ban-types
  invalidate: Function,
  defaults?: Partial<Record<keyof T, T[keyof T]>>
}
export function initDocument<T extends ApolloElementElement>(opts: Options<T>): () => void {
  const { host, document, invalidate, defaults } = opts;
  for (const [key, init] of Object.entries(defaults ?? {}))
    hookPropertyIntoHybridsCache({ host, key, init });

  host?.[__testing_escape_hatch__]?.(host);

  const mo = new MutationObserver(() => invalidate());
  mo.observe(host, { characterData: true, childList: true, subtree: true });

  // HACK: i'm pretty sure the hybrids setter is never getting called, so let's cache the values manually
  // If we don't do this, `parentNode.append(host)` will not preserve the value of `mutation`
  host.document ??= lastKnown.has(host) ? lastKnown.get(host) : document ?? null;

  // NB: we'd prefer to use the connectedCallback, but in our case we can't
  // because of the previous note, so instead we're copying the contents here
  // getDescriptor(host).connectedCallback.value.call(host);
  host.documentChanged?.(host.document);

  return () => {
    lastKnown.set(host, host.document);
    mo.disconnect();
    getDescriptor(host).disconnectedCallback?.value?.call?.(host);
  };
}
