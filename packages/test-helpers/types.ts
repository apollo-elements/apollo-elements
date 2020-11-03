import { ApolloElementInterface } from '@apollo-elements/interfaces';
import type { SinonSpy, SinonStub } from 'sinon';

export type Library =
  'fast' |
  'gluon' |
  'lit-apollo' |
  'hybrids' |
  'mixins' |
  'polymer'

export interface TestableElement<D = unknown, V = unknown> extends ApolloElementInterface<D, V> {
  hasRendered(): Promise<TestableElement>
  stringify(x: unknown): string;
}

export interface SetupOptions<T extends TestableElement> {
  attributes?: string;
  properties?: Partial<Record<keyof T, T[keyof T]>>;
  innerHTML?: string;
  spy?: (keyof T)[];
  stub?: (keyof T)[];
}

export interface SetupResult<T extends TestableElement> {
  element: T;
  spies: Record<keyof T|string, SinonSpy>;
  stubs: Record<keyof T|string, SinonStub>;
}

export type SetupFunction<Base extends TestableElement> =
  <T extends Base>(options?: SetupOptions<T>) =>
    Promise<SetupResult<T>>;
