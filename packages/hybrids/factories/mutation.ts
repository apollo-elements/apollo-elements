import type { DocumentNode } from '@apollo/client/core';
import type { Descriptor } from 'hybrids';

import { ApolloMutationElement } from '@apollo-elements/interfaces/apollo-mutation';
import { apply, getDescriptor } from '@apollo-elements/lib/prototypes';

import { hookPropertyIntoHybridsCache } from '../helpers/cache';
import { __testing_escape_hatch__ } from './client';

const lastKnown = new WeakMap<ApolloMutationElement, DocumentNode>();

export type { ApolloMutationElement };

function get(host): DocumentNode {
  apply(host, ApolloMutationElement, 'mutation');
  return getDescriptor(host).mutation.get.call(host);
}

function set(host, val: DocumentNode) {
  apply(host, ApolloMutationElement, 'mutation');
  getDescriptor(host).mutation.set.call(host, val);
  return val;
}

export function mutation<D, V>(init: DocumentNode): Descriptor<ApolloMutationElement<D, V>> {
  return {
    get, set,
    connect(host, key, invalidate) {
      apply(host, ApolloMutationElement, 'mutation');

      hookPropertyIntoHybridsCache({ host, key: 'called', init: false });

      host?.[__testing_escape_hatch__]?.(host);

      const mo = new MutationObserver(() => invalidate());
      mo.observe(host, { characterData: true, childList: true, subtree: true });

      getDescriptor(host).connectedCallback?.value?.call?.(host);

      // HACK: i'm pretty sure the hybrids setter is never getting called, so let's cache the values manually
      // If we don't do this, `parentNode.append(host)` will not preserve the value of `mutation`
      host.mutation ??= lastKnown.has(host) ? lastKnown.get(host) : init ?? null;

      return () => {
        lastKnown.set(host, host.mutation);
        mo.disconnect();
        getDescriptor(host).disconnectedCallback?.value?.call?.(host);
      };
    },
  };
}
