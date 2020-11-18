import type { DocumentNode } from 'graphql';
import type { Descriptor } from 'hybrids';

import { ApolloMutationMixin } from '@apollo-elements/mixins/apollo-mutation-mixin';
import { hookPropertyIntoHybridsCache } from '../helpers/cache';
import { apply, getDescriptor } from '@apollo-elements/lib/prototypes';

class ApolloMutationElement<D = unknown, V = unknown>
  extends ApolloMutationMixin(HTMLElement)<D, V> { }

const lastKnown = new WeakMap<ApolloMutationElement, DocumentNode>();

export type { ApolloMutationElement };

export function mutation<D, V>(init: DocumentNode): Descriptor<ApolloMutationElement<D, V>> {
  return {
    get(host): DocumentNode {
      apply(host, ApolloMutationElement, 'mutation');
      return getDescriptor(host).mutation.get.call(host);
    },

    set(host, val: DocumentNode) {
      apply(host, ApolloMutationElement, 'mutation');
      getDescriptor(host).mutation.set.call(host, val);
      return val;
    },

    connect(host, key, invalidate) {
      apply(host, ApolloMutationElement, 'mutation');
      hookPropertyIntoHybridsCache({ host, key: 'called', init: false });
      // @ts-expect-error: gotta hook up spies somehow
      host?.__testingEscapeHatch?.(host);
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
