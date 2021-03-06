import type { OperationVariables } from '@apollo/client/core';

import type { TemplateResult } from 'lit-element';

import type {
  ApolloMutationInterface,
  Data,
  Variables,
  VariablesOf,
} from '@apollo-elements/interfaces';

import { ApolloMutation } from '@apollo-elements/lit-apollo/apollo-mutation';

import { css, customElement, html, property, queryAssignedNodes } from 'lit-element';

import {
  MutationCompletedEvent,
  MutationErrorEvent,
  WillMutateEvent,
  WillNavigateEvent,
} from './events';
import { isEmpty } from '@apollo-elements/lib/helpers';

export * from './events';

/** @noInheritDoc */
interface ButtonLikeElement extends HTMLElement {
  disabled: boolean;
}

/** @noInheritDoc */
interface InputLikeElement extends HTMLElement {
  value: string;
  disabled: boolean;
}

/**
 * False when the element is a link.
 * @param node
 */
function isButton(node: Element|null): node is ButtonLikeElement {
  return node?.tagName !== 'A';
}

function isLink(node: Element|null): node is HTMLAnchorElement {
  return node instanceof HTMLAnchorElement;
}

function toVariables<T>(acc: T, element: InputLikeElement): T {
  return !element.dataset?.variable ? acc : { ...acc, [element.dataset.variable]: element.value };
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
 * @slot trigger - The triggering element. Must be a button or and anchor that wraps a button.
 * @slot variable - An input with a `data-variable` attribute. It's `value` property gets the value for the corresponding variable.
 *
 * @fires will-mutate When the element is about to mutate. Useful for setting variables. Prevent default to prevent mutation. Detail is `{ element: this }`
 * @fires will-navigate When the mutation resolves and the element is about to navigate. cancel the event to handle navigation yourself e.g. using a client-side router. . `detail` is `{ data: Data, element: this }`
 * @fires mutation-completed When the mutation resolves. `detail` is `{ data: Data, element: this }`
 * @fires mutation-error When the mutation is rejected. `detail` is `{ error: ApolloError, element: this }`
 * @fires 'apollo-element-disconnected' when the element disconnects from the dom
 * @fires 'apollo-element-connected' when the element connects to the dom
 *
 * @csspart variables - The container for variable inputs.
 * @csspart trigger - The container for the trigger.
 * See [`ApolloMutationInterface`](https://apolloelements.dev/api/interfaces/mutation) for more information on events
 *
 * @example
 * Using data attributes
 * ```html
 * <apollo-mutation data-type="Type" data-action="ACTION">
 *   <mwc-button slot="trigger">OK</mwc-button>
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
 *   <mwc-button slot="trigger" label="OK"></mwc-button>
 *   <mwc-textfield slot="variable"
 *       data-variable="name"
 *       value="Neil"
 *       label="Name"></mwc-textfield>
 *   <mwc-textarea slot="variable"
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
 *   <mwc-button slot="trigger" label="OK"></mwc-button>
 *   <mwc-textfield slot="variable"
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
 *   <mwc-button slot="trigger" label="OK"></mwc-button>
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
export class ApolloMutationElement<D = unknown, V = OperationVariables>
  extends ApolloMutation<D, V> implements ApolloMutationInterface<D, V> {
  static readonly styles = [css`
    [part="trigger"],
    [part="variables"] {
      display: contents;
    }
  `];

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
  @property({ attribute: 'input-key' }) inputKey = '';

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
   *   <mwc-textfield label="Post title" slot="variable" data-variable="title"></mwc-textfield>
   *   <mwc-textarea label="Post Content" slot="variable" data-variable="content"></mwc-textarea>
   * </apollo-mutation>
   *
   * <script>
   *   document.getElementById('mutation').resolveURL =
   *     data => `/posts/${data.createPost.slug}/`;
   * </script>
   * ```
   * @param data mutation data
   * @returns url to navigate to
   */
  resolveURL?(data: Data<D>): string | Promise<string>;

  @queryAssignedNodes('trigger') private triggerNodes!: NodeListOf<HTMLElement>;

  @queryAssignedNodes('variable')
  private variableNodes!: NodeListOf<InputLikeElement|HTMLLabelElement>;

  private inFlight = false;

  protected __variables: Variables<D, V> | null = null;

  /**
   * Slotted trigger node
   */
  protected get trigger(): HTMLElement | null {
    const [node = null] = this.triggerNodes ?? [];
    return node;
  }

  /**
   * If the slotted trigger node is a button, the trigger
   * If the slotted trigger node is a link with a button as it's first child, the button
   */
  protected get button(): ButtonLikeElement | null {
    if (isButton(this.trigger))
      return this.trigger;
    else if (isLink(this.trigger) && isButton(this.trigger.firstElementChild))
      /* c8 ignore next 3 */
      return this.trigger.firstElementChild;
    else
      return null;
  }

  /**
   * Variable input nodes
   */
  protected get inputs(): InputLikeElement[] {
    return [...this.variableNodes ?? []].map(x =>
      x instanceof HTMLLabelElement ? x.control as InputLikeElement : x);
  }

  /**
   * The `href` attribute of the link trigger
   */
  protected get href(): string|undefined {
    const link = isLink(this.trigger) ? this.trigger : null;
    return link?.href;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.onSlotchange();
  }

  render(): TemplateResult {
    return html`
      <div part="variables">
        <slot name="variable"></slot>
      </div>

      <div part="trigger">
        <slot name="trigger" @slotchange="${this.onSlotchange}"></slot>
      </div>
    `;
  }

  /**
   * Constructs a variables object from the element's data-attributes and any slotted variable inputs.
   */
  protected getVariablesFromInputs(): Variables<D, V> | null {
    if (isEmpty(this.dataset) && isEmpty(this.inputs))
      return null;

    const input = {
      ...this.dataset,
      ...this.inputs.reduce(toVariables, {}),
    };

    if (this.inputKey)
      return { [this.inputKey]: input } as unknown as Variables<D, V>;
    else
      return input as Variables<D, V>;
  }

  private onSlotchange(): void {
    if (this.button)
      this.button.addEventListener?.('click', this.onClick.bind(this));
    else if (this.trigger)
      this.trigger.addEventListener?.('click', this.onClick.bind(this));
  }

  private willMutate(): void {
    if (!this.dispatchEvent(new WillMutateEvent<D, V>(this)))
      throw new WillMutateError('mutation was canceled');

    this.inFlight = true;

    if (this.button)
      this.button.disabled = true;

    for (const input of this.inputs)
      input.disabled = true;
  }

  private async willNavigate(data: Data<D>): Promise<void> {
    if (!this.dispatchEvent(new WillNavigateEvent<D, V>(this)))
      return;

    const url =
        typeof this.resolveURL !== 'function' ? this.href
        // If we get here without `data`, it's due to user error
      : await this.resolveURL(this.data!); // eslint-disable-line @typescript-eslint/no-non-null-assertion

    history.replaceState(data, WillNavigateEvent.type, url);
  }

  private didMutate(): void {
    this.inFlight = false;
    if (this.button)
      this.button.disabled = false;

    for (const input of this.inputs)
      input.disabled = false;
  }

  private async onClick(event: MouseEvent): Promise<void> {
    event.preventDefault();
    if (this.inFlight)
      return;

    try {
      this.willMutate();
    } catch (e) {
      return;
    }

    await this.mutate().catch(() => void null);
  }

  /** @private */
  onCompleted(data: Data<D>): void {
    this.didMutate();
    this.dispatchEvent(new MutationCompletedEvent<D, V>(this));

    if (isLink(this.trigger))
      this.willNavigate(data);
  }

  /** @private */
  onError(): void {
    this.didMutate();
    this.dispatchEvent(new MutationErrorEvent<D, V>(this));
  }
}

Object.defineProperties(ApolloMutationElement.prototype, {
  variables: {
    configurable: true,
    enumerable: true,

    get(this: ApolloMutationElement): VariablesOf<ApolloMutationElement> | null {
      if (this.__variables)
        return this.__variables;
      else
        return this.getVariablesFromInputs() ?? this.getDOMVariables();
    },

    set(this: ApolloMutationElement, v: VariablesOf<ApolloMutationElement> | null) {
      this.__variables = v;
      if (this.mo) // element is connected
        this.variablesChanged?.(v); /* c8 ignore next */ // covered
    },

  },
});
