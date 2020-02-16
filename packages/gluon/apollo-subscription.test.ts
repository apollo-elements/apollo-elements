import { expect, html } from '@open-wc/testing';

import { ApolloSubscription } from './apollo-subscription';
import { getElementWithLitTemplate, graphQLScriptTemplate } from '@apollo-elements/test-helpers/helpers';
import { client, NoParamSubscription } from '@apollo-elements/test-helpers';
import { TemplateResult } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

const getClass = (): typeof ApolloSubscription =>
  class extends ApolloSubscription<any, any> {};

interface TemplateOpts {
  variables: unknown;
  script: string;
}

function getTemplate(tag: string, opts?: TemplateOpts): TemplateResult {
  return html`
  <${tag} .variables="${ifDefined(opts?.variables)}">
    ${graphQLScriptTemplate(opts?.script)}
  </${tag}>`;
}

const getElement =
  getElementWithLitTemplate<ApolloSubscription<unknown, unknown>>({ getClass, getTemplate });

describe('[gluon] ApolloSubscription', function describeApolloSubscription() {
  it('caches observed properties', async function cachesObserveProperties() {
    const err = new Error('error');
    const el = await getElement();
    const subscription = NoParamSubscription;

    el.client = client;
    expect(el.client, 'client').to.equal(client);

    el.data = 'data';
    expect(el.data, 'data').to.equal('data');

    el.error = err;
    expect(el.error, 'error').to.equal(err);

    el.loading = true;
    expect(el.loading, 'loading').to.be.true;

    el.subscription = subscription;
    expect(el.subscription, 'subscription').to.equal(subscription);
  });
});
