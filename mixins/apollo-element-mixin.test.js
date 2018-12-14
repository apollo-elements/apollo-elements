import gql from 'graphql-tag';
import { chai, expect, html } from '@open-wc/testing';
import { aTimeout, nextFrame } from '@open-wc/testing-helpers';
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

  it('sets document based on graphql script child', async function() {
    const doc = 'query foo { bar }';
    const getScriptyEl = getElementWithLitTemplate({
      getClass,
      getTemplate(tag) {
        return html`<${tag}><script type="application/graphql">${doc}</script></${tag}>`;
      },
    });
    const el = await getScriptyEl();
    expect(el.document).to.equal(gql(doc));
  });

  it('observes children for addition of query script', async function() {
    const doc = `query newQuery { new }`;
    const el = await getElement();
    expect(el.document).to.be.null;
    el.innerHTML = `<script type="application/graphql">${doc}</script>`;
    await nextFrame();
    expect(el.document).to.equal(gql(doc));
  });
});
