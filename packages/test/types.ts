import type { SinonSpy, SinonStub } from 'sinon';

export type Library =
  'fast' |
  'gluon' |
  'lit-apollo' |
  'hybrids' |
  'mixins' |
  'polymer'

export interface TestableElement {
  hasRendered(): Promise<this>;
  $(id: keyof this): HTMLElement|null;
}

export interface SetupOptions<T extends HTMLElement> {
  attributes?: string;
  properties?: Partial<T>;
  innerHTML?: string;
  spy?: (keyof T)[];
  stub?: (keyof T)[];
}

export interface SetupResult<T extends TestableElement> {
  element: T;
  spies: Record<keyof T|string, SinonSpy>;
  stubs: Record<keyof T|string, SinonStub>;
}

export type SetupFunction<Base extends HTMLElement & TestableElement> =
  <T extends Base>(options?: SetupOptions<T>) =>
    Promise<SetupResult<T>>;
