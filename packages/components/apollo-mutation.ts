import type { ApolloError, DocumentNode } from '@apollo/client/core';

import {
  ApolloMutation,
  TemplateResult,
  html,
  customElement,
  property,
  queryAssignedNodes,
} from '@apollo-elements/lit-apollo';

declare global {
  interface HTMLElementEventMap {
    'will-mutate': WillMutateEvent;
    'will-navigate': WillNavigateEvent;
    'mutation-completed': MutationCompletedEvent;
    'mutation-error': MutationErrorEvent;
  }
}

/** @noInheritDoc */
interface ButtonLikeElement extends HTMLElement {
  disabled: boolean;
}

/** @noInheritDoc */
interface InputLikeElement extends HTMLElement {
  value: string;
  disabled: boolean;
}

interface MutationEventDetail<Data, Variables> {
  element: ApolloMutationElement<Data, Variables>;
  mutation: DocumentNode;
  variables: Variables;
}

class MutationEvent<
  Detail extends MutationEventDetail<Data, Variables>,
  Data = unknown,
  Variables = unknown,
> extends CustomEvent<Detail> {
  constructor(type: string, init: CustomEventInit<Detail>) {
    super(type, {
      ...init,
      bubbles: true,
      composed: true,
    });
  }
}

/**
 * Fired when the element is about to mutate.
 * Useful for setting variables or cancelling the mutation by calling `preventDefault`
 * Prevent default to prevent mutation. Detail is `{ element: this }`
 * @typeParam Data Element's Data type
 * @typeParam Variables Element's Variables type
 */
export class WillMutateEvent<
  Data = unknown,
  Variables = unknown
> extends MutationEvent<MutationEventDetail<Data, Variables>> {
  static type: 'will-mutate' = 'will-mutate';

  declare detail: MutationEventDetail<Data, Variables>;

  constructor(element: ApolloMutationElement<Data, Variables>) {
    const { mutation, variables } = element;
    super(WillMutateEvent.type, {
      cancelable: true,
      detail: {
        element,
        mutation,
        variables,
      },
    });
  }
}

export interface MutationCompletedEventDetail<Data, Variables>
extends MutationEventDetail<Data, Variables> {
 data: Data
}

/**
 * Fired when a mutation completes.
 * `detail` is the mutation data.
 * @typeParam Data Element's Data type
 * @typeParam Variables Element's Variables type
 */
export class MutationCompletedEvent<
  Data = unknown,
  Variables = unknown
> extends MutationEvent<MutationCompletedEventDetail<Data, Variables>> {
  static type: 'mutation-completed' = 'mutation-completed';

  declare detail: MutationCompletedEventDetail<Data, Variables>;

  constructor(element: ApolloMutationElement<Data, Variables>, data: Data) {
    const { mutation, variables } = element;
    super(MutationCompletedEvent.type, {
      detail: {
        data,
        element,
        mutation,
        variables,
      },
    });
  }
}

export interface MutationErrorEventDetail<Data, Variables>
extends MutationEventDetail<Data, Variables> {
  error: ApolloError;
}

/**
 * Fired before an <apollo-element> with a link trigger mutates.
 * Cancel the event with `event.preventDefault()` to prevent navigation.
 * @typeParam Data Element's Data type
 * @typeParam Variables Element's Variables type
 */
export class WillNavigateEvent<
  Data = unknown,
  Variables = unknown,
> extends MutationEvent<MutationCompletedEventDetail<Data, Variables>> {
  static type: 'will-navigate' = 'will-navigate'

  declare detail: MutationCompletedEventDetail<Data, Variables>;

  constructor(element: ApolloMutationElement<Data, Variables>, data: Data) {
    const { mutation, variables } = element;
    super(WillNavigateEvent.type, {
      cancelable: true,
      detail: {
        data,
        element,
        mutation,
        variables,
      },
    });
  }
}

/**
 * Fired when the mutation rejects.
 * @typeParam Data Element's Data type
 * @typeParam Variables Element's Variables type
 */
export class MutationErrorEvent<
  Data = unknown,
  Variables = unknown
> extends MutationEvent<MutationErrorEventDetail<Data, Variables>> {
  static type: 'mutation-error' = 'mutation-error';

  declare detail: MutationErrorEventDetail<Data, Variables>;

  constructor(element: ApolloMutationElement<Data, Variables>, error: ApolloError) {
    const { mutation, variables } = element;
    super(MutationErrorEvent.type, {
      detail: {
        element,
        error,
        mutation,
        variables,
      },
    });
  }
}

/**
 * False when the element is a link.
 * @param node
 */
function isButton(node: Element): node is ButtonLikeElement {
  return node?.tagName !== 'A';
}

function isLink(node: Element): node is HTMLAnchorElement {
  return node instanceof HTMLAnchorElement;
}

/** @ignore */
class WillMutateError extends Error {}

/**
 * Simple Mutation component that takes a button or link-wrapped button as it's trigger.
 * When loading, it disables the button.
 * On error, it toasts a snackbar with the error message.
 * You can pass a `variables` object property,
 * or if all your variables properties are strings,
 * you can use the element's data attributes
 *
 * @slot trigger - the triggering element (e.g. button or anchor)
 * @slot variable - an input-like element with a `data-variable` attribute. it's `value` property will be queried to get the value for the corresponding variable
 *
 * @fires will-mutate When the element is about to mutate. Useful for setting variables. Prevent default to prevent mutation. Detail is `{ element: this }`
 * @fires will-navigate When the mutation resolves and the element is about to navigate. cancel the event to handle navigation yourself e.g. using a client-side router. . `detail` is `{ data: Data, element: this }`
 * @fires mutation-completed When the mutation resolves. `detail` is `{ data: Data, element: this }`
 * @fires mutation-error When the mutation is rejected. `detail` is `{ error: ApolloError, element: this }`
 *
 * ### Example: Using data attributes
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
 * ### Example: Using data attributes and variables
 * ```html
 * <apollo-mutation data-type="Quote" data-action="FLUB">
 *   <mwc-button slot="trigger">OK</mwc-button>
 *   <mwc-textfield slot="variable"
 *       data-variable="name"
 *       value="Neil"></mwc-textfield>
 *   <textarea slot="variable"
 *       data-variable="comment"
 *       value="That's one small step..."></mwc-textfield>
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
 * ### Example: Using data attributes and variables with input property
 * ```html
 * <apollo-mutation data-type="Type" data-action="ACTION" input-key="actionInput">
 *   <mwc-button slot="trigger">OK</mwc-button>
 *   <mwc-textfield slot="variable"
 *       data-variable="comment"
 *       value="Hey!"></mwc-textfield>
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
 * ### Example: Using DOM properties
 * ```js
 * html`
 * <apollo-mutation
 *     .mutation="${SomeMutation}"
 *     .variables="${{ type: "Type", action: "ACTION" }}">
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
 */
@customElement('apollo-mutation')
export class ApolloMutationElement<Data, Variables> extends ApolloMutation<Data, Variables> {
  /**
   * When set, variable data attributes will be packed into an
   * object property with the name of this property
   * ##### Example
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
   * For Mutations that should trigger navigations,
   * a function of `data` to determine the href.
   */
  @property({ attribute: false }) routeGetter: (data: unknown) => string;

  @queryAssignedNodes('trigger') private triggerNodes: NodeListOf<HTMLElement>;

  @queryAssignedNodes('variable') private variableNodes: NodeListOf<InputLikeElement>;

  private inFlight = false;

  private __variables: Variables = null;

  // @ts-expect-error: ambient property. see https://github.com/microsoft/TypeScript/issues/40220
  get variables(): Variables {
    const input = this.__variables ?? {
      ...this.dataset,
      ...this.inputs.reduce((acc, element) => {
        if (!element.dataset?.variable)
          return acc;
        else
          return { ...acc, [element.dataset.variable]: element.value };
      }, {}),
    };

    return (this.inputKey ? { [this.inputKey]: input } : input) as Variables;
  }

  set variables(v: Variables) {
    this.__variables = v;
  }

  private get trigger(): HTMLElement {
    const [node = null] = this.triggerNodes ?? [];
    return node;
  }

  private get button(): ButtonLikeElement {
    if (!this.trigger)
      return null;
    else if (isButton(this.trigger))
      return this.trigger;
    else if (isLink(this.trigger) && isButton(this.trigger.firstElementChild))
      return this.trigger.firstElementChild;
    else
      return null;
  }

  private get inputs(): InputLikeElement[] {
    return [...this.variableNodes];
  }

  private get href(): string {
    const link = isLink(this.trigger) ? this.trigger : null;
    return link?.href;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.onSlotchange();
  }

  render(): TemplateResult {
    return html`
      <slot name="trigger" @slotchange="${this.onSlotchange}"></slot>
      <slot name="variable"></slot>
    `;
  }

  private onSlotchange(): void {
    if (this.button)
      this.button.addEventListener?.('click', this.onClick.bind(this));
    else if (this.trigger)
      this.trigger.addEventListener?.('click', this.onClick.bind(this));
  }

  private willMutate(): void {
    if (!this.dispatchEvent(new WillMutateEvent<Data, Variables>(this)))
      throw new WillMutateError('mutation was canceled');

    this.inFlight = true;

    if (this.button)
      this.button.disabled = true;

    for (const input of this.inputs)
      input.disabled = true;
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
      if (e instanceof WillMutateError)
        return;
      else
        throw e;
    }

    await this.mutate();
  }

  onCompleted(data: Data): void {
    this.didMutate();

    this.dispatchEvent(new MutationCompletedEvent<Data, Variables>(this, data));

    if (
      isLink(this.trigger) &&
      this.dispatchEvent(new WillNavigateEvent<Data, Variables>(this, data))
    )
      history.replaceState(data, WillNavigateEvent.type, this.href);
  }

  onError(error: ApolloError): void {
    this.didMutate();

    this.dispatchEvent(new MutationErrorEvent<Data, Variables>(this, error));
  }
}
