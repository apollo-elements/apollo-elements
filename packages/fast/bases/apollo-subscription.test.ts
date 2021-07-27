import type * as C from '@apollo/client/core';

import type * as I from '@apollo-elements/core/types';

import type { ApolloSubscriptionElement } from '@apollo-elements/core/types';

import * as S from '@apollo-elements/test/schema';

import {
  setupClient,
  SetupOptions,
  setupSpies,
  setupStubs,
  stringify,
  teardownClient,
  TestableElement,
} from '@apollo-elements/test';

import { expect, fixture } from '@open-wc/testing';

import { html as h, unsafeStatic } from 'lit/static-html.js';

import { FASTElement, customElement, DOM, html } from '@microsoft/fast-element';
import { assertType, isApolloError } from '@apollo-elements/test';
import { describeSubscription } from '@apollo-elements/test/subscription.test';

import { ApolloSubscription } from './apollo-subscription';

const template = html<TestableApolloSubscription>`
  <output id="data">${x => stringify(x.data)}</output>
  <output id="error">${x => stringify(x.error)}</output>
  <output id="loading">${x => stringify(x.loading)}</output>
`;

@customElement({ name: 'testable-apollo-subscription', template })
class TestableApolloSubscription<D extends I.MaybeTDN = I.MaybeTDN, V = I.MaybeVariables<D>>
  extends ApolloSubscription<D, V>
  implements TestableElement {
  declare shadowRoot: ShadowRoot;

  async hasRendered() {
    await DOM.nextUpdate();
    return this;
  }

  $(id: keyof this) {
    return this.shadowRoot.getElementById(id as string);
  }
}

let counter = 1;

describe('[FAST] ApolloSubscription', function() {
  describeSubscription({
    async setupFunction<T extends ApolloSubscriptionElement>(opts?: SetupOptions<T>) {
      const name = `fast-setup-function-element-${counter++}`;

      @customElement({ name, template })
      class Test extends TestableApolloSubscription { }

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
      const element = await fixture<Test>(h`<${tag} .data="${{ foo: 'bar' }}"></${tag}>`);
      expect(element).shadowDom.to.equal('bar');
    });

    it('renders on error', async function() {
      setupClient();
      const name = 'renders-on-error';
      const template = html<Test>`${x => x.error?.message ?? 'FAIL'}`;
      @customElement({ name, template })
      class Test extends ApolloSubscription<typeof S.NullableParamSubscription> {
        subscription = S.NullableParamSubscription
        variables = { nullable: 'error' }
      }
      const tag = unsafeStatic(name);
      const element = await fixture<Test>(h`<${tag}></${tag}>`);
      expect(element.shadowRoot?.textContent).to.be.ok.and.to.not.contain('FAIL');
      teardownClient();
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
    assertType<C.ApolloClient<C.NormalizedCacheObject>>(this.client!);
    assertType<Record<string, unknown>>             (this.context!);
    assertType<boolean>                             (this.loading);
    assertType<C.DocumentNode>                      (this.document!);
    assertType<Error>                               (this.error!);
    assertType<readonly I.GraphQLError[]>           (this.errors!);
    assertType<TypeCheckData>                       (this.data!);
    assertType<string>                              (this.error.message);
    assertType<'a'>                                 (this.data.a);
    // @ts-expect-error: b as number type
    assertType<'a'>                                 (this.data.b);
    if (isApolloError(this.error))
      assertType<readonly I.GraphQLError[]>         (this.error.graphQLErrors);

    // ApolloSubscriptionInterface
    assertType<C.DocumentNode>                      (this.subscription!);
    assertType<TypeCheckVars>                       (this.variables!);
    assertType<C.FetchPolicy>                       (this.fetchPolicy!);
    assertType<string>                              (this.fetchPolicy);
    assertType<boolean>                             (this.notifyOnNetworkStatusChange!);
    assertType<number>                              (this.pollInterval!);
    assertType<boolean>                             (this.skip);
    assertType<boolean>                             (this.noAutoSubscribe);

    /* eslint-enable max-len, func-call-spacing, no-multi-spaces */
  }
}

type TDN = C.TypedDocumentNode<TypeCheckData, TypeCheckVars>;
class TDNTypeCheck extends ApolloSubscription<TDN> {
  typeCheck() {
    assertType<TypeCheckData>(this.data!);
    assertType<TypeCheckVars>(this.variables!);
  }
}
