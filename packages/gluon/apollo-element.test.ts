import { expect, html } from '@open-wc/testing';
import { ifDefined } from 'lit-html/directives/if-defined';
import { ApolloElement } from './apollo-element';
import { getElementWithLitTemplate } from '@apollo-elements/test-helpers/helpers';
import { TemplateResult } from 'lit-html';

const scriptTemplate = (script: string): TemplateResult =>
  script ? html`<script type="application/graphql">${script}</script>` : html``;

const getClass = (): typeof ApolloElement =>
  class extends ApolloElement<any> {};

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

type FixtureGetter = () => Promise<ApolloElement<unknown>>;

const getElement: FixtureGetter =
  getElementWithLitTemplate({ getClass, getTemplate });

describe('[gluon] ApolloElement', function describeApolloElement() {
  it('caches observed properties', async function cachesObservedProperties() {
    const el = await getElement();
    const err = new Error('error');

    el.data = 'data';
    expect(el.data).to.equal('data');

    el.error = err;
    expect(el.error).to.equal(err);

    el.loading = true;
    expect(el.loading).to.equal(true);
  });
});
