import { fixture, html, expect, oneEvent } from '@open-wc/testing';

import './apollo-subscription';
import { client } from '@apollo-elements/test-helpers/client';

import type { PolymerApolloSubscription } from './apollo-subscription';
import type { NormalizedCacheObject } from 'apollo-cache-inmemory';
import type { ApolloClient } from 'apollo-client';
import type { DocumentNode } from 'graphql';

interface TemplateOpts {
  client?: ApolloClient<NormalizedCacheObject>;
  subscription?: DocumentNode;
  variables?: unknown;
}

async function getElement(opts?: TemplateOpts): Promise<PolymerApolloSubscription<unknown, unknown>> {
  return await fixture<PolymerApolloSubscription<unknown, unknown>>(html`
    <apollo-subscription
        .client="${opts?.client}"
        .subscription="${opts?.subscription}"
        .variables="${opts?.variables}"
    ></apollo-subscription>
  `);
}

describe('[polymer] <apollo-subscription>', function() {
  it('caches observed properties', async function() {
    const el = await getElement();
    const err = new Error('error');
    el.data = 'data';
    el.error = err;
    el.loading = true;
    expect(el.data).to.equal('data');
    expect(el.error).to.equal(err);
    expect(el.loading).to.equal(true);
  });

  it('notifies on data change', async function() {
    const el = await getElement({ client });
    const data = { messages: ['hi'] };
    setTimeout(() => el.data = data);
    const { detail: { value } } = await oneEvent(el, 'data-changed');
    expect(value).to.deep.equal(data);
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
});
