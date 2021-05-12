import { Observable, attr, observable } from '@microsoft/fast-element';

/**
 * Decorator: Defines an observable property on the target.
 * @param target - The target to define the observable on.
 * @param nameOrAccessor - The property name or accessor to define the observable as.
 * @public
 */
export function controlled(opts: MixinControlledOptions = {}) {
  return function<T extends ReactiveControllerHost>(
    proto: T,
    name: typeof opts.path extends keyof T ? keyof T[typeof opts.path] : keyof T
  ): void {
    Observable.defineProperty(target, nameOrAccessor);
  };
}

export { attr, observable };
