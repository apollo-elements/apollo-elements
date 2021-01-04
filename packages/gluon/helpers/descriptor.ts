/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Constructor, Entries } from '@apollo-elements/interfaces';
import type { ApolloElement } from '../apollo-element';

import { effect } from '@apollo-elements/lib/descriptors';

type NonFunctionPropertyNames<T extends ApolloElement<any, any>> = {
  [K in keyof T]: T[K] extends (...args: any[]) => unknown ? never : K;
}[keyof Omit<T, keyof HTMLElement>];

type ObservableProperties<T extends ApolloElement<any, any>> =
  Record<NonFunctionPropertyNames<T>, T[NonFunctionPropertyNames<T>]>

export function defineObservedProperties<C extends Constructor<ApolloElement<any, any>>>(
  Class: C,
  properties: Partial<ObservableProperties<InstanceType<C>>>
): void {
  const descriptors =
    Object.fromEntries(
      (Object.entries(properties) as Entries<typeof properties>)
        .map(([name, init]) => [
          name,
          effect<InstanceType<C>>({
            name,
            init,
            onSet() {
              this.render();
            },
          }),
        ])
    );

  Object.defineProperties(Class.prototype, descriptors);
}
