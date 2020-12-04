import type { GraphQLError } from 'graphql';
import type { ApolloClient, ApolloError, NormalizedCacheObject } from '@apollo/client/core';
import type { ApolloElementInterface } from '@apollo-elements/interfaces/apollo-element';
import type { Constructor, CustomElement } from '@apollo-elements/interfaces';

import { ApolloElementMixin } from '@apollo-elements/mixins/apollo-element-mixin';
import { FASTElement, attr, observable } from '@microsoft/fast-element';

/**
 * `ApolloElement`
 *
 * 🚀 Custom element base class for Apollo FAST elements.
 *
 * See [[`ApolloElementInterface`]] for more information on events
 *
 * @element
 */
export class ApolloElement<TData = unknown, TVariables = unknown>
  extends ApolloElementMixin(
    // have to cast because of the TypeScript bug which causes the error in apollo-element-mixin
    FASTElement as Constructor<CustomElement & FASTElement>
  )<TData, TVariables>
  implements ApolloElementInterface<TData, TVariables> {
  declare context?: Record<string, unknown>;

  declare variables: TVariables;

  @observable client: ApolloClient<NormalizedCacheObject> | null =
    window.__APOLLO_CLIENT__ ?? null;

  @observable data: TData | null = null;

  @observable error: ApolloError | Error | null = null;

  @observable errors: readonly GraphQLError[] | null= null;

  @attr({ mode: 'boolean' }) loading = false;
}
