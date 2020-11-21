import type { DocumentNode } from '@apollo/client/core';
import type { Descriptor } from 'hybrids';

import { ApolloQueryElement } from '@apollo-elements/interfaces/apollo-query';
import { apply, getDescriptor } from '@apollo-elements/lib/prototypes';

import { hookPropertyIntoHybridsCache } from '../helpers/cache';
import { __testing_escape_hatch__ } from './client';

const lastKnown = new WeakMap<ApolloQueryElement, DocumentNode>();

function get<T extends ApolloQueryElement>(host: T): DocumentNode {
  apply(host, ApolloQueryElement, 'query');
  return getDescriptor(host).query.get.call(host);
}

function set<T extends ApolloQueryElement>(host: T, val: DocumentNode) {
  apply(host, ApolloQueryElement, 'query');
  getDescriptor(host).query.set.call(host, val);
  return val;
}

export function query<D, V>(init: DocumentNode): Descriptor<ApolloQueryElement<D, V>> {
  return {
    get, set,

    connect(host, key, invalidate) {
      apply(host, ApolloQueryElement, 'query');

      hookPropertyIntoHybridsCache({ host, key: 'networkStatus', init: 7 });

      host?.[__testing_escape_hatch__]?.(host);

      const mo = new MutationObserver(() => invalidate());
      mo.observe(host, { characterData: true, childList: true, subtree: true });

      // HACK: i'm pretty sure the hybrids setter is never getting called, so let's cache the values manually
      // If we don't do this, `parentNode.append(host)` will not preserve the value of `query`
      host.query ??= lastKnown.has(host) ? lastKnown.get(host) : init ?? null;

      // NB: we'd prefer to use the connectedCallback, but in our case we can't
      // because of the previous note, so instead we're copying the contents here
      // getDescriptor(host).connectedCallback.value.call(host);
      host.documentChanged(host.query);

      return () => {
        lastKnown.set(host, host.query);
        mo.disconnect();
        getDescriptor(host).disconnectedCallback?.value?.call?.(host);
      };
    },
  };
}
