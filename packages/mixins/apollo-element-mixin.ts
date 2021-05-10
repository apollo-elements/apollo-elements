import type {
  ApolloClient,
  ApolloError,
  DocumentNode,
  ErrorPolicy,
  NormalizedCacheObject,
  TypedDocumentNode,
} from '@apollo/client/core';

import type * as I from '@apollo-elements/interfaces';

import type { ApolloController } from '@apollo-elements/core';

import type { ReactiveControllerHost } from '@lit/reactive-element';

import { ControllerHostMixin, controlled } from './controller-host-mixin';

import { capital } from '@apollo-elements/lib/helpers';
import { isValidGql } from '@apollo-elements/lib/is-valid-gql';
import { dedupeMixin } from '@open-wc/dedupe-mixin';

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
export class ApolloElementEvent<T = I.ApolloElementElement> extends CustomEvent<T> {
  declare type: 'apollo-element-connected'|'apollo-element-disconnected';

  constructor(type: 'apollo-element-connected'|'apollo-element-disconnected', detail: T) {
    super(type, {
      bubbles: true,
      composed: true,
      detail,
    });
  }
}

type MixinInstance<B extends I.Constructor> = B & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new <D extends I.MaybeTDN = I.MaybeTDN, V = I.MaybeVariables<D>>():
    I.ApolloElementInterface<D, V> & ReactiveControllerHost;
  documentType: 'mutation'|'query'|'subscription';
  observedAttributes?: string[];
}

function ApolloElementMixinImplementation<B extends I.Constructor>(
  superclass: B
): MixinInstance<B> {
  class ApolloElement<D extends I.MaybeTDN = I.MaybeTDN, V = I.MaybeVariables<D>>
    extends ControllerHostMixin(superclass) {
    static documentType: 'document'|'query'|'mutation'|'subscription' = 'document';

    static get observedAttributes(): string[] {
      return [
        ...super.observedAttributes ?? [], /* c8 ignore next */ // covered
        'error-policy',
        'fetch-policy',
      ];
    }

    /** @summary The Apollo Client instance. */
    @controlled()
    client: ApolloClient<NormalizedCacheObject> | null = window.__APOLLO_CLIENT__ ?? null; /* c8 ignore next */ // covered

    declare controller: ApolloController;

    /** @summary Latest data */
    @controlled() data: I.Data<D> | null = null;

    /**
     * @summary Operation variables.
     * An object that maps from the name of a variable as used in the operation's GraphQL document to that variable's value.
     */
    @controlled({
      onSet(this: ApolloElement, variables: I.Variables<D, V>) {
        if (this.readyToReceiveDocument)
          this.variablesChanged?.(variables);
      },
    }) variables: I.Variables<D, V> | null = null;

    /** @summary Latest error. */
    @controlled() error: Error | ApolloError | null = null;

    /** @summary Latest errors. */
    @controlled() errors: readonly I.GraphQLError[] = [];

    /** @summary Whether a request is in-flight. */
    @controlled() loading = false;

    /** @summary Fetch Policy for the operation. */
    @controlled({ path: 'options' }) fetchPolicy?: string;

    /** @summary Context passed to the link execution chain. */
    @controlled({ path: 'options' }) context?: Record<string, unknown>;

    /** @summary Error Policy for the operation. */
    @controlled({ path: 'options' }) errorPolicy?: ErrorPolicy;

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
      else if (!isValidGql(document)) {
        const name = capital((this.constructor as typeof ApolloElement).documentType ?? 'document');
        throw new TypeError(`${name} must be a parsed GraphQL document`); /* c8 ignore next */
      } else {
        this._document = document;
        if (this.readyToReceiveDocument)
          this.documentChanged?.(document); /* c8 ignore next */ // covered
      }
    }

    constructor(...a: any[]) {
      super(...a);
      this.requestUpdate();
    }

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

  // @ts-expect-error: let's pretend it is
  return ApolloElement;
}

/**
 * `ApolloElementMixin`: class mixin for apollo custom elements.
 */
export const ApolloElementMixin =
  dedupeMixin(ApolloElementMixinImplementation);
