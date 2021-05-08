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
  return function<T extends ApolloElement<any, any>>(
    proto: T,
    name: typeof path extends keyof T ? keyof T[typeof path] : keyof T
  ): void {
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

  /** @summary The Apollo Client instance. */
  @controlled({ path: 'options' })
  @state()
  client: ApolloClient<NormalizedCacheObject> | null = null;

  /** @summary Whether a request is in flight. */
  @controlled() @property({ reflect: true, type: Boolean }) loading = false;

  /** @summary Latest Data. */
  @controlled() @state() data: Data<D>|null = null;

  /**
   * @summary Operation document.
   * GraphQL operation document i.e. query, subscription, or mutation.
   * Must be a parsed GraphQL `DocumentNode`
   */
  @controlled() @state() document: ComponentDocument<D>|null = null;

  /** @summary Latest error */
  @controlled() @state() error: Error|ApolloError|null = null;

  /** @summary Latest errors */
  @controlled() @state() errors: readonly GraphQLError[] = [];

  /** @summary Operation variables. */
  @controlled() @state() variables: Variables<D, V>|null = null;
}
