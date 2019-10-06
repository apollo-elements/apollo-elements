import { ApolloSubscription as ApolloSubscriptionBase } from "@apollo-elements/mixins/apollo-subscription-mixin";
import { LitElement } from "lit-element";

declare class ApolloSubscription<TData, TVariables>
extends ApolloSubscriptionBase<TData, TVariables> { }

declare interface ApolloSubscription<TData, TVariables> extends LitElement {}
