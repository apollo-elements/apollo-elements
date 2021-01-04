import type {
  ApolloClient,
  DocumentNode,
  ErrorPolicy,
  FetchPolicy,
  FetchResult,
  NormalizedCacheObject,
  TypedDocumentNode,
} from '@apollo/client/core';

import type { RefetchQueryDescription } from '@apollo/client/core/watchQueryOptions';

import type { GraphQLError } from '@apollo-elements/interfaces';

import {
  defineCE,
  unsafeStatic,
  fixture,
  expect,
  html as fhtml,
  nextFrame,
} from '@open-wc/testing';

import { spy, SinonSpy } from 'sinon';

import 'sinon-chai';

import {
  setupClient,
  teardownClient,
  isApolloError,
  assertType,
} from '@apollo-elements/test-helpers';

import type {
  NoParamMutationData,
  NonNullableParamMutationData,
  NonNullableParamMutationVariables,
} from '@apollo-elements/test-helpers';

import type { MutationElement } from '@apollo-elements/test-helpers/mutation.test';

import { ApolloMutation } from './apollo-mutation';
import { LitElement, html, Constructor } from 'lit-element';

import NoParamMutation from '@apollo-elements/test-helpers/graphql/NoParam.mutation.graphql';

import { describeMutation, setupMutationClass } from '@apollo-elements/test-helpers/mutation.test';

class TestableApolloMutation<D, V> extends ApolloMutation<D, V> implements MutationElement<D, V> {
  declare shadowRoot: ShadowRoot;

  render() {
    return html`
      <output id="called">${this.stringify(this.called)}</output>
      <output id="data">${this.stringify(this.data)}</output>
      <output id="error">${this.stringify(this.error)}</output>
      <output id="errors">${this.stringify(this.errors)}</output>
      <output id="loading">${this.stringify(this.loading)}</output>
    `;
  }

  stringify(x: unknown) {
    return JSON.stringify(x, null, 2);
  }

  async hasRendered(): Promise<this> {
    await nextFrame();
    await this.updateComplete;
    return this;
  }
}

describe('[lit-apollo] ApolloMutation', function() {
  describeMutation({
    class: TestableApolloMutation,
    setupFunction: setupMutationClass(TestableApolloMutation as Constructor<MutationElement>),
  });

  describe('subclassing', function() {
    let spies: Record<string|keyof ApolloMutation<unknown, unknown>, SinonSpy>;

    beforeEach(setupClient);
    afterEach(teardownClient);

    beforeEach(function setupSpies() {
      spies = {
        'client.mutate': spy(window.__APOLLO_CLIENT__!, 'mutate'),
      };
    });

    afterEach(function restoreSpies() {
      for (const spy of Object.values(spies))
        spy.restore();
    });

    it('is an instance of LitElement', async function() {
      class Test extends ApolloMutation<unknown, unknown> { }
      const tag = defineCE(Test);
      const element = await fixture<Test>(`<${tag}></${tag}>`);
      expect(element).to.be.an.instanceOf(LitElement);
    });

    describe('with update defined as a class method', function() {
      let element: Test;

      class Test extends ApolloMutation<NoParamMutationData, unknown> {
        mutation = NoParamMutation;

        update(changed: Map<string|number|symbol, unknown>): void {
          super.update(changed);
        }
      }

      beforeEach(async function setupElement() {
        const tag = defineCE(Test);
        element = await fixture<Test>(`<${tag}></${tag}>`);
      });

      describe('mutate()', function() {
        beforeEach(async function callMutate() {
          await element.mutate();
        });

        it('does not use LitElement#update as mutation update', function() {
          expect(element.client!.mutate).to.not.have.been.calledWithMatch({
            update: element.update,
          });
        });
      });
    });

    describe('refetchQueries', function() {
      class Test extends ApolloMutation<unknown, unknown> { }
      let element: Test;

      describe(`when refetch-queries attribute set with comma-separated, badly-formatted query names`, function() {
        beforeEach(async function() {
          const tag = defineCE(class extends Test { });
          element = await fixture<Test>(`<${tag} refetch-queries="QueryA, QueryB,QueryC,    QueryD" ></${tag}>`);
        });

        it('sets the property as an array of query names', function() {
          expect(element.refetchQueries).to.deep.equal(['QueryA', 'QueryB', 'QueryC', 'QueryD']);
        });
      });

      describe(`when refetchQueries property set as array of query names`, function() {
        const refetchQueries = ['QueryA', 'QueryB', 'QueryC', 'QueryD'];
        beforeEach(async function() {
          const tag = unsafeStatic(defineCE(class extends Test { }));
          element = await fixture<Test>(fhtml`<${tag} .refetchQueries="${refetchQueries}"></${tag}>`);
        });

        it('sets the property as an array of query names', function() {
          expect(element.refetchQueries).to.equal(refetchQueries);
        });

        it('does not reflect', function() {
          expect(element.getAttribute('refetch-queries')).to.be.null;
        });
      });
    });
  });
});

type TypeCheckData = { a: 'a', b: number };
type TypeCheckVars = { d: 'd', e: number };
class TypeCheck extends ApolloMutation<TypeCheckData, TypeCheckVars> {
  typeCheck() {
    /* eslint-disable max-len, func-call-spacing, no-multi-spaces */

    assertType<HTMLElement>                         (this);
    assertType<LitElement>                          (this);

    // ApolloElementInterface
    assertType<ApolloClient<NormalizedCacheObject>> (this.client!);
    assertType<Record<string, unknown>>             (this.context!);
    assertType<boolean>                             (this.loading);
    assertType<DocumentNode>                        (this.document!);
    assertType<Error>                               (this.error!);
    assertType<readonly GraphQLError[]>             (this.errors!);
    assertType<TypeCheckData>                       (this.data!);
    assertType<string>                              (this.error.message);
    assertType<'a'>                                 (this.data!.a);
    // @ts-expect-error: b as number type
    assertType<'a'>                                 (this.data.b);
    if (isApolloError(this.error))
      assertType<readonly GraphQLError[]>           (this.error.graphQLErrors);

    // ApolloMutationInterface
    assertType<DocumentNode>                        (this.mutation!);
    assertType<TypeCheckVars>                       (this.variables!);
    assertType<boolean>                             (this.called);
    assertType<boolean>                             (this.ignoreResults);
    assertType<boolean>                             (this.awaitRefetchQueries!);
    assertType<number>                              (this.mostRecentMutationId);
    assertType<ErrorPolicy>                         (this.errorPolicy!);
    assertType<string>                              (this.errorPolicy);
    // @ts-expect-error: ErrorPolicy is not a number
    assertType<number>                              (this.errorPolicy);
    assertType<string>                              (this.fetchPolicy!);
    assertType<Extract<FetchPolicy, 'no-cache'>>    (this.fetchPolicy);

    if (typeof this.refetchQueries === 'function')
      assertType<(result: FetchResult<TypeCheckData>) => RefetchQueryDescription>(this.refetchQueries);
    else
      assertType<RefetchQueryDescription>(this.refetchQueries!);

    if (typeof this.optimisticResponse !== 'function')
      assertType<TypeCheckData>(this.optimisticResponse!);
    else
      assertType<(vars: TypeCheckVars) => TypeCheckData>(this.optimisticResponse);

    /* eslint-enable max-len, func-call-spacing, no-multi-spaces */
  }
}

type TDN = TypedDocumentNode<TypeCheckData, TypeCheckVars>;
class TDNTypeCheck extends ApolloMutation<TDN> {
  typeCheck() {
    assertType<TypeCheckData>(this.data!);
    assertType<TypeCheckVars>(this.variables!);
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
