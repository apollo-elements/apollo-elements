import { defineCE, expect, fixture, html as fhtml, unsafeStatic } from '@open-wc/testing';

import { ApolloQuery } from './apollo-query';
import { client } from '../test-helpers';

import { html } from 'lit-html';

import NoParamQuery from '@apollo-elements/test-helpers/NoParam.query.graphql';

describe('[gluon] ApolloQuery', function describeApolloQuery() {
  it('caches observed properties', async function cachesObservedProperties() {
    class Test extends ApolloQuery<unknown, unknown> {
    }

    const tag = unsafeStatic(defineCE(Test));

    const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);

    const err = new Error('error');

    const query = NoParamQuery;

    element.client = client;
    expect(element.client).to.equal(client);

    element.data = 'data';
    expect(element.data).to.equal('data');

    element.error = err;
    expect(element.error).to.equal(err);

    element.loading = true;
    expect(element.loading).to.equal(true);

    element.networkStatus = 1;
    expect(element.networkStatus).to.equal(1);

    element.query = query;
    expect(element.query).to.equal(query);
  });

  it('renders on set "data"', async function() {
    class Test extends ApolloQuery<unknown, unknown> {
      get template() {
        return html`${this.data}`;
      }
    }

    const tag = unsafeStatic(defineCE(Test));

    const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);

    element.data = 'hi';

    await element.render();

    expect(element).shadowDom.to.equal('hi');
  });

  it('renders on set "error"', async function() {
    class Test extends ApolloQuery<unknown, unknown> {
      get template() {
        return html`${this.error?.message}`;
      }
    }

    const tag = unsafeStatic(defineCE(Test));

    const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);

    element.error = new Error('hi');

    await element.render();

    expect(element).shadowDom.to.equal('hi');
  });

  it('renders on set "loading"', async function() {
    class Test extends ApolloQuery<unknown, unknown> {
      get template() {
        return html`${this.loading}`;
      }
    }

    const tag = unsafeStatic(defineCE(Test));

    const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);

    element.loading = true;

    await element.render();

    expect(element).shadowDom.to.equal('true');
  });

  it('renders on set "query"', async function() {
    class Test extends ApolloQuery<unknown, unknown> {
      get template() {
        return html`${this.query?.loc?.source?.body ?? ''}`;
      }
    }

    const tag = unsafeStatic(defineCE(Test));

    const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);

    element.query = NoParamQuery;

    await element.render();

    expect(element).shadowDom.to.equal(NoParamQuery.loc.source.body);
  });

  it('renders on set "networkStatus"', async function() {
    class Test extends ApolloQuery<unknown, unknown> {
      get template() {
        return html`${this.networkStatus}`;
      }
    }

    const tag = unsafeStatic(defineCE(Test));

    const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);

    element.networkStatus = 5;

    await element.render();

    expect(element).shadowDom.to.equal('5');
  });
});
