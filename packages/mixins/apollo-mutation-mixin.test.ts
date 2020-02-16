import { expect, html } from '@open-wc/testing';
import { ApolloError } from 'apollo-client';
import 'sinon-chai';
import gql from 'graphql-tag';

import { ifDefined } from 'lit-html/directives/if-defined';
import { match, stub } from 'sinon';

import { ApolloMutationMixin } from './apollo-mutation-mixin';
import type { ApolloMutation } from './apollo-mutation';
import { client } from '@apollo-elements/test-helpers/client';
import { getElementWithLitTemplate, graphQLScriptTemplate } from '@apollo-elements/test-helpers/helpers';
import type { NormalizedCacheObject } from 'apollo-cache-inmemory';
import type { ApolloClient } from 'apollo-client';
import { DocumentNode } from 'graphql';
import { TemplateResult } from 'lit-html';
import { NoParamMutation } from '@apollo-elements/test-helpers';

type Stub = ReturnType<typeof stub>

interface TemplateOpts {
  client?: ApolloClient<NormalizedCacheObject>;
  mutation?: DocumentNode;
  variables?: unknown;
  script?: string;
  onError?(): void;
  onCompleted?(): void;
}

const getClass = () =>
  class extends ApolloMutationMixin(HTMLElement) {};

function getTemplate(tag: string, opts: TemplateOpts): TemplateResult {
  return html`
  <${tag}
      .client="${ifDefined(opts?.client)}"
      .mutation="${ifDefined(opts?.mutation)}"
      .onError="${ifDefined(opts?.onError)}"
      .onCompleted="${ifDefined(opts?.onCompleted)}"
      .variables="${opts?.variables}">
    ${graphQLScriptTemplate(opts?.script)}
  </${tag}>`;
}

const getElement =
  getElementWithLitTemplate<HTMLElement & ApolloMutation<any, any>>({ getClass, getTemplate });

afterEach(function() {
  // @ts-expect-error
  client.mutate?.restore?.();
});

describe('[mixins] ApolloMutationMixin', function describeApolloMutationMixin() {
  it('returns an instance of the superclass', async function returnsClass() {
    expect(await getElement()).to.be.an.instanceOf(HTMLElement);
  });

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
    const script = `mutation { foo { bar } }`;
    const el = await getElement({ client, script });
    expect(el.firstElementChild).to.be.an.instanceof(HTMLScriptElement);
    expect(el.mutation).to.deep.equal(gql(script));
  });

  it('accepts a parsed mutation', async function parsedMutation() {
    const mutation = gql`mutation { foo { bar } }`;
    const el = await getElement({ client, mutation });
    expect(el.mutation).to.equal(mutation);
  });

  it('accepts a parsed mutation in setter', async function parsedMutation() {
    const mutation = gql`mutation { foo { bar } }`;
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

  describe('generateMutationId', function generateMutationId() {
    it('increments mostRecentMutationId', async function() {
      const el = await getElement({ client });
      expect(el.generateMutationId()).to.equal(1);
      expect(el.mostRecentMutationId).to.equal(1);
      expect(el.generateMutationId()).to.equal(2);
      expect(el.mostRecentMutationId).to.equal(2);
    });
  });

  describe('mutate', function mutate() {
    const data = { foo: 2 };
    const mutation = NoParamMutation;

    let el: HTMLElement & ApolloMutation<{ foo: number }, unknown>;
    let mutateStub: Stub;
    let onCompleted: Stub;
    let onError: Stub;

    beforeEach(async function() {
      onError = stub();
      onCompleted = stub();
      el = await getElement({ client, mutation, onCompleted, onError });
      mutateStub = stub(el.client, 'mutate');
      mutateStub.resolves({ data });
    });

    afterEach(function() {
      mutateStub?.restore?.();
      onCompleted?.restore?.();
      onError?.restore?.();
      onCompleted?.restore?.();
      el = undefined;
    });

    it('calls generateMutationId', async function() {
      const generateMutationIdStub = stub(el, 'generateMutationId');
      el.mutate();
      expect(generateMutationIdStub).to.have.been.calledOnce;
      generateMutationIdStub.restore();
    });

    it('calls client.mutate with element props', async function() {
      el.mutate();
      expect(mutateStub).to.have.been.calledWithMatch({
        mutation: el.mutation,
        variables: el.variables,
        update: el.updater,
      });
    });

    it('defaults to element\'s mutation', async function() {
      const el = await getElement({ client, mutation });
      await el.mutate({ });
      expect(mutateStub).to.have.been.calledWith(match({ mutation }));
    });

    describe('with partial params', function() {
      let el: HTMLElement & ApolloMutation<unknown, unknown>;

      beforeEach(async function() {
        el = await getElement();
        mutateStub.resolves({ data: true, loading: false, networkStatus: 7, stale: false });
      });

      it('defaults to element mutation', async function() {
        el.mutation = NoParamMutation;
        const optimisticResponse = { foo: 'bar' };
        const variables = { foo: 'bar' };
        const update = (): void => { null; };
        el.mutate({ optimisticResponse, variables, update });
        expect(mutateStub).to.have.been
          .calledWithMatch({
            mutation: el.mutation,
            optimisticResponse,
            update,
            variables,
          });
      });

      it('defaults to element optimisticResponse', async function() {
        el.optimisticResponse = { foo: 'bar' };
        const mutation = NoParamMutation;
        const variables = { foo: 'bar' };
        const update = (): void => { null; };
        el.mutate({ mutation, variables, update });
        expect(mutateStub).to.have.been
          .calledWithMatch({
            mutation,
            optimisticResponse: el.optimisticResponse,
            update,
            variables,
          });
      });

      it('defaults to element updater', async function() {
        el.updater = (): void => { null; };
        const mutation = NoParamMutation;
        const variables = { foo: 'bar' };
        el.mutate({ mutation, variables });
        expect(mutateStub).to.have.been
          .calledWithMatch({
            mutation,
            optimisticResponse: el.optimisticResponse,
            update: el.updater,
            variables,
          });
      });

      it('defaults to element variables', async function() {
        el.variables = { foo: 'bar' };
        const mutation = NoParamMutation;
        const optimisticResponse = { foo: 'bar' };
        const update = (): void => { null; };
        el.mutate({ mutation, optimisticResponse, update });
        expect(mutateStub).to.have.been
          .calledWithMatch({
            mutation,
            optimisticResponse,
            update,
            variables: el.variables,
          });
      });
    });

    describe('when mutation resolves', function() {
      it('calls onCompleted with data', async function() {
        await el.mutate();
        expect(el.onCompleted).to.have.been.calledWithMatch(data);
      });

      it('sets loading', async function() {
        const p = el.mutate();
        expect(el.loading).to.be.true;
        await p;
        expect(el.loading).to.be.false;
      });

      it('sets data', async function() {
        await el.mutate();
        expect(el.data).to.equal(data);
      });

      it('sets error', async function() {
        await el.mutate();
        expect(el.error).to.be.null;
      });
    });

    describe('when mutation rejects', function() {
      const apolloError = new ApolloError({ errorMessage: 'error' });
      beforeEach(async function() {
        mutateStub.rejects(apolloError);
      });

      it('calls onError with error', async function() {
        try {
          await el.mutate();
          expect.fail('no error');
        } catch (error) {
          expect(onError).to.have.been.calledWithMatch(error);
        }
      });

      it('sets data, error, loading', async function() {
        try {
          await el.mutate();
        } catch (error) {
          expect(el.data).to.be.null;
          expect(el.error).to.equal(error);
          expect(el.loading).to.be.false;
        }
      });
    });
  });
});
