import { chai, expect, html } from '@open-wc/testing';
import sinonChai from 'sinon-chai';

import { ApolloElementMixin } from './apollo-element-mixin.js';
import { client } from '../test/client';
import { getElementWithLitTemplate } from '../test/helpers';

chai.use(sinonChai);

const getTemplate = tag => html`<${tag}></${tag}>`;
const getClass = () => ApolloElementMixin(HTMLElement);
const getElement = getElementWithLitTemplate({ getTemplate, getClass });

describe('ApolloElementMixin', function describeApolloElementMixin() {
  it('returns an instance of the superclass', async function returnsClass() {
    expect(await getElement()).to.be.an.instanceOf(HTMLElement);
  });

  it('sets default properties', async function setsDefaultProperties() {
    window.__APOLLO_CLIENT__ = client;
    const el = await getElement();
    expect(el.client, 'client').to.equal(client);
    expect(el.context, 'context').to.be.undefined;
    expect(el.data, 'data').to.be.undefined;
    expect(el.error, 'error').to.be.undefined;
    expect(el.loading, 'loading').to.be.undefined;
  });
});
