import './apollo-query-element';
import gql from 'graphql-tag';
import { litFixture, html, expect } from '@open-wc/testing';
import { client } from '../test/client';
import { stub } from 'sinon';

const getElement = ({ client, query, variables } = {}) => litFixture(html`
  <apollo-query
      .client="${client}"
      .query="${query}"
      .variables="${variables}"
  ></apollo-query>
`);

const awaitEvent = (type, el) => new Promise(
  resolve => el.addEventListener(type, resolve)
);

describe('<apollo-query>', function() {
  it('notifies on data change', async function() {
    const queryStub = stub(client, 'query');
    queryStub.resolves({ data: { messages: ['hi'] } });
    const query = gql`query { messages }`;
    const el = await getElement({ client });
    el.executeQuery({ query });
    const { detail: { value } } = await awaitEvent('data-changed', el);
    expect(value).to.deep.equal({ messages: ['hi'] });
    queryStub.restore();
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
});
