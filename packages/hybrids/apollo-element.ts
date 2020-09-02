import type { Hybrids } from 'hybrids';
import type { Constructor } from '@apollo-elements/interfaces';

import { property } from 'hybrids';
import { accessors } from './factories/accessors';
import { ApolloElementMixin } from '@apollo-elements/mixins/apollo-element-mixin';

import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core';

declare global {
  interface Window {
    __APOLLO_CLIENT__?: ApolloClient<NormalizedCacheObject>
  }
}

class Class extends ApolloElementMixin(class { } as Constructor) { }

export type ApolloElementElement =
  HTMLElement & Class;

const instance = new Class();

function connect<T extends Class>(host: T, key: keyof T): void {
  if (key === 'client')
    host.client = host.client ?? window.__APOLLO_CLIENT__;
  instance.connectedCallback.call(host);
  return instance.disconnectedCallback.bind(host);
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

  document: accessors(instance, 'document'),
};
