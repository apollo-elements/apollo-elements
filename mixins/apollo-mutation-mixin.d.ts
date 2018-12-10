import { ApolloMutation } from "../classes/apollo-mutation";

type Constructor<T = {}> = new (...args: any[]) => T;

export function ApolloMutationMixin<TBase extends Constructor, TData, TVariables>(superclass: TBase): ApolloMutation<TBase, TData, TVariables>;
