import type { ReactiveVar } from '@apollo/client/core';
import type { ReactiveController, ReactiveControllerHost } from 'lit';

/** Fired when a reactive variable's value changes */
export class VariableChangeEvent<T> extends Event {
  constructor(public value: T) {
    super('change');
  }
}

/**
 * Wraps a reactive variable in a reactive controller for easy integration.
 * @example Router
 *          ```js
 *          const locationVar = makeVar({ ...window.location })
 *          installRouter(loc => locationVar({ ...loc }))
 *
 *          class RouterOutlet extends LitElement {
 *            router = new ReactiveVariableController(this, locationVar)
 *
 *            render() {
 *              return html`
 *                <p>Current Path: ${this.router.value.pathname}</p>
 *              `;
 *            }
 *          }
 *          ```
 */
export class ReactiveVariableController<T> extends EventTarget implements ReactiveController {
  /** The latest value of the reactive variable */
  declare value: T;

  constructor(
    private host: ReactiveControllerHost,
    /** The reactive variable to wrap */
    public variable: ReactiveVar<T>,
  ) {
    super();
    this.host.addController(this);
    this.variable.onNextChange(this.#onNextChange);
    this.value = this.variable();
  }

  /** Convenient wrapper around reactiveVariable(newVal) */
  public set(x: T) {
    this.variable(x);
  }

  #onNextChange = (val: T) => {
    this.value = val;
    this.dispatchEvent(new VariableChangeEvent(val));
    this.host.requestUpdate();
    this.variable.onNextChange(this.#onNextChange);
  };

  /** @private*/ hostUpdate?(): unknown
}
