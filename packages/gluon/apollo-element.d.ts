import { GluonElement } from "@gluon/gluon";

import { ApolloElement as ApolloElementBase } from '@apollo-elements/mixins/apollo-element-mixin';

declare class ApolloElement<TData> extends ApolloElementBase<GluonElement, TData> { }
