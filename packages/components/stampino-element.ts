/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types */
import type { RenderOptions } from 'stampino';
import { render } from 'stampino';
import { effect } from '@apollo-elements/lib/descriptors';

interface PropertyOptions {
  attribute?: string,
  reflect?: boolean,
  init?: any
}

/**
 * @element
 *
 * @attr {Boolean|string} 'no-shadow' - When set, the element will render to a `<div>` in its light DOM. If set with a string, the string will be the div's class name.
 */
export class StampinoElement<Model extends object = any> extends HTMLElement {
  private static isQueryable(node: Node): node is (ShadowRoot|Document) {
    return 'getElementById' in node;
  }

  declare renderOptions: RenderOptions;

  #extras: Partial<Model>|null = null;

  public get extras(): Partial<Model>|null {
    return this.#extras;
  }

  public set extras(extras: Partial<Model>|null) {
    this.#extras = extras;
    this.render();
  }

  /** The Node that this element will render its template to. */
  protected declare renderRoot: ShadowRoot|HTMLElement;

  #model: Model|null = null;

  protected get model(): StampinoElement|Model {
    return this.#model ?? this;
  }

  protected set model(x: StampinoElement|Model) {
    if (x instanceof StampinoElement)
      return;
    this.#model = x;
  }

  /**
   * Template element to render. Can either be a light-DOM child of the element,
   * or referenced by ID with the `template` attribute.
   *
   * Templates are [stampino](https://npm.im/stampino) templates using [jexpr](https://npm.im/jexpr)
   * @attr template
   * @example Referencing a template by ID
   * ```html
   * <stampino-element template="tpl"></stampino-element>
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

  constructor() {
    super();
    this.createRenderRoot();
  }

  connectedCallback(): void {
    this.render();
  }

  private getElementByIdFromRoot(id: string|null): HTMLElement | null {
    // TODO: make actually private in TS 4.3
    const root = this.getRootNode();
    if (!id || !StampinoElement.isQueryable(root))
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

  protected createRenderRoot(): ShadowRoot|HTMLElement {
    if (!this.hasAttribute('no-shadow'))
      this.renderRoot = this.attachShadow({ mode: 'open' });
    else {
      this.renderRoot = this.appendChild(document.createElement('div'));
      this.renderRoot.classList.add(this.getAttribute('no-shadow') || 'output');
    }
    return this.renderRoot;
  }

  /**
   * Call to render the element's template using the model.
   * Rendering is synchronous and incremental.
   *
   * @summary Render the element's template with its model.
   */
  public render(): void {
    if (this.template && this.renderRoot) {
      const { extras, model } = this;
      render(
        this.template,
        this.renderRoot,
        { ...model, ...extras },
        this.renderOptions
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

/* eslint-disable @typescript-eslint/no-explicit-any */

export function property({ attribute, reflect = false, init = null }: PropertyOptions = {}) {
  return function<T extends HTMLElement & { render(): void }>(
    target: T,
    name: keyof T extends string ? keyof T : never,
  ): void {
    Object.defineProperty(target, name, effect<T>({
      name,
      init,
      onSet(value: any) {
        const attr = attribute ?? name;
        if (reflect) {
          if (typeof value === 'boolean') {
            if (value)
              this.setAttribute(attr, '');
            else
              this.removeAttribute(attr); /* c8 ignore next */
          } else {
            if (value != null)
              this.setAttribute(attr, value.toString()); /* c8 ignore next */
            else
              this.removeAttribute(attr);
          }
        }
        this.render();
      },
    }));
  };
}
