import { fixture, defineCE, expect, html, unsafeStatic } from '@open-wc/testing';

import 'sinon-chai';

import { StampinoRender, property } from './stampino-render';
import { TemplateHandlers, evaluateTemplate } from 'stampino';

describe('[components] StampinoRender', function() {
  describe('basic instance', function() {
    let element: StampinoRender;

    beforeEach(async function() {
      const tag = defineCE(class extends StampinoRender {});
      element = await fixture(`
        <${tag}>
          <p>light content</p>
          <template>
            <p class="shadow">shadow content</p>
          </template>
        </${tag}>
      `);
    });

    it('renders to shadow DOM', function() {
      expect(element.template).to.be.an.instanceof(HTMLTemplateElement);
      expect(element.querySelectorAll('p').length).to.equal(1);
      expect(element.shadowRoot!.querySelectorAll('p').length).to.equal(1);
      expect(element.$$('.shadow').length).to.equal(1);
    });

    it('does not clobber light DOM', function() {
      expect(element.querySelectorAll('p').length).to.equal(1);
    });

    it('does not render to light DOM', function() {
      expect(element.querySelectorAll('.output').length).to.equal(0);
    });
  });

  describe('with template having expressions and some initial data', function() {
    let element: StampinoRender;

    beforeEach(async function() {
      const tag = defineCE(class extends StampinoRender {});
      element = await fixture(`
        <${tag}>
          <template>
            <span id="initial">{{ initial }}</span>
            <span id="updated">{{ updated }}</span>
          </template>
        </${tag}>
      `);
      element.update({ initial: 'initial' });
    });

    it('renders initial data', function() {
      expect(element.$('#initial')!.textContent, 'initial').to.equal('initial');
      expect(element.$('#updated')!.textContent, 'updated').to.equal('');
    });

    describe('when calling update({ updated: \'updated\' })', function() {
      beforeEach(function() {
        element.update({ updated: 'updated' });
      });

      it('renders both initial and updated data', function() {
        expect(element.$('#initial')!.textContent, 'initial').to.equal('initial');
        expect(element.$('#updated')!.textContent, 'updated').to.equal('updated');
      });
    });

    describe('when calling update({ updated: \'updated\' }, { overwrite: true })', function() {
      beforeEach(function() {
        element.update({ updated: 'updated' }, { overwrite: true });
      });

      it('renders only updated data', function() {
        expect(element.$('#initial')!.textContent, 'initial').to.equal('');
        expect(element.$('#updated')!.textContent, 'updated').to.equal('updated');
      });
    });
  });

  describe('with no template', function() {
    let element: StampinoRender;

    beforeEach(async function() {
      const tag = defineCE(class extends StampinoRender {});
      element = await fixture(`
        <${tag}>
          <p>light content</p>
        </${tag}>
      `);
    });

    it('creates an empty shadow root', function() {
      expect(element.template).to.be.null;
      expect(element.querySelectorAll('p').length).to.equal(1);
      expect(element.shadowRoot!.children.length).to.equal(0);
    });
  });

  describe('with empty template attribute', function() {
    let element: StampinoRender;

    beforeEach(async function() {
      const tag = defineCE(class extends StampinoRender {});
      element = await fixture(`
        <${tag} template="">
          <p>light content</p>
        </${tag}>
      `);
    });

    it('does not render', function() {
      expect(element.template).to.be.null;
      expect(element.querySelectorAll('p').length).to.equal(1);
      expect(element.shadowRoot!.children.length).to.equal(0);
    });
  });

  describe('with template referred by ID', function() {
    let element: StampinoRender;
    let template: HTMLTemplateElement;

    beforeEach(async function() {
      template = document.createElement('template');
      template.id = 'the-template';
      template.innerHTML = `<p>hi</p>`;
      document.body.appendChild(template);
      const tag = defineCE(class extends StampinoRender {});
      element = await fixture(`
        <${tag} template="the-template">
          <p>light content</p>
        </${tag}>
      `);
    });

    afterEach(function() {
      document.getElementById('the-template')?.remove?.();
    });

    it('renders to the shadow DOM', function() {
      expect(element.template).to.equal(template);
      expect(element.querySelectorAll('p').length).to.equal(1);
      expect(element.shadowRoot!.querySelectorAll('p').length).to.equal(1);
    });
  });

  describe('with template attribute referring to non-template', function() {
    let element: StampinoRender;
    let template: HTMLDivElement;

    beforeEach(async function() {
      template = document.createElement('div');
      template.id = 'the-template';
      template.innerHTML = `<p>hi</p>`;
      document.body.appendChild(template);
      const tag = defineCE(class extends StampinoRender {});
      element = await fixture(`
        <${tag} template="the-template">
          <p>light content</p>
        </${tag}>
      `);
    });

    afterEach(function() {
      document.getElementById('the-template')?.remove?.();
    });

    it('does not render to the shadow DOM', function() {
      expect(element.template).to.be.null;
      expect(element.querySelectorAll('p').length).to.equal(1);
      expect(element.shadowRoot!.children.length).to.equal(0);
    });
  });

  describe('with no-shadow attribute', function() {
    let element: StampinoRender;

    beforeEach(async function() {
      const tag = defineCE(class extends StampinoRender {});
      element = await fixture(`
        <${tag} no-shadow>
          <p>light content</p>
          <template>
            <p>rendered content</p>
          </template>
        </${tag}>
      `);
    });

    it('renders to light DOM', function() {
      expect(element.querySelectorAll('p').length).to.equal(2);
    });

    it('renders template to output div', function() {
      expect(element.querySelectorAll('.output').length).to.equal(1);
    });
  });

  describe('with no-shadow attribute set as className', function() {
    let element: StampinoRender;

    beforeEach(async function() {
      const tag = defineCE(class extends StampinoRender {});
      element = await fixture(`
        <${tag} no-shadow="content">
          <p>light content</p>
          <template>
            <p>rendered content</p>
          </template>
        </${tag}>
      `);
    });

    it('renders to light DOM', function() {
      expect(element.querySelectorAll('p').length).to.equal(2);
    });

    it('renders template to output div', function() {
      expect(element.querySelectorAll('.output').length).to.equal(0);
      expect(element.querySelectorAll('.content').length).to.equal(1);
    });
  });

  describe('with templateHandlers', function() {
    let element: StampinoRender;

    beforeEach(async function() {
      const tag = defineCE(class extends StampinoRender {
        templateHandlers: TemplateHandlers = {
          'echo': (template, model, handlers, renderers) => {
            return [
              evaluateTemplate(template, model, handlers, renderers),
              evaluateTemplate(template, model, handlers, renderers),
            ];
          },
        };
      });

      element = await fixture(`
        <${tag}>
          <p>light content</p>
          <template>
            <p>shadow content</p>
            <template type="echo">
              <p class="doubled">custom doubled content</p>
            </template>
          </template>
        </${tag}>
      `);
    });

    it('uses handlers from templateHandlers', function() {
      expect(element.querySelectorAll('p').length, 'light content').to.equal(1);
      expect(element.$$('p').length, 'total shadow content').to.equal(3);
      expect(element.$$('.doubled').length, 'doubled content').to.equal(2);
    });
  });

  describe('with extras', function() {
    let element: StampinoRender;

    beforeEach(async function() {
      const def = defineCE(class extends StampinoRender { });

      const tag = unsafeStatic(def);

      element = await fixture(html`
        <${tag} .extras="${{
          methodOnExtras(x = 0) {
            return x + 1;
          },
        }}">
          <template>
            <output>{{ methodOnExtras(propOnModel) }}</output>
          </template>
        </${tag}>
      `);
    });

    it('gets extras', function() {
      expect(element.extras?.methodOnExtras(1)).to.equal(2);
    });

    it('renders nothing in output', function() {
      expect(element.$('output')!.innerHTML).to.equal('1');
    });

    describe('then calling update', function() {
      beforeEach(function() {
        element.update({ propOnModel: 1 });
      });

      it('renders a number in output', function() {
        expect(element.$('output')!.innerHTML).to.equal('2');
      });
    });
  });

  describe('extending to use `model` prop', function() {
    let element: StampinoRender & { m: any };

    beforeEach(async function() {
      const tag = defineCE(class extends StampinoRender {
        get m() { return this.model; }

        set m(v) { this.model = v; }
      });

      element = await fixture(`<${tag}></${tag}>`);
    });

    it('gets initial model', function() {
      expect(element.m).to.be.empty;
    });

    describe('calling update', function() {
      beforeEach(function() {
        element.update({ a: 1 });
      });

      it('gets updated model', function() {
        expect(element.m.a).to.equal(1);
      });

      describe('calling update(x, { overwrite: true })', function() {
        beforeEach(function() {
          element.update({ b: 2 }, { overwrite: true });
        });
        it('resets model', function() {
          expect(element.m.a).to.not.be.ok;
          expect(element.m.b).to.equal(2);
        });
      });

      describe('calling update(x, { overwrite: false })', function() {
        beforeEach(function() {
          element.update({ b: 2 }, { overwrite: false });
        });
        it('merges model', function() {
          expect(element.m.a).to.equal(1);
          expect(element.m.b).to.equal(2);
        });
      });
      describe('setting extras', function() {
        beforeEach(function() {
          element.extras = {
            inc(x: number) { return x + 1; },
          };
        });

        it('gets updated model', function() {
          expect(element.m.inc(element.m.a)).to.equal(2);
        });
      });

      describe('setting m', function() {
        beforeEach(function() {
          element.m = { c: 2 };
        });
        it('updates model', function() {
          expect(element.m).to.deep.equal({ c: 2 });
        });
      });
    });
  });

  describe('with observed, reflecting properties', function() {
    class Test extends StampinoRender {
      @property({ reflect: true, init: false }) reflect = false;

      @property({ reflect: true, init: 'string' }) string: string|null = 'string';
    }

    let element: Test;

    beforeEach(async function() {
      const tag = defineCE(class extends Test {});

      element = await fixture<Test>(`
        <${tag}>
          <p>light content</p>
          <template>
            <p class="shadow">shadow content</p>
            <p class="reflect">{{ reflect }}</p>
            <p class="string">{{ string }}</p>
          </template>
        </${tag}>
      `);
    });

    describe('setting the boolean property', function() {
      beforeEach(function() {
        element.reflect = true;
      });

      it('sets the attribute', function() {
        expect(element.hasAttribute('reflect')).to.be.true;
      });

      it('renders the template', function() {
        expect(element.$('.reflect')!.textContent).to.equal('true');
      });

      describe('then unsetting the property', function() {
        beforeEach(function() {
          element.reflect = false;
        });

        it('sets the attribute', function() {
          expect(element.hasAttribute('reflect')).to.be.false;
        });

        it('renders the template', function() {
          expect(element.$('.reflect')!.textContent).to.equal('false');
        });
      });
    });

    describe('setting the string property', function() {
      beforeEach(function() {
        element.string = 'set';
      });

      it('sets the attribute', function() {
        expect(element.getAttribute('string')).to.equal('set');
      });

      it('renders the template', function() {
        expect(element.$('.string')!.textContent).to.equal('set');
      });

      describe('then nullifying the property', function() {
        beforeEach(function() {
          element.string = null;
        });

        it('sets the attribute', function() {
          expect(element.hasAttribute('string')).to.be.false;
        });

        it.skip('renders the template', function() {
          expect(element.$('.string')!.textContent).to.equal('');
        });
      });
    });
  });
});
