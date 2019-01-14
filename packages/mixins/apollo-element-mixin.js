import getGraphQLScriptChildDocument from '@apollo-elements/lib/get-graphql-script-child-document';
import isValidGql from '@apollo-elements/lib/is-valid-gql';

/**
 * `ApolloElementMixin`: class mixin for apollo custom elements.
 *
 * @polymer
 * @mixinFunction
 *
 * @param {Class} superclass
 * @return {Class}
 */
export const ApolloElementMixin = superclass => class extends superclass {
  constructor() {
    super();
    this.onElementMutation = this.onElementMutation.bind(this);

    /**
     * Context to be passed to link execution chain.
     * @type {Object}
     */
    this.context = undefined;

    /**
     * Latest data.
     * @type {Object}
     */
    this.data = undefined;

    /**
     * Latest error.
     * @type {Object}
     */
    this.error = undefined;

    /**
     * Whether a request is in flight.
     * @type {Boolean}
     */
    this.loading = undefined;

    /**
     * The apollo client instance.
     * @type {ApolloClient}
     */
    this.client = window.__APOLLO_CLIENT__;

    this.elementMutationObserver = new MutationObserver(this.onElementMutation);
  }

  /**
   * GraphQL Document
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
      if (doc) throw new TypeError('document must be a gql-parsed DocumentNode');
    }
  }

  /** @protected */
  connectedCallback() {
    super.connectedCallback && super.connectedCallback();
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
