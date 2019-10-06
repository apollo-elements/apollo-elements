import { TemplateResult } from 'lit-html';
import { ApolloElementMixin } from '@apollo-elements/mixins/apollo-element-mixin';

export * from "lit-html";

export declare class GluonElement extends HTMLElement {
  render({ sync: boolean }?): Promise<any>
}

export declare class ApolloElement<TBase, TCacheShape, TData>
extends ApolloElementMixin(GluonElement) { }
