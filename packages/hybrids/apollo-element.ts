import type { Hybrids } from 'hybrids';
import type { Constructor, CustomElement } from '@apollo-elements/mixins/constructor';

import { property } from 'hybrids';
import { accessors } from './factories/accessors';
import { ApolloElementMixin } from '@apollo-elements/mixins/apollo-element-mixin';

class Class extends ApolloElementMixin(class { } as Constructor<CustomElement>) { }

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
  __document: null,
  // @ts-expect-error: shortcut for query and subscription
  __variables: null,

  document: accessors(instance, 'document'),
};
