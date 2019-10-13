// eslint-disable-next-line max-len
import getGraphQLScriptChildDocument from '@apollo-elements/lib/get-graphql-script-child-document.js';
import isValidGql from '@apollo-elements/lib/is-valid-gql.js';
import { dedupeMixin } from './dedupe-mixin.js';

/**
 * `ApolloElementMixin`: class mixin for apollo custom elements.
 * @function
 * @template {import('./constructor').Constructor<import('./custom-element')>} TBase
 * @template TCacheShape, TData
 * @param {import('./constructor').Constructor<TBase>} superclass
 * @return {import('./return-constructor').ReturnConstructor<TBase, import('./apollo-element')<TCacheShape, TData>>}
 */
export function ApolloElementMixinFunction(superclass) {
  return class ApolloElementMixinClass extends superclass {
    constructor() {
      super();
      this.onElementMutation = this.onElementMutation.bind(this);

      this.context = undefined;

      /**
       * Latest data.
       * @type {any}
       */
      this.data = undefined;

      /**
       * Latest error.
       * @type {import('apollo-client').ApolloError}
       */
      this.error = undefined;

      /**
       * Whether a request is in flight.
       * @type {Boolean}
       */
      this.loading = undefined;

      /**
       * The apollo client instance.
       * @type {import('apollo-client').ApolloClient<TCacheShape>}
       */
      this.client = window.__APOLLO_CLIENT__;
    }

    /**
     * GraphQL Document
     * @type {import('graphql/language').DocumentNode}
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
}


/**
 * `ApolloElementMixin`: class mixin for apollo custom elements.
 * @function
 * @template {import('./constructor').Constructor<import('./custom-element')>} TSuperClass
 * @template X, Y
 * @param {import('./constructor').Constructor<TSuperClass>} superclass
 * @return {import('.ReturnConstructor').ReturnConstructor<TBase, import('./apollo-element')<X, Y>>}
 */
export const ApolloElementMixin = dedupeMixin(ApolloElementMixinFunction);
