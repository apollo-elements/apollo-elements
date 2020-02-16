import { expect, html } from '@open-wc/testing';
import gql from 'graphql-tag';

import { ifDefined } from 'lit-html/directives/if-defined';
import { ApolloQuery } from './apollo-query';
import { getElementWithLitTemplate } from '@apollo-elements/test-helpers/helpers';
import { client } from '@apollo-elements/test-helpers';
import { TemplateResult } from 'lit-html';

const scriptTemplate = (script: string): TemplateResult =>
  script ? html`<script type="application/graphql">${script}</script>` : html``;

const getClass = (): typeof ApolloQuery =>
  class extends ApolloQuery<any, any> {};

interface TemplateOpts {
  variables: unknown;
  script: string;
}

function getTemplate(tag: string, opts?: TemplateOpts): TemplateResult {
  return html`
    <${tag} .variables="${ifDefined(opts?.variables)}">
      ${scriptTemplate(opts?.script)}
    </${tag}>
  `;
}

type FixtureGetter = () => Promise<ApolloQuery<unknown, unknown>>;

const getElement: FixtureGetter =
  getElementWithLitTemplate({ getClass, getTemplate });

describe('[gluon] ApolloQuery', function describeApolloQuery() {
  it('caches observed properties', async function cachesObservedProperties() {
    const el = await getElement();
    const err = new Error('error');
    const query = gql`
      query {
        noParam {
          noParam
        }
      }
    `;

    el.client = client;
    expect(el.client).to.equal(client);

    el.data = 'data';
    expect(el.data).to.equal('data');

    el.error = err;
    expect(el.error).to.equal(err);

    el.loading = true;
    expect(el.loading).to.equal(true);

    el.networkStatus = 1;
    expect(el.networkStatus).to.equal(1);

    el.query = query;
    expect(el.query).to.equal(query);
  });
});
