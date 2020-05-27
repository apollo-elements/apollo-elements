import { defineCE, unsafeStatic, fixture, expect, html as fixtureHtml } from '@open-wc/testing';
import gql from 'graphql-tag';
import sinon from 'sinon';
import 'sinon-chai';
import { client, setupClient, teardownClient } from '@apollo-elements/test-helpers/client';

import { ApolloMutation } from './apollo-mutation';
import { LitElement, TemplateResult, html } from 'lit-element';

import type { MutationUpdaterFn } from 'apollo-client';

describe('[lit-apollo] ApolloMutation', function describeApolloMutation() {
  beforeEach(setupClient);
  afterEach(teardownClient);

  it('is an instance of LitElement', async function() {
    const tagName = defineCE(class Test extends ApolloMutation<unknown, unknown> {
      set thing(v: any) {
        // @ts-expect-error
        this.requestUpdate('thing', v);
      }
    });
    const tag = unsafeStatic(tagName);
    const el = await fixture(fixtureHtml`<${tag}></${tag}>`);
    expect(el).to.be.an.instanceOf(LitElement);
  });

  it('renders when called is set', async function rendersOnCalled() {
    const tagName = defineCE(class Test extends ApolloMutation<{}, {}> {
      render(): TemplateResult {
        return html`${this.called ? 'CALLED' : 'FAIL'}`;
      }
    });
    const tag = unsafeStatic(tagName);
    const el = await fixture(fixtureHtml`<${tag} .called="${true}"></${tag}>`);
    expect(el).shadowDom.to.equal('CALLED');
  });

  it('uses element\'s updater method for mutation\'s `update` option by default', async function overridesMutateUpdate() {
    const mutation = gql`
      mutation {
        noParam {
          noParam
        }
      }
    `;

    const tagName = defineCE(class Test extends ApolloMutation<{}, {}> {
      render(): TemplateResult {
        return html`${JSON.stringify(this.data || {}, null, 2)}`;
      }

      updater(): void { '💩'; }
    });
    const tag = unsafeStatic(tagName);
    const el = await fixture(fixtureHtml`<${tag} .client="${client}" .mutation="${mutation}"></${tag}>`) as ApolloMutation<{}, {}>;
    const clientSpy = sinon.spy(el.client, 'mutate');
    await el.mutate();
    expect(clientSpy).to.have.been.calledWith(sinon.match({ update: el.updater }));
    clientSpy.restore();
  });

  it('allows passing custom update function', async function customUpdate() {
    const mutation = gql`
      mutation {
        noParam {
          noParam
        }
      }
    `;

    const tagName = defineCE(class Test extends ApolloMutation<{}, {}> {
      render(): TemplateResult {
        return html`${JSON.stringify(this.data || {}, null, 2)}`;
      }

      updater(): void { '💩'; }
    });
    const update = sinon.stub() as MutationUpdaterFn;
    const tag = unsafeStatic(tagName);
    const el = await fixture(fixtureHtml`<${tag} .client="${client}" .mutation="${mutation}"></${tag}>`) as ApolloMutation<{}, {}>;
    const clientSpy = sinon.spy(el.client, 'mutate');
    await el.mutate({ update });
    expect(clientSpy).to.have.been.calledWith(sinon.match({ update }));
    clientSpy.restore();
  });

  it('does not use LitElement#update as mutation update', async function() {
    const mutation = gql`
      mutation {
        noParam {
          noParam
        }
      }
    `;

    const tagName = defineCE(class Test extends ApolloMutation<{}, {}> {
      render(): TemplateResult {
        const { data = {} } = this;
        return html`${JSON.stringify(data, null, 2)}`;
      }

      update(...a: Parameters<LitElement['update']>): ReturnType<LitElement['update']> {
        // @ts-expect-error
        super.update(...a);
      }
    });
    const tag = unsafeStatic(tagName);
    const el = await fixture(fixtureHtml`<${tag} .client="${client}" .mutation="${mutation}"></${tag}>`) as ApolloMutation<{}, {}>;
    const clientSpy = sinon.spy(el.client, 'mutate');
    await el.mutate();
    expect(clientSpy).to.not.have.been.calledWithMatch({
      // @ts-expect-error
      update: el.update,
    });
    clientSpy.restore();
  });
});
