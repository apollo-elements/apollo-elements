import type {
  ApolloClient,
  ErrorPolicy,
  FetchPolicy,
  WatchQueryOptions,
  ObservableQuery,
  NormalizedCacheObject,
} from '@apollo/client/core';

import type { DocumentNode, GraphQLError } from 'graphql';

import {
  fixture,
  unsafeStatic,
  expect,
  html as fhtml,
  nextFrame,
  aTimeout,
} from '@open-wc/testing';

import { ApolloQuery } from './apollo-query';
import { FASTElement, customElement, html, DOM } from '@microsoft/fast-element';
import { NetworkStatus } from '@apollo/client/core';

import { spy, stub, SinonSpy, SinonStub } from 'sinon';

import { SetupOptions, assertType, isApolloError } from '@apollo-elements/test-helpers';
import { QueryElement, describeQuery } from '@apollo-elements/test-helpers/query.test';

const template = html<TestableApolloQuery>`
  <output id="data">${x => x.stringify(x.data)}</output>
  <output id="error">${x => x.stringify(x.error)}</output>
  <output id="errors">${x => x.stringify(x.errors)}</output>
  <output id="loading">${x => x.stringify(x.loading)}</output>
  <output id="networkStatus">${x => x.stringify(x.networkStatus)}</output>
`;

@customElement({ name: 'fast-testable-apollo-query-class', template })
class TestableApolloQuery<D = unknown, V = unknown>
  extends ApolloQuery<D, V>
  implements QueryElement<D, V> {
  async hasRendered() {
    await nextFrame();
    await DOM.nextUpdate();
    await nextFrame();
    await aTimeout(50);
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

      const spies = Object.fromEntries((opts?.spy ?? []).map(key =>
        [key, spy(Test.prototype, key as keyof Test)])) as Record<keyof T | string, SinonSpy>;

      const stubs = Object.fromEntries((opts?.stub ?? []).map(key =>
        [key, stub(Test.prototype, key as keyof Test)])) as Record<keyof T | string, SinonStub>;

      const element = await fixture<T>(
        `<${name}${attrs}>${innerHTML}</${name}>`);

      for (const [key, val] of Object.entries(opts?.properties ?? {}))
        element[key] = val;

      await DOM.nextUpdate();

      return { element, spies, stubs };
    },
  });

  describe('subclassing', function() {
    it('is an instance of FASTElement', async function() {
      const name = 'is-an-instance-of-f-a-s-t-element';
      @customElement({ name })
      class Test extends ApolloQuery<unknown, unknown> { }
      const tag = unsafeStatic(name);
      const el = await fixture<Test>(fhtml`<${tag}></${tag}>`);
      expect(el).to.be.an.instanceOf(FASTElement);
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
    assertType<ApolloClient<NormalizedCacheObject>> (this.client);
    assertType<Record<string, unknown>>             (this.context);
    assertType<boolean>                             (this.loading);
    assertType<DocumentNode>                        (this.document);
    assertType<Error>                               (this.error);
    assertType<readonly GraphQLError[]>             (this.errors);
    assertType<TypeCheckData>                       (this.data);
    assertType<string>                              (this.error.message);
    assertType<'a'>                                 (this.data.a);
    assertType<number>                              (this.data.b);
    if (isApolloError(this.error))
      assertType<readonly GraphQLError[]>           (this.error.graphQLErrors);

    // ApolloQueryInterface
    assertType<DocumentNode>                        (this.query);
    assertType<TypeCheckVars>                       (this.variables);
    assertType<ErrorPolicy>                         (this.errorPolicy);
    assertType<string>                              (this.errorPolicy);
    // @ts-expect-error: ErrorPolicy is not a number
    assertType<number>                              (this.errorPolicy);
    assertType<FetchPolicy>                         (this.fetchPolicy);
    assertType<string>                              (this.fetchPolicy);
    assertType<FetchPolicy>                         (this.nextFetchPolicy);
    assertType<string>                              (this.nextFetchPolicy);
    assertType<NetworkStatus>                       (this.networkStatus);
    assertType<number>                              (this.networkStatus);
    // @ts-expect-error: NetworkStatus is not a string
    assertType<string>                              (this.networkStatus);
    assertType<boolean>                             (this.notifyOnNetworkStatusChange);
    assertType<number>                              (this.pollInterval);
    assertType<boolean>                             (this.partial);
    assertType<boolean>                             (this.partialRefetch);
    assertType<boolean>                             (this.returnPartialData);
    assertType<boolean>                             (this.noAutoSubscribe);
    assertType<ObservableQuery>                     (this.observableQuery);
    assertType<Partial<WatchQueryOptions>>          (this.options);

    /* eslint-enable max-len, func-call-spacing, no-multi-spaces */
  }
}
