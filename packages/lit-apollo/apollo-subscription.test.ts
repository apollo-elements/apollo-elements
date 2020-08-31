import { defineCE, unsafeStatic, fixture, expect, html } from '@open-wc/testing';

import { ApolloSubscription } from './apollo-subscription';
import { hasGetterSetter } from '../test-helpers/helpers';
import { LitElement } from 'lit-element';

describe('[lit-apollo] ApolloSubscription', function describeApolloSubscription() {
  it('is an instance of LitElement', async function() {
    class Test extends ApolloSubscription<unknown, unknown> {
      set thing(v: unknown) {
        this.requestUpdate('thing', v);
      }
    }

    const tagName = defineCE(Test);
    const tag = unsafeStatic(tagName);
    const el = await fixture(html`<${tag}></${tag}>`);
    expect(el).to.be.an.instanceOf(LitElement);
  });

  it('defines observed properties', async function definesObserveProperties() {
    class Test extends ApolloSubscription<unknown, unknown> {
      set thing(v: unknown) {
        this.requestUpdate('thing', v);
      }
    }

    const tagName = defineCE(Test);
    const tag = unsafeStatic(tagName);
    const el = await fixture(html`<${tag}></${tag}>`);
    expect(hasGetterSetter(el, 'data'), 'data').to.be.true;
    expect(hasGetterSetter(el, 'error'), 'error').to.be.true;
    expect(hasGetterSetter(el, 'loading'), 'loading').to.be.true;
    expect(hasGetterSetter(el, 'subscription'), 'subscription').to.be.true;
    expect(hasGetterSetter(el, 'client'), 'client').to.be.true;
  });
});
