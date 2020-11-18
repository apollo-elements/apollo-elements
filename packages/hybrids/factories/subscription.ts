import type { DocumentNode } from 'graphql';
import type { Descriptor } from 'hybrids';

import { ApolloSubscriptionMixin } from '@apollo-elements/mixins/apollo-subscription-mixin';
import { apply, getDescriptor } from '@apollo-elements/lib/prototypes';

class ApolloSubscriptionElement<D = unknown, V = unknown>
  extends ApolloSubscriptionMixin(HTMLElement)<D, V> { }

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
      // @ts-expect-error: gotta hook up spies somehow
      host?.__testingEscapeHatch?.(host);
      const mo = new MutationObserver(() => invalidate());
      mo.observe(host, { characterData: true, childList: true, subtree: true });
      getDescriptor(host).connectedCallback.value.call(host);
      // HACK: i'm pretty sure the hybrids setter is never getting called, so let's cache the values manually
      // If we don't do this, `parentNode.append(host)` will not preserve the value of `subscription`
      host.subscription ??= lastKnown.has(host) ? lastKnown.get(host) : init ?? null;
      host.documentChanged(host.subscription);
      return () => {
        lastKnown.set(host, host.subscription);
        mo.disconnect();
        getDescriptor(host).disconnectedCallback?.value?.call?.(host);
      };
    },
  };
}
