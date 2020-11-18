import type { DocumentNode } from 'graphql';
import type { Descriptor } from 'hybrids';

import { ApolloQueryMixin } from '@apollo-elements/mixins/apollo-query-mixin';
import { hookPropertyIntoHybridsCache } from '../helpers/cache';
import { apply, getDescriptor } from '@apollo-elements/lib/prototypes';

class ApolloQueryElement<D = unknown, V = unknown>
  extends ApolloQueryMixin(HTMLElement)<D, V> { }

export type { ApolloQueryElement };

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
    get,
    set,

    connect(host, key, invalidate) {
      apply(host, ApolloQueryElement, 'query');
      hookPropertyIntoHybridsCache({ host, key: 'networkStatus', init: 7 });
      // @ts-expect-error: gotta hook up spies somehow
      host?.__testingEscapeHatch?.(host);
      const mo = new MutationObserver(() => invalidate());
      mo.observe(host, { characterData: true, childList: true, subtree: true });
      getDescriptor(host).connectedCallback.value.call(host);
      // HACK: i'm pretty sure the hybrids setter is never getting called, so let's cache the values manually
      // If we don't do this, `parentNode.append(host)` will not preserve the value of `query`
      host.query ??= lastKnown.has(host) ? lastKnown.get(host) : init ?? null;
      host.documentChanged(host.query);
      return () => {
        lastKnown.set(host, host.query);
        mo.disconnect();
        getDescriptor(host).disconnectedCallback?.value?.call?.(host);
      };
    },
  };
}
