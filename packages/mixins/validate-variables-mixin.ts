import type { SubscriptionOptions } from '@apollo/client/core';

import type { ApolloElementElement, Constructor } from '@apollo-elements/interfaces';

import type * as C from '@apollo-elements/core';

import { hasAllVariables } from '@apollo-elements/lib/has-all-variables';

export function ValidateVariablesMixin<
  B extends Constructor<ApolloElementElement<any, any> & {
    controller: C.ApolloQueryController<any, any> | C.ApolloSubscriptionController<any, any>;
  }>
>(superclass: B): B {
  class ValidateVariablesElement extends superclass {
    constructor(..._: any[]) {
      super();
      const { shouldSubscribe } = this.controller.options;
      this.controller.options.shouldSubscribe = (opts?: Partial<SubscriptionOptions>) =>
        (shouldSubscribe?.(opts) ?? true) && this.shouldSubscribe(opts);
    }

    shouldSubscribe(options?: Partial<SubscriptionOptions>) {
      const query = options?.query ?? this.document ?? undefined;
      const variables = options?.variables ?? this.variables ?? undefined;
      return hasAllVariables({ query, variables });
    }
  }
  return ValidateVariablesElement;
}
