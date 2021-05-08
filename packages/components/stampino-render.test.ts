import { fixture, defineCE, expect, nextFrame } from '@open-wc/testing';

import { property } from 'lit/decorators.js';

import { StampinoRender } from './stampino-render';
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
      expect(element.shadowRoot?.mode).to.equal('open');
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
      const tag = defineCE(class extends StampinoRender {
        initial = 'initial';
      });
      element = await fixture(`
        <${tag}>
          <template>
            <span id="initial">{{ initial }}</span>
          </template>
        </${tag}>
      `);
    });

    it('renders initial data', function() {
      expect(element.$('#initial')!.textContent, 'initial').to.equal('initial');
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

  describe('with observed, reflecting properties', function() {
    class Test extends StampinoRender {
      @property({ type: Boolean, reflect: true }) reflect = false;

      @property({ reflect: true }) string: string|null = 'string';
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

      beforeEach(nextFrame);

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

        beforeEach(nextFrame);

        it('unsets the attribute', function() {
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

      beforeEach(nextFrame);

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

        beforeEach(nextFrame);

        it('unsets the attribute', function() {
          expect(element.hasAttribute('string')).to.be.false;
        });

        it('renders the template', function() {
          expect(element.$('.string')!.textContent).to.equal('');
        });
      });
    });
  });
});
