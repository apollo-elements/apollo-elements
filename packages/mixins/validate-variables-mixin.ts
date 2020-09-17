import type { SubscriptionOptions } from '@apollo/client/core';

import type {
  CustomElement,
  Constructor,
  ApolloElementInterface,
} from '@apollo-elements/interfaces';

import { hasAllVariables } from '@apollo-elements/lib/has-all-variables';

type Base<D = unknown, V = unknown> =
  Constructor<ApolloElementInterface<D> & { variables: V } & CustomElement>;

export function ValidateVariablesMixin<B extends Base>(superclass: B): B {
  return class extends superclass {
    shouldSubscribe(options?: Partial<SubscriptionOptions>) {
      const query = options?.query ?? this.document;
      const variables = options?.variables ?? this.variables;
      return hasAllVariables({ query, variables });
    }
  };
}
