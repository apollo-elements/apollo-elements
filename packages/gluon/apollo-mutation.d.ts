import { ApolloMutation as ApolloMutationBase } from "@apollo-elements/mixins/apollo-mutation-mixin";
import { GluonElement } from "@gluon/gluon";

declare class ApolloMutation<TData, TVariables> extends ApolloMutationBase<GluonElement, TData, TVariables> { }
