import { chai, defineCE, unsafeStatic, fixture, expect, html } from '@open-wc/testing';
import sinonChai from 'sinon-chai';

import { ApolloMutation } from './apollo-mutation';

chai.use(sinonChai);

describe('ApolloMutation', function describeApolloMutation() {
  it('renders when called is set', async function rendersOnCalled() {
    const tagName = defineCE(class extends ApolloMutation {
      render() {
        const { called = false } = this;
        return html`${called ? 'CALLED' : 'FAIL'}`;
      }
    });
    const tag = unsafeStatic(tagName);
    const el = await fixture(html`<${tag} .called="${true}"></${tag}>`);
    expect(el).shadowDom.to.equal('CALLED');
  });
});
