import type { Hybrids } from 'hybrids';
import type { ReactiveControllerHost } from '@lit/reactive-element';

import { HybridsControllerHost } from './factories/controller';

/**
 * Hybrids Element as controller host
 *
 * Spread into your hybrids to implement the
 * [ReactiveControllerHost](https://lit.dev/docs/composition/controllers/#controller-host-api)
 * interface on your Hybrid element.
 */
export const Host: Hybrids<ReactiveControllerHost & {
  controllerHost: ReactiveControllerHost
}> = {
  controllerHost: { get: (_, last) => last ?? new HybridsControllerHost() },
  updateComplete: { get: host => host.controllerHost.updateComplete ?? Promise.resolve(true) },
  requestUpdate: { get: host => () => host.controllerHost.requestUpdate() },
  addController: { get: host => x => host.controllerHost.addController(x) },
  removeController: { get: host => x => host.controllerHost.removeController(x) },
};
