import type { ApolloClient, DocumentNode, ErrorPolicy, FetchPolicy, FetchResult, NormalizedCacheObject } from '@apollo/client/core';

import type { GraphQLError } from 'graphql';

import type {
  NoParamMutationData,
  NoParamMutationVariables,
} from '@apollo-elements/test-helpers/schema';

import type { RefetchQueryDescription } from '@apollo/client/core/watchQueryOptions';

import type Sinon from 'sinon';

import { defineCE, expect, fixture, html as fhtml, unsafeStatic } from '@open-wc/testing';

import 'sinon-chai';

import gql from 'graphql-tag';

import { match, stub } from 'sinon';

import { client, setupClient, assertType } from '@apollo-elements/test-helpers';

import { ApolloMutationMixin } from './apollo-mutation-mixin';

import { isApolloError, ApolloError } from '@apollo/client/core';

import NoParamMutation from '@apollo-elements/test-helpers/NoParam.mutation.graphql';

class XL extends HTMLElement {}
class Test<D = unknown, V = unknown> extends ApolloMutationMixin(XL)<D, V> {}

type TypeCheckData = { a: 'a', b: number };
type TypeCheckVars = { d: 'd', e: number };
class TypeCheck extends Test<TypeCheckData, TypeCheckVars> {
  render() {
    /* eslint-disable max-len, func-call-spacing, no-multi-spaces */

    // ApolloElementInterface
    assertType<ApolloClient<NormalizedCacheObject>> (this.client);
    assertType<Record<string, unknown>>             (this.context);
    assertType<boolean>                             (this.loading);
    assertType<DocumentNode>                        (this.document);
    assertType<Error>                               (this.error);
    assertType<readonly GraphQLError[]>             (this.errors);
    assertType<TypeCheckData>                       (this.data);
    assertType<string>                              (this.error.message);
    assertType<'a'>                                 (this.data.a);
    // @ts-expect-error: b as number type
    assertType<'a'>                                 (this.data.b);
    if (isApolloError(this.error))
      assertType<readonly GraphQLError[]>           (this.error.graphQLErrors);

    // ApolloMutationInterface
    assertType<DocumentNode>                        (this.mutation);
    assertType<TypeCheckVars>                       (this.variables);
    assertType<boolean>                             (this.called);
    assertType<boolean>                             (this.ignoreResults);
    assertType<boolean>                             (this.awaitRefetchQueries);
    assertType<number>                              (this.mostRecentMutationId);
    assertType<ErrorPolicy>                         (this.errorPolicy);
    assertType<string>                              (this.errorPolicy);
    // @ts-expect-error: ErrorPolicy is not a number
    assertType<number>                              (this.errorPolicy);
    assertType<string>                              (this.fetchPolicy);
    assertType<Extract<FetchPolicy, 'no-cache'>>    (this.fetchPolicy);

    if (typeof this.refetchQueries === 'function')
      assertType<(result: FetchResult<TypeCheckData>) => RefetchQueryDescription>(this.refetchQueries);
    else
      assertType<RefetchQueryDescription>(this.refetchQueries);

    if (typeof this.optimisticResponse !== 'function')
      assertType<TypeCheckData>(this.optimisticResponse);
    else
      assertType<(vars: TypeCheckVars) => TypeCheckData>(this.optimisticResponse);

    /* eslint-enable max-len, func-call-spacing, no-multi-spaces */
  }
}

/* eslint-disable @typescript-eslint/no-unused-vars */
class AccessorTest extends Test<unknown, { hey: 'yo' }> {
  // @ts-expect-error: don't allow using accessors. Run a function when dependencies change instead
  get variables() {
    return { hey: 'yo' as const };
  }
}

class PropertyTest extends Test<unknown, { hey: 'yo' }> {
  variables = { hey: 'yo' as const };
}
/* eslint-enable @typescript-eslint/no-unused-vars */

afterEach(function() {
  // @ts-expect-error: it's a stub
  client.mutate?.restore?.();
});

describe('[mixins] ApolloMutationMixin', function describeApolloMutationMixin() {
  beforeEach(setupClient);

  describe('instantiating simple derived class', function() {
    let element: Test;

    async function setupElement() {
      const tag = unsafeStatic(defineCE(class extends Test {}));
      element = await fixture<Test>(fhtml`<${tag}></${tag}>`);
    }

    beforeEach(setupElement);

    it('returns an instance of the superclass', async function returnsClass() {
      expect(element).to.be.an.instanceOf(HTMLElement);
    });

    it('has default properties', async function setsDefaultProperties() {
      expect(element.awaitRefetchQueries, 'awaitRefetchQueries').to.be.undefined;
      expect(element.called, 'called').to.be.false;
      expect(element.client, 'client').to.equal(client);
      expect(element.data, 'data').to.be.null;
      expect(element.errorPolicy, 'errorPolicy').to.be.undefined;
      expect(element.fetchPolicy, 'fetchPolicy').to.be.undefined;
      expect(element.ignoreResults, 'ignoreResults').to.be.false;
      expect(element.mostRecentMutationId, 'mostRecentMutationId').to.equal(0);
      expect(element.mutation, 'mutation').to.be.null;
      expect(element.onCompleted, 'onCompleted').to.be.undefined;
      expect(element.onError, 'onError').to.be.undefined;
      expect(element.optimisticResponse, 'optimisticResponse').to.be.undefined;
      expect(element.refetchQueries, 'refetchQueries').to.be.undefined;
      expect(element.updater, 'updater').to.be.undefined;
      expect(element.variables, 'variables').to.be.null;
    });

    describe('when window.__APOLLO_CLIENT__ is set', function() {
      let cached: typeof window.__APOLLO_CLIENT__;

      beforeEach(function() {
        cached = window.__APOLLO_CLIENT__;
        window.__APOLLO_CLIENT__ = {} as typeof window.__APOLLO_CLIENT__;
      });

      beforeEach(setupElement);

      afterEach(function() {
        window.__APOLLO_CLIENT__ = cached;
      });

      it('uses global client', async function defaultsToGlobalClient() {
        expect(element.client).to.equal(window.__APOLLO_CLIENT__);
      });
    });
  });

  describe('with a valid graphql script child', function() {
    let element: Test;

    async function setupElement() {
      const tag = unsafeStatic(defineCE(class extends Test {}));
      element = await fixture<Test>(fhtml`
        <${tag}>
          <script type="application/graphql">${NoParamMutation.loc.source.body}</script>
        </${tag}>
      `);
    }

    beforeEach(setupElement);

    it('does not remove the script', async function scriptChild() {
      expect(element.firstElementChild).to.be.an.instanceof(HTMLScriptElement);
    });

    it('sets the mutation property', async function scriptChild() {
      expect(element.firstElementChild).to.be.an.instanceof(HTMLScriptElement);
      expect(element.mutation).to.deep.equal(gql(NoParamMutation.loc.source.body));
    });
  });

  describe('with a valid mutation in class field', function() {
    let element: Test<NoParamMutationData, NoParamMutationVariables>;

    async function setupElement() {
      const tag = unsafeStatic(defineCE(class extends Test<NoParamMutationData, NoParamMutationVariables> {
        mutation = NoParamMutation;
      }));

      element = await fixture<Test<NoParamMutationData, NoParamMutationVariables>>(fhtml`<${tag}></${tag}>`);
    }

    beforeEach(setupElement);

    it('sets the mutation property', async function parsedMutation() {
      expect(element.mutation).to.equal(NoParamMutation);
    });
  });

  it('accepts a parsed mutation in setter', async function parsedMutation() {
    const tag = unsafeStatic(defineCE(class extends Test<NoParamMutationData, NoParamMutationVariables> { }));

    const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);

    element.mutation = NoParamMutation;
    expect(element.mutation).to.equal(NoParamMutation);
  });

  it('rejects a bad mutation', async function badMutation() {
    const tag = unsafeStatic(defineCE(class extends Test {}));

    const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);

    // @ts-expect-error: i'm testing the error handler
    expect(() => element.mutation = 'foo').to.throw('Mutation must be a gql-parsed DocumentNode');
    expect(element.mutation).to.not.be.ok;
  });

  describe('generateMutationId', function generateMutationId() {
    it('increments mostRecentMutationId', async function() {
      const tag = unsafeStatic(defineCE(class extends Test { }));
      const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);

      expect(element.generateMutationId()).to.equal(1);
      expect(element.mostRecentMutationId).to.equal(1);
      expect(element.generateMutationId()).to.equal(2);
      expect(element.mostRecentMutationId).to.equal(2);
    });
  });

  describe('mutate', function mutate() {
    const data = { foo: 2 };
    const mutation = NoParamMutation;

    class _Test extends ApolloMutationMixin(HTMLElement)<{ foo: number }, unknown> {
      client = client;

      mutation = mutation;
    }

    let element: _Test;
    let mutateStub: Sinon.SinonStub;
    let onCompleted: Sinon.SinonStub;
    let onError: Sinon.SinonStub;

    beforeEach(async function() {
      onError = stub();
      onCompleted = stub();

      class Test extends _Test {
        onError = onError;

        onCompleted = onCompleted;
      }

      const tag = unsafeStatic(defineCE(Test));

      element = await fixture<Test>(fhtml`<${tag}></${tag}>`);

      mutateStub = stub(element.client, 'mutate');
      mutateStub.resolves({ data });
    });

    afterEach(function() {
      mutateStub?.restore?.();
      onCompleted?.restore?.();
      onError?.restore?.();
      onCompleted?.restore?.();
      element = undefined;
    });

    // TODO: test effects instead
    it('calls generateMutationId', async function() {
      const generateMutationIdStub = stub(element, 'generateMutationId');
      element.mutate();
      expect(generateMutationIdStub).to.have.been.calledOnce;
      generateMutationIdStub.restore();
    });

    it('calls client.mutate with element props', async function() {
      element.mutate();
      expect(mutateStub).to.have.been.calledWithMatch({
        mutation: element.mutation,
        variables: element.variables,
        update: element.updater,
      });
    });

    it('defaults to element\'s mutation', async function() {
      await element.mutate({ });
      expect(mutateStub).to.have.been.calledWith(match({ mutation }));
    });

    describe('with partial params', function() {
      class Test extends ApolloMutationMixin(HTMLElement)<NoParamMutationData, NoParamMutationVariables> {
      }

      const tag = unsafeStatic(defineCE(Test));

      let element: Test;

      beforeEach(async function() {
        element = await fixture<Test>(fhtml`<${tag}></${tag}>`);

        mutateStub.resolves({ data: true, loading: false, networkStatus: 7, stale: false });
      });

      it('defaults to element mutation', async function() {
        element.mutation = NoParamMutation;
        const optimisticResponse = { noParam: { noParam: null } };
        const variables = {};
        const update = (): void => { null; };

        element.mutate({
          optimisticResponse,
          variables,
          update,
        });

        expect(mutateStub).to.have.been.calledWithMatch(match({ mutation: element.mutation }));
      });

      it('defaults to element context', async function() {
        element.mutation = NoParamMutation;
        element.context = { the: 'context' };
        const optimisticResponse = { noParam: { noParam: null } };
        const variables = {};
        const update = (): void => { null; };

        element.mutate({
          optimisticResponse,
          variables,
          update,
        });

        expect(mutateStub).to.have.been.calledWithMatch(match({ context: { the: 'context' } }));
      });

      it('defaults to element optimisticResponse', async function() {
        const mutation = NoParamMutation;
        const variables = {};
        const update = (): void => { null; };

        element.mutate({
          variables,
          update,
          mutation,
        });

        expect(mutateStub).to.have.been
          .calledWithMatch(match({ optimisticResponse: element.optimisticResponse }));
      });

      it('defaults to element updater', async function() {
        element.updater = (): void => { null; };
        const mutation = NoParamMutation;
        const variables = {};

        element.mutate({
          variables,
          mutation,
        });

        expect(mutateStub).to.have.been.calledWithMatch(match({ update: element.updater }));
      });

      it('defaults to element variables', async function() {
        element.variables = {};
        const mutation = NoParamMutation;
        const optimisticResponse = { noParam: { noParam: null } };
        const update = (): void => { null; };

        element.mutate({ mutation, optimisticResponse, update });

        expect(mutateStub).to.have.been.calledWithMatch(match({ variables: element.variables }));
      });
    });

    describe('when mutation resolves', function() {
      it('calls onCompleted with data', async function() {
        await element.mutate();
        expect(element.onCompleted).to.have.been.calledWithMatch(data);
      });

      it('sets loading', async function() {
        const p = element.mutate();
        expect(element.loading).to.be.true;
        await p;
        expect(element.loading).to.be.false;
      });

      it('sets data', async function() {
        await element.mutate();
        expect(element.data).to.equal(data);
      });

      it('sets error', async function() {
        await element.mutate();
        expect(element.error).to.be.null;
      });
    });

    describe('when mutation rejects', function() {
      const apolloError = new ApolloError({ errorMessage: 'error' });
      beforeEach(async function() {
        mutateStub.rejects(apolloError);
      });

      it('calls onError with error', async function() {
        try {
          await element.mutate();
          expect.fail('no error');
        } catch (error) {
          expect(onError).to.have.been.calledWithMatch(error);
        }
      });

      it('sets data, error, loading', async function() {
        try {
          await element.mutate();
        } catch (error) {
          expect(element.data).to.be.null;
          expect(element.error).to.equal(error);
          expect(element.loading).to.be.false;
        }
      });
    });
  });
});
