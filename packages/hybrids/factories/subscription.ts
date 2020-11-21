import type { DocumentNode } from '@apollo/client/core';
import type { Descriptor } from 'hybrids';

import { ApolloSubscriptionElement } from '@apollo-elements/interfaces/apollo-subscription';
import { apply, getDescriptor } from '@apollo-elements/lib/prototypes';

import { __testing_escape_hatch__ } from './client';

const lastKnown = new WeakMap<ApolloSubscriptionElement, DocumentNode>();

export type { ApolloSubscriptionElement };

function get<T extends ApolloSubscriptionElement>(host: T): DocumentNode {
  apply(host, ApolloSubscriptionElement, 'subscription');
  return getDescriptor(host).subscription.get.call(host);
}

function set<T extends ApolloSubscriptionElement>(host: T, val: DocumentNode) {
  apply(host, ApolloSubscriptionElement, 'subscription');
  getDescriptor(host).subscription.set.call(host, val);
  return val;
}

export function subscription<D, V>(init: DocumentNode):
  Descriptor<ApolloSubscriptionElement<D, V>> {
  return {
    get, set,
    connect(host, key, invalidate) {
      apply(host, ApolloSubscriptionElement, 'subscription');
      host?.[__testing_escape_hatch__]?.(host);
      const mo = new MutationObserver(() => invalidate());
      mo.observe(host, { characterData: true, childList: true, subtree: true });

      // HACK: i'm pretty sure the hybrids setter is never getting called, so let's cache the values manually
      // If we don't do this, `parentNode.append(host)` will not preserve the value of `subscription`
      host.subscription ??= lastKnown.has(host) ? lastKnown.get(host) : init ?? null;

      // NB: we'd prefer to use the connectedCallback, but in our case we can't
      // because of the previous note, so instead we're copying the contents here
      // getDescriptor(host).connectedCallback.value.call(host);
      host.documentChanged(host.subscription);

      return () => {
        lastKnown.set(host, host.subscription);
        mo.disconnect();
        getDescriptor(host).disconnectedCallback?.value?.call?.(host);
      };
    },
  };
}
