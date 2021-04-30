import type {
  ApolloClient,
  DocumentNode,
  FetchPolicy,
  FetchResult,
  NormalizedCacheObject,
  Observable,
  OperationVariables,
  TypedDocumentNode,
} from '@apollo/client/core';

import type { Entries, GraphQLError } from '@apollo-elements/interfaces';

import type { SubscriptionElement } from '@apollo-elements/test/subscription.test';

import { SetupOptions, setupSpies, setupStubs } from '@apollo-elements/test';

import {
  aTimeout,
  expect,
  fixture,
  html as fhtml,
  nextFrame,
  unsafeStatic,
} from '@open-wc/testing';
import { FASTElement, customElement, DOM, html } from '@microsoft/fast-element';
import { assertType, isApolloError } from '@apollo-elements/test';
import { describeSubscription } from '@apollo-elements/test/subscription.test';

import { ApolloSubscription } from './apollo-subscription';

const template = html<TestableApolloSubscription>`
  <output id="data">${x => x.stringify(x.data)}</output>
  <output id="error">${x => x.stringify(x.error)}</output>
  <output id="loading">${x => x.stringify(x.loading)}</output>
`;

@customElement({ name: 'testable-apollo-subscription', template })
class TestableApolloSubscription<D = unknown, V = OperationVariables>
  extends ApolloSubscription<D, V>
  implements SubscriptionElement<D, V> {
  declare shadowRoot: ShadowRoot;

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

let counter = 1;

describe('[fast] ApolloSubscription', function() {
  describeSubscription({
    async setupFunction<T extends SubscriptionElement>(opts?: SetupOptions<T>) {
      const name = `fast-setup-function-element-${counter++}`;

      @customElement({ name, template })
      class Test extends TestableApolloSubscription { }

      const attrs = opts?.attributes ? ` ${opts.attributes}` : '';
      const innerHTML = opts?.innerHTML ?? '';

      const spies = setupSpies(opts?.spy, Test.prototype as unknown as T);
      const stubs = setupStubs(opts?.stub, Test.prototype as unknown as T);

      const element = await fixture<T>(
        `<${name}${attrs}>${innerHTML}</${name}>`);

      for (const [key, val] of Object.entries(opts?.properties ?? {}) as Entries<T>)
        element[key] = val;

      await DOM.nextUpdate();

      return { element, spies, stubs };
    },
  });

  describe('subclassing', function() {
    it('is an instance of FASTElement', async function() {
      const name = 'is-an-instance-of-f-a-s-t-element';
      @customElement({ name })
      class Klass extends TestableApolloSubscription { }
      const el = await fixture<Klass>(`<${name}></${name}>`);
      expect(el).to.be.an.instanceOf(FASTElement);
    });

    it('renders when data is set', async function rendersOnData() {
      const name = 'renders-when-data-is-set';
      const template = html<Test>`${x => x.data?.foo ?? 'FAIL'}`;
      @customElement({ name, template })
      class Test extends ApolloSubscription<{ foo: 'bar' }, null> { }
      const tag = unsafeStatic(name);
      const element = await fixture<Test>(fhtml`<${tag} .data="${{ foo: 'bar' }}"></${tag}>`);
      expect(element).shadowDom.to.equal('bar');
    });
  });
});

type TypeCheckData = { a: 'a', b: number };
type TypeCheckVars = { d: 'd', e: number };
class TypeCheck extends ApolloSubscription<TypeCheckData, TypeCheckVars> {
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
    assertType<readonly GraphQLError[]>             (this.errors!);
    assertType<TypeCheckData>                       (this.data!);
    assertType<string>                              (this.error.message);
    assertType<'a'>                                 (this.data.a);
    // @ts-expect-error: b as number type
    assertType<'a'>                                 (this.data.b);
    if (isApolloError(this.error))
      assertType<readonly GraphQLError[]>           (this.error.graphQLErrors);

    // ApolloSubscriptionInterface
    assertType<DocumentNode>                          (this.subscription!);
    assertType<TypeCheckVars>                         (this.variables!);
    assertType<FetchPolicy>                           (this.fetchPolicy!);
    assertType<string>                                (this.fetchPolicy);
    assertType<boolean>                               (this.notifyOnNetworkStatusChange!);
    assertType<number>                                (this.pollInterval!);
    assertType<boolean>                               (this.skip);
    assertType<boolean>                               (this.noAutoSubscribe);
    assertType<Observable<FetchResult<TypeCheckData>>>(this.observable!);
    assertType<ZenObservable.Subscription>            (this.observableSubscription!);

    /* eslint-enable max-len, func-call-spacing, no-multi-spaces */
  }
}

type TDN = TypedDocumentNode<TypeCheckData, TypeCheckVars>;
class TDNTypeCheck extends ApolloSubscription<TDN> {
  typeCheck() {
    assertType<TypeCheckData>(this.data!);
    assertType<TypeCheckVars>(this.variables!);
  }
}
