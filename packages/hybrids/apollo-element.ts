import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core';
import type { Hybrids } from 'hybrids';
import type { Constructor } from '@apollo-elements/interfaces/constructor';

import { property } from 'hybrids';
import { classAccessors } from './factories/classAccessors';
import { ApolloElementMixin } from '@apollo-elements/mixins/apollo-element-mixin';

class ApolloElementElement extends ApolloElementMixin(class { } as Constructor) { }

export type { ApolloElementElement };

function connect<T extends ApolloElementElement>(host: T, key: keyof T): void {
  if (key === 'client')
    host.client = host.client ?? window.__APOLLO_CLIENT__;
  ApolloElementElement.prototype.connectedCallback.call(host);
  return ApolloElementElement.prototype.disconnectedCallback.bind(host);
}

export const ApolloElement: Hybrids<ApolloElementElement> = {
  client: property(null, connect),
  data: null,
  error: null,
  errors: null,
  /** @private */
  __document: null,
  /** @private */
  // @ts-expect-error: shortcut
  __variables: null,

  document: classAccessors(ApolloElementElement, 'document'),
};

declare global {
  interface Window {
    __APOLLO_CLIENT__?: ApolloClient<NormalizedCacheObject>
  }
}
