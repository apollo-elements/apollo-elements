import { LitElement } from "lit-element";

import { ApolloElement as ApolloElementBase } from '@apollo-elements/mixins/apollo-element-mixin';

declare class ApolloElement<TData> extends ApolloElementBase<LitElement, TData> { }
