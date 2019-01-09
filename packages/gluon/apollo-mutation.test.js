import { chai, expect, html } from '@open-wc/testing';
// import { ifDefined } from 'lit-html/directives/if-defined';
import sinonChai from 'sinon-chai';
import gql from 'graphql-tag';

import { ApolloMutation } from './apollo-mutation';
import { getElementWithLitTemplate } from '@apollo-elements/test-helpers/helpers';

chai.use(sinonChai);

const scriptTemplate = script => html`<script type="application/graphql">${script}</script>`;
const getClass = () => ApolloMutation;
// NB: the following props removed due to lit-html dependency hell
// .client="${ifDefined(client)}"
// .query="${ifDefined(query)}"
const getTemplate = (tag, { query, variables, client, script } = {}) => html`
  <${tag}
      .variables="${variables}">
    ${script && scriptTemplate(script)}
  </${tag}>`;

const getElement = getElementWithLitTemplate({ getClass, getTemplate });

describe('ApolloMutation', function describeApolloMutation() {
  it('caches observed properties', async function cachesObserveProperties() {
    const el = await getElement();
    const client = {};
    const mutation = gql`mutation { foo }`;

    el.called = true;
    expect(el.called, 'called').to.be.true;

    el.client = client;
    expect(el.client, 'client').to.equal(client);

    el.data = 'data';
    expect(el.data, 'data').to.equal('data');

    el.error = 'error';
    expect(el.error, 'error').to.equal('error');

    el.loading = true;
    expect(el.loading, 'loading').to.be.true;

    el.mutation = mutation;
    expect(el.mutation, 'mutation').to.equal(mutation);
  });
});
