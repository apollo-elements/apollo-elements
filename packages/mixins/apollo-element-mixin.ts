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

import { capital } from '@apollo-elements/lib/helpers';
import { isValidGql } from '@apollo-elements/lib/is-valid-gql';
import { dedupeMixin } from '@open-wc/dedupe-mixin';
import { effect, writable } from '@apollo-elements/lib/descriptors';

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

function ApolloElementMixinImplementation<B extends Constructor & {
  observedAttributes?: string[]
}>(superclass: B): MixinInstance & B {
  abstract class ApolloElement extends superclass {
    static documentType: 'document'|'query'|'mutation'|'subscription' = 'document';

    static get observedAttributes(): string[] {
      return [
        ...super.observedAttributes ?? [], /* c8 ignore next */ // covered
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

    /** @summary True when the element is connected and ready to receive its GraphQL document */
    public readyToReceiveDocument = false;

    private _document: this['document'] = null;

    /**
     * @summary Operation document.
     * A GraphQL document containing a single query, mutation, or subscription.
     * You can set it as a JavaScript property or by appending a GraphQL script to the element (light DOM).
     */
    get document(): DocumentNode | TypedDocumentNode | null {
      return this._document; /* c8 ignore next */ // covered
    }

    set document(document) {
      if (!document)
        this._document = null; /* c8 ignore next */ // covered
      else if (!isValidGql(document))
        throw new TypeError(`${capital((this.constructor as typeof ApolloElementInterface).documentType ?? 'document')} must be a gql-parsed DocumentNode`); /* c8 ignore next */
      else {
        this._document = document;
        if (this.readyToReceiveDocument)
          this.documentChanged?.(document); /* c8 ignore next */ // covered
      }
    }

    constructor(...a: any[]) { super(...a); }

    attributeChangedCallback(name: string, oldVal: string, newVal: string): void {
      type ThisPolicy = `${'error'|'fetch'}Policy`;
      /* c8 ignore start */ // covered
      switch (name) {
        case 'error-policy':
        case 'fetch-policy': {
          const prop =
            name.replace(/-(.)/g, (_, g1) => g1.toUpperCase()) as ThisPolicy;
          if (this[prop] !== newVal)
            this[prop] = newVal as this['errorPolicy'];
        }
      }
      super.attributeChangedCallback?.(name, oldVal, newVal);
      /* c8 ignore stop */
    }

    connectedCallback(): void {
      super.connectedCallback?.(); /* c8 ignore start */ // manual testing showed that both cases were hit
      this.dispatchEvent(new ApolloElementEvent('apollo-element-connected', this));
      this.readyToReceiveDocument = true;
    }

    disconnectedCallback(): void {
      this.dispatchEvent(new ApolloElementEvent('apollo-element-disconnected', this));
      window.dispatchEvent(new ApolloElementEvent('apollo-element-disconnected', this));
      super.disconnectedCallback?.(); /* c8 ignore start */ // manual testing showed that both cases were hit
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
        if (this.readyToReceiveDocument) // element is connected
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
