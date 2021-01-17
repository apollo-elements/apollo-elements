import type { ApolloClient, ApolloError, NormalizedCacheObject } from '@apollo/client/core';
import type { ApolloElementInterface, GraphQLError } from '@apollo-elements/interfaces';

import { notify, PolymerChangeEvent } from './notify-decorator';
import { ApolloElementMixin } from '@apollo-elements/mixins/apollo-element-mixin';

/**
 * @fires 'data-changed'
 * @fires 'variables-changed'
 * @fires 'error-changed'
 * @fires 'errors-changed'
 * @fires 'loading-changed'
 */
export class PolymerApolloElement
  extends ApolloElementMixin(HTMLElement)
  implements ApolloElementInterface {
  declare client: ApolloClient<NormalizedCacheObject>;

  declare context?: Record<string, unknown>;

  declare variables: unknown | null;

  @notify data: unknown | null = null;

  @notify error: Error | ApolloError | null = null;

  @notify errors: readonly GraphQLError[]|null = null;

  @notify loading = false;

  variablesChanged(variables: this['variables']): void {
    this.dispatchEvent(new PolymerChangeEvent('variables', variables));
  }
}
