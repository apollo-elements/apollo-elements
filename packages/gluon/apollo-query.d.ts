import { ApolloQuery as ApolloQueryBase } from "@apollo-elements/mixins/apollo-mutation-mixin";
import { GluonElement } from "@gluon/gluon";

declare class ApolloQuery<TData, TVariables> extends ApolloQueryBase<GluonElement, TData, TVariables> { }
