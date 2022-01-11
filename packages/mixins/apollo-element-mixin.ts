import type {
  ApolloClient,
  ApolloError,
  ErrorPolicy,
  NormalizedCacheObject,
} from '@apollo/client/core';

import type {
  ComponentDocument,
  Constructor,
  Data,
  GraphQLError,
  Variables,
  VariablesOf,
} from '@apollo-elements/core/types';

import type { ApolloController, ApolloElementElement, ControllerHost } from '@apollo-elements/core';

import { ControllerHostMixin } from './controller-host-mixin';

import { controlled } from '@apollo-elements/core/decorators';
import { ApolloElementEvent } from '@apollo-elements/core/events';

import { dedupeMixin } from '@open-wc/dedupe-mixin';

type MixinInstance<B extends Constructor<HTMLElement>> = B & {
  new <D = unknown, V = VariablesOf<D>>(): ControllerHost & ApolloElementElement<D, V>;
  documentType: 'document'|'mutation'|'query'|'subscription';
  observedAttributes?: string[];
}

function ApolloElementMixinImplementation<B extends Constructor & {
  observedAttributes?: string[]
}>(
  superclass: B
): MixinInstance<B> {
  class ApolloElement<D = unknown, V = VariablesOf<D>>
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

    declare controller: ApolloController<D, V>;

    /**
     * @summary Operation document.
     * A GraphQL document containing a single query, mutation, or subscription.
     * You can set it as a JavaScript property or by appending a GraphQL script to the element (light DOM).
     */
    @controlled() document: ComponentDocument<D, V> | null = null;

    /** @summary Latest data */
    @controlled() data: Data<D> | null = null;

    /**
     * @summary Operation variables.
     * An object that maps from the name of a variable as used in the operation's GraphQL document to that variable's value.
     */
    @controlled() variables: Variables<D, V> | null = null;

    /** @summary Latest error. */
    @controlled() error: Error | ApolloError | null = null;

    /** @summary Latest errors. */
    @controlled() errors: readonly GraphQLError[] = [];

    /** @summary Whether a request is in-flight. */
    @controlled() loading = false;

    /** @summary Fetch Policy for the operation. */
    @controlled({ path: 'options' }) fetchPolicy?: string;

    /** @summary Context passed to the link execution chain. */
    @controlled({ path: 'options' }) context?: Record<string, unknown>;

    /**
     * errorPolicy determines the level of events for errors in the execution result. The options are:
     * - `none` (default): any errors from the request are treated like runtime errors and the observable is stopped (XXX this is default to lower breaking changes going from AC 1.0 => 2.0)
     * - `ignore`: errors from the request do not stop the observable, but also don't call `next`
     * - `all`: errors are treated like data and will notify observables
     * @summary [Error Policy](https://www.apollographql.com/docs/react/api/core/ApolloClient/#ErrorPolicy) for the operation.
     * @attr error-policy
     */
    @controlled({ path: 'options' }) errorPolicy?: ErrorPolicy;

    /** @summary True when the element is connected and ready to receive its GraphQL document */
    public readyToReceiveDocument = false;

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
      this.readyToReceiveDocument = true;
      super.connectedCallback();
      this.dispatchEvent(new ApolloElementEvent('apollo-element-connected', this));
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

  return ApolloElement as unknown as MixinInstance<B>;
}

/**
 * `ApolloElementMixin`: class mixin for apollo custom elements.
 */
export const ApolloElementMixin =
  dedupeMixin(ApolloElementMixinImplementation);
