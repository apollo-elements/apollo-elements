import type {
  ReactiveController,
  ReactiveControllerHost,
} from '@lit/reactive-element';

import { Hook, State, hook, useState, useLayoutEffect } from 'haunted';

const microtask = Promise.resolve();

/**
 * An implementation of ReactiveControllerHost that is driven by Haunted hooks
 * and `useController()`.
 */
class HauntedControllerHost implements ReactiveControllerHost {
  declare primaryController: ReactiveController;

  #controllers: ReactiveController[] = [];

  #updatePending = true;

  #updateCompletePromise: Promise<boolean>;

  #resolveUpdate!: (value: boolean | PromiseLike<boolean>) => void;

  constructor(private count: number, private kick: (x: number) => void) {
    this.#updateCompletePromise = new Promise((res, _rej) => {
      this.#resolveUpdate = res;
    });
  }

  addController(controller: ReactiveController): void {
    this.#controllers.push(controller);
  }

  removeController(controller: ReactiveController): void {
    // Note, if the indexOf is -1, the >>> will flip the sign which makes the
    // splice do nothing.
    this.#controllers?.splice(this.#controllers.indexOf(controller) >>> 0, 1);
  }

  requestUpdate(): void {
    if (!this.#updatePending) {
      this.#updatePending = true;
      microtask.then(() => this.kick(this.count + 1));
    }
  }

  get updateComplete(): Promise<boolean> {
    return this.#updateCompletePromise;
  }

  connected() {
    this.#controllers.forEach(c => c.hostConnected?.());
  }

  disconnected() {
    this.#controllers.forEach(c => c.hostDisconnected?.());
  }

  update() {
    this.#controllers.forEach(c => c.hostUpdate?.());
  }

  updated() {
    this.#updatePending = false;
    const resolve = this.#resolveUpdate;
    // Create a new updateComplete Promise for the next update,
    // before resolving the current one.
    this.#updateCompletePromise = new Promise(res => {
      this.#resolveUpdate = res;
    });
    this.#controllers.forEach(c => c.hostUpdated?.());
    resolve(this.#updatePending);
  }
}

/**
 * Creates and stores a stateful ReactiveController instance and provides it
 * with a ReactiveControllerHost that drives the controller lifecycle.
 *
 * Use this hook to convert a ReactiveController into a Haunted hook.
 *
 * @param createController A function that creates a controller instance. This
 * function is given a HauntedControllerHost to pass to the controller. The
 * create function is only called once per component.
 */
export function useController <C extends ReactiveController>(
  createController: (host: ReactiveControllerHost) => C
): C {
  const [count, kick] = useState(0);

  const [host] = useState(() => {
    const host = new HauntedControllerHost(count, kick);
    const controller = createController(host);
    host.primaryController = controller;
    host.connected();
    return host;
  });

  // We use useLayoutEffect because we need updated() called synchronously
  // after rendering.
  useLayoutEffect(() => host.updated());

  // Returning a cleanup function simulates hostDisconnected timing. An empty
  // deps array tells Haunted to only call this once: on mount with the cleanup
  // called on unmount.
  useLayoutEffect(() => () => host.disconnected(), []);

  host.update();

  return host.primaryController as C;
}
