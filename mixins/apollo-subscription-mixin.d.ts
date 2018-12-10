import { ApolloSubscription } from "../classes/apollo-subscription";

type Constructor<T = {}> = new (...args: any[]) => T;

export function ApolloSubscriptionMixin<TBase extends Constructor, TData, TVariables>(superclass: TBase): ApolloSubscription<TBase, TData, TVariables>;
