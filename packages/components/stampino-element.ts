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
export class StampinoElement extends HTMLElement {
  private static isQueryable(node: Node): node is (ShadowRoot|Document) {
    return 'getElementById' in node;
  }

  /** The Node that this element will render its template to. */
  private declare renderRoot: ShadowRoot|HTMLElement;

  declare renderOptions: RenderOptions;

  protected get model(): StampinoElement|unknown {
    return this;
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
      return this.querySelector('template');
    else {
      const id = this.getAttribute('template');
      if (!id)
        return null;
      const root = this.getRootNode();
      // TODO: nested / breadcrumb slots pattern a la <stripe-elements>?
      if (!StampinoElement.isQueryable(root))
        return null; // weird case, but this satisfies TS
      const maybeTemplate = root.getElementById(id);
      if (!(maybeTemplate instanceof HTMLTemplateElement))
        return null;
      else
        return maybeTemplate;
    }
  }

  constructor() {
    super();
    this.createRenderRoot();
    this.render();
  }

  private createRenderRoot(): ShadowRoot|HTMLElement {
    if (!this.hasAttribute('no-shadow'))
      this.renderRoot = this.attachShadow({ mode: 'open' });
    else {
      this.renderRoot = this.appendChild(document.createElement('div'));
      this.renderRoot.classList.add(this.getAttribute('no-shadow') || 'query-result');
    }
    return this.renderRoot;
  }

  /**
   * Call to render the element's template using the query result.
   * Rendering is synchronous and incremental.
   *
   * @summary Render the element's template with its model.
   */
  public render(): void {
    const { template, renderRoot, model, renderOptions } = this;
    if (!template || !renderRoot)
      return;
    else
      render(template, renderRoot, model, renderOptions);
  }

  /** `querySelector` within the render root. */
  public $(selector: string): Element|null {
    return this.renderRoot.querySelector(selector);
  }

  /** `querySelectorAll` within the render root. */
  public $$(selector: string): NodeList {
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
              this.removeAttribute(attr);
          } else
            this.setAttribute(attr, value.toString());
        }
        this.render();
      },
    }));
  };
}
