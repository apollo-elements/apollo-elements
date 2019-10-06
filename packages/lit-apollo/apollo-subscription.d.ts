import { ApolloSubscription as ApolloSubscriptionBase } from "@apollo-elements/mixins/apollo-subscription-mixin";
import { LitElement } from "lit-element";

declare class ApolloSubscription<TCacheShape, TData, TVariables>
extends ApolloSubscriptionBase<TCacheShape, TData, TVariables> { }

declare interface ApolloSubscription<TCacheShape, TData, TVariables> extends LitElement {}
