import { LitElement, property, PropertyValues } from 'lit-element';
import { ApolloElementMixin } from '@apollo-elements/mixins/apollo-element-mixin';

/**
 * # ApolloElement
 *
 * Custom Element base class for apollo custom elements.
 */
export class ApolloElement<TData> extends ApolloElementMixin(LitElement) {
  /**
   * The Apollo client.
   */
  @property({ type: Object }) client: typeof window.__APOLLO_CLIENT__ = window.__APOLLO_CLIENT__;

  /**
   * The latest data for the query from the Apollo cache
   */
  // @property({ type: Object }) data: InstanceType<ReturnType<typeof ApolloElementMixin>>['data'];
  @property({ type: Object }) data: TData;

  /**
   * The latest error for the query from the Apollo cache
   */
  @property({ type: Object }) error: Error;

  /**
   * If the query is currently in-flight.
   */
  @property({ type: Boolean }) loading: boolean;

  update(changed: PropertyValues): void {
    super.update(changed);
  }
}
