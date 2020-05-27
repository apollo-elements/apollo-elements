import { defineCE, fixture, unsafeStatic, expect, html as fixtureHtml } from '@open-wc/testing';

import { ApolloQuery } from './apollo-query';
import { TemplateResult, html, LitElement } from 'lit-element';

describe('[lit-apollo] ApolloQuery', function describeApolloQuery() {
  it('is an instance of LitElement', async function() {
    const tagName = defineCE(class Test extends ApolloQuery<{}, {}> {
      set thing(v: any) {
        // @ts-expect-error
        this.requestUpdate('thing', v);
      }
    });
    const tag = unsafeStatic(tagName);
    const el = await fixture(fixtureHtml`<${tag}></${tag}>`);
    expect(el).to.be.an.instanceOf(LitElement);
  });

  it('renders when networkStatus is set', async function rendersOnNetworkStatus() {
    const tagName = defineCE(class Test extends ApolloQuery<{}, {}> {
      render(): TemplateResult {
        const { networkStatus = 0 } = this;
        return html`${networkStatus ? 'SUCCESS' : 'FAIL'}`;
      }

      shouldUpdate(): boolean {
        // by default, ApolloQuery only updates
        // if data error or loading are set
        return true;
      }
    });
    const tag = unsafeStatic(tagName);
    const el = await fixture(fixtureHtml`<${tag} networkStatus="1"></${tag}>`);
    expect(el).shadowDom.to.equal('SUCCESS');
  });

  it('does not render by default', async function noRender() {
    const tagName = defineCE(class Test extends ApolloQuery<{}, {}> {
      render(): TemplateResult {
        return html`RENDERED`;
      }
    });
    const tag = unsafeStatic(tagName);
    const el = await fixture(fixtureHtml`<${tag}></${tag}>`);
    expect(el).shadowDom.to.equal('');
  });

  it('does render when data is set', async function dataRender() {
    const tagName = defineCE(class Test extends ApolloQuery<{ test: string }, {}> {
      render(): TemplateResult {
        return html`${this.data.test}`;
      }
    });
    const tag = unsafeStatic(tagName);
    const el = await fixture(fixtureHtml`<${tag} .data="${{ test: 'RENDERED' }}"></${tag}>`);
    expect(el).shadowDom.to.equal('RENDERED');
  });

  it('does render when error is set', async function errorRender() {
    const tagName = defineCE(class Test extends ApolloQuery<{}, {}> {
      render(): TemplateResult {
        return html`${this.error}`;
      }
    });
    const tag = unsafeStatic(tagName);
    const el = await fixture(fixtureHtml`<${tag} .error="${'ERROR'}"></${tag}>`);
    expect(el).shadowDom.to.equal('ERROR');
  });

  it('does render when loading is set', async function loadingRender() {
    const tagName = defineCE(class Test extends ApolloQuery<{}, {}> {
      render(): TemplateResult {
        return html`${this.loading ? 'SUCCESS' : 'FAIL'}`;
      }
    });
    const tag = unsafeStatic(tagName);
    const el = await fixture(fixtureHtml`<${tag} loading></${tag}>`);
    expect(el).shadowDom.to.equal('SUCCESS');
  });
});
