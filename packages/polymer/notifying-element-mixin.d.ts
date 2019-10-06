interface NotifyingElement {
  notify(propName: string, value: any): void
}

type Constructor = new (...args: any[]) => HTMLElement;

type ReturnConstructor = new (...args: any[]) =>
  HTMLElement &
  NotifyingElement;

export function NotifyingElementMixin<
  TBase extends Constructor
>(superclass: TBase):
  HTMLElement &
  TBase &
  ReturnConstructor
