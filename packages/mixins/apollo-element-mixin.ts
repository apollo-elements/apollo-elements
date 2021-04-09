import type {
  ApolloClient,
  ApolloError,
  DocumentNode,
  ErrorPolicy,
  NormalizedCacheObject,
  TypedDocumentNode,
} from '@apollo/client/core';

import type {
  ApolloElementElement,
  ApolloElementInterface,
  Constructor,
  GraphQLError,
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
export class ApolloElementEvent<T = ApolloElementElement> extends CustomEvent<T> {
  declare type: 'apollo-element-connected'|'apollo-element-disconnected';

  constructor(type: 'apollo-element-connected'|'apollo-element-disconnected', detail: T) {
    super(type, {
      bubbles: true,
      composed: true,
      detail,
    });
  }
}

type MixinInstance =
  Constructor<ApolloElementInterface> &
  Pick<typeof ApolloElementInterface, keyof typeof ApolloElementInterface> & {
    observedAttributes?: string[];
  };

function ApolloElementMixinImplementation<B extends Constructor>(superclass: B): MixinInstance & B {
  abstract class ApolloElement extends superclass implements Omit<ApolloElementInterface, 'mo'> {
    static documentType: 'document'|'query'|'mutation'|'subscription' = 'document';

    static get observedAttributes(): string[] {
      // @ts-expect-error: it might not, but it might
      const superAttrs = super.observedAttributes ?? []; /* c8 ignore next */ // it's covered
      return [
        ...(superAttrs),
        'error-policy',
        'fetch-policy',
      ];
    }

    /** @summary The Apollo Client instance. */
    client: ApolloClient<NormalizedCacheObject> | null = window.__APOLLO_CLIENT__ ?? null; /* c8 ignore next */ // covered

    /** @summary Latest data */
    declare abstract data: unknown | null;

    /**
     * @summary Operation variables.
     * An object that maps from the name of a variable as used in the operation's GraphQL document to that variable's value.
     */
    declare abstract variables: unknown | null;

    /** @summary Fetch Policy for the operation. */
    declare abstract fetchPolicy?: string;

    /** @summary Latest error. */
    declare error: Error | ApolloError | null;

    /** @summary Latest errors. */
    declare errors: readonly GraphQLError[] | null;

    /** @summary Whether a request is in-flight. */
    declare loading: boolean;

    /** @summary Context passed to the link execution chain. */
    declare context?: Record<string, unknown>;

    /** @summary Error Policy for the operation. */
    declare errorPolicy?: ErrorPolicy;

    private _document: this['document'] = null;

    private _documentSetByJS = false;

    private _variables: this['variables'] = null;

    private _variablesSetByJS = false;

    protected mo?: MutationObserver;

    /**
     * @summary Operation document.
     * A GraphQL document containing a single query, mutation, or subscription.
     * You can set it as a JavaScript property or by appending a GraphQL script to the element (light DOM).
     */
    get document(): DocumentNode | TypedDocumentNode | null {
      return this._document ?? this.getDOMGraphQLDocument(); /* c8 ignore next */ // it's covered
    }

    set document(document) {
      this._documentSetByJS = false;
      if (!document)
        this._document = null; /* c8 ignore next */ // it's covered
      else if (!isValidGql(document))
        throw new TypeError(`${capital((this.constructor as typeof ApolloElementInterface).documentType ?? 'document')} must be a gql-parsed DocumentNode`); /* c8 ignore next */
      else {
        this._document = document;
        this._documentSetByJS = true;
        if (this.mo) // `isConnected` is unreliable in this case
          this.documentChanged?.(document); /* c8 ignore next */ // it's covered
      }
    }

    constructor(...a: any[]) { super(...a); }

    attributeChangedCallback(name: string, oldVal: string, newVal: string): void {
      super.attributeChangedCallback?.(name, oldVal, newVal);
      // @ts-expect-error: ts is not tracking the static side
      if (super.constructor?.observedAttributes?.includes?.(name))
        return; /* c8 ignore next */

      switch (name) { /* c8 ignore next */
        case 'error-policy':
          this.errorPolicy = newVal as ErrorPolicy;
          break;/* c8 ignore next */
        case 'fetch-policy':
          this.fetchPolicy = newVal as this['fetchPolicy'];
          break;
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
     * @param document The GraphQL document.
     */
    protected documentChanged?(document: this['document']): void

    /**
     * Lifecycle callback that reacts to changes in the operation variables.
     * @param variables The variables.
     */
    protected variablesChanged?(variables: this['variables']): void

    private onDOMMutation(records: MutationRecord[]): void {
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
     */
    protected getDOMGraphQLDocument(): this['document'] {
      const script = this.querySelector<HTMLScriptElement>(SCRIPT_SELECTOR);
      const text = script?.innerText;
      if (!text)
        return null; /* c8 ignore next */ // covered
      else {
        try {
          // admittedly, we have to trust the user here.
          return gql(stripHTMLComments(text)) as this['document']; /* c8 ignore next */ // covered
        } catch (err) {
          this.error = err;
          return null;
        }
      }
    }

    /**
     * Gets operation variables from the element's JSON script child
     */
    protected getDOMVariables(): this['variables'] {
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
    variables: effect<ApolloElement>({
      name: 'variables',
      init: null,
      onSet(variables: unknown) {
        // @ts-expect-error: This is essentially a class accessor, I'm working around some TS limitations
        if (this.mo) // element is connected
        // @ts-expect-error: This is essentially a class accessor, I'm working around some TS limitations
          this.variablesChanged?.(variables);
      },
    }),
  });

  // @ts-expect-error: let's pretend it is
  return ApolloElement;
}

/**
 * `ApolloElementMixin`: class mixin for apollo custom elements.
 */
export const ApolloElementMixin =
  dedupeMixin(ApolloElementMixinImplementation);
