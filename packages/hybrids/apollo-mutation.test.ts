import { expect, fixture, unsafeStatic, html as litHtml } from '@open-wc/testing';
import 'sinon-chai';
import gql from 'graphql-tag';
import pick from 'crocks/helpers/pick';

import { match, stub } from 'sinon';
import { define, html } from 'hybrids';

import { ApolloMutation } from './apollo-mutation';
import { client } from '@apollo-elements/test-helpers/client';
import { ApolloMutation as IApolloMutation } from '@apollo-elements/mixins/apollo-mutation';
import ApolloClient from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { DocumentNode } from 'graphql';

interface TemplateOptions {
  client?: ApolloClient<NormalizedCacheObject>;
  mutation?: DocumentNode;
  script?: string;
  variables?: unknown;
  apolloMutation?: typeof ApolloMutation;
  render?(): ReturnType<typeof html>;
}

let counter = 0;
async function getElement(opts?: TemplateOptions): Promise<HTMLElement & IApolloMutation<unknown, unknown>> {
  const {
    mutation,
    variables,
    client,
    script,
    apolloMutation = ApolloMutation,
    render = (): ReturnType<typeof html> => html`hi`,
  } = opts ?? {};

  const tag = `mutation-element-${counter}-${Date.now()}`;
  const unsafeTag = unsafeStatic(tag);

  define(tag, { ...apolloMutation, render });

  const template = litHtml`
  <${unsafeTag}
      .client="${client}"
      .mutation="${mutation}"
      .variables="${variables}">
    ${script && litHtml`<script type="application/graphql">${script}</script>`}
  </${unsafeTag}>`;

  const element = await fixture<HTMLElement & IApolloMutation<unknown, unknown>>(template);

  counter++;

  return element;
}

const pickMutationProps = pick([
  'awaitRefetchQueries',
  'context',
  'errorPolicy',
  'fetchPolicy',
  'mutation',
  'optimisticResponse',
  'refetchQueries',
  'update',
  'variables',
]);

describe('[hybrids] ApolloMutation', function describeApolloMutationMixin() {
  const mutation = gql`
    mutation {
      noParam {
        noParam
      }
    }
  `;

  it('sets default properties', async function setsDefaultProperties() {
    window.__APOLLO_CLIENT__ = client;
    const el = await getElement();
    expect(el.client, 'client').to.equal(client);
    expect(el.ignoreResults, 'ignoreResults').to.be.false;
    expect(el.mostRecentMutationId, 'mostRecentMutationId').to.equal(0);
    expect(el.optimisticResponse, 'optimisticResponse').to.be.undefined;
    expect(el.variables, 'variables').to.be.undefined;
    expect(el.updater, 'updater').to.be.undefined;
    expect(el.onCompleted, 'onCompleted').to.be.undefined;
    expect(el.onError, 'onError').to.be.undefined;
  });

  it('accepts a script child as mutation', async function scriptChild() {
    const script = `
      mutation {
        noParam {
          noParam
        }
      }
    `;
    const el = await getElement({ client, script });
    expect(el.firstElementChild).to.be.an.instanceof(HTMLScriptElement);
    expect(el.mutation).to.deep.equal(gql(script));
  });

  it('accepts a parsed mutation', async function parsedMutation() {
    const el = await getElement({ client, mutation });
    expect(el.mutation).to.equal(mutation);
  });

  it('accepts a parsed mutation in setter', async function parsedMutation() {
    const el = await getElement({ client });
    el.mutation = mutation;
    expect(el.mutation).to.equal(mutation);
  });

  it('rejects a bad mutation', async function badMutation() {
    const el = await getElement();
    expect(() => {
      // @ts-expect-error
      el.mutation = 'foo';
    }).to.throw('Mutation must be a gql-parsed DocumentNode');
    expect(el.mutation).to.not.be.ok;
  });

  describe('mutate', function mutate() {
    let mutateStub;
    before(() => mutateStub?.restore?.());

    it('increments mostRecentMutationId', async function() {
      const el = await getElement({ client, mutation });
      mutateStub = stub(client, 'mutate');
      await el.mutate();
      expect(el.mostRecentMutationId).to.equal(1);
      await el.mutate();
      expect(el.mostRecentMutationId).to.equal(2);
      mutateStub.restore();
    });

    it('calls client.mutate with element props', async function() {
      const el = await getElement({ client, mutation });
      mutateStub = stub(client, 'mutate');
      const props = pickMutationProps({ ...el });
      await el.mutate();
      expect(mutateStub).to.have.been.calledWith(match(props));
      mutateStub.restore();
    });

    it('calls onCompleted with data when mutation resolves', async function callsOnCompleted() {
      const el = await getElement({ client, mutation });
      mutateStub = stub(client, 'mutate');
      mutateStub.resolves({ data: { foo: 'bar' } });
      const cached = el.onCompleted;
      el.onCompleted = stub();
      try {
        await el.mutate();
        expect(el.onCompleted).to.have.been.calledWithMatch({ foo: 'bar' });
        el.onCompleted = cached;
        mutateStub.restore();
      } finally {
        mutateStub.restore();
      }
    });

    it('calls onError with error when mutation rejects', async function callsOnError() {
      const el = await getElement({ client, mutation });
      mutateStub = stub(client, 'mutate');
      mutateStub.rejects(new Error('foo'));
      const cached = el.onError;
      el.onError = stub();
      try {
        await el.mutate();
        mutateStub.restore();
      } catch (e) {
        expect(el.onError).to.have.been.calledWith('foo', 1);
        mutateStub.restore();
      } finally {
        el.onError = cached;
        mutateStub.restore();
      }
    });

    it('when promise resolves sets data, loading', async function setsDataLoading() {
      const el = await getElement({ client, mutation });
      mutateStub.restore();
      mutateStub = stub(client, 'mutate');
      mutateStub.resolves({ data: { foo: 'bar' } });
      await el.mutate();
      expect(el.data).to.deep.equal({ foo: 'bar' });
      expect(el.error).to.be.null;
      expect(el.loading).to.be.false;
      mutateStub.restore();
    });

    it('when promise rejects sets error, loading', async function setsErrorLoading() {
      const el = await getElement({ client, mutation });
      mutateStub = stub(client, 'mutate');
      mutateStub.rejects('foo');
      try {
        await el.mutate();
        mutateStub.restore();
      } catch (error) {
        expect(el.data).to.be.null;
        expect(el.error).to.equal('foo');
        expect(el.loading).to.be.false;
      }
    });

    it('when another mutation resolves before this one resolves sets data, loading', async function() {
      const el = await getElement({ client, mutation });
      mutateStub = stub(client, 'mutate');
      mutateStub.returns(new Promise(resolve => setTimeout(() => resolve({ data: { foo: 'bar' } }), 500)));
      el.mutate();
      mutateStub.returns(new Promise(resolve => setTimeout(() => resolve({ data: { baz: 'qux' } }), 500)));
      await el.mutate();
      mutateStub.restore();
      expect(el.data).to.deep.equal({ baz: 'qux' });
      expect(el.error).to.be.null;
      expect(el.loading).to.be.false;
    });

    it('when another mutation rejects before this one rejects sets data, loading', async function() {
      const el = await getElement({ client, mutation });
      mutateStub = stub(client, 'mutate');
      mutateStub.returns(new Promise((_, reject) => setTimeout(() => reject('foo'), 500)));
      el.mutate();
      mutateStub.returns(new Promise((_, reject) => setTimeout(() => reject('bar'), 500)));
      await el.mutate();
      mutateStub.restore();
      expect(el.data).to.be.null;
      expect(el.error).to.equal('bar');
      expect(el.loading).to.be.false;
    });

    it('defaults to element\'s mutation', async function() {
      mutateStub.restore();
      const el = await getElement({ client, mutation });
      mutateStub = stub(el.client, 'mutate');
      await el.mutate({ mutation: undefined });
      expect(mutateStub).to.have.been.calledWith(match({ mutation }));
      mutateStub.restore();
    });
  });
});
