// eslint-disable-next-line max-len
import getGraphQLScriptChildDocument from '@apollo-elements/lib/get-graphql-script-child-document.js';
import isValidGql from '@apollo-elements/lib/is-valid-gql.js';
import { dedupeMixin } from './dedupe-mixin.js';

/** @typedef {import('apollo-client').ApolloClient} ApolloClient */
/** @typedef {import('graphql/language').DocumentNode} DocumentNode */

/**
 * `ApolloElementMixin`: class mixin for apollo custom elements.
 */
export const ApolloElementMixin = dedupeMixin(
  function ApolloElementMixin(superclass) {
    return class ApolloElement extends superclass {
      constructor() {
        super();
        this.onElementMutation = this.onElementMutation.bind(this);

        /**
       * Context to be passed to link execution chain.
       */
        this.context;

        /**
       * Latest data.
       */
        this.data;

        /**
       * Latest error.
       */
        this.error;

        /**
       * Whether a request is in flight.
       */
        this.loading;

        /**
       * The apollo client instance.
       */
        this.client = window.__APOLLO_CLIENT__;
      }

      /**
     * GraphQL Document
     */
      get document() {
        return this.__document || null;
      }

      set document(doc) {
        if (!doc) return;
        if (isValidGql(doc)) {
          this.__document = doc;
        } else {
          throw new TypeError('document must be a gql-parsed DocumentNode');
        }
      }

      /** @protected */
      connectedCallback() {
        super.connectedCallback && super.connectedCallback();
        this.elementMutationObserver = new MutationObserver(this.onElementMutation);
        const characterData = true;
        const childList = true;
        const subtree = true;
        this.elementMutationObserver.observe(this, { characterData, childList, subtree });
        this.document = getGraphQLScriptChildDocument(this) || null;
      }

      /** @protected */
      disconnectedCallback() {
        super.disconnectedCallback && super.disconnectedCallback();
        this.elementMutationObserver && this.elementMutationObserver.disconnect();
        this.elementMutationObserver = null;
      }

      /** @protected */
      onElementMutation() {
        const doc = getGraphQLScriptChildDocument(this);
        if (doc) this.document = doc;
      }
    };
  });
