import { ApolloSubscriptionMixin, ApolloSubscription as Base } from "@apollo-elements/mixins/apollo-subscription-mixin";
import { NotifyingElementMixin } from "./notifying-element-mixin";

export declare class ApolloSubscription<TBase, TCacheShape, TData, TVariables>
extends ApolloSubscriptionMixin(NotifyingElementMixin(HTMLElement)) {}
