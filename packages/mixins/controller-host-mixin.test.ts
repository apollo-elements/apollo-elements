import * as hanbi from 'hanbi';

import { defineCE, expect, fixture, nextFrame } from '@open-wc/testing';

import { html as h, unsafeStatic } from 'lit/static-html.js';

import { ControllerHostMixin } from './controller-host-mixin';

import { LitElement, ReactiveController } from 'lit';

describe('ControllerHostMixin', function() {
  class TestController implements ReactiveController {
    hostUpdate() { null; }
    hostUpdated() { null; }
    hostConnected() { null; }
    hostDisconnected() { null; }
  }

  const controller = new TestController();
  let hostUpdateSpy: ReturnType<typeof hanbi.stubMethod>;
  let hostUpdatedSpy: ReturnType<typeof hanbi.stubMethod>;
  let hostConnectedSpy: ReturnType<typeof hanbi.stubMethod>;
  let hostDisconnectedSpy: ReturnType<typeof hanbi.stubMethod>;

  beforeEach(function() {
    hostUpdateSpy = hanbi.stubMethod(controller, 'hostUpdate').passThrough();
    hostUpdatedSpy = hanbi.stubMethod(controller, 'hostUpdated').passThrough();
    hostConnectedSpy = hanbi.stubMethod(controller, 'hostConnected').passThrough();
    hostDisconnectedSpy = hanbi.stubMethod(controller, 'hostDisconnected').passThrough();
  });

  afterEach(function() {
    hostUpdateSpy.restore();
    hostUpdatedSpy.restore();
    hostConnectedSpy.restore();
    hostDisconnectedSpy.restore();
  });

  describe('on ReactiveElement', function() {
    class Test extends ControllerHostMixin(LitElement) { }

    let element: Test;

    beforeEach(async function() {
      const tag = unsafeStatic(defineCE(class extends Test { }));
      element = await fixture<Test>(h`<${tag}></${tag}>`);
    });

    afterEach(function clearFixture() {
      element?.remove?.();
      // @ts-expect-error: just to clear the fixture
      element = undefined;
    });

    describe('addController', function() {
      let addControllerSpy: ReturnType<typeof hanbi.stubMethod>;
      beforeEach(function() {
        addControllerSpy = hanbi.stubMethod(LitElement.prototype, 'addController').passThrough();
      });
      afterEach(function() {
        addControllerSpy.restore();
      });
      beforeEach(function() {
        element.addController(controller);
      });
      it('calls superclass\' addController', function() {
        expect(addControllerSpy.called).to.be.true;
        expect(addControllerSpy.lastCall.args[0]).to.equal(controller);
      });

      describe('disconnecting', function() {
        let parent: HTMLElement;
        beforeEach(function() {
          parent = element.parentElement!;
          element.remove();
        });
        it('calls hostDisconnected', function() {
          expect(hostDisconnectedSpy.called).to.be.true;
        });
        describe('then reconnecting', function() {
          beforeEach(function() {
            parent.append(element);
          });
          it('calls hostConnected', function() {
            expect(hostConnectedSpy.called).to.be.true;
          });
        });
      });

      describe('calling requestUpdate', function() {
        let requestUpdateSpy: ReturnType<typeof hanbi.stubMethod>;
        beforeEach(function() {
          requestUpdateSpy = hanbi.stubMethod(LitElement.prototype, 'requestUpdate').passThrough();
        });
        afterEach(function() {
          requestUpdateSpy.restore();
        });
        beforeEach(function() {
          element.requestUpdate();
        });
        beforeEach(() => element.updateComplete);
        it('calls super', function() {
          expect(requestUpdateSpy.called).to.be.true;
        });
        it('updates controller', function() {
          expect(hostUpdateSpy.called).to.be.true;
        });
        it('calls updated', function() {
          expect(hostUpdatedSpy.called).to.be.true;
        });
      });
      describe('removeController', function() {
        let removeControllerSpy: ReturnType<typeof hanbi.stubMethod>;
        beforeEach(function() {
          removeControllerSpy = hanbi.stubMethod(LitElement.prototype, 'removeController').passThrough();
        });
        afterEach(function() {
          removeControllerSpy.restore();
        });
        beforeEach(function() {
          element.removeController(controller);
        });
        it('calls superclass\' removeController', function() {
          expect(removeControllerSpy.called).to.be.true;
          expect(removeControllerSpy.lastCall.args[0]).to.equal(controller);
        });
      });
    });
  });

  describe('on HTMLElement', function() {
    class Test extends ControllerHostMixin(HTMLElement) { }

    let element: Test;

    beforeEach(async function() {
      const tag = unsafeStatic(defineCE(class extends Test { }));
      element = await fixture<Test>(h`<${tag}></${tag}>`);
    });

    afterEach(function clearFixture() {
      element?.remove?.();
      // @ts-expect-error: just to clear the fixture
      element = undefined;
    });

    describe('addController', function() {
      beforeEach(function() {
        element.addController(controller);
      });
      describe('calling requestUpdate', function() {
        beforeEach(function() {
          element.requestUpdate();
        });
        beforeEach(nextFrame);
        it('updates controller', function() {
          expect(hostUpdateSpy.called).to.be.true;
        });
        it('calls updated', function() {
          expect(hostUpdatedSpy.called).to.be.true;
        });
        describe('disconnecting', function() {
          let parent: HTMLElement;
          beforeEach(function() {
            parent = element.parentElement!;
            element.remove();
          });
          it('calls hostDisconnected', function() {
            expect(hostDisconnectedSpy.called).to.be.true;
          });
          describe('then reconnecting', function() {
            beforeEach(function() {
              parent.append(element);
            });
            it('calls hostConnected', function() {
              expect(hostConnectedSpy.called).to.be.true;
            });
          });
        });

        describe('removeController', function() {
          beforeEach(function() {
            hostUpdateSpy.reset();
          });
          beforeEach(function() {
            element.removeController(controller);
          });
          describe('calling requestUpdate', function() {
            beforeEach(function() {
              element.requestUpdate();
            });
            beforeEach(nextFrame);
            it('does not update controller', function() {
              expect(hostUpdateSpy.called).to.be.false;
            });
          });
        });
      });
    });
  });
});
