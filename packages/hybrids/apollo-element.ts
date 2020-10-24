import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core';
import type { Hybrids } from 'hybrids';
import type { Constructor } from '@apollo-elements/interfaces/constructor';

import { property } from 'hybrids';
import { classAccessors } from './factories/classAccessors';
import { ApolloElementMixin } from '@apollo-elements/mixins/apollo-element-mixin';
import { classMethod } from './factories/classMethod';

class ApolloElementElement extends ApolloElementMixin(class { } as Constructor) { }

export type { ApolloElementElement };

function connect<T extends ApolloElementElement>(host: T, key: keyof T): void {
  if (key === 'client')
    host.client = host.client ?? window.__APOLLO_CLIENT__ ?? null;
  ApolloElementElement.prototype.connectedCallback.call(host);
  return ApolloElementElement.prototype.disconnectedCallback.bind(host);
}

export const ApolloElement: Hybrids<ApolloElementElement> = {
  _document: null,
  _variables: null,
  _documentSetByJS: false,
  _variablesSetByJS: false,
  mo: null,
  client: property(null, connect),
  document: classAccessors(ApolloElementElement, 'document'),
  variables: classAccessors(ApolloElementElement, 'variables'),
  getDOMGraphQLDocument: classMethod(ApolloElementElement, 'getDOMGraphQLDocument'),
  getDOMVariables: classMethod(ApolloElementElement, 'getDOMVariables'),
  onMutation: classMethod(ApolloElementElement, 'onMutation'),
  data: null,
  error: null,
  errors: null,
};

declare global {
  interface Window {
    __APOLLO_CLIENT__?: ApolloClient<NormalizedCacheObject>
  }
}
