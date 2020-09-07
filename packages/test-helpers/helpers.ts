// 🐤 quack quack 🦆
export function isSubscription(x: unknown): x is ZenObservable.Subscription {
  return (
    x &&
    typeof x === 'object' &&
    x.constructor.toString().startsWith('function Subscription')
  );
}

export function assertType<T>(x: T, msg = 'Wrong type'): asserts x is T {
  if (!x)
    throw new Error(msg);
}

export { isApolloError } from '@apollo/client/core';
