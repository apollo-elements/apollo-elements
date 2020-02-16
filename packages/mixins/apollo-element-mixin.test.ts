import gql from 'graphql-tag';
import { expect, html as fixtureHtml } from '@open-wc/testing';
import { nextFrame } from '@open-wc/testing-helpers';
import { spy, stub } from 'sinon';
import 'sinon-chai';

import { ApolloElementMixin } from './apollo-element-mixin';
import { client } from '@apollo-elements/test-helpers/client';
import { getElementWithLitTemplate } from '@apollo-elements/test-helpers/helpers';
import { ApolloElement } from './apollo-element';


const getTemplate =
  (tag: string): ReturnType<typeof fixtureHtml> =>
    fixtureHtml`<${tag}></${tag}>`;

const getClass = () =>
  class extends ApolloElementMixin(HTMLElement) {};

const getElement =
  getElementWithLitTemplate<HTMLElement & ApolloElement<unknown>>({ getTemplate, getClass });

type MixedElement = InstanceType<ReturnType<typeof ApolloElementMixin>>
describe('[mixins] ApolloElementMixin', function describeApolloElementMixin() {
  it('returns an instance of the superclass', async function returnsClass() {
    const element = await getElement();
    expect(element).to.be.an.instanceOf(HTMLElement);
  });

  it('calls superclass connectedCallback when it exists', async function callsSuperConnectedCallback() {
    class SuperClass extends HTMLElement { connectedCallback(): void { '💩'; } }
    const ccSpy = spy(SuperClass.prototype, 'connectedCallback');
    const getClass = (): ReturnType<typeof ApolloElementMixin> => ApolloElementMixin(SuperClass);
    await getElementWithLitTemplate({ getClass, getTemplate })();
    expect(ccSpy).to.have.been.called;
  });

  it('does not call superclass connectedCallback when it does not exists', async function notCallsSuperConnectedCallback() {
    class SuperClass extends HTMLElement {
      get connectedCallback(): null { return null; }

      set connectedCallback(_) { '💩'; }
    }
    const ccStub = stub(SuperClass.prototype, 'connectedCallback');
    const getClass = (): ReturnType<typeof ApolloElementMixin> => ApolloElementMixin(SuperClass);
    await getElementWithLitTemplate({ getClass, getTemplate })();
    // code finds function, calls it and throws
    expect(ccStub).to.not.have.been.called;
  });

  it('calls superclass disconnectedCallback when it exists', async function notCallsSuperDisconnectedCallback() {
    class SuperClass extends HTMLElement { disconnectedCallback(): void { '💩'; } }
    const dcSpy = spy(SuperClass.prototype, 'disconnectedCallback');
    const getClass = (): ReturnType<typeof ApolloElementMixin> => ApolloElementMixin(SuperClass);
    const getElement = getElementWithLitTemplate({ getClass, getTemplate });
    const element = await getElement();
    element.remove();
    expect(dcSpy).to.have.been.called;
  });

  it('does not call superclass disconnectedCallback when it does not exists', async function notCallsSuperDisconnectedCallback() {
    class SuperClass extends HTMLElement {
      get disconnectedCallback(): null { return null; }

      set disconnectedCallback(_) { '💩'; }
    }
    const dsStub = stub(SuperClass.prototype, 'disconnectedCallback');
    const getClass = (): ReturnType<typeof ApolloElementMixin> => ApolloElementMixin(SuperClass);
    const getElement = getElementWithLitTemplate({ getClass, getTemplate });
    const element = await getElement();
    element.remove();
    // code finds function, calls it and throws
    expect(dsStub).to.not.have.been.called;
  });

  it('sets default properties', async function setsDefaultProperties() {
    window.__APOLLO_CLIENT__ = client;
    const el = await getElement() as MixedElement;
    expect(el.client, 'client').to.equal(client);
    expect(el.context, 'context').to.be.undefined;
    expect(el.data, 'data').to.be.undefined;
    expect(el.error, 'error').to.be.undefined;
    expect(el.loading, 'loading').to.be.undefined;
  });

  it('sets document based on graphql script child', async function() {
    const doc = 'query foo { bar }';
    const getTemplate = (tag: string): ReturnType<typeof fixtureHtml> =>
      fixtureHtml`<${tag}><script type="application/graphql">${doc}</script></${tag}>`;
    const getScriptyEl = getElementWithLitTemplate({ getClass, getTemplate });
    const el = await getScriptyEl() as MixedElement;
    expect(el.document).to.deep.equal(gql(doc));
  });

  it('observes children for addition of query script', async function() {
    const doc = `query newQuery { new }`;
    const el = await getElement() as MixedElement;
    expect(el.document).to.be.null;
    el.innerHTML = `<script type="application/graphql">${doc}</script>`;
    await nextFrame();
    expect(el.document).to.deep.equal(gql(doc));
  });

  it('does not change document for invalid children', async function() {
    const doc = `query newQuery { new }`;
    const el = await getElement() as MixedElement;
    expect(el.document).to.be.null;
    el.innerHTML = `<script>${doc}</script>`;
    await nextFrame();
    expect(el.document).to.be.null;
  });
});
