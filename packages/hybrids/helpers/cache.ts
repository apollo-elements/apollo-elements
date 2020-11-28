import type { ApolloElementElement } from '@apollo-elements/interfaces/apollo-element';
import type { Entries } from '@apollo-elements/test-helpers';

import { property } from 'hybrids';

import * as cache from 'hybrids/esm/cache';

interface CacheHookOpts<T extends HTMLElement> {
  host: T,
  key: keyof T,
  init: unknown
}

const PROPERTIES: Pick<ApolloElementElement, 'data'|'error'|'errors'|'loading'> = {
  data: null,
  error: null,
  errors: null,
  loading: false,
};

export function hookPropertyIntoHybridsCache<T extends HTMLElement>(opts: CacheHookOpts<T>): void {
  const { host, init, key } = opts;
  const { get, set } = property(init);
  Object.defineProperty(host, key, {
    enumerable: true,
    configurable: true,
    get() {
      return cache.get(host, key, get);
    },
    set(newValue) {
      cache.set(host, key, set, newValue);
    },
  });
}

export function hookElementIntoHybridsCache<T extends ApolloElementElement>(host: T): void {
  for (const [key, init] of Object.entries(PROPERTIES) as Entries<T>)
    hookPropertyIntoHybridsCache({ host, key, init });
}
