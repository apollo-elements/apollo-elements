import type { Constructor, Entries } from '@apollo-elements/interfaces';
import { effect } from '@apollo-elements/lib/descriptors';
import type { ApolloElement } from '../apollo-element';

type NonFunctionPropertyNames<T extends ApolloElement> = {
  [K in keyof T]: T[K] extends (...args: any[]) => unknown ? never : K;
}[keyof Omit<T, keyof HTMLElement>];

type ObservableProperties<T extends ApolloElement> =
  Record<NonFunctionPropertyNames<T>, T[NonFunctionPropertyNames<T>]>

export function defineObservedProperties<C extends Constructor<ApolloElement>>(
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
