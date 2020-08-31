import gql from 'graphql-tag';
import { expect, html as fhtml } from '@open-wc/testing';
import { defineCE, fixture, nextFrame, unsafeStatic } from '@open-wc/testing-helpers';
import 'sinon-chai';

import { ApolloElementMixin } from './apollo-element-mixin';
import { client } from '../test-helpers/client';

describe('[mixins] ApolloElementMixin', function describeApolloElementMixin() {
  it('returns an instance of the superclass', async function returnsClass() {
    class XL extends HTMLElement {}
    class Test extends ApolloElementMixin(XL) { }
    const tag = unsafeStatic(defineCE(Test));
    const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);
    expect(element).to.be.an.instanceOf(XL);
  });

  it('calls superclass connectedCallback when it exists', async function callsSuperConnectedCallback() {
    let calls = 0;

    class Connects extends HTMLElement {
      connectedCallback(): void {
        calls++;
      }
    }

    class Test extends ApolloElementMixin(Connects) { }

    const tag = unsafeStatic(defineCE(Test));

    const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);

    expect(element).to.be.an.instanceOf(HTMLElement);
    expect(calls).to.be.greaterThan(0);
  });

  it('calls superclass disconnectedCallback when it exists', async function notCallsSuperDisconnectedCallback() {
    let calls = 0;

    class Disconnects extends HTMLElement {
      disconnectedCallback(): void {
        calls++;
      }
    }

    class Test extends ApolloElementMixin(Disconnects) { }

    const tag = unsafeStatic(defineCE(Test));

    const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);

    element.remove();

    expect(calls).to.be.greaterThan(0);
  });

  it('does not throw if there is no connectedCallback or disconnectedCallback', async function notCallsSuperConnectedCallback() {
    class Test extends ApolloElementMixin(HTMLElement) {}

    const tag = defineCE(Test);

    const element = document.createElement(tag) as Test;

    expect(() => document.body.appendChild(element)).to.not.throw;
    expect(() => element.remove()).to.not.throw;
  });

  it('sets default properties', async function setsDefaultProperties() {
    window.__APOLLO_CLIENT__ = client;

    class Test extends ApolloElementMixin(HTMLElement) {}

    const tag = unsafeStatic(defineCE(Test));

    const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);

    expect(element.client, 'client').to.equal(client);
    expect(element.context, 'context').to.be.undefined;
    expect(element.document, 'document').to.be.null;
    expect(element.data, 'data').to.be.null;
    expect(element.error, 'error').to.be.null;
    expect(element.errors, 'errors').to.be.null;
    expect(element.loading, 'loading').to.be.false;
  });

  it('sets document based on graphql script child', async function() {
    const doc = 'query foo { bar }';
    class Test extends ApolloElementMixin(HTMLElement) {}

    const tag = unsafeStatic(defineCE(Test));

    const element = await fixture<Test>(fhtml`
      <${tag}><script type="application/graphql">${doc}</script></${tag}>
    `);

    expect(element.document).to.deep.equal(gql(doc));
  });

  it('observes children for addition of query script', async function() {
    const doc = `query newQuery { new }`;
    class Test extends ApolloElementMixin(HTMLElement) {}

    const tag = unsafeStatic(defineCE(Test));

    const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);

    expect(element.document).to.be.null;
    element.innerHTML = `<script type="application/graphql">${doc}</script>`;
    await nextFrame();
    expect(element.document).to.deep.equal(gql(doc));
  });

  it('does not change document for invalid children', async function() {
    const doc = `query newQuery { new }`;
    class Test extends ApolloElementMixin(HTMLElement) {}

    const tag = unsafeStatic(defineCE(Test));

    const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);

    expect(element.document).to.be.null;
    element.innerHTML = `<script>${doc}</script>`;
    await nextFrame();
    expect(element.document).to.be.null;
  });
});
