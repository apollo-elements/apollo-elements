import type { DocumentNode, OperationVariables, TypedDocumentNode } from '@apollo/client/core';
import type { ApolloMutationInterface } from '@apollo-elements/interfaces';
import type { Hybrids } from 'hybrids';

import { ApolloMutationElement } from '@apollo-elements/interfaces/apollo-mutation';
import { applyPrototype } from '@apollo-elements/lib/prototypes';

import { initDocument } from '../helpers/accessors';

import { ApolloElement } from '../apollo-element';

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
  document: DocumentNode | TypedDocumentNode<D, V> | null,
  options?: MutationHybridsFactoryOptions<D, V>
): Hybrids<ApolloMutationInterface<D, V>> {
  return {
    ...ApolloElement as Hybrids<ApolloMutationElement<D, V>>,
    called: false,
    mutation: {
      connect(host, _, invalidate) {
        applyPrototype<ApolloMutationElement<D, V>>(host, ApolloMutationElement, {
          omit: ['called'],
        });

        return initDocument<ApolloMutationElement<D, V>>({
          host,
          document: document ?? null,
          invalidate, defaults: {
            ...options,
          },
        });
      },
    },
  };
}
