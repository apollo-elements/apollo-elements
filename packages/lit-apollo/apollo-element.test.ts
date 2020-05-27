import { expect, defineCE, fixture, unsafeStatic, aTimeout, html as fixtureHtml } from '@open-wc/testing';

import { ApolloElement } from './apollo-element';
import { TemplateResult, html, LitElement } from 'lit-element';

describe('[lit-apollo] ApolloElement', function describeApolloElement() {
  it('is an instance of LitElement', async function() {
    const tagName = defineCE(class Test extends ApolloElement {
      set thing(v: any) { this.requestUpdate('thing', v); }
    });
    const tag = unsafeStatic(tagName);
    const el = await fixture(fixtureHtml`<${tag}></${tag}>`);
    expect(el).to.be.an.instanceOf(LitElement);
  });

  it('renders when client is set', async function rendersOnClient() {
    const tagName = defineCE(class Test extends ApolloElement {
      render(): TemplateResult {
        const { test = 'FAIL' } = (this.client || { }) as { test: string };
        return html`${test}`;
      }
    });
    const tag = unsafeStatic(tagName);
    const el = await fixture<ApolloElement>(fixtureHtml`<${tag} .client="${{ test: 'CLIENT' }}"></${tag}>`);
    await aTimeout(1500);
    expect(el).shadowDom.to.equal('CLIENT');
  });

  it('renders when data is set', async function rendersOnData() {
    const tagName = defineCE(class Test extends ApolloElement {
      data: {foo?: string}

      render(): TemplateResult { return html`${this.data?.foo ?? 'FAIL'}`; }
    });
    const tag = unsafeStatic(tagName);
    const el = await fixture(fixtureHtml`<${tag} .data="${{ foo: 'bar' }}"></${tag}>`);
    await aTimeout(1500);
    expect(el).shadowDom.to.equal('bar');
  });

  it('renders when error is set', async function rendersOnError() {
    const tagName = defineCE(class Test extends ApolloElement {
      render(): TemplateResult { return html`${this.error ?? 'FAIL'}`; }
    });
    const tag = unsafeStatic(tagName);
    const el = await fixture(fixtureHtml`<${tag} .error="${'error'}"></${tag}>`);
    expect(el).shadowDom.to.equal('error');
  });

  it('renders when loading is set', async function rendersOnLoading() {
    const tagName = defineCE(class Test extends ApolloElement {
      render(): TemplateResult { return html`${this.loading ?? false ? 'LOADING' : 'FAIL'}`; }
    });
    const tag = unsafeStatic(tagName);
    const el = await fixture(fixtureHtml`<${tag} .loading="${true}"></${tag}>`);
    expect(el).shadowDom.to.equal('LOADING');
  });
});
