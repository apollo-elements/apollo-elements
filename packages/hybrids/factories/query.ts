import type { DocumentNode } from 'graphql';
import type { Descriptor } from 'hybrids';

import { ApolloQueryMixin } from '@apollo-elements/mixins/apollo-query-mixin';
import { hookPropertyIntoHybridsCache } from '../helpers/cache';
import { apply, getDescriptor } from '@apollo-elements/lib/prototypes';

class ApolloQueryElement<D = unknown, V = unknown>
  extends ApolloQueryMixin(HTMLElement)<D, V> { }

export type { ApolloQueryElement };

export function query<TData, TVariables>(
  query: DocumentNode
): Descriptor<ApolloQueryElement<TData, TVariables>> {
  return {
    get(host): DocumentNode {
      apply(host, ApolloQueryElement, 'query');
      return getDescriptor(host).query.get.call(host);
    },

    set(host, val: DocumentNode) {
      apply(host, ApolloQueryElement, 'query');
      getDescriptor(host).query.set.call(host, val);
      return val;
    },

    connect(host, key, invalidate) {
      apply(host, ApolloQueryElement, 'query');
      hookPropertyIntoHybridsCache({ host, key: 'networkStatus', init: 7 });
      // @ts-expect-error: gotta hook up spies somehow
      host?.__testingEscapeHatch?.(host);
      const mo = new MutationObserver(() => invalidate());
      mo.observe(host, { characterData: true, childList: true, subtree: true });
      getDescriptor(host).connectedCallback.value.call(host);
      host.query = null;
      if (query)
        host.query = query;
      return () => mo.disconnect();
    },
  };
}
