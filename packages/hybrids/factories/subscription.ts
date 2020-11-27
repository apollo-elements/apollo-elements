import type { DocumentNode } from '@apollo/client/core';
import type { Descriptor as Desc } from 'hybrids';

import { ApolloSubscriptionElement } from '@apollo-elements/interfaces/apollo-subscription';
import { apply } from '@apollo-elements/lib/prototypes';

import { initDocument } from '../helpers/accessors';

export type { ApolloSubscriptionElement };

export function subscription<D, V>(document?: DocumentNode): Desc<ApolloSubscriptionElement<D, V>> {
  return {
    connect(host, key, invalidate) {
      apply(host, ApolloSubscriptionElement, 'subscription');
      return initDocument<ApolloSubscriptionElement<D, V>>({ host, document, invalidate });
    },
  };
}
