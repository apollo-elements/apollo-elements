import type { DocumentNode, OperationVariables, TypedDocumentNode } from '@apollo/client/core';
import type { Descriptor } from 'hybrids';

import { ApolloMutationElement } from '@apollo-elements/interfaces/apollo-mutation';
import { applyPrototype } from '@apollo-elements/lib/prototypes';

import { initDocument } from '../helpers/accessors';

export type { ApolloMutationElement };

export type MutationHybridsFactoryOptions<D, V> = Pick<ApolloMutationElement<D, V>,
    'client'
  | 'mutation'
  | 'errorPolicy'
  | 'fetchPolicy'
  | 'variables'
  | 'refetchQueries'
  | 'awaitRefetchQueries'
  | 'optimisticResponse'
  | 'ignoreResults'
  | 'onCompleted'
  | 'onError'
  | 'updater'
>;


/**
 * Hybrids property descriptor factory for GraphQL mutations.
 * Implements the [ApolloMutationElement](/api/interfaces/mutation/) interface.
 *
 * @param  document The mutation document.
 * @param  options Options to control the mutation.
 * @return Hybrids descriptor which mixes the [ApolloMutationInterface](/api/interfaces/mutation/) in on connect.
 */
export function mutation<D = unknown, V = OperationVariables>(
  document?: DocumentNode | TypedDocumentNode<D, V> | null,
  options?: MutationHybridsFactoryOptions<D, V>
): Descriptor<ApolloMutationElement<D, V>> {
  return {
    connect(host, key, invalidate) {
      applyPrototype<ApolloMutationElement<D, V>>(host, ApolloMutationElement, 'mutation');
      return initDocument<ApolloMutationElement<D, V>>({
        host, document, invalidate, defaults: {
          ...options,
          called: false,
        },
      });
    },
  };
}
