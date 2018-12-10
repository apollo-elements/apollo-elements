import { ApolloElement } from "../classes/apollo-element";

type Constructor<T = {}> = new (...args: any[]) => T;

export function ApolloElementMixin<TBase extends Constructor, TData>(superclass: TBase): ApolloElement<TBase, TData>;
