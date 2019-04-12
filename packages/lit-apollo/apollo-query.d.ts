import { ApolloQuery as ApolloQueryBase } from "@apollo-elements/mixins/apollo-query-mixin";
import { LitElement } from "lit-element";

declare class ApolloQuery<TData, TVariables> extends ApolloQueryBase<LitElement, TData, TVariables> { }

declare interface ApolloQuery<TData, TVariables> extends LitElement {}
