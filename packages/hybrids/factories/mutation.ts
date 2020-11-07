import type { DocumentNode } from 'graphql';
import type { Descriptor } from 'hybrids';

import { ApolloMutationMixin } from '@apollo-elements/mixins/apollo-mutation-mixin';
import { apply, getDescriptor, hookIntoHybridsRender } from '../helpers/prototypes';

class ApolloMutationElement<D = unknown, V = unknown>
  extends ApolloMutationMixin(HTMLElement)<D, V> { }

export type { ApolloMutationElement };

export function mutation<TData, TVariables>(
  mutation: DocumentNode
): Descriptor<ApolloMutationElement<TData, TVariables>> {
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
      hookIntoHybridsRender({ host, key: 'called', init: false });
      // @ts-expect-error: gotta hook up spies somehow
      host?.__testingEscapeHatch?.(host);
      const mo = new MutationObserver(() => invalidate());
      mo.observe(host, { characterData: true, childList: true, subtree: true });
      getDescriptor(host).connectedCallback?.value?.call?.(host);
      host.mutation = null;
      if (mutation)
        host.mutation = mutation;
      return () => mo.disconnect();
    },
  };
}
