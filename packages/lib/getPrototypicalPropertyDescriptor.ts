/**
 * Similar to `Object.getOwnPropertyDescriptor`, except it traverses the entire prototype chain
 *
 * @param o Object to get descriptor of
 * @param key Object key to get descriptor for
 */
export function getPrototypicalPropertyDescriptor<
  T extends unknown,
  Key extends keyof T,
>(o: T, key: Key extends keyof T ? keyof T : never): PropertyDescriptor | undefined {
  let prototype: T|null = o;

  let descriptor = Object.getOwnPropertyDescriptor(prototype, key);

  function walkPrototypeChain() {
    descriptor = Object.getOwnPropertyDescriptor(prototype, key);
    if (!descriptor)
      prototype = Object.getPrototypeOf(prototype);
    else
      prototype = null;
  }

  while (prototype)
    walkPrototypeChain();

  return descriptor;
}
