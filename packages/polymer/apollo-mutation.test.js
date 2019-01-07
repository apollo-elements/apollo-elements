import { fixture, html, expect } from '@open-wc/testing';
import gql from 'graphql-tag';
import { stub } from 'sinon';

import './apollo-mutation';
import { client } from '@apollo-elements/test-helpers/client';

const getElement = ({ client, mutation, variables } = {}) => fixture(html`
  <apollo-mutation
      .client="${client}"
      .mutation="${mutation}"
      .variables="${variables}"
  ></apollo-mutation>
`);

describe('<apollo-mutation>', function() {
  it('caches observed properties', async function() {
    const el = await getElement();
    el.called = true;
    el.data = 'data';
    el.error = 'error';
    el.loading = true;
    expect(el.called).to.equal(true);
    expect(el.data).to.equal('data');
    expect(el.error).to.equal('error');
    expect(el.loading).to.equal(true);
  });

  it('notifies on data change', async function() {
    const mutationStub = stub(client, 'mutate');
    mutationStub.resolves({ data: { messages: ['hi'] } });
    const mutation = gql`mutation { messages }`;
    const el = await getElement({ client, mutation });
    el.mutate();
    el.addEventListener('data-changed', ({ detail: { value } }) => {
      expect(value).to.deep.equal({ messages: ['hi'] });
      mutationStub.restore();
    });
  });

  it('notifies on error change', async function() {
    const el = await getElement({ client });
    el.addEventListener('error-changed', ({ detail: { value } }) => {
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

  it('notifies on called change', async function() {
    const el = await getElement({ client });
    el.addEventListener('called-changed', ({ detail: { value } }) => {
      expect(value).to.be.true;
    });
    el.called = true;
  });
});
