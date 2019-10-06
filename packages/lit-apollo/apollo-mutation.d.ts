import { ApolloMutation as ApolloMutationBase } from "@apollo-elements/mixins/apollo-mutation-mixin";
import { LitElement } from "lit-element";
import { MutationUpdaterFn } from "apollo-client";

declare class ApolloMutation<TCacheShape, TData, TVariables> extends ApolloMutationBase<TCacheShape, TData, TVariables> {
  onUpdate?: MutationUpdaterFn<TData>
}
