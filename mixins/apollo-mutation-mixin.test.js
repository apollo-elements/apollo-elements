import { chai, expect, html } from '@open-wc/testing';
import sinonChai from 'sinon-chai';

import { ApolloMutationMixin } from './apollo-mutation-mixin.js';
import { client } from '../test/client.js';
import { ifDefined } from 'lit-html/directives/if-defined';
import { getElementWithLitTemplate } from '../test/helpers.js';

chai.use(sinonChai);

const scriptTemplate = script => html`<script type="application/graphql">${script}</script>`;
const getClass = () => ApolloMutationMixin(HTMLElement);
const getTemplate = (tag, { mutation, variables, client, script } = {}) => html`
  <${tag}
      .client="${ifDefined(client)}"
      .mutation="${ifDefined(mutation)}"
      .variables="${variables}">
    ${script && scriptTemplate(script)}
  </${tag}>`;
const getElement = getElementWithLitTemplate({ getTemplate, getClass });

describe('ApolloMutationMixin', function describeApolloMutationMixin() {
  it('returns an instance of the superclass', async function returnsClass() {
    expect(await getElement()).to.be.an.instanceOf(HTMLElement);
  });

  it('sets default properties', async function setsDefaultProperties() {
    window.__APOLLO_CLIENT__ = client;
    const el = await getElement();
    expect(el.client, 'client').to.equal(client);
    expect(el.ignoreResults, 'ignoreResults').to.be.false;
    expect(el.mostRecentMutationId, 'mostRecentMutationId').to.equal(0);
    expect(el.optimisticResponse, 'optimisticResponse').to.be.undefined;
    expect(el.variables, 'variables').to.be.undefined;
    expect(el.onUpdate, 'onUpdate').to.be.undefined;
    expect(el.onCompleted, 'onCompleted').to.be.a('function');
    expect(el.onCompleted(), 'onCompleted application').to.be.undefined;
    expect(el.onError, 'onError').to.be.a('function');
    expect(el.onError(), 'onError application').to.be.undefined;
  });
});
