import type {
  ApolloClient,
  ErrorPolicy,
  FetchPolicy,
  FetchResult,
  MutationUpdaterFn,
  NormalizedCacheObject,
} from '@apollo/client/core';

import type { RefetchQueryDescription } from '@apollo/client/core/watchQueryOptions';

import type { DocumentNode, GraphQLError } from 'graphql';

import { unsafeStatic, fixture, expect, html as fhtml } from '@open-wc/testing';
import sinon from 'sinon';
import 'sinon-chai';
import {
  client,
  setupClient,
  teardownClient,
  NoParamMutationData,
  NonNullableParamMutationData,
  NonNullableParamMutationVariables,
  NoParamMutationVariables,
  isApolloError,
  assertType,
} from '@apollo-elements/test-helpers';

import { ApolloMutation } from './apollo-mutation';
import { FASTElement, html, customElement, DOM } from '@microsoft/fast-element';

import NoParamMutation from '../test-helpers/NoParam.mutation.graphql';

type TypeCheckData = { a: 'a', b: number };
type TypeCheckVars = { d: 'd', e: number };
class TypeCheck extends ApolloMutation<TypeCheckData, TypeCheckVars> {
  render() {
    /* eslint-disable max-len, func-call-spacing, no-multi-spaces */

    assertType<HTMLElement>                         (this);

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

class TypeCheckAccessor extends ApolloMutation<
  NonNullableParamMutationData,
  NonNullableParamMutationVariables
> {
  // @ts-expect-error: current typescript versions don't allow this type of override
  get variables() {
    return { param: 'string' };
  }

  set variables(v) {
    null;
  }
}

class TypeCheckProperty extends ApolloMutation<
  NonNullableParamMutationData,
  NonNullableParamMutationVariables
> {
  variables = { param: 'string' }
}

describe('[fast] ApolloMutation', function describeApolloMutation() {
  beforeEach(setupClient);
  afterEach(teardownClient);

  it('is an instance of FASTElement', async function() {
    const name = 'is-an-instance-of-f-a-s-t-element';
    @customElement({ name }) class Test extends ApolloMutation<unknown, unknown> { }
    const tag = unsafeStatic(name);
    const el = await fixture<Test>(fhtml`<${tag}></${tag}>`);
    expect(el).to.be.an.instanceOf(FASTElement);
  });

  it('renders when called is set', async function rendersOnCalled() {
    const name = 'renders-when-called-is-set';
    const template = html<Test>`${x => x.called ? 'CALLED' : 'FAIL'}`;
    @customElement({ name, template }) class Test extends ApolloMutation<unknown, unknown> { }
    const tag = unsafeStatic(name);
    const element = await fixture<Test>(fhtml`<${tag} .called="${true}"></${tag}>`);
    expect(element).shadowDom.to.equal('CALLED');
  });

  it('uses element\'s updater method for mutation\'s `update` option by default', async function() {
    const name = 'uses-elements-updater-1';
    const template = html<Test>`${x => JSON.stringify(x.data ?? {}, null, 2)}`;
    const mutation = NoParamMutation;

    @customElement({ name, template })
    class Test extends ApolloMutation<NoParamMutationData, NoParamMutationVariables> {
      client = client;

      mutation = mutation;

      updater(): void { '💩'; }
    }

    const tag = unsafeStatic(name);

    const element =
      await fixture<Test>(fhtml`<${tag}></${tag}>`);

    const clientSpy =
      sinon.spy(element.client, 'mutate');

    await element.mutate();
    expect(clientSpy).to.have.been.calledWith(sinon.match({ update: element.updater }));
    clientSpy.restore();
  });

  it('allows passing custom update function', async function customUpdate() {
    const name = 'allows-passing-custom-update-function';
    const template = html<Test>`${x => JSON.stringify(x.data ?? {}, null, 2)}`;
    const mutation = NoParamMutation;

    @customElement({ name, template })
    class Test extends ApolloMutation<NoParamMutationData, unknown> {
      client = client;

      mutation = mutation;

      updater(): void { '💩'; }
    }

    const update = sinon.stub() as MutationUpdaterFn;
    const tag = unsafeStatic(name);
    const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);

    const clientSpy = sinon.spy(element.client, 'mutate');
    await element.mutate({ update });
    expect(clientSpy).to.have.been.calledWith(sinon.match({ update }));
    clientSpy.restore();
  });

  describe('refetchQueries', function() {
    let element: Test;

    class Test extends ApolloMutation<unknown, unknown> { }

    describe(
      'when refetch-queries attribute set with comma-separated, badly-formatted query names',
      function() {
        beforeEach(async function() {
          const name = `refetch-queries-attribute-${Date.now()}`;
          @customElement({ name }) class Klass extends Test { }

          Klass;

          const tag = unsafeStatic(name);

          const attrVal = 'QueryA, QueryB,QueryC,    QueryD';

          element =
            await fixture<Test>(fhtml`<${tag} refetch-queries="${attrVal}"></${tag}>`);

          await DOM.nextUpdate();
        });

        it('sets the property as an array of query names', function() {
          expect(element.refetchQueries).to.deep.equal(['QueryA', 'QueryB', 'QueryC', 'QueryD']);
        });
      }
    );

    describe(
      'when refetchQueries property set as array of query names',
      function() {
        beforeEach(async function() {
          const name = `refetch-queries-property-${Math.floor(Math.random() * Date.now())}`;

          @customElement({ name }) class Klass extends Test { }

          Klass;

          const tag = unsafeStatic(name);

          element =
            await fixture<Test>(fhtml`
              <${tag}
                  .refetchQueries="${['QueryA', 'QueryB', 'QueryC', 'QueryD']}"
              ></${tag}>
            `);

          await DOM.nextUpdate();
        });

        it('sets the property as an array of query names', function() {
          expect(element.refetchQueries).to.deep.equal(['QueryA', 'QueryB', 'QueryC', 'QueryD']);
        });

        it('does not reflect', function() {
          expect(element.getAttribute('refetch-queries')).to.be.null;
        });
      });
  });
});
