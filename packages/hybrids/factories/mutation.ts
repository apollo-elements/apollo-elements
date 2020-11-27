import type { DocumentNode } from '@apollo/client/core';
import type { Descriptor } from 'hybrids';

import { ApolloMutationElement } from '@apollo-elements/interfaces/apollo-mutation';
import { apply } from '@apollo-elements/lib/prototypes';

import { initDocument } from '../helpers/accessors';

export type { ApolloMutationElement };

export function mutation<D, V>(document?: DocumentNode): Descriptor<ApolloMutationElement<D, V>> {
  return {
    connect(host, key, invalidate) {
      apply(host, ApolloMutationElement, 'mutation');
      return initDocument<ApolloMutationElement<D, V>>({
        host, document, invalidate, defaults: { called: false },
      });
    },
  };
}
