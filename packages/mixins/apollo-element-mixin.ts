import type { ApolloClient } from 'apollo-client';
import type { DocumentNode } from 'graphql/language/ast';
import type { Constructor, CustomElement } from './constructor';

import getGraphQLScriptChildDocument from '@apollo-elements/lib/get-graphql-script-child-document';
import isValidGql from '@apollo-elements/lib/is-valid-gql';
import bound from 'bind-decorator';

import { dedupeMixin } from '@open-wc/dedupe-mixin';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function ApolloElementMixinImplementation<
  TBase extends Constructor<CustomElement>
>(superclass: TBase) {
  /**
   * Class mixin for apollo-element elements
   */
  // This is probably a bug in typescript
  // eslint-disable-next-line
  // @ts-ignore
  class ApolloElement<TData> extends superclass {
    /** Context to be passed to link execution chain. */
    context: object;

    /** Latest Data */
    data: TData;

    /** Latest Error */
    error: Error;

    /** Whether a request is in flight. */
    loading: boolean;

    /** The apollo client instance. */
    client: ApolloClient<NormalizedCacheObject> = window.__APOLLO_CLIENT__;

    #document: DocumentNode = null;

    #elementMutationObserver = new MutationObserver(this.onElementMutation);

    /** GraphQL Document */
    get document(): DocumentNode { return this.#document || null; }

    set document(doc) {
      if (!doc)
        return;
      else if (isValidGql(doc))
        this.#document = doc;
      else
        throw new TypeError('document must be a gql-parsed DocumentNode');
    }

    connectedCallback(): void {
      super.connectedCallback?.();
      this.#elementMutationObserver.observe(this, {
        characterData: true,
        childList: true,
        subtree: true,
      });
      this.document = getGraphQLScriptChildDocument(this) || null;
    }

    disconnectedCallback(): void {
      super.disconnectedCallback?.();
      this.#elementMutationObserver.disconnect();
    }

    @bound onElementMutation(): void {
      const doc = getGraphQLScriptChildDocument(this);
      if (doc)
        this.document = doc;
    }
  }

  return ApolloElement;
}

/**
 * `ApolloElementMixin`: class mixin for apollo custom elements.
 */
export const ApolloElementMixin = dedupeMixin(ApolloElementMixinImplementation);
