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

import { property, state } from '@lit/reactive-element/decorators.js';

export interface ControlledPropertyDeclaration extends PropertyDeclaration {
  controlled?: boolean|string;
}

export function controlled({ path }: { path?: 'options' } = {}) {
  return function(proto: ApolloElement<any, any>, name: string|symbol): void {
    return (proto.constructor as typeof ApolloElement).createProperty(name as string, {
      // @ts-expect-error: I know it's protected
      ...(proto.constructor as typeof ApolloElement).getPropertyOptions(name),
      controlled: path ?? true,
    });
  };
}

export class ApolloElement<D extends MaybeTDN = any, V = MaybeVariables<D>>
  extends StampinoRender implements ApolloElementInterface {
  declare controller: ApolloController<D, V>;

  readyToReceiveDocument = false;

  static createProperty(name: string, opts: ControlledPropertyDeclaration): void {
    const { controlled, ...options } = opts;
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

  @controlled({ path: 'options' })
  @state() client: ApolloClient<NormalizedCacheObject> | null = null;

  @controlled() @property({ reflect: true, type: Boolean }) loading = false;
  @controlled() @state() data: Data<D>|null = null;
  @controlled() @state() document: ComponentDocument<D>|null = null;
  @controlled() @state() error: Error|ApolloError|null = null;
  @controlled() @state() errors: readonly GraphQLError[] = [];
  @controlled() @state() variables: Variables<D, V>|null = null;
}
