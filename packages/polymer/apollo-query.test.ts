import { fixture, html, expect, oneEvent } from '@open-wc/testing';
import gql from 'graphql-tag';
import { stub } from 'sinon';

import './apollo-query';
import { client } from '../test-helpers/client';
import type { PolymerApolloQuery } from './apollo-query';
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core';
import { DocumentNode, GraphQLError } from 'graphql';


interface TemplateOpts {
  client?: ApolloClient<NormalizedCacheObject>;
  query?: DocumentNode;
  variables?: unknown;
}

async function getElement(opts?: TemplateOpts): Promise<PolymerApolloQuery<unknown, unknown>> {
  return await fixture(html`
    <apollo-query
        .client="${opts?.client}"
        .query="${opts?.query}"
        .variables="${opts?.variables}"
    ></apollo-query>
  `);
}

describe('[polymer] <apollo-query>', function() {
  it('caches observed properties', async function() {
    const el = await getElement();
    const err = new Error('error');
    el.data = 'data';
    el.error = err;
    el.loading = true;
    el.networkStatus = 1;
    expect(el.data).to.equal('data');
    expect(el.error).to.equal(err);
    expect(el.loading).to.equal(true);
    expect(el.networkStatus).to.equal(1);
  });

  it('notifies on data change', async function() {
    const queryStub = stub(client, 'query');
    queryStub.resolves({ loading: false, partial: undefined, networkStatus: 7, data: { messages: ['hi'] } });
    const query = gql`query { messages }`;
    const el = await getElement({ client });
    setTimeout(() => el.executeQuery({ query }));
    const { detail: { value } } = await oneEvent(el, 'data-changed');
    expect(value).to.deep.equal({ messages: ['hi'] });
    queryStub.restore();
  });

  it('notifies on error change', async function() {
    const el = await getElement({ client });
    const err = new Error('error');
    setTimeout(() => el.error = err);
    const { detail: { value } } = await oneEvent(el, 'error-changed');
    expect(value).to.equal(err);
  });

  it('notifies on errors change', async function() {
    const el = await getElement({ client });
    const errs = [new GraphQLError('error')];
    setTimeout(() => el.errors = errs);
    const { detail: { value } } = await oneEvent(el, 'errors-changed');
    expect(value).to.equal(errs);
  });

  it('notifies on loading change', async function() {
    const el = await getElement({ client });
    setTimeout(() => el.loading = true);
    const { detail: { value } } = await oneEvent(el, 'loading-changed');
    expect(value).to.be.true;
  });
});
