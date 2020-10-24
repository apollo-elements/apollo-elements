import type { ApolloClient, ApolloError, NormalizedCacheObject } from '@apollo/client/core';
import type { ApolloElementInterface } from '@apollo-elements/interfaces';
import type { GraphQLError } from 'graphql';

import { notify, PolymerChangeEvent } from './notify-decorator';
import { ApolloElementMixin } from '@apollo-elements/mixins/apollo-element-mixin';

/**
 * @fires 'apollo-element-disconnected' when the element disconnects from the dom
 * @fires 'apollo-element-connected' when the element connects to the dom
 * @fires 'data-changed'
 * @fires 'error-changed'
 * @fires 'errors-changed'
 * @fires 'loading-changed'
 */
export class PolymerApolloElement<TData = unknown, TVariables = unknown>
  extends ApolloElementMixin(HTMLElement)<TData, TVariables>
  implements ApolloElementInterface<TData> {
  declare client: ApolloClient<NormalizedCacheObject>;

  declare context?: Record<string, unknown>;

  @notify data: TData = null;

  @notify error: Error|ApolloError = null;

  @notify errors: readonly GraphQLError[] = null;

  @notify loading: boolean = null;

  variablesChanged(variables: TVariables): void {
    this.dispatchEvent(new PolymerChangeEvent('variables', variables));
  }
}
