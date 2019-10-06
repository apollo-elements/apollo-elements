import { LitElement } from "lit-element";

import { ApolloElementMixin } from '@apollo-elements/mixins/apollo-element-mixin';

export * from 'lit-element'

export declare class ApolloElement<TCacheShape, TData>
extends ApolloElementMixin(LitElement) { }
