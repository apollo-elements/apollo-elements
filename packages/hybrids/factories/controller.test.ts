import type { ReactiveController, ReactiveControllerHost } from '@lit/reactive-element';

import { nextFrame, expect, fixture } from '@open-wc/testing';
import { define, html, Hybrids } from 'hybrids';

import { controller, HybridsControllerHost } from './controller';

import { spy } from 'sinon';

let counter = 0;

function getTagName(): string {
  const tagName = `controller-element-${counter}`;
  counter++;
  return tagName;
}

describe('[hybrids] HybridsControllerHost', function() {
  it('aliases EventTarget to host element', function() {
    const element = document.createElement('a');
    const host = new HybridsControllerHost(element);
    const s = spy();
    host.addEventListener('a', s);
    const a = new CustomEvent('a');
    element.dispatchEvent(a);
    expect(s).to.have.been.calledWith(a);
    host.removeEventListener('a', s);
    s.resetHistory();
  });
});

describe('[hybrids] controller factory', function() {
  describe('with ClockController example from lit.dev', function() {
    class ClockController implements ReactiveController {
      value = new Date(0);

      #timerID?: number;

      constructor(public host: ReactiveControllerHost, public timeout = 1000) {
        this.host.addController(this);
        this.value.setSeconds(0);
      }

      async tick() {
        this.value.setSeconds(this.value.getSeconds() + 1);
        this.host.requestUpdate();
        await nextFrame();
        await this.host.updateComplete;
      }

      hostConnected() {
        this.#timerID = setInterval(() => {
          this.value = new Date();
          this.host.requestUpdate();
        }, this.timeout) as unknown as number;
      }

      hostDisconnected() {
        clearInterval(this.#timerID);
        this.#timerID = undefined;
      }
    }

    let element: HTMLElement & { clock: ClockController };

    beforeEach(async function() {
      const name = getTagName();

      define(name, {
        clock: controller(ClockController, 100000000),
        render: host => html`<output>${host.clock.value.getSeconds()}</output>`,
      } as Hybrids<{ clock: ClockController }>);

      element = await fixture(`<${name}></${name}>`);
    });

    describe('initially', function() {
      it('renders the clock\'s time', function() {
        expect(element).shadowDom.to.equal(`<output>0</output>`);
      });
    });

    describe('after one tick', function() {
      beforeEach(() => element.clock.tick());
      it('renders the new time', function() {
        expect(element).shadowDom.to.equal(`<output>1</output>`);
      });
    });

    describe('then removing the controller', function() {
      beforeEach(function() {
        element.clock.host.removeController(element.clock);
      });

      describe('then after one second', function() {
        beforeEach(() => element.clock.tick());
        it('renders the old time', function() {
          expect(element).shadowDom.to.equal(`<output>0</output>`);
        });
      });
    });
  });
});
