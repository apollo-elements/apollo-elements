import type { DocumentNode, OperationVariables, TypedDocumentNode } from '@apollo/client/core';
import type { Descriptor } from 'hybrids';

import { ApolloMutationElement } from '@apollo-elements/interfaces/apollo-mutation';
import { apply } from '@apollo-elements/lib/prototypes';

import { initDocument } from '../helpers/accessors';

export type { ApolloMutationElement };

export function mutation<D = unknown, V = OperationVariables>(
  document?: DocumentNode | TypedDocumentNode<D, V> | null
): Descriptor<ApolloMutationElement<D, V>> {
  return {
    connect(host, key, invalidate) {
      apply<ApolloMutationElement<D, V>>(host, ApolloMutationElement, 'mutation');
      return initDocument<ApolloMutationElement<D, V>>({
        host, document, invalidate, defaults: { called: false },
      });
    },
  };
}
