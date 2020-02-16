import { expect, html } from '@open-wc/testing';
import gql from 'graphql-tag';

import { ApolloMutation } from './apollo-mutation';
import { getElementWithLitTemplate, graphQLScriptTemplate } from '@apollo-elements/test-helpers/helpers';
import { TemplateResult } from 'lit-html';

const getClass = (): typeof ApolloMutation =>
  class extends ApolloMutation<any, any> {};

interface TemplateOpts {
  variables: unknown;
  script: string;
}

function getTemplate(tag: string, opts: TemplateOpts): TemplateResult {
  return html`
  <${tag} .variables="${opts?.variables}">
    ${graphQLScriptTemplate(opts?.script)}
  </${tag}>`;
}

const getElement =
  getElementWithLitTemplate<ApolloMutation<unknown, unknown>>({ getClass, getTemplate });

describe('[gluon] ApolloMutation', function describeApolloMutation() {
  it('caches observed properties', async function cachesObserveProperties() {
    const el = await getElement();
    const err = new Error('error');
    const client = null;
    const mutation = gql`
      mutation {
        noParam {
          noParam
        }
      }
    `;

    el.called = true;
    expect(el.called, 'called').to.be.true;

    el.client = client;
    expect(el.client, 'client').to.equal(client);

    el.data = 'data';
    expect(el.data, 'data').to.equal('data');

    el.error = err;
    expect(el.error, 'error').to.equal(err);

    el.loading = true;
    expect(el.loading, 'loading').to.be.true;

    el.mutation = mutation;
    expect(el.mutation, 'mutation').to.equal(mutation);
  });
});
