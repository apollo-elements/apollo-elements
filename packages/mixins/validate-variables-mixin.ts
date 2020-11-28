import type { OperationVariables, SubscriptionOptions } from '@apollo/client/core';

import type { ApolloElementElement, Constructor } from '@apollo-elements/interfaces';

import { hasAllVariables } from '@apollo-elements/lib/has-all-variables';

export function ValidateVariablesMixin<
  B extends Constructor<ApolloElementElement<unknown, OperationVariables>>
>(superclass: B): B {
  return class ValidateVariablesElement extends superclass {
    shouldSubscribe(options?: Partial<SubscriptionOptions>) {
      const query = options?.query ?? this.document ?? undefined;
      const variables = options?.variables ?? this.variables ?? undefined;
      return hasAllVariables({ query, variables });
    }
  };
}
