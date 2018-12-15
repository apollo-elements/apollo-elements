import './apollo-subscription-element';
import { litFixture, html, expect } from '@open-wc/testing';
import { client } from '../test/client';

const getElement = ({ client, subscription, variables } = {}) => litFixture(html`
  <apollo-subscription
      .client="${client}"
      .subscription="${subscription}"
      .variables="${variables}"
  ></apollo-subscription>
`);

const awaitEvent = (type, el) => new Promise(
  resolve => el.addEventListener(type, resolve)
);

describe('<apollo-subscription>', function() {
  it('notifies on data change', async function() {
    const el = await getElement({ client });
    const data = { messages: ['hi'] };
    el.data = data;
    const { detail: { value } } = await awaitEvent('data-changed', el);
    expect(value).to.deep.equal(data);
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
