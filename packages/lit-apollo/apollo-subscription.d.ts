import { ApolloSubscription as ApolloSubscriptionBase } from "@apollo-elements/mixins/apollo-subscription-mixin";
import { LitElement } from "lit-element";

declare class ApolloSubscription<TData, TVariables> extends ApolloSubscriptionBase<LitElement, TData, TVariables> { }

declare interface ApolloSubscription<TData, TVariables> extends LitElement {}
