import type { OperationVariables } from '@apollo/client/core';
import type {
  ApolloMutationInterface,
  ComponentDocument,
  RefetchQueriesType,
  Data,
  OptimisticResponseType,
  Variables,
  MaybeTDN,
} from '@apollo-elements/interfaces';
import type { TypedDocumentNode, VariablesOf } from '@graphql-typed-document-node/core';
import type { PropertyValues } from 'lit';

import { GraphQLScriptChildMixin } from '@apollo-elements/mixins/graphql-script-child-mixin';

import { ApolloElement, controlled } from './apollo-element';

import { ApolloMutationController } from '@apollo-elements/core/apollo-mutation-controller';

import { customElement, state, property } from '@lit/reactive-element/decorators.js';

import * as E from './events';

import { isEmpty } from '@apollo-elements/lib/helpers';

import { bound } from '@apollo-elements/lib/bound';

declare global { interface HTMLElementTagNameMap { 'apollo-mutation': ApolloMutationElement } }

type P<D extends MaybeTDN, V, K extends keyof ApolloMutationController<D, V>> =
  ApolloMutationController<D, V>[K] extends (...args:any[]) => unknown
  ? Parameters<ApolloMutationController<D, V>[K]>
  : never

type R<D extends MaybeTDN, V, K extends keyof ApolloMutationController<D, V>> =
  ApolloMutationController<D, V>[K] extends (...args:any[]) => unknown
  ? ReturnType<ApolloMutationController<D, V>[K]>
  : never

/** @noInheritDoc */
interface ButtonLikeElement extends HTMLElement {
  disabled: boolean;
}

/** @noInheritDoc */
interface InputLikeElement extends HTMLElement {
  value: string;
  disabled: boolean;
}

/** @ignore */
export class WillMutateError extends Error {}


/**
 * Simple Mutation component that takes a button or link-wrapped button as it's trigger.
 * When loading, it disables the button.
 * On error, it toasts a snackbar with the error message.
 * You can pass a `variables` object property,
 * or if all your variables properties are strings,
 * you can use the element's data attributes
 *
 * @fires will-mutate When the element is about to mutate. Useful for setting variables. Prevent default to prevent mutation. Detail is `{ element: this }`
 * @fires will-navigate When the mutation resolves and the element is about to navigate. cancel the event to handle navigation yourself e.g. using a client-side router. . `detail` is `{ data: Data, element: this }`
 * @fires mutation-completed When the mutation resolves. `detail` is `{ data: Data, element: this }`
 * @fires mutation-error When the mutation is rejected. `detail` is `{ error: ApolloError, element: this }`
 * @fires 'apollo-element-disconnected' when the element disconnects from the dom
 * @fires 'apollo-element-connected' when the element connects to the dom
 *
 * @slot - Mutations typically trigger when clicking a button. Slot in an element with a `trigger` attribute to assign it as the element's trigger. The triggering element. Must be a button or and anchor that wraps a button.\n\nYou may also slot in input elements with the `data-variable=\"variableName\"` attribute. It's `value` property gets the value for the corresponding variable.
 *
 * See [`ApolloMutationInterface`](https://apolloelements.dev/api/interfaces/mutation) for more information on events
 *
 * @example
 * Using data attributes
 * ```html
 * <apollo-mutation data-type="Type" data-action="ACTION">
 *   <mwc-button trigger>OK</mwc-button>
 * </apollo-mutation>
 * ```
 * Will mutate with the following as `variables`:
 * ```json
 * {
 *   "type": "Type",
 *   "action": "ACTION"
 * }
 * ```
 *
 * @example
 * Using data attributes and variables
 * ```html
 * <apollo-mutation data-type="Quote" data-action="FLUB">
 *   <mwc-button trigger label="OK"></mwc-button>
 *   <mwc-textfield
 *       data-variable="name"
 *       value="Neil"
 *       label="Name"></mwc-textfield>
 *   <mwc-textarea
 *       data-variable="comment"
 *       value="That's one small step..."
 *       label="comment"></mwc-textarea>
 * </apollo-mutation>
 * ```
 * Will mutate with the following as `variables`:
 * ```json
 * {
 *   "name": "Neil",
 *   "comment": "That's one small step...",
 *   "type": "Quote",
 *   "action": "FLUB"
 * }
 * ```
 *
 * @example
 * Using data attributes and variables with input property
 * ```html
 * <apollo-mutation data-type="Type" data-action="ACTION" input-key="actionInput">
 *   <mwc-button trigger label="OK"></mwc-button>
 *   <mwc-textfield
 *       data-variable="comment"
 *       value="Hey!"
 *       label="comment"></mwc-textfield>
 * </apollo-mutation>
 * ```
 * Will mutate with the following as `variables`:
 * ```json
 * {
 *   "actionInput": {
 *     "comment": "Hey!",
 *     "type": "Type",
 *     "action": "ACTION"
 *   }
 * }
 * ```
 *
 * @example
 * Using DOM properties
 * ```html
 * <apollo-mutation id="mutation">
 *   <mwc-button trigger label="OK"></mwc-button>
 * </apollo-mutation>
 * <script>
 *   document.getElementById('mutation').mutation = SomeMutation;
 *   document.getElementById('mutation').variables = {
 *     type: "Type",
 *     action: "ACTION"
 *   };
 * </script>
 * ```
 *
 * Will mutate with the following as `variables`:
 *
 * ```json
 * {
 *   "type": "Type",
 *   "action": "ACTION"
 * }
 * ```
 */
@customElement('apollo-mutation')
export class ApolloMutationElement<
  D extends MaybeTDN = any,
  V = D extends TypedDocumentNode ? VariablesOf<D> : OperationVariables
> extends
  GraphQLScriptChildMixin(ApolloElement)<D, V>
  implements ApolloMutationInterface<D, V> {
  static readonly is = 'apollo-mutation';

  /**
   * False when the element is a link.
   * @param node
   */
  private static isButton(node: Element|null): node is ButtonLikeElement {
    return !!node && node.tagName !== 'A';
  }

  private static isLink(node: Element|null): node is HTMLAnchorElement {
    return node instanceof HTMLAnchorElement;
  }

  private static toVariables<T>(acc: T, element: InputLikeElement): T {
    // querySelectorAll ensures the data-variable attr exists
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return { ...acc, [element.dataset.variable!]: element.value };
  }

  private static isTriggerNode(node: Node): node is HTMLElement {
    return node instanceof HTMLElement && node.hasAttribute('trigger');
  }

  private static debounce(f: () => void, timeout: number): () => void {
    let timer: number;
    return () => {
      clearTimeout(timer);
      timer = window.setTimeout(() => { f(); }, timeout);
    };
  }

  controller = new ApolloMutationController<D, V>(this, undefined, {
    onCompleted: data => {
      const trigger = this.inFlightTrigger;
      this.didMutate();
      this.dispatchEvent(new E.MutationCompletedEvent<D, V>(this));
      if (ApolloMutationElement.isLink(trigger) || trigger?.closest?.('a[trigger]'))
        this.willNavigate(data, trigger);
    },

    onError: () => {
      this.didMutate();
      this.dispatchEvent(new E.MutationErrorEvent<D, V>(this));
    },
  });

  /**
   * When set, variable data attributes will be packed into an
   * object property with the name of this property
   * @example
   * ```html
   * <apollo-mutation id="a" data-variable="var"></apollo-mutation>
   * <apollo-mutation id="b" input-key="input" data-variable="var"></apollo-mutation>
   * <script>
   *   console.log(a.variables) // { variable: 'var' }
   *   console.log(b.variables) // { input: { variable: 'var' } }
   * </script>
   * ```
   */
  @property({ attribute: 'input-key', reflect: true }) inputKey: string|null = null;
  @property({ type: Number, reflect: true }) debounce: number | null = null;

  @controlled() @property({ type: Boolean, reflect: true }) called = false;
  @controlled() @state() mutation: null | ComponentDocument<D> = null;
  @controlled() @state() context?: Record<string, unknown>;
  @controlled({ path: 'options' }) @state() optimisticResponse?: OptimisticResponseType<D, V>;
  @controlled() @state() variables: Variables<D, V> | null = null;

  @controlled({ path: 'options' })
  @property({ attribute: 'ignore-results', type: Boolean })
  ignoreResults = false;

  @controlled({ path: 'options' })
  @property({ attribute: 'await-refetch-queries', type: Boolean })
  awaitRefetchQueries = false;

  @controlled({ path: 'options' })
  @property({ attribute: 'error-policy' })
  errorPolicy?: this['controller']['options']['errorPolicy'];

  @controlled({ path: 'options' })
  @property({ attribute: 'fetch-policy' })
  fetchPolicy?: this['controller']['options']['fetchPolicy'];

  @controlled({ path: 'options' })
  @property({
    attribute: 'refetch-queries',
    converter: {
      fromAttribute(newVal) {
        return !newVal ? null : newVal
          .split(',')
          .map(x => x.trim());
      },
    },
  }) refetchQueries: RefetchQueriesType<D> | null = null;

  /**
   * Define this function to determine the URL to navigate to after a mutation.
   * Function can be synchronous or async.
   * If this function is not defined, will navigate to the `href` property of the link trigger.
   * @example Navigate to a post's page after creating it
   * ```html
   * <apollo-mutation id="mutation">
   *   <script type="application/graphql">
   *     mutation CreatePostMutation($title: String, $content: String) {
   *       createPost(title: $title, content: $content) {
   *         slug
   *       }
   *     }
   *   </script>
   *   <mwc-textfield label="Post title" data-variable="title"></mwc-textfield>
   *   <mwc-textarea label="Post Content" data-variable="content"></mwc-textarea>
   * </apollo-mutation>
   *
   * <script>
   *   document.getElementById('mutation').resolveURL =
   *     data => `/posts/${data.createPost.slug}/`;
   * </script>
   * ```
   * @param data mutation data
   * @param trigger the trigger element which triggered this mutation
   * @returns url to navigate to
   */
  resolveURL?(data: Data<D>, trigger: HTMLElement): string | Promise<string>;

  private inFlightTrigger: HTMLElement | null = null;

  /**
   * Slotted trigger nodes
   */
  protected get triggers(): NodeListOf<HTMLElement> {
    return this.querySelectorAll('[trigger]');
  }

  /**
   * If the slotted trigger node is a button, the trigger
   * If the slotted trigger node is a link with a button as it's first child, the button
   */
  protected get buttons(): ButtonLikeElement[] {
    const { isButton, isLink } = ApolloMutationElement;
    return Array.from(this.triggers, x => {
      if (isLink(x) && isButton(x.firstElementChild))
        /* c8 ignore next 3 */
        return x.firstElementChild;
      else
        return x;
    }).filter(isButton);
  }

  /**
   * Variable input nodes
   */
  protected get inputs(): InputLikeElement[] {
    return Array.from(this.querySelectorAll<InputLikeElement>('[data-variable]'));
  }

  private doMutate = (): void => void (this.controller.mutate().catch(() => void 0));

  private debouncedMutate = this.doMutate;

  #buttonMO?: MutationObserver;

  #listeners = new WeakMap<HTMLElement, string>();

  constructor() {
    super();
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const el = this;
    Object.defineProperty(this.controller, 'variables', {
      get(): Variables<D, V> | null {
        if (this.__variables)
          return this.__variables;
        else
          return el.getVariablesFromInputs() ?? el.getDOMVariables() as Variables<D, V>;
      },

      set(v: Variables<D, V> | null) {
        this.__variables = v ?? undefined;
      },
    });

    this.onSlotchange();
  }

  update(changed: PropertyValues<this>): void {
    if (changed.has('debounce')) {
      this.debouncedMutate =
          this.debounce == null ? this.doMutate
        : ApolloMutationElement.debounce(this.doMutate, this.debounce);
    }
    super.update(changed);
  }

  protected createRenderRoot(): ShadowRoot|HTMLElement {
    if (this.hasAttribute('no-shadow')) {
      const root = this.appendChild(document.createElement('div'));
      root.classList.add(this.getAttribute('no-shadow') || 'output');
      this.#buttonMO = new MutationObserver(records => this.onLightDomMutation(records));
      this.#buttonMO.observe(this, { childList: true, attributes: false, characterData: false });
      return root;
    } else
      return super.createRenderRoot();
  }

  private onLightDomMutation(records: MutationRecord[]) {
    /* eslint-disable easy-loops/easy-loops */
    for (const record of records) {
      for (const node of record.removedNodes as NodeListOf<HTMLElement>) {
        const type = this.#listeners.get(node);
        if (type == null) return;
        node.removeEventListener(type, this.onTriggerEvent);
        this.#listeners.delete(node);
      }

      for (const node of record.addedNodes) {
        if (ApolloMutationElement.isTriggerNode(node))
          this.addTriggerListener(node);
      }
    }
    /* eslint-enable easy-loops/easy-loops */
  }

  /**
   * Constructs a variables object from the element's data-attributes and any slotted variable inputs.
   */
  protected getVariablesFromInputs(): Variables<D, V> | null {
    if (isEmpty(this.dataset) && isEmpty(this.inputs))
      return null;

    const input = {
      ...this.dataset,
      ...this.inputs.reduce(ApolloMutationElement.toVariables, {}),
    };

    if (this.inputKey)
      return { [this.inputKey]: input } as unknown as Variables<D, V>;
    else
      return input as Variables<D, V>;
  }

  private onSlotchange(): void {
    for (const button of this.buttons)
      this.addTriggerListener(button);
    for (const trigger of this.triggers)
      this.addTriggerListener(trigger);
  }

  private addTriggerListener(element: HTMLElement) {
    const eventType = element?.getAttribute?.('trigger') || 'click';

    if (
      !this.#listeners.has(element) &&
      element.hasAttribute('trigger') ||
      !element.closest('[trigger]')
    ) {
      element.addEventListener(eventType, this.onTriggerEvent, {
        passive: element.hasAttribute('passive'),
      });
      this.#listeners.set(element, eventType);
    }
  }

  private willMutate(trigger: HTMLElement): void {
    if (!this.dispatchEvent(new E.WillMutateEvent<D, V>(this)))
      throw new WillMutateError('mutation was canceled');

    this.inFlightTrigger = trigger;

    for (const button of this.buttons)
      button.disabled = true;

    for (const input of this.inputs)
      input.disabled = true;
  }

  private async willNavigate(
    data: Data<D>|null|undefined,
    triggeringElement: HTMLElement
  ): Promise<void> {
    if (!this.dispatchEvent(new E.WillNavigateEvent(this)))
      return;

    const href = triggeringElement.closest<HTMLAnchorElement>('a[trigger]')?.href;

    const url =
        typeof this.resolveURL !== 'function' ? href
        // If we get here without `data`, it's due to user error
      : await this.resolveURL(this.data!, triggeringElement); // eslint-disable-line @typescript-eslint/no-non-null-assertion

    history.replaceState(data, E.WillNavigateEvent.type, url);
  }

  private didMutate(): void {
    this.inFlightTrigger = null;

    for (const button of this.buttons)
      button.disabled = false;

    for (const input of this.inputs)
      input.disabled = false;
  }

  @bound private onTriggerEvent(event: Event): void {
    event.preventDefault();

    if (this.inFlightTrigger)
      return;

    try {
      this.willMutate(event.target as HTMLElement);
    } catch (e) {
      return;
    }

    this.debouncedMutate();
  }

  public mutate(params?: P<D, V, 'mutate'>[0]): R<D, V, 'mutate'> {
    return this.controller.mutate(params);
  }
}
