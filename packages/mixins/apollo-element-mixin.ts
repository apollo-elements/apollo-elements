import type {
  ApolloClient,
  ApolloError,
  DocumentNode,
  NormalizedCacheObject,
  OperationVariables,
} from '@apollo/client/core';

import type { GraphQLError } from '@apollo-elements/interfaces';

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
    static documentType: 'document'|'query'|'mutation'|'subscription' = 'document';

    /** The Apollo Client instance. */
    client: ApolloClient<NormalizedCacheObject> | null = window.__APOLLO_CLIENT__ ?? null; /* c8 ignore next */ // covered

    /** Latest data */
    declare data: Data<D> | null;

    /**
     * An object that maps from the name of a variable as used in the operation's GraphQL document to that variable's value.
     */
    declare variables: Variables<D, V> | null;

    /** Latest error. */
    declare error: Error | ApolloError | null;

    /** Latest errors. */
    declare errors: readonly GraphQLError[] | null;

    /** Whether a request is in-flight. */
    declare loading: boolean;

    /** Context passed to the link execution chain. */
    declare context?: Record<string, unknown>;

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

    /**
     * A GraphQL document containing a single query, mutation, or subscription.
     * You can set it as a JavaScript property or by appending a GraphQL script to the element (light DOM).
     */
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
     * Lifecycle callback that reacts to changes in the GraphQL document.
     * @protected
     * @param document The GraphQL document.
     */
    documentChanged?(document: DocumentNode | ComponentDocument<D> | null): void

    /**
     * Lifecycle callback that reacts to changes in the operation variables.
     * @protected
     * @param variables The variables.
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
