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

export const stringify =
  (x: unknown): string =>
    JSON.stringify(x, null, 2);

export function setupSpies<T>(keys: (keyof T)[] = [], object: T): Record<string|keyof T, SinonSpy> {
  return Object.fromEntries(keys
    .map(method =>
      [method, spy(object, method as keyof T)])) as unknown as Record<string|keyof T, SinonSpy>;
}

export function setupStubs<T>(keys: (keyof T)[] = [], object: T): Record<string|keyof T, SinonStub> {
  return Object.fromEntries(keys
    .map(method =>
      [method, stub(object, method as keyof T)])) as unknown as Record<string|keyof T, SinonStub>;
}

export function restoreSpies(getSpies: () => Record<string, SinonSpy>): () => void {
  return function() {
    Object.keys(getSpies()).forEach(key => {
      getSpies()[key].restore();
      delete getSpies()[key];
    });
  };
}

export function restoreStubs(getStubs: () => Record<string, SinonStub>): () => void {
  return function() {
    Object.keys(getStubs()).forEach(key => {
      getStubs()[key].restore();
      delete getStubs()[key];
    });
  };
}

export function waitForRender<T extends HTMLElement & { hasRendered:() => Promise<T> }>(getElement: () => T) {
  return async function waitForRender(): Promise<void> {
    await getElement().hasRendered();
  };
}
