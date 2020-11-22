import type { ApolloClient, ApolloError, NormalizedCacheObject } from '@apollo/client/core';
import type { DocumentNode } from 'graphql/language/ast';
import type { GraphQLError } from 'graphql';
import type {
  Constructor,
  ApolloElementInterface,
  ApolloElementElement,
} from '@apollo-elements/interfaces';

import { gql } from '@apollo/client/core';

import { isValidGql } from '@apollo-elements/lib/is-valid-gql';
import { dedupeMixin } from '@open-wc/dedupe-mixin';

declare global {
  interface HTMLElementEventMap {
    'apollo-element-connected': ApolloElementEvent;
    'apollo-element-disconnected': ApolloElementEvent;
    'apollo-error': CustomEvent<ApolloError>;
  }
}

const SCRIPT_SELECTOR =
  'script[type="application/graphql"]';

function capital(string: string): string {
  return `${string.substr(0, 1).toUpperCase()}${string.substr(1)}`;
}

/**
 * Fired when an element connects to or disconnects from the DOM
 */
export class ApolloElementEvent<T extends ApolloElementElement = ApolloElementElement>
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
  // @ts-expect-error: https://github.com/microsoft/TypeScript/issues/37142
  class ApolloElement<TData = unknown, TVariables = unknown>
    extends superclass
    implements ApolloElementInterface<TData, TVariables> {
    static documentType = 'document';

    declare context?: Record<string, unknown>;

    declare data: TData;

    declare variables: TVariables;

    declare error: Error|ApolloError;

    declare errors: readonly GraphQLError[];

    declare loading: boolean;

    client: ApolloClient<NormalizedCacheObject> = window.__APOLLO_CLIENT__ ?? null;

    /** @private */
    _document: DocumentNode = null;

    /** @private */
    _documentSetByJS = false;

    /** @private */
    _variables: TVariables = null;

    /** @private */
    _variablesSetByJS = false;

    /** @private */
    mo: MutationObserver;

    /** GraphQL Document */
    get document(): DocumentNode {
      return this._document ?? this.getDOMGraphQLDocument();
    }

    set document(document) {
      this._documentSetByJS = false;
      if (!document)
        this._document = null;
      else if (!isValidGql(document))
        throw new TypeError(`${capital((this.constructor as typeof ApolloElementInterface).documentType ?? 'document')} must be a gql-parsed DocumentNode`);
      else {
        this._document = document;
        this._documentSetByJS = true;
        if (this.mo) // `isConnected` is unreliable in this case
          this.documentChanged?.(document);
      }
    }

    /**
     * @fires 'apollo-element-connected' when the element connects to the dom
     */
    connectedCallback(): void {
      super.connectedCallback?.();

      this.mo = new MutationObserver(this.onMutation.bind(this));

      this.mo.observe(this, { characterData: true, childList: true, subtree: true });

      this._document = this._document ?? this.getDOMGraphQLDocument();
      this._variables = this._variables ?? this.getDOMVariables();

      this.dispatchEvent(new ApolloElementEvent('apollo-element-connected', this));
    }

    /**
     * @fires 'apollo-element-disconnected' when the element disconnects from the dom
     */
    disconnectedCallback(): void {
      this.dispatchEvent(new ApolloElementEvent('apollo-element-disconnected', this));
      window.dispatchEvent(new ApolloElementEvent('apollo-element-disconnected', this));
      this.mo?.disconnect();
      super.disconnectedCallback?.();
    }

    /**
     * Lifecycle callback that reacts to changes in the GraphQL document
     * @protected
     */
    documentChanged?(document: DocumentNode): void

    /**
     * Lifecycle callback that reacts to changes in the operation variables
     * @protected
     */
    variablesChanged?(variables: TVariables): void

    /** @private */
    onMutation(records: MutationRecord[]): void {
      const isGQLScriptChanged = (record: MutationRecord) =>
        [...record?.addedNodes].some(node =>
          node === this.querySelector(SCRIPT_SELECTOR));

      if (!this._documentSetByJS) {
        this._document = this.getDOMGraphQLDocument();
        // notify when the first script child element changes
        if (records.some(isGQLScriptChanged))
          this.documentChanged?.(this.document);
      }

      if (!this._variablesSetByJS)
        this._variables = this.getDOMVariables();
    }

    /**
     * Get a GraphQL DocumentNode from the element's GraphQL script child
     * @private
     */
    getDOMGraphQLDocument(): DocumentNode | null {
      const script = this.querySelector<HTMLScriptElement>(SCRIPT_SELECTOR);
      const text = script?.innerText;
      if (!text)
        return null;
      else {
        try {
          return gql(text.replace?.(/<!---->/g, ''));
        } catch (err) {
          this.error = err;
          return null;
        }
      }
    }

    /**
     * Gets operation variables from the element's JSON script child
     * @private
     */
    getDOMVariables(): TVariables {
      const script = this.querySelector<HTMLScriptElement>('script[type="application/json"]');
      try {
        return JSON.parse(script.innerText);
      } catch {
        return null;
      }
    }
  }

  Object.defineProperties(ApolloElement.prototype, {

    data: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: null,
    },

    error: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: null,
    },

    errors: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: null,
    },

    loading: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: false,
    },

    variables: {
      configurable: true,
      enumerable: true,

      get(this: ApolloElement) {
        return this._variables;
      },

      set(this: ApolloElement, variables) {
        this._variables = variables;
        if (this.mo) // element is connected
          this.variablesChanged?.(variables);
      },

    },
  });

  return ApolloElement;
}

/**
 * `ApolloElementMixin`: class mixin for apollo custom elements.
 */
export const ApolloElementMixin =
  dedupeMixin(ApolloElementMixinImplementation);
