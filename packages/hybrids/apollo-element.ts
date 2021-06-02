import type { Hybrids } from 'hybrids';

import type { ApolloElementElement } from '@apollo-elements/interfaces/apollo-element';

import { ApolloElementEvent } from '@apollo-elements/core/events';
import { controlled, option } from './factories/controlled';

type Keys =
  |'client'
  |'variables'
  |'data'
  |'error'
  |'errors'
  |'loading'
  |'context'
  |'errorPolicy'
  |'fetchPolicy'

type AE = HTMLElement & Pick<ApolloElementElement, Keys>;

export const ApolloElement: Hybrids<AE> = {
  client: controlled(null),
  variables: controlled(null),
  data: controlled(),
  error: controlled(),
  errors: controlled(),
  loading: controlled(),

  context: option(),
  errorPolicy: option(),
  fetchPolicy: option(),

  ['hybrids client events' as unknown as symbol]: {
    connect(host: ApolloElementElement) {
      host.dispatchEvent(new ApolloElementEvent('apollo-element-connected', host));
      return () => {
        const event = new ApolloElementEvent('apollo-element-disconnected', host);
        host.dispatchEvent(event);
        dispatchEvent(event);
      };
    },
  },
};

export type { ApolloElementElement };
