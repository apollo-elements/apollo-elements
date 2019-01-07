import { fixture, html, expect } from '@open-wc/testing';

import './apollo-subscription';
import { client } from '@apollo-elements/test-helpers/client';

const getElement = ({ client, subscription, variables } = {}) => fixture(html`
  <apollo-subscription
      .client="${client}"
      .subscription="${subscription}"
      .variables="${variables}"
  ></apollo-subscription>
`);

describe('<apollo-subscription>', function() {
  it('caches observed properties', async function() {
    const el = await getElement();
    el.data = 'data';
    el.error = 'error';
    el.loading = true;
    expect(el.data).to.equal('data');
    expect(el.error).to.equal('error');
    expect(el.loading).to.equal(true);
  });

  it('notifies on data change', async function() {
    const el = await getElement({ client });
    const data = { messages: ['hi'] };
    el.addEventListener('data-changed', ({ detail: { value } }) => {
      expect(value).to.deep.equal(data);
    });
    el.data = data;
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
});
