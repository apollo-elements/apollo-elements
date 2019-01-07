import gql from 'graphql-tag';
import { chai, expect, html } from '@open-wc/testing';
import { nextFrame } from '@open-wc/testing-helpers';
import { spy, stub } from 'sinon';
import sinonChai from 'sinon-chai';

import { ApolloElementMixin } from './apollo-element-mixin.js';
import { client } from '@apollo-elements/test-helpers/client';
import { getElementWithLitTemplate } from '@apollo-elements/test-helpers/helpers';

chai.use(sinonChai);

const getTemplate = tag => html`<${tag}></${tag}>`;
const getClass = () => ApolloElementMixin(HTMLElement);
const getElement = getElementWithLitTemplate({ getTemplate, getClass });

describe('ApolloElementMixin', function describeApolloElementMixin() {
  it('returns an instance of the superclass', async function returnsClass() {
    const element = await getElement();
    expect(element).to.be.an.instanceOf(HTMLElement);
  });

  it('calls superclass connectedCallback when it exists', async function callsSuperConnectedCallback() {
    const superclass = class extends HTMLElement {
      connectedCallback() { }
    };
    const ccSpy = spy(superclass.prototype, 'connectedCallback');
    const getClass = () => ApolloElementMixin(superclass);
    await getElementWithLitTemplate({ getClass, getTemplate })();
    expect(ccSpy).to.have.been.called;
  });

  it('does not call superclass connectedCallback when it does not exists', async function notCallsSuperConnectedCallback() {
    const superclass = class extends HTMLElement {
      get connectedCallback() {
        return null;
      }

      set connectedCallback(v) {
        this._connectedCallback = v;
      }
    };
    const ccStub = stub(superclass.prototype, 'connectedCallback');
    const getClass = () => ApolloElementMixin(superclass);
    await getElementWithLitTemplate({ getClass, getTemplate })();
    // code finds function, calls it and throws
    expect(ccStub).to.not.have.been.called;
  });

  it('calls superclass disconnectedCallback when it exists', async function notCallsSuperDisconnectedCallback() {
    const superclass = class extends HTMLElement {
      disconnectedCallback() { }
    };
    const dcSpy = spy(superclass.prototype, 'disconnectedCallback');
    const getClass = () => ApolloElementMixin(superclass);
    const getElement =
      getElementWithLitTemplate({ getClass, getTemplate });
    const element = await getElement();
    element.remove();
    expect(dcSpy).to.have.been.called;
  });

  it('does not call superclass disconnectedCallback when it does not exists', async function notCallsSuperDisconnectedCallback() {
    const superclass = class extends HTMLElement {
      get disconnectedCallback() {
        return null;
      }

      set disconnectedCallback(v) {
        this._disconnectedCallback = v;
      }
    };
    const dsStub = stub(superclass.prototype, 'disconnectedCallback');
    const getClass = () => ApolloElementMixin(superclass);
    const getElement =
      getElementWithLitTemplate({ getClass, getTemplate });
    const element = await getElement();
    element.remove();
    // code finds function, calls it and throws
    expect(dsStub).to.not.have.been.called;
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
    expect(el.document).to.deep.equal(gql(doc));
  });

  it('observes children for addition of query script', async function() {
    const doc = `query newQuery { new }`;
    const el = await getElement();
    expect(el.document).to.be.null;
    el.innerHTML = `<script type="application/graphql">${doc}</script>`;
    await nextFrame();
    expect(el.document).to.deep.equal(gql(doc));
  });

  it('does not change document for invalid children', async function() {
    const doc = `query newQuery { new }`;
    const el = await getElement();
    expect(el.document).to.be.null;
    el.innerHTML = `<script>${doc}</script>`;
    await nextFrame();
    expect(el.document).to.be.null;
  });
});
