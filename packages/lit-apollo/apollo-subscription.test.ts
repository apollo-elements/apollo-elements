import { expect, html } from '@open-wc/testing';
import { ifDefined } from 'lit-html/directives/if-defined';

import { ApolloSubscription } from './apollo-subscription';
import { getElementWithLitTemplate, hasGetterSetter, graphQLScriptTemplate } from '@apollo-elements/test-helpers/helpers';
import { DocumentNode } from 'graphql';
import { TemplateResult } from 'lit-html';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';

interface Opts {
  client?: ApolloClient<NormalizedCacheObject>;
  query?: DocumentNode;
  variables?: unknown;
  script?: string;
}

const getClass = (): typeof ApolloSubscription =>
  class extends ApolloSubscription<any, any> {};

function getTemplate(tag: string, opts: Opts): TemplateResult {
  return html`
  <${tag}
      .client="${ifDefined(opts?.client)}"
      .query="${ifDefined(opts?.query)}"
      .variables="${opts?.variables}">
    ${graphQLScriptTemplate(opts?.script)}
  </${tag}>`;
}

const getElement =
  getElementWithLitTemplate<ApolloSubscription<unknown, unknown>>({ getClass, getTemplate });

describe('[lit-apollo] ApolloSubscription', function describeApolloSubscription() {
  it('defines observed properties', async function definesObserveProperties() {
    const el = await getElement();
    expect(hasGetterSetter(el, 'data'), 'data').to.be.true;
    expect(hasGetterSetter(el, 'error'), 'error').to.be.true;
    expect(hasGetterSetter(el, 'loading'), 'loading').to.be.true;
    expect(hasGetterSetter(el, 'subscription'), 'subscription').to.be.true;
    expect(hasGetterSetter(el, 'client'), 'client').to.be.true;
  });
});
