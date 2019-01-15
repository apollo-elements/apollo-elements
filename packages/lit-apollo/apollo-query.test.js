import { chai, expect, html } from '@open-wc/testing';
import { ifDefined } from 'lit-html/directives/if-defined';
import sinonChai from 'sinon-chai';

import { ApolloQuery } from './apollo-query';
import { getElementWithLitTemplate, hasGetterSetter } from '@apollo-elements/test-helpers/helpers';

chai.use(sinonChai);

const scriptTemplate = script => html`<script type="application/graphql">${script}</script>`;
const getClass = () => ApolloQuery;
const getTemplate = (tag, { query, variables, client, script } = {}) => html`
  <${tag} .client="${ifDefined(client)}">
    ${script && scriptTemplate(script)}
  </${tag}>`;

const getElement = getElementWithLitTemplate({ getClass, getTemplate });

describe('ApolloQuery', function describeApolloQuery() {
  it('defines observed properties', async function definesObserveProperties() {
    const el = await getElement();
    expect(hasGetterSetter(el, 'networkStatus'), 'networkStatus').to.be.true;
    expect(hasGetterSetter(el, 'query'), 'query').to.be.true;
    expect(hasGetterSetter(el, 'data'), 'data').to.be.true;
    expect(hasGetterSetter(el, 'error'), 'error').to.be.true;
    expect(hasGetterSetter(el, 'loading'), 'loading').to.be.true;
    expect(hasGetterSetter(el, 'client'), 'client').to.be.true;
    // NB: the following is just to satisfy istanbul. k whatev
    el.normalProperty = 'foo';
    expect(hasGetterSetter(el, 'normalProperty')).to.be.false;
  });
});
