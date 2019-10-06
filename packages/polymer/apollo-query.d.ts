import { ApolloQueryMixin } from "@apollo-elements/mixins/apollo-query-mixin";
import { NotifyingElementMixin } from "./notifying-element-mixin";

export declare class ApolloQuery<TBase, TCacheShape, TData, TVariables>
extends NotifyingElementMixin(ApolloQueryMixin(HTMLElement)) {}
