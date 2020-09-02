import type { ApolloClient, ApolloError, NormalizedCacheObject } from '@apollo/client/core';
import type { DocumentNode } from 'graphql/language/ast';
import type { GraphQLError } from 'graphql';
import type { Constructor, ApolloElementInterface } from '@apollo-elements/interfaces';

import { getGraphQLScriptChildDocument } from '@apollo-elements/lib/get-graphql-script-child-document';
import { isValidGql } from '@apollo-elements/lib/is-valid-gql';
import { dedupeMixin } from '@open-wc/dedupe-mixin';

function ApolloElementMixinImplementation<B extends Constructor>(superclass: B) {
  return class ApolloElement
    extends superclass
    implements ApolloElementInterface {
    declare context?: Record<string, unknown>;

    data: unknown = null;

    error: Error|ApolloError = null;

    errors: readonly GraphQLError[] = null;

    loading = false;

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
    }

    disconnectedCallback(): void {
      this.__mo?.disconnect();
      super.disconnectedCallback?.();
    }
  };
}

/**
 * `ApolloElementMixin`: class mixin for apollo custom elements.
 */
export const ApolloElementMixin =
  dedupeMixin(ApolloElementMixinImplementation);
