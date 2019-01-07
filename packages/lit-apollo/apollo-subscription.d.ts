import { ApolloSubscription as ApolloSubscriptionBase } from "@apollo-elements/mixins/apollo-subscription-mixin";
import { LitElement } from "@polymer/lit-element";

declare class ApolloSubscription<TData, TVariables> extends ApolloSubscriptionBase<LitElement, TData, TVariables> { }
