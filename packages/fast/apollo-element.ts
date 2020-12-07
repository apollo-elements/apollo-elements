import type { GraphQLError } from 'graphql';
import type {
  ApolloClient,
  ApolloError,
  NormalizedCacheObject,
  OperationVariables,
} from '@apollo/client/core';
import type { ApolloElementInterface } from '@apollo-elements/interfaces/apollo-element';
import type { Constructor, CustomElement, Data, Variables } from '@apollo-elements/interfaces';

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
export class ApolloElement<D = unknown, V = OperationVariables>
  // have to cast because of the TypeScript bug which causes the error in apollo-element-mixin
  extends ApolloElementMixin(FASTElement as Constructor<CustomElement & FASTElement>)<D, V>
  implements ApolloElementInterface<D, V> {
  declare context?: Record<string, unknown>;

  declare variables: Variables<D, V>;

  @observable client: ApolloClient<NormalizedCacheObject> | null =
    window.__APOLLO_CLIENT__ ?? null;

  @observable data: Data<D> | null = null;

  @observable error: ApolloError | Error | null = null;

  @observable errors: readonly GraphQLError[] | null= null;

  @attr({ mode: 'boolean' }) loading = false;
}
