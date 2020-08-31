import { expect, defineCE, fixture, unsafeStatic, aTimeout, html as fixtureHtml } from '@open-wc/testing';

import { ApolloElement } from './apollo-element';
import { TemplateResult, html, LitElement } from 'lit-element';

describe('[lit-apollo] ApolloElement', function describeApolloElement() {
  it('is an instance of LitElement', async function() {
    class Test extends ApolloElement {
      set thing(v: unknown) {
        this.requestUpdate('thing', v);
      }
    }

    const tagName = defineCE(Test);
    const tag = unsafeStatic(tagName);
    const element = await fixture<Test>(fixtureHtml`<${tag}></${tag}>`);
    expect(element).to.be.an.instanceOf(LitElement);
  });

  it('renders when client is set', async function rendersOnClient() {
    class Test extends ApolloElement {
      render(): TemplateResult {
        const { test = 'FAIL' } = (this.client || { }) as { test: string };
        return html`${test}`;
      }
    }
    const tagName = defineCE(Test);
    const tag = unsafeStatic(tagName);
    const element = await fixture<Test>(fixtureHtml`<${tag} .client="${{ test: 'CLIENT' }}"></${tag}>`);
    await aTimeout(1500);
    expect(element).shadowDom.to.equal('CLIENT');
  });

  it('renders when data is set', async function rendersOnData() {
    class Test extends ApolloElement {
      render(): TemplateResult {
        return html`${this.data?.foo ?? 'FAIL'}`;
      }
    }

    const tagName = defineCE(Test);
    const tag = unsafeStatic(tagName);
    const element = await fixture<Test>(fixtureHtml`<${tag} .data="${{ foo: 'bar' }}"></${tag}>`);
    await aTimeout(1500);
    expect(element).shadowDom.to.equal('bar');
  });

  it('renders when error is set', async function rendersOnError() {
    class Test extends ApolloElement {
      render(): TemplateResult { return html`${this.error ?? 'FAIL'}`; }
    }

    const tagName = defineCE(Test);
    const tag = unsafeStatic(tagName);
    const element = await fixture<Test>(fixtureHtml`<${tag} .error="${'error'}"></${tag}>`);
    expect(element).shadowDom.to.equal('error');
  });

  it('renders when loading is set', async function rendersOnLoading() {
    class Test extends ApolloElement {
      render(): TemplateResult { return html`${this.loading ?? false ? 'LOADING' : 'FAIL'}`; }
    }

    const tagName = defineCE(Test);
    const tag = unsafeStatic(tagName);
    const element = await fixture<Test>(fixtureHtml`<${tag} .loading="${true}"></${tag}>`);
    expect(element).shadowDom.to.equal('LOADING');
  });
});
