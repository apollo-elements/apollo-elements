import { spy, stub, SinonSpy, SinonStub } from 'sinon';

// 🐤 quack quack 🦆
export function isSubscription(x: unknown): x is ZenObservable.Subscription {
  return (
    x &&
    typeof x === 'object' &&
    x.constructor.toString().startsWith('function Subscription')
  );
}

/**
 * Asserts that a value has a given type. This 'function' is only defined for the
 * benefit of the type checker - it has no runtime significance at all.
 * @param x value to check
 * @template T type to check against
 *
 * @example
 * ```ts
 * class Checked {
 *   field = 2;
 * }
 *
 * const checked = new Checked();
 * assertType<number>(checked.field)
 * ```
 */
export function assertType<T>(x: T): asserts x is T { x; }

export { isApolloError } from '@apollo/client/core';

export function setupSpies<T>(keys: (keyof T)[] = [], prototype: T): Record<string|keyof T, SinonSpy> {
  return Object.fromEntries(keys
    .map(method =>
      [method, spy(prototype, method as keyof T)])) as unknown as Record<string|keyof T, SinonSpy>;
}

export function setupStubs<T>(keys: (keyof T)[] = [], prototype: T): Record<string|keyof T, SinonStub> {
  return Object.fromEntries(keys
    .map(method =>
      [method, stub(prototype, method as keyof T)])) as unknown as Record<string|keyof T, SinonStub>;
}
