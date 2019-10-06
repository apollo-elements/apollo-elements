// eslint-disable-next-line max-len
import getGraphQLScriptChildDocument from '@apollo-elements/lib/get-graphql-script-child-document.js';
import isValidGql from '@apollo-elements/lib/is-valid-gql.js';
import { dedupeMixin } from './dedupe-mixin.js';

/** @typedef {import('apollo-client').ApolloClient} ApolloClient */
/** @typedef {import('graphql/language').DocumentNode} DocumentNode */

/**
 * `ApolloElementMixin`: class mixin for apollo custom elements.
 *
 * @template TBase
 * @template TCacheShape
 * @template TData
 * @param {TBase} superclass the class to mix into
 * @return {import('.').ApolloElement<TBase, TCacheShape, TData>} The mixed class
 */
const ApolloElementMixinImplementation = superclass =>
  /**
   * Class mixin for apollo elements
   * @template TBase
   * @template TCacheShape
   * @template TData
   */
  class ApolloElement extends superclass {
    constructor() {
      super();
      this.onElementMutation = this.onElementMutation.bind(this);

      /**
       * Context to be passed to link execution chain.
       * @type {Object}
       */
      this.context;

      /**
       * Latest data.
       * @type {TData}
       */
      this.data;

      /**
       * Latest error.
       * @type {Object}
       */
      this.error;

      /**
       * Whether a request is in flight.
       * @type {Boolean}
       */
      this.loading;

      /**
       * The apollo client instance.
       * @type {import('apollo-client').ApolloClient<TCacheShape>}
       */
      this.client =
        /** @type {import('apollo-client').ApolloClient<TCacheShape>} */
        window.__APOLLO_CLIENT__;
    }

    /**
     * GraphQL Document
     *
     * @return {DocumentNode}
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
      this.elementMutationObserver.observe(this, {
        characterData: true,
        childList: true,
        subtree: true,
      });
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

export const ApolloElementMixin = dedupeMixin(ApolloElementMixinImplementation);
