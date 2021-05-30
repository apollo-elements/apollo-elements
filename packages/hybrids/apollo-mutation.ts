import type { Hybrids } from 'hybrids';
import type { ApolloMutationController } from '@apollo-elements/core';
import type * as I from '@apollo-elements/interfaces';

import { ApolloElement } from './apollo-element';
import { mutation } from './factories/mutation';
import { controlled, option, method } from './factories/controlled';

type Omitted =
  |'shouldSubscribe'
  |'canAutoSubscribe'
  |'document'
  |'readyToReceiveDocument'
  |'connectedCallback'
  |'disconnectedCallback'
  |'adoptedCallback'
  |'attributeChangedCallback'

/**
 * Hybrids descriptor bag.
 *
 * Spread into your hybrids to implement the [ApolloMutationElement](/api/interfaces/mutation/) interface.
 */
export const ApolloMutation: Hybrids<Omit<I.ApolloMutationInterface, Omitted>> = {
  controller: mutation(null),

  ...ApolloElement,

  mutation: controlled(),
  called: controlled(),
  mutate: method(),

  fetchPolicy: option(),
  awaitRefetchQueries: option<boolean>(),
  refetchQueries: option(null),
  ignoreResults: option(false),
  optimisticResponse: option(),

  onCompleted: option(),
  onError: option(),
};

export type ApolloMutationElement<D extends I.MaybeTDN = I.MaybeTDN, V = I.MaybeVariables<D>> =
  HTMLElement & Omit<I.ApolloMutationInterface<D, V>, Omitted> & {
    controller: ApolloMutationController<D, V>;
  };
