import type { DocumentNode } from '@apollo/client/core';
import type { Descriptor } from 'hybrids';

import { NetworkStatus } from '@apollo/client/core';
import { ApolloQueryElement } from '@apollo-elements/interfaces/apollo-query';
import { apply } from '@apollo-elements/lib/prototypes';

import { initDocument, makeGet, makeSet } from '../helpers/accessors';

export type { ApolloQueryElement };

export function query<D, V>(document: DocumentNode): Descriptor<ApolloQueryElement<D, V>> {
  return {
    get: makeGet(ApolloQueryElement),
    set: makeSet(ApolloQueryElement),
    connect(host, key, invalidate) {
      apply(host, ApolloQueryElement, 'query');
      return initDocument<ApolloQueryElement>({
        host, document, invalidate, defaults: { networkStatus: NetworkStatus.ready },
      });
    },
  };
}
