import type {
  ApolloClient,
  ApolloError,
  DocumentNode,
  NormalizedCacheObject,
  OperationVariables,
} from '@apollo/client/core';

import type { GraphQLError } from 'graphql';

import type {
  ApolloElementElement,
  ApolloElementInterface,
  ComponentDocument,
  Constructor,
  Data,
  Variables,
} from '@apollo-elements/interfaces';

import { gql } from '@apollo/client/core';

import { isValidGql } from '@apollo-elements/lib/is-valid-gql';
import { dedupeMixin } from '@open-wc/dedupe-mixin';
import { effect, writable } from '@apollo-elements/lib/descriptors';
import { stripHTMLComments } from '@apollo-elements/lib/helpers';

declare global {
  interface WindowEventMap {
    'apollo-element-disconnected': ApolloElementEvent;
  }
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
export class ApolloElementEvent<T = ApolloElementElement>
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
  // @ts-expect-error: https://github.com/microsoft/TypeScript/issues/37142
  class ApolloElement<D = unknown, V = OperationVariables>
    extends superclass implements ApolloElementInterface<D, V> {
    static documentType = 'document';

    /** Latest data */
    declare data: Data<D> | null;

    /** Operation variables */
    declare variables: Variables<D, V> | null;

    declare error: Error | ApolloError | null;

    declare errors: readonly GraphQLError[] | null;

    declare loading: boolean;

    declare context?: Record<string, unknown>;

    client: ApolloClient<NormalizedCacheObject> | null = window.__APOLLO_CLIENT__ ?? null; /* c8 ignore next */ // covered

    /** @private */
    _document: DocumentNode | ComponentDocument<D> | null = null;

    /** @private */
    _documentSetByJS = false;

    /** @private */
    _variables: Variables<D, V> | null = null;

    /** @private */
    _variablesSetByJS = false;

    /** @private */
    mo: MutationObserver | null = null;

    /** GraphQL Document */
    get document(): DocumentNode | ComponentDocument<D> | null {
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

    connectedCallback(): void {
      super.connectedCallback?.();

      this.mo = new MutationObserver(this.onDOMMutation.bind(this));

      this.mo.observe(this, { characterData: true, childList: true, subtree: true });

      this._document = this._document ?? this.getDOMGraphQLDocument();
      this._variables = this._variables ?? this.getDOMVariables();

      this.dispatchEvent(new ApolloElementEvent('apollo-element-connected', this));
    }

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
    documentChanged?(document: DocumentNode | ComponentDocument<D> | null): void

    /**
     * Lifecycle callback that reacts to changes in the operation variables
     * @protected
     */
    variablesChanged?(variables: Variables<D, V> | null): void

    /** @private */
    onDOMMutation(records: MutationRecord[]): void {
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
    getDOMGraphQLDocument(): DocumentNode | ComponentDocument<D> | null {
      const script = this.querySelector<HTMLScriptElement>(SCRIPT_SELECTOR);
      const text = script?.innerText;
      if (!text)
        return null; /* c8 ignore next */ // covered
      else {
        try {
          // admittedly, we have to trust the user here.
          return gql(stripHTMLComments(text)) as DocumentNode | ComponentDocument<D>; /* c8 ignore next */ // covered
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
    getDOMVariables(): Variables<D, V> | null {
      const script = this.querySelector<HTMLScriptElement>('script[type="application/json"]');
      if (!script) return null; /* c8 ignore next */ // covered
      try {
        return JSON.parse(script.innerText); /* c8 ignore next */ // covered
      } catch {
        return null;
      }
    }
  }

  Object.defineProperties(ApolloElement.prototype, {
    data: writable(null),
    error: writable(null),
    errors: writable(null),
    loading: writable(false),
    variables: effect({
      name: 'variables',
      init: null,
      onSet<E extends ApolloElement>(
        this: E,
        variables: E extends ApolloElement<infer D, infer V> ? Variables<D, V> : never | null
      ) {
        if (this.mo) // element is connected
          this.variablesChanged?.(variables);
      },
    }),
  });

  return ApolloElement;
}

/**
 * `ApolloElementMixin`: class mixin for apollo custom elements.
 */
export const ApolloElementMixin =
  dedupeMixin(ApolloElementMixinImplementation);
