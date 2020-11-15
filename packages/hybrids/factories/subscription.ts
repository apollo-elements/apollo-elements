import type { DocumentNode } from 'graphql';
import type { Descriptor } from 'hybrids';

import { ApolloSubscriptionMixin } from '@apollo-elements/mixins/apollo-subscription-mixin';
import { apply, getDescriptor } from '@apollo-elements/lib/prototypes';

class ApolloSubscriptionElement<D = unknown, V = unknown>
  extends ApolloSubscriptionMixin(HTMLElement)<D, V> { }

export type { ApolloSubscriptionElement };

export function subscription<TData, TVariables>(
  subscription: DocumentNode
): Descriptor<ApolloSubscriptionElement<TData, TVariables>> {
  return {
    get(host): DocumentNode {
      apply(host, ApolloSubscriptionElement, 'subscription');
      return getDescriptor(host).subscription.get.call(host);
    },

    set(host, val: DocumentNode) {
      apply(host, ApolloSubscriptionElement, 'subscription');
      getDescriptor(host).subscription.set.call(host, val);
      return val;
    },

    connect(host, key, invalidate) {
      apply(host, ApolloSubscriptionElement, 'subscription');
      // @ts-expect-error: gotta hook up spies somehow
      host?.__testingEscapeHatch?.(host);
      const mo = new MutationObserver(() => invalidate());
      mo.observe(host, { characterData: true, childList: true, subtree: true });
      getDescriptor(host).connectedCallback.value.call(host);
      host.subscription = null;
      if (subscription)
        host.subscription = subscription;
      return () => mo.disconnect();
    },
  };
}
