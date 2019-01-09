import { chai, expect, html } from '@open-wc/testing';
// import { ifDefined } from 'lit-html/directives/if-defined';
import sinonChai from 'sinon-chai';
import gql from 'graphql-tag';

import { ApolloQuery } from './apollo-query';
import { getElementWithLitTemplate } from '@apollo-elements/test-helpers/helpers';

chai.use(sinonChai);

const scriptTemplate = script => html`<script type="application/graphql">${script}</script>`;
const getClass = () => ApolloQuery;
// NB: the following props removed due to lit-html dependency hell
// .client="${ifDefined(client)}"
// .query="${ifDefined(query)}"
const getTemplate = (tag, { variables, script } = {}) => html`
  <${tag}
      .variables="${variables}">
    ${script && scriptTemplate(script)}
  </${tag}>`;

const getElement = getElementWithLitTemplate({ getClass, getTemplate });

describe('ApolloQuery', function describeApolloQuery() {
  // it('defines observed properties', async function definesObserveProperties() {
  //   const el = await getElement();
  //
  //   el.normalProperty = 'foo';
  //   expect(hasGetterSetter(el, 'normalProperty')).to.be.false;
  // });

  it('caches observed properties', async function cachesObservedProperties() {
    const el = await getElement();
    const query = gql`query { foo }`;
    const client = {};

    el.client = client;
    expect(el.client).to.equal(client);

    el.data = 'data';
    expect(el.data).to.equal('data');

    el.error = 'error';
    expect(el.error).to.equal('error');

    el.loading = true;
    expect(el.loading).to.equal(true);

    el.networkStatus = 1;
    expect(el.networkStatus).to.equal(1);

    el.query = query;
    expect(el.query).to.equal(query);
  });
});
