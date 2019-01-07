import { litFixture, html, expect } from '@open-wc/testing';
import gql from 'graphql-tag';
import { stub } from 'sinon';

import './apollo-query';
import { client } from '@apollo-elements/test-helpers/client';

const getElement = ({ client, query, variables } = {}) => litFixture(html`
  <apollo-query
      .client="${client}"
      .query="${query}"
      .variables="${variables}"
  ></apollo-query>
`);

describe('<apollo-query>', function() {
  it('caches observed properties', async function() {
    const el = await getElement();
    el.data = 'data';
    el.error = 'error';
    el.loading = true;
    el.networkStatus = 1;
    expect(el.data).to.equal('data');
    expect(el.error).to.equal('error');
    expect(el.loading).to.equal(true);
    expect(el.networkStatus).to.equal(1);
  });

  it('notifies on data change', async function() {
    const queryStub = stub(client, 'query');
    queryStub.resolves({ data: { messages: ['hi'] } });
    const query = gql`query { messages }`;
    const el = await getElement({ client });
    el.addEventListener('data-changed', ({ detail: { value } }) => {
      expect(value).to.deep.equal({ messages: ['hi'] });
      queryStub.restore();
    });
    el.executeQuery({ query });
  });

  it('notifies on error change', async function() {
    const el = await getElement({ client });
    el.addEventListener('called-changed', ({ detail: { value } }) => {
      expect(value).to.equal('error');
    });
    el.error = 'error';
  });

  it('notifies on loading change', async function() {
    const el = await getElement({ client });
    el.addEventListener('loading-changed', ({ detail: { value } }) => {
      expect(value).to.be.true;
    });
    el.loading = true;
  });
});
