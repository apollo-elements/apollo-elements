import type { GraphQLError } from 'graphql';
import type { ApolloClient, ApolloError, NormalizedCacheObject } from '@apollo/client/core';
import type { ApolloElementInterface } from '@apollo-elements/interfaces/apollo-element';

import { ApolloElementMixin } from '@apollo-elements/mixins/apollo-element-mixin';
import { FASTElement, attr, observable } from '@microsoft/fast-element';

export class ApolloElement<Data = unknown>
  extends ApolloElementMixin(FASTElement)
  implements ApolloElementInterface<Data> {
  declare context?: Record<string, unknown>;

  @observable data: Data = null;

  @observable error: ApolloError | Error = null;

  @observable errors: readonly GraphQLError[] = null;

  @observable client: ApolloClient<NormalizedCacheObject> =
    window.__APOLLO_CLIENT__;

  @attr({ mode: 'boolean' }) loading = false;
}
