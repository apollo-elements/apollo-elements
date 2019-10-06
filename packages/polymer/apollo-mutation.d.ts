import { ApolloMutationMixin } from "@apollo-elements/mixins/apollo-mutation-mixin";
import { NotifyingElementMixin } from "./notifying-element-mixin";

export declare class ApolloMutation<TBase, TCacheShape, TData, TVariables>
extends NotifyingElementMixin(ApolloMutationMixin(HTMLElement)) {}
