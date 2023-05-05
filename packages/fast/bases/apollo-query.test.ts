import type * as C from '@apollo/client/core';

import type * as I from '@apollo-elements/core/types';

import type { ApolloQueryElement } from '@apollo-elements/core';

import { makeClient, SetupOptions } from '@apollo-elements/test';

import { fixture, expect } from '@open-wc/testing';

import { unsafeStatic, html as h } from 'lit/static-html.js';

import { ApolloQuery } from './apollo-query';
import { FASTElement, customElement, html, DOM } from '@microsoft/fast-element';
import { NetworkStatus } from '@apollo/client/core';
import { describeQuery } from '@apollo-elements/test/query.test';
import { spy, useFakeTimers, SinonSpy, SinonFakeTimers } from 'sinon';

import * as S from '@apollo-elements/test/schema';

import {
  assertType,
  isApolloError,
  setupSpies,
  setupStubs,
  stringify,
  TestableElement,
} from '@apollo-elements/test';

const template = html<TestableApolloQuery>`
  <output id="data">${x => stringify(x.data)}</output>
  <output id="error">${x => stringify(x.error)}</output>
  <output id="errors">${x => stringify(x.errors)}</output>
  <output id="loading">${x => stringify(x.loading)}</output>
  <output id="networkStatus">${x => stringify(x.networkStatus)}</output>
`;

@customElement({ name: 'fast-testable-apollo-query-class', template })
class TestableApolloQuery<D = unknown, V extends C.OperationVariables = I.VariablesOf<D>>
  extends ApolloQuery<D, V>
  implements TestableElement {
  async hasRendered() {
    await DOM.nextUpdate();
    return this;
  }

  $(id: keyof this) {
    return this.shadowRoot!.getElementById(id as string);
  }
}

let counter = -1;

describe('[FAST] ApolloQuery', function() {
  describeQuery({
    async setupFunction<T extends ApolloQueryElement>(opts?: SetupOptions<T>) {
      const name = `fast-setup-function-element-${counter++}`;

      @customElement({ name, template })
      class Test extends TestableApolloQuery { }

      const attrs = opts?.attributes ? ` ${opts.attributes}` : '';
      const innerHTML = opts?.innerHTML ?? '';

      const spies = setupSpies(opts?.spy, Test.prototype as unknown as T);
      const stubs = setupStubs(opts?.stub, Test.prototype as unknown as T);

      const element = await fixture<T>(
        `<${name}${attrs}>${innerHTML}</${name}>`);

      for (const [key, val] of Object.entries(opts?.properties ?? {}) as I.Entries<T>)
        element[key] = val;

      await DOM.nextUpdate();

      return { element, spies, stubs };
    },
  });

  describe('subclassing', function() {
    it('is an instance of FASTElement', async function() {
      const name = 'is-an-instance-of-f-a-s-t-element';
      @customElement({ name })
      class Test extends ApolloQuery { }
      const tag = unsafeStatic(name);
      const el = await fixture<Test>(h`<${tag}></${tag}>`);
      expect(el).to.be.an.instanceOf(FASTElement);
    });
  });

  it('renders when data is set', async function rendersOnData() {
    const name = 'renders-when-data-is-set';
    const template = html<Test>`${x => x.data?.foo ?? 'FAIL'}`;
    @customElement({ name, template }) class Test extends ApolloQuery<{ foo: 'bar' }> { }
    const tag = unsafeStatic(name);
    const element = await fixture<Test>(h`<${tag} .data="${{ foo: 'bar' }}"></${tag}>`);
    expect(element).shadowDom.to.equal('bar');
  });

  describe('polling', function() {
    const name = 'polling-and-timers';
    @customElement({ name })
    class Test extends ApolloQuery {
      query = S.NullableParamQuery;
    }
    let element: ApolloQuery;
    let clock: SinonFakeTimers;
    beforeEach(async function() {
      element = await fixture<Test>(`<${name}></${name}>`);
      element.client = makeClient();
    });
    beforeEach(() => spy(element.controller, 'refetch'));
    beforeEach(() => {
      clock = useFakeTimers();
    });
    afterEach(() => clock.restore());
    afterEach(() => {
      (element.controller.refetch as SinonSpy).restore?.();
    });
    describe('calling startPolling(1000)', function() {
      beforeEach(function startPolling() { element.startPolling(1000); });
      beforeEach(() => {
        clock.tick(3500);
      });
      it('refetches', function() {
        expect(element.controller.refetch).to.have.been.calledThrice;
      });
      describe('then stopPolling', function() {
        beforeEach(function stopPolling() { element.stopPolling(); });
        beforeEach(() => { clock.tick(3500); });
        it('stops calling refetch', function() {
          expect(element.controller.refetch).to.have.been.calledThrice;
        });
      });
    });
  });
});

type TypeCheckData = { a: 'a', b: number };
type TypeCheckVars = { d: 'd', e: number };
class TypeCheck extends ApolloQuery<TypeCheckData, TypeCheckVars> {
  typeCheck() {
    /* eslint-disable max-len, func-call-spacing, no-multi-spaces */

    assertType<HTMLElement>                         (this);
    assertType<FASTElement>                         (this);

    // ApolloElementInterface
    assertType<C.ApolloClient<C.NormalizedCacheObject>>(this.client!);
    assertType<Record<string, unknown>>             (this.context!);
    assertType<boolean>                             (this.loading);
    assertType<C.DocumentNode>                      (this.document!);
    assertType<Error>                               (this.error!);
    assertType<readonly I.GraphQLError[]>           (this.errors!);
    assertType<TypeCheckData>                       (this.data!);
    assertType<string>                              (this.error.message);
    assertType<'a'>                                 (this.data.a);
    assertType<number>                              (this.data.b);
    if (isApolloError(this.error))
      assertType<readonly I.GraphQLError[]>         (this.error.graphQLErrors);

    // ApolloQueryInterface
    assertType<C.DocumentNode>                      (this.query!);
    assertType<TypeCheckVars>                       (this.variables!);
    assertType<C.ErrorPolicy>                       (this.errorPolicy!);
    assertType<string>                              (this.errorPolicy);
    // @ts-expect-error: ErrorPolicy is not a number
    assertType<number>                              (this.errorPolicy);
    assertType<C.WatchQueryFetchPolicy>             (this.fetchPolicy!);
    assertType<string>                              (this.fetchPolicy);
    if (typeof this.nextFetchPolicy !== 'function')
      assertType<C.WatchQueryFetchPolicy>           (this.nextFetchPolicy!);
    assertType<NetworkStatus>                       (this.networkStatus);
    assertType<number>                              (this.networkStatus);
    // @ts-expect-error: NetworkStatus is not a string
    assertType<string>                              (this.networkStatus);
    assertType<boolean>                             (this.notifyOnNetworkStatusChange!);
    assertType<number>                              (this.pollInterval!);
    assertType<boolean>                             (this.partial!);
    assertType<boolean>                             (this.partialRefetch!);
    assertType<boolean>                             (this.returnPartialData!);
    assertType<boolean>                             (this.noAutoSubscribe);
    assertType<Partial<C.WatchQueryOptions<TypeCheckVars, TypeCheckData>>>(this.options!);

    /* eslint-enable max-len, func-call-spacing, no-multi-spaces */
  }
}

type TDN = C.TypedDocumentNode<TypeCheckData, TypeCheckVars>;
class TDNTypeCheck extends ApolloQuery<TDN> {
  typeCheck() {
    assertType<TypeCheckData>(this.data!);
    assertType<TypeCheckVars>(this.variables!);
    assertType<TDN>(this.query!);
  }
}
