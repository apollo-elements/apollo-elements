import { chai, expect, defineCE, fixture, unsafeStatic, aTimeout, html } from '@open-wc/testing';
import sinonChai from 'sinon-chai';
import { chaiDomEquals } from '@open-wc/chai-dom-equals';

import { ApolloElement } from './apollo-element';

chai.use(sinonChai);

chai.use(chaiDomEquals);

describe('ApolloElement', function describeApolloElement() {
  it('renders when client is set', async function rendersOnClient() {
    const tagName = defineCE(class extends ApolloElement {
      render() {
        const { test = 'FAIL' } = this.client || {};
        return html`${test}`;
      }
    });
    const tag = unsafeStatic(tagName);
    const el = await fixture(html`<${tag} .client="${{ test: 'CLIENT' }}"></${tag}>`);
    await aTimeout(1500);
    expect(el).shadowDom.to.equal('CLIENT');
  });

  it('renders when data is set', async function rendersOnData() {
    const tagName = defineCE(class extends ApolloElement {
      render() {
        const { foo = 'FAIL' } = this.data || {};
        return html`${foo}`;
      }
    });
    const tag = unsafeStatic(tagName);
    const el = await fixture(html`<${tag} .data="${{ foo: 'bar' }}"></${tag}>`);
    await aTimeout(1500);
    expect(el).shadowDom.to.equal('bar');
  });

  it('renders when error is set', async function rendersOnError() {
    const tagName = defineCE(class extends ApolloElement {
      render() {
        const { error = 'FAIL' } = this;
        return html`${error}`;
      }
    });
    const tag = unsafeStatic(tagName);
    const el = await fixture(html`<${tag} .error="${'error'}"></${tag}>`);
    expect(el).shadowDom.to.equal('error');
  });

  it('renders when loading is set', async function rendersOnLoading() {
    const tagName = defineCE(class extends ApolloElement {
      render() {
        const { loading = false } = this;
        return html`${loading ? 'LOADING' : 'FAIL'}`;
      }
    });
    const tag = unsafeStatic(tagName);
    const el = await fixture(html`<${tag} .loading="${true}"></${tag}>`);
    expect(el).shadowDom.to.equal('LOADING');
  });
});
