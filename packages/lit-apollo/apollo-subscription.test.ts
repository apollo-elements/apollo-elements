import { defineCE, unsafeStatic, fixture, expect, html } from '@open-wc/testing';

import { ApolloSubscription } from './apollo-subscription';
import { LitElement, TemplateResult } from 'lit-element';

class Test extends ApolloSubscription<unknown, unknown> {
  set thing(v: unknown) {
    // Check for LitElement interface
    this.requestUpdate('thing', v);
    // Check for HTMLElement interface
    this.dispatchEvent(new CustomEvent('thing', { detail: { thing: v } }));
  }

  render(): TemplateResult {
    return html`
      ${this.thing}
      ${this.error}
      ${this.errors?.map(x => x.source)}
    `;
  }
}

describe('[lit-apollo] ApolloSubscription', function describeApolloSubscription() {
  it('is an instance of LitElement', async function() {
    const tag = unsafeStatic(defineCE(class extends Test {}));
    const el = await fixture(html`<${tag}></${tag}>`);
    expect(el).to.be.an.instanceOf(LitElement);
  });

  it('defines default properties', async function definesObserveProperties() {
    const tag = unsafeStatic(defineCE(class extends Test {}));
    const el = await fixture<Test>(html`<${tag}></${tag}>`);
    expect(el.data, 'data').to.be.null;
    expect(el.error, 'error').to.be.null;
    expect(el.errors, 'error').to.be.null;
    expect(el.loading, 'loading').to.be.false;
    expect(el.subscription, 'subscription').to.be.null;
    expect(el.client, 'client').to.equal(window.__APOLLO_CLIENT__);
  });
});
