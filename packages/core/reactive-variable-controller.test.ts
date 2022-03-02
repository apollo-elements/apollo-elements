import { PropertyValues, ReactiveElement } from 'lit';

import { defineCE, expect, fixture } from '@open-wc/testing';

import { ReactiveVariableController, VariableChangeEvent } from './reactive-variable-controller';
import { makeVar } from '@apollo/client/core';

describe('[core] ReactiveVariableController', function() {
  describe('on a ReactiveElement that mirrors props', function() {
    class MirroringHost extends ReactiveElement {
      value?: unknown;

      variable?: ReactiveVariableController<number>;

      update(changed: PropertyValues) {
        this.value = this.variable?.value;
        super.update(changed);
      }
    }

    describe('when simply instantiating', function() {
      let element: MirroringHost;
      const variable = makeVar(0);

      beforeEach(async function setupElement() {
        const tag = defineCE(class extends MirroringHost {
          variable = new ReactiveVariableController(this, variable);
        });

        element = await fixture(`<${tag}></${tag}>`);
      });

      it('has default properties', function() {
        expect(element.value, 'value')
          .to.equal(element.variable?.value)
          .and.to.equal(0);
      });

      describe('updating the value', function() {
        let event: VariableChangeEvent<number>;
        beforeEach(async function() {
          element.variable
            ?.addEventListener('change', e => event = e as VariableChangeEvent<number>);
          variable(1);
          await element.updateComplete;
        });
        it('should update the host', function() {
          expect(element.value).to.equal(1);
        });
        it('should fire a change event', function() {
          expect(event).to.be.an.instanceof(VariableChangeEvent);
          expect(event.value)
            .to.equal(element.value)
            .and.to.equal(element.variable?.value);
        });
      });
    });
  });
});

