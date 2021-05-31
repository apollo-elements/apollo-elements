import type * as I from '@apollo-elements/interfaces';

import type * as C from '@apollo/client/core';

import type { RefetchQueryDescription } from '@apollo/client/core/watchQueryOptions';

import type {
  NoParamMutationData,
  NonNullableParamMutationData,
  NonNullableParamMutationVariables,
} from '@apollo-elements/test';

import { defineCE, expect, fixture, nextFrame } from '@open-wc/testing';

import { html as h, unsafeStatic } from 'lit/static-html.js';

import { spy, SinonSpy } from 'sinon';

import {
  assertType,
  isApolloError,
  setupClient,
  teardownClient,
  TestableElement,
} from '@apollo-elements/test';

import { ApolloMutation } from './apollo-mutation';
import { LitElement, html, TemplateResult } from 'lit';

import { property } from 'lit/decorators.js';

import NoParamMutation from '@apollo-elements/test/graphql/NoParam.mutation.graphql';

import { describeMutation, setupMutationClass } from '@apollo-elements/test/mutation.test';
import { stringify } from '@apollo-elements/test';

class TestableApolloMutation<D extends I.MaybeTDN = I.MaybeTDN, V = I.MaybeVariables<D>>
  extends ApolloMutation<D, V> implements TestableElement {
  declare shadowRoot: ShadowRoot;

  render() {
    return html`
      <output id="called">${stringify(this.called)}</output>
      <output id="data">${stringify(this.data)}</output>
      <output id="error">${stringify(this.error)}</output>
      <output id="errors">${stringify(this.errors)}</output>
      <output id="loading">${stringify(this.loading)}</output>
    `;
  }

  $(id: keyof this): HTMLElement | null {
    return this.shadowRoot.getElementById(id as string);
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
    setupFunction: setupMutationClass(TestableApolloMutation),
  });

  describe('subclassing', function() {
    let spies: Record<string|keyof ApolloMutation, SinonSpy>;

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
      class Test extends ApolloMutation { }
      const tag = defineCE(Test);
      const element = await fixture<Test>(`<${tag}></${tag}>`);
      expect(element).to.be.an.instanceOf(LitElement);
    });

    it('renders when data is set', async function rendersOnData() {
      class Test extends ApolloMutation<{ foo: string }> {
        render(): TemplateResult {
          return html`${this.data?.foo ?? 'FAIL'}`;
        }
      }

      const tagName = defineCE(Test);
      const tag = unsafeStatic(tagName);
      const element = await fixture<Test>(h`<${tag} .data="${{ foo: 'bar' }}"></${tag}>`);
      expect(element).shadowDom.to.equal('bar');
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
      class Test extends ApolloMutation { }
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
          element = await fixture<Test>(h`<${tag} .refetchQueries="${refetchQueries}"></${tag}>`);
        });

        it('sets the property as an array of query names', function() {
          expect(element.refetchQueries).to.equal(refetchQueries);
        });

        it('does not reflect', function() {
          expect(element.getAttribute('refetch-queries')).to.be.null;
        });
      });
    });

    describe('with a class that defines observedAttributes with decorator', function() {
      class Test extends ApolloMutation {
        @property({ type: Number, attribute: 'x-a', reflect: true }) xA = 0;
      }

      let element: Test;

      beforeEach(async function subclass() {
        const tagName = defineCE(Test);
        element = await fixture<Test>(`<${tagName}></${tagName}>`);
      });

      it('preserves decorator behaviour', async function() {
        element.xA = 2;
        await element.updateComplete;
        expect(element.getAttribute('x-a')).to.equal('2');
        element.setAttribute('x-a', '1');
        expect(element.xA).to.equal(1);
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
    assertType<C.ApolloClient<C.NormalizedCacheObject>>(this.client!);
    assertType<Record<string, unknown>>             (this.context!);
    assertType<boolean>                             (this.loading);
    assertType<C.DocumentNode>                      (this.document!);
    assertType<Error>                               (this.error!);
    assertType<readonly I.GraphQLError[]>           (this.errors!);
    assertType<TypeCheckData>                       (this.data!);
    assertType<string>                              (this.error.message);
    assertType<'a'>                                 (this.data!.a);
    // @ts-expect-error: b as number type
    assertType<'a'>                                 (this.data.b);
    if (isApolloError(this.error))
      assertType<readonly I.GraphQLError[]>         (this.error.graphQLErrors);

    // ApolloMutationInterface
    assertType<C.DocumentNode>                      (this.mutation!);
    assertType<TypeCheckVars>                       (this.variables!);
    assertType<boolean>                             (this.called);
    assertType<boolean>                             (this.ignoreResults!);
    assertType<boolean>                             (this.awaitRefetchQueries!);
    assertType<C.ErrorPolicy>                       (this.errorPolicy!);
    assertType<string>                              (this.errorPolicy);
    // @ts-expect-error: ErrorPolicy is not a number
    assertType<number>                              (this.errorPolicy);
    assertType<string>                              (this.fetchPolicy!);
    assertType<Extract<C.FetchPolicy, 'no-cache'>>  (this.fetchPolicy);

    if (typeof this.refetchQueries === 'function')
      assertType<(result: C.FetchResult<TypeCheckData>) => RefetchQueryDescription>(this.refetchQueries);
    else
      assertType<RefetchQueryDescription>(this.refetchQueries!);

    if (typeof this.optimisticResponse !== 'function')
      assertType<TypeCheckData>(this.optimisticResponse!);
    else
      assertType<(vars: TypeCheckVars) => TypeCheckData>(this.optimisticResponse);

    /* eslint-enable max-len, func-call-spacing, no-multi-spaces */
  }
}

type TDN = C.TypedDocumentNode<TypeCheckData, TypeCheckVars>;
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
