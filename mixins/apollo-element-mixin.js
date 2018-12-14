/**
 * `ApolloElementMixin`: class mixin for apollo custom elements.
 *
 * @mixinFunction
 *
 * @param {Class} superclass
 * @return {Class}
 */
import when from 'crocks/logic/when';

import {
  getGraphQLScriptChildDocument,
} from '../lib/get-graphql-script-child-document';
import { isGraphQLScript } from '../lib/helpers.js';
import gqlFromInnerText from '../lib/gql-from-inner-text';
import isValidGql from '../lib/is-valid-gql';

export const ApolloElementMixin = superclass => class extends superclass {
  constructor() {
    super();
    this.onElementMutation = this.onElementMutation.bind(this);
    this.observeScriptChild = this.observeScriptChild.bind(this);
    this.onScriptChildMutation = this.onScriptChildMutation.bind(this);

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
     * Handle on the apollo client instance.
     * @type {ApolloClient}
     */
    this.client = window.__APOLLO_CLIENT__;

    this.elementMutationObserver = new MutationObserver(this.onElementMutation);
    this.scriptChildMutationObserver = new MutationObserver(this.onScriptChildMutation);
  }

  get document() {
    return this.__document || null;
  }

  set document(doc) {
    if (isValidGql(doc)) {
      this.__document = doc;
    } else {
      if (doc) throw new TypeError('document must be a gql-parsed DocumentNode');
    }
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();
    this.elementMutationObserver.observe(this, { subtree: true, childList: true });
    this[this.__gqlScriptPropertyName] = getGraphQLScriptChildDocument(this) || null;
  }

  disconnectedCallback() {
    super.disconnectedCallback && super.disconnectedCallback();
    this.elementMutationObserver && this.elementMutationObserver.disconnect();
    this.scriptChildMutationObserver && this.scriptChildMutationObserver.disconnect();
    this.elementMutationObserver = null;
    this.scriptChildMutationObserver = null;
  }

  onElementMutation() {
    this.children.forEach(when(isGraphQLScript, this.observeScriptChild));
  }

  onScriptChildMutation({ target }) {
    const doc = gqlFromInnerText(target);
    this[this.__gqlScriptPropertyName] = doc;
  }

  observeScriptChild(script) {
    this.scriptChildMutationObserver.observe(script);
  }
};
