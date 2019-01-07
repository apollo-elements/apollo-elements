import { ApolloQuery as ApolloQueryBase } from "@apollo-elements/mixins/apollo-mutation-mixin";
import { LitElement } from "@polymer/lit-element";

declare class ApolloQuery<TData, TVariables> extends ApolloQueryBase<LitElement, TData, TVariables> { }
