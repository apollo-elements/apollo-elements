import type { SubscriptionOptions } from '@apollo/client/core';

import type { ApolloElementElement, Constructor } from '@apollo-elements/interfaces';

import { hasAllVariables } from '@apollo-elements/lib/has-all-variables';

type Base<D = any, V = any> =
  Constructor<ApolloElementElement<D, V>>;

export function ValidateVariablesMixin<B extends Base>(superclass: B): B {
  return class extends superclass {
    shouldSubscribe(options?: Partial<SubscriptionOptions>) {
      const query = options?.query ?? this.document ?? undefined;
      const variables = options?.variables ?? this.variables ?? undefined;
      return hasAllVariables({ query, variables });
    }
  };
}
