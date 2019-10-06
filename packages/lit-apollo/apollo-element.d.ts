import { LitElement } from "lit-element";

import { ApolloElementMixin } from '@apollo-elements/mixins/apollo-element-mixin';

declare class ApolloElement<TData>
extends ApolloElementMixin(LitElement) { }
