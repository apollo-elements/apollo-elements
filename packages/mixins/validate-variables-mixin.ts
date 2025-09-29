import type { SubscriptionOptions } from '@apollo/client';

import type { ApolloElementElement, Constructor } from '@apollo-elements/core/types';

import type * as C from '@apollo-elements/core';

import { dedupeMixin } from '@open-wc/dedupe-mixin';
import { hasAllVariables } from '@apollo-elements/core/lib/has-all-variables';

/* eslint-disable @typescript-eslint/no-explicit-any */
type ControllerElementConstructor = Constructor<ApolloElementElement<any, any> & {
  shouldSubscribe?(options?: Partial<SubscriptionOptions>): boolean;
  controller: C.ApolloQueryController<any, any> | C.ApolloSubscriptionController<any, any>
}> /* eslint-enable @typescript-eslint/no-explicit-any */

/**
 * Mixin which prevents query or subscription operations from fetching until their required variables are set.
 * @param superclass An element which implements either `ApolloQueryInterface` or `ApolloSubscriptionInterface`.
 */
function ValidateVariablesMixinImpl<B extends ControllerElementConstructor>(superclass: B): B {
  class ValidateVariablesElement extends superclass {
    constructor(..._: any[]) {
      super();
      const { shouldSubscribe } = this.controller.options;
      this.controller.options.shouldSubscribe = (x?: Partial<SubscriptionOptions>) =>
        (shouldSubscribe?.(x) ?? true) && this.shouldSubscribe(x);/* c8 ignore next */
    }

    override shouldSubscribe(options?: Partial<SubscriptionOptions>) {
      const query = options?.query ?? this.document ?? undefined;
      const variables = options?.variables ?? this.variables ?? undefined;
      return hasAllVariables({ query, variables });
    }
  }
  return ValidateVariablesElement;
}

export const ValidateVariablesMixin =
  dedupeMixin(ValidateVariablesMixinImpl);
