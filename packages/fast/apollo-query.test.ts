import type {
  ApolloClient,
  DocumentNode,
  ErrorPolicy,
  WatchQueryFetchPolicy,
  NormalizedCacheObject,
  ObservableQuery,
  OperationVariables,
  TypedDocumentNode,
  WatchQueryOptions,
} from '@apollo/client/core';

import type * as I from '@apollo-elements/interfaces';

import type { SetupOptions } from '@apollo-elements/test';

import {
  fixture,
  expect,
  nextFrame,
  aTimeout,
} from '@open-wc/testing';

import { unsafeStatic, html as h } from 'lit/static-html.js';

import { ApolloQuery } from './apollo-query';
import { FASTElement, customElement, html, DOM } from '@microsoft/fast-element';
import { NetworkStatus } from '@apollo/client/core';

import { assertType, isApolloError, setupSpies, setupStubs } from '@apollo-elements/test';
import { QueryElement, describeQuery } from '@apollo-elements/test/query.test';

const template = html<TestableApolloQuery>`
  <output id="data">${x => x.stringify(x.data)}</output>
  <output id="error">${x => x.stringify(x.error)}</output>
  <output id="errors">${x => x.stringify(x.errors)}</output>
  <output id="loading">${x => x.stringify(x.loading)}</output>
  <output id="networkStatus">${x => x.stringify(x.networkStatus)}</output>
`;

@customElement({ name: 'fast-testable-apollo-query-class', template })
class TestableApolloQuery<D extends I.MaybeTDN = I.MaybeTDN, V = I.MaybeVariables<D>>
  extends ApolloQuery<D, V>
  implements QueryElement<D, V> {
  async hasRendered() {
    await this.updateComplete;
    return this;
  }

  stringify(x: unknown) {
    return JSON.stringify(x, null, 2);
  }
}

let counter = -1;

describe('[fast] ApolloQuery', function() {
  describeQuery({
    async setupFunction<T extends QueryElement>(opts?: SetupOptions<T>) {
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
    @customElement({ name, template }) class Test extends ApolloQuery<{ foo: 'bar' }, null> { }
    const tag = unsafeStatic(name);
    const element = await fixture<Test>(h`<${tag} .data="${{ foo: 'bar' }}"></${tag}>`);
    expect(element).shadowDom.to.equal('bar');
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
    assertType<ApolloClient<NormalizedCacheObject>> (this.client!);
    assertType<Record<string, unknown>>             (this.context!);
    assertType<boolean>                             (this.loading);
    assertType<DocumentNode>                        (this.document!);
    assertType<Error>                               (this.error!);
    assertType<readonly I.GraphQLError[]>             (this.errors!);
    assertType<TypeCheckData>                       (this.data!);
    assertType<string>                              (this.error.message);
    assertType<'a'>                                 (this.data.a);
    assertType<number>                              (this.data.b);
    if (isApolloError(this.error))
      assertType<readonly I.GraphQLError[]>           (this.error.graphQLErrors);

    // ApolloQueryInterface
    assertType<DocumentNode>                        (this.query!);
    assertType<TypeCheckVars>                       (this.variables!);
    assertType<ErrorPolicy>                         (this.errorPolicy!);
    assertType<string>                              (this.errorPolicy);
    // @ts-expect-error: ErrorPolicy is not a number
    assertType<number>                              (this.errorPolicy);
    assertType<WatchQueryFetchPolicy>               (this.fetchPolicy!);
    assertType<string>                              (this.fetchPolicy);
    if (typeof this.nextFetchPolicy !== 'function')
      assertType<WatchQueryFetchPolicy>             (this.nextFetchPolicy!);
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
    assertType<ObservableQuery<TypeCheckData, TypeCheckVars>>                     (this.observableQuery!);
    assertType<Partial<WatchQueryOptions<TypeCheckVars, TypeCheckData>>>          (this.options!);

    /* eslint-enable max-len, func-call-spacing, no-multi-spaces */
  }
}

type TDN = TypedDocumentNode<TypeCheckData, TypeCheckVars>;
class TDNTypeCheck extends ApolloQuery<TDN> {
  typeCheck() {
    assertType<TypeCheckData>(this.data!);
    assertType<TypeCheckVars>(this.variables!);
    assertType<TDN>(this.query!);
  }
}
