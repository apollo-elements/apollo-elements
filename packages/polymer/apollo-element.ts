import type { ApolloClient, ApolloError, NormalizedCacheObject } from '@apollo/client/core';
import type { ApolloElementInterface } from '@apollo-elements/interfaces';
import type { GraphQLError } from 'graphql';

import { notify, PolymerChangeEvent } from './notify-decorator';
import { ApolloElementMixin } from '@apollo-elements/mixins/apollo-element-mixin';

/**
 * @fires 'data-changed'
 * @fires 'variables-changed'
 * @fires 'error-changed'
 * @fires 'errors-changed'
 * @fires 'loading-changed'
 *
 * See [[`ApolloElementInterface`]] for more information on events
 */
export class PolymerApolloElement<TData = unknown, TVariables = unknown>
  extends ApolloElementMixin(HTMLElement)<TData, TVariables>
  implements ApolloElementInterface<TData, TVariables> {
  declare client: ApolloClient<NormalizedCacheObject>;

  declare context?: Record<string, unknown>;

  @notify data: TData|null = null;

  @notify error: Error|ApolloError|null = null;

  @notify errors: readonly GraphQLError[]|null = null;

  @notify loading = false;

  variablesChanged(variables: TVariables): void {
    this.dispatchEvent(new PolymerChangeEvent('variables', variables));
  }
}
