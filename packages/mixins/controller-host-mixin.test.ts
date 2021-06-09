import { spy, SinonSpy } from 'sinon';

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

  beforeEach(function() {
    spy(controller, 'hostUpdate');
    spy(controller, 'hostUpdated');
    spy(controller, 'hostConnected');
    spy(controller, 'hostDisconnected');
  });

  afterEach(function() {
    (controller.hostUpdate as SinonSpy).restore();
    (controller.hostUpdated as SinonSpy).restore();
    (controller.hostConnected as SinonSpy).restore();
    (controller.hostDisconnected as SinonSpy).restore();
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
      beforeEach(function() {
        spy(LitElement.prototype, 'addController');
      });
      afterEach(function() {
        (LitElement.prototype.addController as SinonSpy).restore();
      });
      beforeEach(function() {
        element.addController(controller);
      });
      it('calls superclass\' addController', function() {
        expect(LitElement.prototype.addController).to.have.been.calledWith(controller);
      });

      describe('disconnecting', function() {
        let parent: HTMLElement;
        beforeEach(function() {
          parent = element.parentElement!;
          element.remove();
        });
        it('calls hostDisconnected', function() {
          expect(controller.hostDisconnected).to.have.been.called;
        });
        describe('then reconnecting', function() {
          beforeEach(function() {
            parent.append(element);
          });
          it('calls hostConnected', function() {
            expect(controller.hostConnected).to.have.been.called;
          });
        });
      });

      describe('calling requestUpdate', function() {
        beforeEach(function() {
          spy(LitElement.prototype, 'requestUpdate');
        });
        afterEach(function() {
          (LitElement.prototype.requestUpdate as SinonSpy).restore();
        });
        beforeEach(function() {
          element.requestUpdate();
        });
        beforeEach(() => element.updateComplete);
        it('calls super', function() {
          expect(LitElement.prototype.requestUpdate).to.have.been.called;
        });
        it('updates controller', function() {
          expect(controller.hostUpdate).to.have.been.called;
        });
        it('calls updated', function() {
          expect(controller.hostUpdated).to.have.been.called;
        });
      });
      describe('removeController', function() {
        beforeEach(function() {
          spy(LitElement.prototype, 'removeController');
        });
        afterEach(function() {
          (LitElement.prototype.removeController as SinonSpy).restore();
        });
        beforeEach(function() {
          element.removeController(controller);
        });
        it('calls superclass\' removeController', function() {
          expect(LitElement.prototype.removeController).to.have.been.calledWith(controller);
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
          expect(controller.hostUpdate).to.have.been.called;
        });
        it('calls updated', function() {
          expect(controller.hostUpdated).to.have.been.called;
        });
        describe('disconnecting', function() {
          let parent: HTMLElement;
          beforeEach(function() {
            parent = element.parentElement!;
            element.remove();
          });
          it('calls hostDisconnected', function() {
            expect(controller.hostDisconnected).to.have.been.called;
          });
          describe('then reconnecting', function() {
            beforeEach(function() {
              parent.append(element);
            });
            it('calls hostConnected', function() {
              expect(controller.hostConnected).to.have.been.called;
            });
          });
        });

        describe('removeController', function() {
          beforeEach(function() {
            (controller.hostUpdate as SinonSpy).resetHistory();
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
              expect(controller.hostUpdate).to.not.have.been.called;
            });
          });
        });
      });
    });
  });
});
