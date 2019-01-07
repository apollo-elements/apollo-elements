import { chai, expect, html } from '@open-wc/testing';
import { ifDefined } from 'lit-html/directives/if-defined';
import sinonChai from 'sinon-chai';

import { ApolloElement } from './apollo-element';
import { getElementWithLitTemplate, hasGetterSetter } from '@apollo-elements/test-helpers/helpers';

chai.use(sinonChai);

const scriptTemplate = script => html`<script type="application/graphql">${script}</script>`;
const getClass = () => ApolloElement;
const getTemplate = (tag, { query, variables, client, script } = {}) => html`
  <${tag}
      .client="${ifDefined(client)}"
      .query="${ifDefined(query)}"
      .variables="${variables}">
    ${script && scriptTemplate(script)}
  </${tag}>`;

const getElement = getElementWithLitTemplate({ getClass, getTemplate });

describe('ApolloElement', function describeApolloElement() {
  it('defines observed properties', async function definesObserveProperties() {
    const el = await getElement();
    expect(hasGetterSetter(el, 'client'), 'client').to.be.true;
    expect(hasGetterSetter(el, 'data'), 'data').to.be.true;
    expect(hasGetterSetter(el, 'error'), 'error').to.be.true;
    expect(hasGetterSetter(el, 'loading'), 'loading').to.be.true;
  });
});
