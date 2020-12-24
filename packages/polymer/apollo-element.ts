import type {
  ApolloClient,
  ApolloError,
  NormalizedCacheObject,
  OperationVariables,
} from '@apollo/client/core';

import type { ApolloElementInterface, Data, Variables } from '@apollo-elements/interfaces';
import type { GraphQLError } from 'graphql';

import { notify, PolymerChangeEvent } from './notify-decorator';
import { ApolloElementMixin } from '@apollo-elements/mixins/apollo-element-mixin';

/**
 * @fires 'data-changed'
 * @fires 'variables-changed'
 * @fires 'error-changed'
 * @fires 'errors-changed'
 * @fires 'loading-changed'
 */
export class PolymerApolloElement<D = unknown, V = OperationVariables>
  extends ApolloElementMixin(HTMLElement)<D, V>
  implements ApolloElementInterface<D, V> {
  declare client: ApolloClient<NormalizedCacheObject>;

  declare context?: Record<string, unknown>;

  @notify data: Data<D> | null = null;

  @notify error: Error | ApolloError | null = null;

  @notify errors: readonly GraphQLError[]|null = null;

  @notify loading = false;

  variablesChanged(variables: Variables<D, V>): void {
    this.dispatchEvent(new PolymerChangeEvent('variables', variables));
  }
}
