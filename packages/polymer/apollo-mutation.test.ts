import { fixture, html, expect, oneEvent } from '@open-wc/testing';
import gql from 'graphql-tag';
import { stub } from 'sinon';

import './apollo-mutation';
import { client } from '../test-helpers/client';

import type { PolymerApolloMutation } from './apollo-mutation';
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core';
import type { DocumentNode } from 'graphql';

interface TemplateOpts {
  client?: ApolloClient<NormalizedCacheObject>;
  mutation?: DocumentNode;
  variables?: unknown;
}

async function getElement(opts?: TemplateOpts): Promise<PolymerApolloMutation<unknown, unknown>> {
  return await fixture(html`
    <apollo-mutation
        .client="${opts?.client}"
        .mutation="${opts?.mutation}"
        .variables="${opts?.variables}"
    ></apollo-mutation>
  `);
}

describe('[polymer] <apollo-mutation>', function() {
  it('caches observed properties', async function() {
    const err = new Error('error');
    const el = await getElement();
    el.called = true;
    el.data = 'data';
    el.error = err;
    el.loading = true;
    expect(el.called).to.equal(true);
    expect(el.data).to.equal('data');
    expect(el.error).to.equal(err);
    expect(el.loading).to.equal(true);
  });

  it('notifies on data change', async function() {
    const mutationStub = stub(client, 'mutate');
    mutationStub.resolves({ data: { messages: ['hi'] } });
    const mutation = gql`mutation { messages }`;
    const el = await getElement({ client, mutation });
    el.mutate();
    const { detail: { value } } = await oneEvent(el, 'data-changed');
    expect(value).to.deep.equal({ messages: ['hi'] });
    mutationStub.restore();
  });

  it('notifies on error change', async function() {
    const el = await getElement({ client });
    const err = new Error('error');
    setTimeout(() => el.error = err);
    const { detail: { value } } = await oneEvent(el, 'error-changed');
    expect(value).to.equal(err);
  });

  it('notifies on loading change', async function() {
    const el = await getElement({ client });
    setTimeout(() => el.loading = true);
    const { detail: { value } } = await oneEvent(el, 'loading-changed');
    expect(value).to.be.true;
  });

  it('notifies on called change', async function() {
    const el = await getElement({ client });
    setTimeout(() => el.called = true);
    const { detail: { value } } = await oneEvent(el, 'called-changed');
    expect(value).to.be.true;
  });
});
