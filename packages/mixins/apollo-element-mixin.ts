import type { ApolloClient, ApolloError, NormalizedCacheObject } from '@apollo/client/core';
import type { DocumentNode } from 'graphql/language/ast';
import type { GraphQLError } from 'graphql';
import type { Constructor, ApolloElementInterface } from '@apollo-elements/interfaces';

import { getGraphQLScriptChildDocument } from '@apollo-elements/lib/get-graphql-script-child-document';
import { isValidGql } from '@apollo-elements/lib/is-valid-gql';
import { dedupeMixin } from '@open-wc/dedupe-mixin';

declare global {
  interface HTMLElementEventMap {
    'apollo-element-connected': ApolloElementEvent;
    'apollo-element-disconnected': ApolloElementEvent;
  }
}

/**
 * Fired when an element connects to or disconnects from the DOM
 */
export class ApolloElementEvent<T = HTMLElement & ApolloElementInterface>
  extends CustomEvent<T> {
  declare type: 'apollo-element-connected'|'apollo-element-disconnected';

  constructor(type: 'apollo-element-connected'|'apollo-element-disconnected', detail: T) {
    super(type, {
      bubbles: true,
      composed: true,
      detail,
    });
  }
}

function ApolloElementMixinImplementation<B extends Constructor>(superclass: B) {
  /**
   * @element
   */
  return class ApolloElement
    extends superclass
    implements ApolloElementInterface {
    declare context?: Record<string, unknown>;

    declare data: unknown;

    declare error: Error|ApolloError;

    declare errors: readonly GraphQLError[];

    declare loading: boolean;

    client: ApolloClient<NormalizedCacheObject> = window.__APOLLO_CLIENT__;

    /** @private */
    __document: DocumentNode = null;

    /** @private */
    __mo: MutationObserver;

    /** GraphQL Document */
    get document(): DocumentNode {
      return this.__document;
    }

    set document(doc) {
      if (!doc)
        return;
      else if (isValidGql(doc))
        this.__document = doc;
      else
        throw new TypeError('document must be a gql-parsed DocumentNode');
    }

    constructor(..._: any[]) {
      super(..._);
      this.data = null;
      this.error = null;
      this.errors = null;
      this.loading = false;
    }

    /**
     * @fires 'apollo-element-connected' when the element connects to the dom
     */
    connectedCallback(): void {
      super.connectedCallback?.();

      this.__mo = new MutationObserver(() => {
        const doc = getGraphQLScriptChildDocument(this);
        if (doc && !this.document)
          this.document = doc;
      });

      this.__mo.observe(this, {
        characterData: true,
        childList: true,
        subtree: true,
      });

      this.document = getGraphQLScriptChildDocument(this);

      this.dispatchEvent(new ApolloElementEvent('apollo-element-connected', this));
    }

    /**
     * @fires 'apollo-element-disconnected' when the element disconnects from the dom
     */
    disconnectedCallback(): void {
      this.__mo?.disconnect();
      super.disconnectedCallback?.();
      this.dispatchEvent(new ApolloElementEvent('apollo-element-disconnected', this));
    }
  };
}

/**
 * `ApolloElementMixin`: class mixin for apollo custom elements.
 */
export const ApolloElementMixin =
  dedupeMixin(ApolloElementMixinImplementation);
