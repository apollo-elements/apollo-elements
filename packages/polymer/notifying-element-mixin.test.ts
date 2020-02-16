import { NotifyingElementMixin } from './notifying-element-mixin';
import { defineCE, fixture, html, oneEvent, expect, unsafeStatic } from '@open-wc/testing';

/* eslint-disable @typescript-eslint/no-empty-function */
describe('[polymer] NotifyingElementMixin', function describeNotifyingElementMixin() {
  describe('notify', function() {
    class NotifyingEl extends NotifyingElementMixin(HTMLElement) {
      _prop = false

      get prop(): boolean { return this._prop; }

      set prop(v) {
        this._prop = v;
        this.notify('prop', v);
      }
    }

    let el;

    beforeEach(async function() {
      const tag = unsafeStatic(defineCE(NotifyingEl));
      el = await fixture(html`<${tag}></${tag}>`);
    });

    it('fires event on set', async function() {
      setTimeout(() => el.prop = true);
      const { detail: { value } } = await oneEvent(el, 'prop-changed');
      expect(value).to.be.true;
    });
  });
});
