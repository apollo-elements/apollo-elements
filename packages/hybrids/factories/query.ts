import type { DocumentNode } from '@apollo/client/core';
import type { Descriptor } from 'hybrids';

import { NetworkStatus } from '@apollo/client/core';
import { ApolloQueryElement } from '@apollo-elements/interfaces/apollo-query';
import { applyPrototype } from '@apollo-elements/lib/prototypes';

import { initDocument } from '../helpers/accessors';

export type { ApolloQueryElement };

export function query<D, V>(document?: DocumentNode): Descriptor<ApolloQueryElement<D, V>> {
  return {
    connect(host, key, invalidate) {
      applyPrototype(host, ApolloQueryElement, 'query');
      return initDocument<ApolloQueryElement<D, V>>({
        host, document, invalidate, defaults: { networkStatus: NetworkStatus.ready },
      });
    },
  };
}
