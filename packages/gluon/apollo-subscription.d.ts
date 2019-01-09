import { ApolloSubscription as ApolloSubscriptionBase } from "@apollo-elements/mixins/apollo-subscription-mixin";
import { GluonElement } from "@gluon/gluon";

declare class ApolloSubscription<TData, TVariables> extends ApolloSubscriptionBase<GluonElement, TData, TVariables> { }
