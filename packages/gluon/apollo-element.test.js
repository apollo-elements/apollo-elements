import { chai, expect, html } from '@open-wc/testing';
// import { ifDefined } from 'lit-html/directives/if-defined';
import sinonChai from 'sinon-chai';

import { ApolloElement } from './apollo-element';
import { getElementWithLitTemplate } from '@apollo-elements/test-helpers/helpers';

chai.use(sinonChai);

const scriptTemplate = script => html`<script type="application/graphql">${script}</script>`;
const getClass = () => ApolloElement;
// NB: the following props removed due to lit-html dependency hell
// .client="${ifDefined(client)}"
// .query="${ifDefined(query)}"
const getTemplate = (tag, { query, variables, client, script } = {}) => html`
  <${tag}
      .variables="${variables}">
    ${script && scriptTemplate(script)}
  </${tag}>`;

const getElement = getElementWithLitTemplate({ getClass, getTemplate });

describe('ApolloElement', function describeApolloElement() {
  it('caches observed properties', async function cachesObservedProperties() {
    const el = await getElement();

    el.data = 'data';
    expect(el.data).to.equal('data');

    el.error = 'error';
    expect(el.error).to.equal('error');

    el.loading = true;
    expect(el.loading).to.equal(true);
  });
});
