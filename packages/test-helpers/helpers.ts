// 🐤 quack quack 🦆
export function isSubscription(x: unknown): x is ZenObservable.Subscription {
  return (
    x &&
    typeof x === 'object' &&
    x.constructor.toString().startsWith('function Subscription')
  );
}
