/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types */
import type { TemplateHandlers } from 'stampino';
import { ReactiveElement, PropertyValues } from '@lit/reactive-element';
import { render } from 'stampino';
import { bound } from '@apollo-elements/lib/bound';

/**
 * @element
 *
 * @attr {Boolean|string} 'no-shadow' - When set, the element will render to a `<div>` in its light DOM. If set with a string, the string will be the div's class name.
 */
export class StampinoRender extends ReactiveElement {
  private static isQueryable(node: Node): node is (ShadowRoot|Document) {
    return 'getElementById' in node;
  }

  declare templateHandlers: TemplateHandlers;

  /**
   * Template element to render. Can either be a light-DOM child of the element,
   * or referenced by ID with the `template` attribute.
   *
   * Templates are [stampino](https://npm.im/stampino) templates using [jexpr](https://npm.im/jexpr)
   * @attr template
   * @example Referencing a template by ID
   * ```html
   * <stampino-render template="tpl"></stampino-render>
   * <template id="tpl">
   *   <p>Hi, {{ data.name }}</p>
   * </template>
   * ```
   */
  get template(): HTMLTemplateElement | null {
    if (!this.hasAttribute('template'))
      return this.querySelector('template'); /* c8 ignore next */
    else
      return this.getTemplateFromRoot();
  }

  protected createRenderRoot(): ShadowRoot|HTMLElement {
    if (!this.hasAttribute('no-shadow'))
      return this.attachShadow({ mode: 'open' }); /* c8 ignore next */
    else {
      const root = this.appendChild(document.createElement('div'));
      root.classList.add(this.getAttribute('no-shadow') || 'output');
      return root;
    }
  }

  protected update(changed: PropertyValues<this>): void {
    this.render();
    super.update(changed);
  }

  private getElementByIdFromRoot(id: string|null): HTMLElement | null {
    // TODO: make actually private in TS 4.3
    const root = this.getRootNode();
    if (!id || !StampinoRender.isQueryable(root))
      return null;
    else
      return root.getElementById(id);
  }

  private getTemplateFromRoot(): HTMLTemplateElement | null {
    // TODO: make actually private in TS 4.3
    const maybeTemplate =
      this.getElementByIdFromRoot(this.getAttribute('template'));
    if (maybeTemplate instanceof HTMLTemplateElement)
      return maybeTemplate;
    else
      return null;
  }

  /**
   * Call to render the element's template using the model.
   * Rendering is synchronous and incremental.
   *
   * @summary Render the element's template with its model.
   */
  @bound public render(): void {
    if (this.template && this.renderRoot) {
      render(
        this.template,
        this.renderRoot as HTMLElement,
        this,
        this.templateHandlers
      );
    }
  }

  /** `querySelector` within the render root. */
  public $<E extends Element = Element>(selector: string): E | null

  public $<K extends keyof SVGElementTagNameMap>(selector: K): SVGElementTagNameMap[K] | null;

  public $<K extends keyof HTMLElementTagNameMap>(selector: K): HTMLElementTagNameMap[K] | null {
    return this.renderRoot.querySelector(selector);
  }

  /** `querySelectorAll` within the render root. */

  public $$<E extends Element = Element>(selector: string): NodeListOf<E>;

  public $$<K extends keyof SVGElementTagNameMap>(selector: K): NodeListOf<SVGElementTagNameMap[K]>;

  public $$<K extends keyof HTMLElementTagNameMap>(
    selector: K
  ): NodeListOf<HTMLElementTagNameMap[K]> {
    return this.renderRoot.querySelectorAll(selector);
  }
}
