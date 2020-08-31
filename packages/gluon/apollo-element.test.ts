import { defineCE, expect, fixture, html as fhtml, unsafeStatic } from '@open-wc/testing';
import { ApolloElement } from './apollo-element';

import { html } from 'lit-html';

describe('[gluon] ApolloElement', function describeApolloElement() {
  it('caches observed properties', async function cachesObservedProperties() {
    class Test extends ApolloElement {}

    const tagName = defineCE(Test);
    const tag = unsafeStatic(tagName);
    const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);

    const err = new Error('error');

    element.data = 'data';
    expect(element.data, 'data').to.equal('data');

    element.error = err;
    expect(element.error, 'error').to.equal(err);

    element.loading = true;
    expect(element.loading, 'loading').to.equal(true);
  });

  it('renders on set "data"', async function() {
    class Test extends ApolloElement {
      get template() {
        return html`${this.data}`;
      }
    }

    const tag = unsafeStatic(defineCE(Test));

    const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);

    element.data = 'hi';

    await element.render();

    expect(element).shadowDom.to.equal('hi');
  });

  it('renders on set "error"', async function() {
    class Test extends ApolloElement {
      get template() {
        return html`${this.error?.message}`;
      }
    }

    const tag = unsafeStatic(defineCE(Test));

    const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);

    element.error = new Error('hi');

    await element.render();

    expect(element).shadowDom.to.equal('hi');
  });

  it('renders on set "loading"', async function() {
    class Test extends ApolloElement {
      get template() {
        return html`${this.loading}`;
      }
    }

    const tag = unsafeStatic(defineCE(Test));

    const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);

    element.loading = true;

    await element.render();

    expect(element).shadowDom.to.equal('true');
  });
});
