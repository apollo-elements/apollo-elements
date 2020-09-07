import type { ApolloError } from '@apollo/client/core';

import {
  ApolloMutation,
  TemplateResult,
  html,
  customElement,
  property,
  queryAssignedNodes,
} from '@apollo-elements/lit-apollo';

function isButton(node: Element): node is ButtonLikeElement {
  return node.tagName.toLowerCase().includes('button');
}

function isLink(node: Element): node is HTMLAnchorElement {
  return node instanceof HTMLAnchorElement;
}

const refetchQueriesConverter = {
  fromAttribute(string: string): string[] {
    return (
        !string ? undefined
      : string
        .split(',')
        .map(x => x.trim())
        .filter(Boolean)
    );
  },
  toAttribute(value: string[]): string {
    return Array.isArray(value) ? value.join(',') : null;
  },
};

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
 * @fires will-mutate When the element is about to mutate. Usefull for setting variables. Prevent default to prevent mutation
 * @fires mutation-completed When the mutation resolves. `detail` is `{ data: TData }`
 * @fires mutation-navigation When the mutation resolves and the element is about to navigate. cancel the event to handle navigation yourself e.g. using a client-side router. . `detail` is `{ data: TData }`
 * @fires mutation-error When the mutation is rejected. `detail` is `{ error: ApolloError }`
 *
 * @example <caption>Using data attributes</caption>
 * ```html
 * <apollo-mutation data-type="Type" data-action="ACTION">
 *   <mwc-button slot="trigger">OK</mwc-button>
 * </apollo-mutation>
 * ```
 *
 * @example <caption>Using data attributes and variables</caption>
 * ```html
 * <apollo-mutation data-type="Type" data-action="ACTION">
 *   <mwc-button slot="trigger">OK</mwc-button>
 *   <mwc-textfield slot="variable" value="Hey!" data-variable="comment">OK</mwc-textfield>
 * </apollo-mutation>
 * <!-- variables: { comment: "Hey!" } -->
 * ```
 *
 * @example <caption>Using data attributes and variables with input property</caption>
 * ```html
 * <apollo-mutation data-type="Type" data-action="ACTION" input-key="input">
 *   <mwc-button slot="trigger">OK</mwc-button>
 *   <mwc-textfield slot="variable" value="Hey!" data-variable="comment">OK</mwc-textfield>
 * </apollo-mutation>
 * <!-- variables: { input: { comment: "Hey!" } } -->
 * ```
 *
 * @example <caption>Using property</caption>
 * ```js
 * html`
 * <apollo-mutation
 *     .mutation="${SomeMutation}"
 *     .variables="${{ type: "Type", action: "ACTION" }}">
 *   <mwc-button slot="trigger">OK</mwc-button>
 * </apollo-mutation>
 * ```
 */
@customElement('apollo-mutation')
export class ApolloMutationElement<Data, Variables> extends ApolloMutation<Data, Variables> {
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

  @property({ attribute: 'refetch-queries', converter: refetchQueriesConverter })
  refetchQueries: string[] = null;

  /**
   * For Mutations that should trigger navigations,
   * a function of `data` to determine the href.
   */
  @property({ attribute: false }) routeGetter: (data: unknown) => string;

  @queryAssignedNodes('trigger') private triggerNodes: NodeListOf<HTMLElement>;

  @queryAssignedNodes('variable') private variableNodes: NodeListOf<InputLikeElement>;

  private inFlight = false;

  #variables: Variables;

  // @ts-expect-error: ambient property. see https://github.com/microsoft/TypeScript/issues/40220
  get variables(): Variables {
    const input = this.#variables ?? {
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
    this.#variables = v;
  }

  private get trigger(): HTMLElement {
    const [node] = this.triggerNodes;
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

  shouldUpdate(): boolean {
    return true;
  }

  render(): TemplateResult {
    return html`
      <slot name="trigger" @slotchange="${this.onSlotchange}"></slot>
      <slot name="variable"></slot>
    `;
  }

  private onSlotchange(): void {
    this.button?.addEventListener?.('click', this.onClick.bind(this));
  }

  private willMutate(): void {
    if (!this.dispatchEvent(new CustomEvent('will-mutate')))
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
      const { refetchQueries } = this;
      this.willMutate();
      await this.mutate({ refetchQueries });
    } catch (e) {
      if (!(e instanceof WillMutateError))
        throw e;
    } finally {
      this.didMutate();
    }
  }

  onCompleted(data: Data): void {
    const init = { detail: { data } };
    this.dispatchEvent(new CustomEvent('mutation-completed', init));
    if (isLink(this.trigger) && this.dispatchEvent(new CustomEvent('mutation-navigation', init)))
      history.replaceState(data, 'mutation-navigation', this.href);
  }

  onError(error: ApolloError): void {
    const init = { detail: error, bubbles: true, composed: true };
    this.dispatchEvent(new CustomEvent('mutation-error', init));
  }
}

export type WillMutateEvent<T = unknown, V = unknown> =
  CustomEvent & {
    target: ApolloMutationElement<T, V>;
    originalTarget: ApolloMutationElement<T, V>;
  };

export type MutationErrorEvent<T = unknown, V = unknown> =
  CustomEvent<{ error: ApolloError }> & {
    target: ApolloMutationElement<T, V>;
    originalTarget: ApolloMutationElement<T, V>;
  }

export type MutationCompletedEvent<T = unknown, V = unknown> =
  CustomEvent<{ data: T }> & {
    target: ApolloMutationElement<T, V>;
    originalTarget: ApolloMutationElement<T, V>;
  }

interface ButtonLikeElement extends HTMLElement {
  disabled: boolean;
}

interface InputLikeElement extends HTMLElement {
  value: string;
  disabled: boolean;
}

declare global {
  interface HTMLElementEventMap {
    'will-mutate': WillMutateEvent;
    'mutation-completed': MutationCompletedEvent;
    'mutation-navigation': MutationCompletedEvent;
    'mutation-error': MutationErrorEvent;
  }
}
