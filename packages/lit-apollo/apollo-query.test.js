import { chai, defineCE, fixture, unsafeStatic, expect, html } from '@open-wc/testing';
import sinonChai from 'sinon-chai';

import { ApolloQuery } from './apollo-query';

chai.use(sinonChai);

describe('ApolloQuery', function describeApolloQuery() {
  it('renders when networkStatus is set', async function rendersOnNetworkStatus() {
    const tagName = defineCE(class extends ApolloQuery {
      render() {
        const { networkStatus = 0 } = this;
        return html`${networkStatus ? 'SUCCESS' : 'FAIL'}`;
      }

      shouldUpdate() {
        // by default, ApolloQuery only updates
        // if data error or loading are set
        return true;
      }
    });
    const tag = unsafeStatic(tagName);
    const el = await fixture(html`<${tag} networkStatus="1"></${tag}>`);
    expect(el).shadowDom.to.equal('SUCCESS');
  });

  it('does not render by default', async function noRender() {
    const tagName = defineCE(class extends ApolloQuery {
      render() {
        return html`RENDERED`;
      }
    });
    const tag = unsafeStatic(tagName);
    const el = await fixture(html`<${tag}></${tag}>`);
    expect(el).shadowDom.to.equal('');
  });

  it('does render when data is set', async function dataRender() {
    const tagName = defineCE(class extends ApolloQuery {
      render() {
        return html`${this.data.test}`;
      }
    });
    const tag = unsafeStatic(tagName);
    const el = await fixture(html`<${tag} .data="${{ test: 'RENDERED' }}"></${tag}>`);
    expect(el).shadowDom.to.equal('RENDERED');
  });

  it('does render when error is set', async function errorRender() {
    const tagName = defineCE(class extends ApolloQuery {
      render() {
        return html`${this.error}`;
      }
    });
    const tag = unsafeStatic(tagName);
    const el = await fixture(html`<${tag} .error="${'ERROR'}"></${tag}>`);
    expect(el).shadowDom.to.equal('ERROR');
  });

  it('does render when loading is set', async function loadingRender() {
    const tagName = defineCE(class extends ApolloQuery {
      render() {
        return html`${this.loading ? 'SUCCESS' : 'FAIL'}`;
      }
    });
    const tag = unsafeStatic(tagName);
    const el = await fixture(html`<${tag} loading></${tag}>`);
    expect(el).shadowDom.to.equal('SUCCESS');
  });
});
