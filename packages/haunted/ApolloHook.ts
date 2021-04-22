import type { ApolloClient, DocumentNode, NormalizedCacheObject } from '@apollo/client/core';

import type {
  ApolloElementElement,
  ComponentDocument,
  Constructor,
} from '@apollo-elements/interfaces';

import type { State } from 'haunted';

import { applyPrototype } from '@apollo-elements/lib/prototypes';

import { Hook } from 'haunted';

const PRIVATE: Record<string, WeakMap<ApolloElementElement, unknown>> = { };

const DEFAULTS = {
  data: null,
  error: null,
  errors: null,
  loading: false,
};

export abstract class ApolloHook<
  D,
  V,
  OptionsType extends { client?: ApolloClient<NormalizedCacheObject> },
  ReturnType extends unknown,
  ComponentClass extends ApolloElementElement<D, V>
> extends Hook<[DocumentNode, OptionsType], ReturnType, ComponentClass> {
  abstract readonly type: 'query'|'mutation'|'subscription';

  abstract readonly componentClass: Constructor<ComponentClass>;

  protected abstract optionsToProperties(): Partial<ComponentClass>;

  protected abstract optionsToOptionalMethods(): Partial<ComponentClass>;

  abstract defaults: Partial<ComponentClass>;

  readonly reactiveProps: (keyof ComponentClass)[] = [];

  protected disconnected = true;

  constructor(
    public id: number,
    public state: State<ComponentClass>,
    public document: DocumentNode | ComponentDocument<D>,
    public options: OptionsType = {} as OptionsType,
  ) {
    super(id, state);
  }

  protected init(): void {
    this.defaults = { ...DEFAULTS, ...this.defaults };
    this.initListeners();
    this.initHost();
    this.initReactiveProps();
    this.initMethods();
    this.connect();
  }

  private initListeners() {
    const update = () => this.update(this.document, this.options);
    this.state.host.addEventListener(`apollo-${this.type}-result`, update);
    this.state.host.addEventListener('apollo-error', update);
  }

  private initHost(): void {
    const { type } = this;
    applyPrototype(this.state.host, this.componentClass, { type });
    Object.assign(this.state.host, {
      ...this.defaults,
      ...this.optionsToProperties(),
      client: this.options.client ?? window.__APOLLO_CLIENT__ ?? null,
    });
  }

  /** directly assigning breaks sinon spies, so we'll take the long way around. */
  private initMethods(): void {
    const configurable = true;
    const enumerable = false;

    Object.entries(this.optionsToOptionalMethods()).forEach(([key, value]) => {
      if (typeof value === 'function')
        Object.defineProperty(this.state.host, key, { configurable, enumerable, value }); /* c8 ignore next */ // I'm certain this is being called
    });
  }

  private initReactiveProps(): void {
    const { state: { host } } = this;

    const props = ['loading', ...this.reactiveProps];

    props.forEach((key: string | keyof ComponentClass) => {
      PRIVATE[key as string] ??= new WeakMap();
      PRIVATE[key as string].set(host, this.defaults[key as keyof ComponentClass]);
      Object.defineProperty(host, key, {
        configurable: true,
        enumerable: true,
        get() {
          return PRIVATE[key as string].get(host);
        },
        set(value: boolean) {
          PRIVATE[key as string].set(host, value);
          // @ts-expect-error: borrowing a private API in order to set up reactivity
          host._scheduler.update();
        },
      });
    });
  }

  protected connect(): void {
    const { connectedCallback, disconnectedCallback } = this.componentClass.prototype;
    Object.assign(this.state.host, { connectedCallback, disconnectedCallback });
    this.state.host.connectedCallback?.();
    this.disconnected = false;
  }

  teardown(): void {
    this.state.host.disconnectedCallback?.();
    this.disconnected = true;
  }
}
