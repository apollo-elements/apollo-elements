import type { PropertyDeclaration } from 'lit';

import type { ApolloController } from '@apollo-elements/core';

import type {
  ApolloClient,
  ApolloError,
  NormalizedCacheObject,
} from '@apollo/client/core';

import type {
  ApolloElementInterface,
  Data,
  Variables,
  MaybeTDN,
  MaybeVariables,
  GraphQLError,
  ComponentDocument,
} from '@apollo-elements/interfaces';

import { StampinoRender } from './stampino-render';

import { property, state, InternalPropertyDeclaration } from '@lit/reactive-element/decorators.js';

declare module '@lit/reactive-element' {
  export interface PropertyDeclaration {
    controlled?: boolean|string;
  }
}

declare module '@lit/reactive-element/decorators.js' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface InternalPropertyDeclaration<Type = unknown> {
    controlled?: boolean|string;
  }
}

export class ApolloElement<D extends MaybeTDN = any, V = MaybeVariables<D>>
  extends StampinoRender implements ApolloElementInterface {
  declare controller: ApolloController<D, V>;

  readyToReceiveDocument = false;

  static createProperty(
    name: string,
    { controlled, ...options }: PropertyDeclaration|InternalPropertyDeclaration
  ): void {
    if (controlled) {
      Object.defineProperty(this.prototype, name, {
        get() {
          if (typeof controlled === 'string')
            return this.controller?.[controlled][name];
          else
            return this.controller[name];
        },

        set(value) {
          if (!this.controller) return;
          const old = this[name];
          if (typeof controlled === 'string')
            this.controller[controlled][name] = value;
          else
            this.controller[name] = value;
          this.requestUpdate(name, old);
        },
      });
    }
    super.createProperty(name, { ...options });
  }

  @property({ reflect: true, controlled: true, type: Boolean }) loading = false;
  @state({ controlled: 'options' }) client: ApolloClient<NormalizedCacheObject> | null = null;
  @state({ controlled: true }) data: Data<D>|null = null;
  @state({ controlled: true }) document: ComponentDocument<D>|null = null;
  @state({ controlled: true }) error: Error|ApolloError|null = null;
  @state({ controlled: true }) errors: readonly GraphQLError[] = [];
  @state({ controlled: true }) variables: Variables<D, V>|null = null;
}
