import { defineCE, expect, fixture, html as fhtml, unsafeStatic } from '@open-wc/testing';

import { ApolloMutation } from './apollo-mutation';

import NoParamMutation from '../test-helpers/NoParam.mutation.graphql';

import { html } from '@gluon/gluon';

describe('[gluon] ApolloMutation', function describeApolloMutation() {
  it('caches observed properties', async function cachesObserveProperties() {
    class Test extends ApolloMutation<unknown, unknown> {
    }

    const tag = unsafeStatic(defineCE(Test));

    const el = await fixture<Test>(fhtml`<${tag}></${tag}>`);

    const err = new Error('error');

    const client = null;

    const mutation = NoParamMutation;

    el.called = true;
    expect(el.called, 'called').to.be.true;

    el.client = client;
    expect(el.client, 'client').to.equal(client);

    el.data = 'data';
    expect(el.data, 'data').to.equal('data');

    el.error = err;
    expect(el.error, 'error').to.equal(err);

    el.loading = true;
    expect(el.loading, 'loading').to.be.true;

    el.mutation = mutation;
    expect(el.mutation, 'mutation').to.equal(mutation);
  });

  it('renders on set "called"', async function() {
    class Test extends ApolloMutation<unknown, unknown> {
      get template() {
        return html`${this.called}`;
      }
    }

    const tag = unsafeStatic(defineCE(Test));

    const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);

    element.called = true;

    await element.render();

    expect(element).shadowDom.to.equal('true');
  });
});
