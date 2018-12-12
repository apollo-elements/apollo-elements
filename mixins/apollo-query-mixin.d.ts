import { ApolloQuery } from "../classes/apollo-query";

type Constructor<T = {}> = new (...args: any[]) => T;

export function ApolloQueryMixin<TBase extends Constructor, TData, TVariables>(superclass: TBase): ApolloQuery<TBase, TData, TVariables>;
