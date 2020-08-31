import { defineCE, fixture, unsafeStatic, expect, html as fhtml } from '@open-wc/testing';

import { ApolloQuery } from './apollo-query';
import { TemplateResult, html, LitElement } from 'lit-element';
import { NetworkStatus } from '@apollo/client/core';

describe('[lit-apollo] ApolloQuery', function describeApolloQuery() {
  it('is an instance of LitElement', async function() {
    class Test extends ApolloQuery<unknown, unknown> {
      set thing(v: unknown) {
        this.requestUpdate('thing', v);
      }
    }

    const tagName = defineCE(Test);
    const tag = unsafeStatic(tagName);
    const el = await fixture<Test>(fhtml`<${tag}></${tag}>`);
    expect(el).to.be.an.instanceOf(LitElement);
  });

  it('renders when networkStatus is set', async function rendersOnNetworkStatus() {
    class Test extends ApolloQuery<unknown, unknown> {
      render(): TemplateResult {
        return html`${this.networkStatus === NetworkStatus.error ? 'SUCCESS' : 'FAIL'}`;
      }

      shouldUpdate(): boolean {
        // by default, ApolloQuery only updates
        // if data error or loading are set
        return true;
      }
    }
    const tagName = defineCE(Test);
    const tag = unsafeStatic(tagName);
    const element = await fixture<Test>(fhtml`<${tag} .networkStatus="${NetworkStatus.error}"></${tag}>`);

    expect(element).shadowDom.to.equal('SUCCESS');
  });

  it('does not render by default', async function noRender() {
    class Test extends ApolloQuery<unknown, unknown> {
      render(): TemplateResult {
        return html`RENDERED`;
      }
    }

    const tagName = defineCE(Test);
    const tag = unsafeStatic(tagName);
    const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);

    expect(element).shadowDom.to.equal('');
  });

  it('does render when data is set', async function dataRender() {
    class Test extends ApolloQuery<{ test: string }, unknown> {
      render(): TemplateResult {
        return html`${this.data.test}`;
      }
    }

    const tagName = defineCE(Test);
    const tag = unsafeStatic(tagName);
    const el = await fixture<Test>(fhtml`<${tag} .data="${{ test: 'RENDERED' }}"></${tag}>`);
    expect(el).shadowDom.to.equal('RENDERED');
  });

  it('does render when error is set', async function errorRender() {
    class Test extends ApolloQuery<unknown, unknown> {
      render(): TemplateResult {
        return html`${this.error}`;
      }
    }

    const tagName = defineCE(Test);
    const tag = unsafeStatic(tagName);
    const el = await fixture<Test>(fhtml`<${tag} .error="${'ERROR'}"></${tag}>`);
    expect(el).shadowDom.to.equal('ERROR');
  });

  it('does render when loading is set', async function loadingRender() {
    class Test extends ApolloQuery<unknown, unknown> {
      render(): TemplateResult {
        return html`${this.loading ? 'SUCCESS' : 'FAIL'}`;
      }
    }

    const tagName = defineCE(Test);
    const tag = unsafeStatic(tagName);
    const el = await fixture<Test>(fhtml`<${tag} loading></${tag}>`);
    expect(el).shadowDom.to.equal('SUCCESS');
  });
});
