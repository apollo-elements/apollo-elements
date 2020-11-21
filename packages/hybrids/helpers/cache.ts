import type { ApolloElementElement } from '@apollo-elements/interfaces/apollo-element';

import { property } from 'hybrids';

import * as cache from 'hybrids/esm/cache';

interface HookHybridsOptions<T> {
  host: T,
  key: keyof T|string,
  init: unknown
}

const PROPERTIES: Pick<ApolloElementElement, 'data'|'error'|'errors'|'loading'> = {
  data: null,
  error: null,
  errors: null,
  loading: false,
};

export function hookPropertyIntoHybridsCache<T>(opts: HookHybridsOptions<T>): void {
  const { host, init, key } = opts;
  const config = property(init);
  Object.defineProperty(host, key, {
    enumerable: true,
    configurable: true,
    get() {
      return cache.get(host, key, config.get);
    },
    set(newValue) {
      cache.set(host, key, config.set, newValue);
    },
  });
}

export function hookElementIntoHybridsCache<T extends ApolloElementElement>(host: T): void {
  for (const [key, init] of Object.entries(PROPERTIES))
    hookPropertyIntoHybridsCache({ host, key, init });
}
