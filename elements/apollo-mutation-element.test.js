import './apollo-mutation-element';
import gql from 'graphql-tag';
import { litFixture, html, expect } from '@open-wc/testing';
import { client } from '../test/client';
import { stub } from 'sinon';

const getElement = ({ client, mutation, variables } = {}) => litFixture(html`
  <apollo-mutation
      .client="${client}"
      .mutation="${mutation}"
      .variables="${variables}"
  ></apollo-mutation>
`);

const awaitEvent = (type, el) => new Promise(
  resolve => el.addEventListener(type, resolve)
);

describe('<apollo-mutation>', function() {
  it('notifies on data change', async function() {
    const mutationStub = stub(client, 'mutate');
    mutationStub.resolves({ data: { messages: ['hi'] } });
    const mutation = gql`mutation { messages }`;
    const el = await getElement({ client, mutation });
    el.mutate();
    const { detail: { value } } = await awaitEvent('data-changed', el);
    expect(value).to.deep.equal({ messages: ['hi'] });
    mutationStub.restore();
  });

  it('notifies on error change', async function() {
    const el = await getElement({ client });
    el.error = 'error';
    const { detail: { value } } = await awaitEvent('error-changed', el);
    expect(value).to.equal('error');
  });

  it('notifies on loading change', async function() {
    const el = await getElement({ client });
    el.loading = true;
    const { detail: { value } } = await awaitEvent('loading-changed', el);
    expect(value).to.be.true;
  });

  it('notifies on called change', async function() {
    const el = await getElement({ client });
    el.called = true;
    const { detail: { value } } = await awaitEvent('called-changed', el);
    expect(value).to.be.true;
  });
});
