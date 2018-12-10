type Constructor<T = {}> = new (...args: any[]) => T;

declare class NotifyingElement<TBase> {
  notify(propName: string, value: any): undefined
}

export function NotifyingElementMixin<TBase extends Constructor>(superclass: TBase, notifyingProps?: string[]): NotifyingElement<TBase>
