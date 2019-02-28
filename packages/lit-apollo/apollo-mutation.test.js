import { chai, defineCE, unsafeStatic, fixture, expect, html } from '@open-wc/testing';
import sinonChai from 'sinon-chai';
import gql from 'graphql-tag';
import { spy, stub, match } from 'sinon';
import { client } from '@apollo-elements/test-helpers/client';

import { ApolloMutation } from './apollo-mutation';

chai.use(sinonChai);

describe('ApolloMutation', function describeApolloMutation() {
  it('renders when called is set', async function rendersOnCalled() {
    const tagName = defineCE(class extends ApolloMutation {
      render() {
        const { called = false } = this;
        return html`${called ? 'CALLED' : 'FAIL'}`;
      }
    });
    const tag = unsafeStatic(tagName);
    const el = await fixture(html`<${tag} .called="${true}"></${tag}>`);
    expect(el).shadowDom.to.equal('CALLED');
  });

  it('uses element\'s onUpdate method for mutation\'s `update` option by default', async function overridesMutateUpdate() {
    const mutation = gql`mutation { foo }`;
    const tagName = defineCE(class extends ApolloMutation {
      render() {
        const { data = {} } = this;
        return html`${JSON.stringify(data, null, 2)}`;
      }

      onUpdate() { }
    });
    const tag = unsafeStatic(tagName);
    const el = await fixture(html`<${tag} .client="${client}" .mutation="${mutation}"></${tag}>`);
    const clientSpy = spy(el.client, 'mutate');
    await el.mutate();
    expect(clientSpy).to.have.been.calledWith(match({ update: el.onUpdate }));
    clientSpy.restore();
  });

  it('allows passing custom update function', async function customUpdate() {
    const mutation = gql`mutation { foo }`;
    const tagName = defineCE(class extends ApolloMutation {
      render() {
        const { data = {} } = this;
        return html`${JSON.stringify(data, null, 2)}`;
      }

      onUpdate() { }
    });
    const update = stub();
    const tag = unsafeStatic(tagName);
    const el = await fixture(html`<${tag} .client="${client}" .mutation="${mutation}"></${tag}>`);
    const clientSpy = spy(el.client, 'mutate');
    await el.mutate({ update });
    expect(clientSpy).to.have.been.calledWith(match({ update }));
    clientSpy.restore();
  });

  it('does not use LitElement#update as mutation update', async function() {
    const mutation = gql`mutation { foo }`;
    const tagName = defineCE(class extends ApolloMutation {
      render() {
        const { data = {} } = this;
        return html`${JSON.stringify(data, null, 2)}`;
      }

      update(...a) {
        super.update(...a);
      }
    });
    const tag = unsafeStatic(tagName);
    const el = await fixture(html`<${tag} .client="${client}" .mutation="${mutation}"></${tag}>`);
    const clientSpy = spy(el.client, 'mutate');
    await el.mutate();
    expect(clientSpy).to.not.have.been.calledWith(match({ update: el.update }));
    clientSpy.restore();
  });
});
