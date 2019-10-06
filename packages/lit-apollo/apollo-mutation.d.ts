import { ApolloMutationMixin } from "@apollo-elements/mixins/apollo-mutation-mixin";
import { LitElement } from "lit-element";
import { MutationUpdaterFn } from "apollo-client";

export declare class ApolloMutation<TCacheShape, TData, TVariables> extends ApolloMutationMixin(LitElement) {}
