export declare class NotifyingElement {
  public notify(propName: string, value: any): void
}

type Constructor<T = HTMLElement> = new (...args: any[]) => T;
export function NotifyingElementMixin<TBase extends Constructor>
(superclass: TBase): TBase & NotifyingElement;
