import { LitElement, property } from 'lit-element';
import { ApolloElementMixin } from '@apollo-elements/mixins/apollo-element-mixin';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';

/**
 * # ApolloElement
 *
 * Custom Element base class for apollo custom elements.
 */
export class ApolloElement extends ApolloElementMixin(LitElement) {
  /**
   * The Apollo client.
   */
  @property({ type: Object }) client: ApolloClient<NormalizedCacheObject> =
  window.__APOLLO_CLIENT__;

  /**
   * The latest data for the query from the Apollo cache
   */
  // @property({ type: Object }) data: InstanceType<ReturnType<typeof ApolloElementMixin>>['data'];
  @property({ type: Object }) data: unknown;

  /**
   * The latest error for the query from the Apollo cache
   */
  @property({ type: Object }) error: Error;

  /**
   * If the query is currently in-flight.
   */
  @property({ type: Boolean }) loading: boolean;
}
