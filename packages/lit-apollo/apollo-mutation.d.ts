import { ApolloMutation as ApolloMutationBase } from "@apollo-elements/mixins/apollo-mutation-mixin";
import { LitElement } from "@polymer/lit-element";

declare class ApolloMutation<TData, TVariables> extends ApolloMutationBase<LitElement, TData, TVariables> { }
