import type {
  ApolloClient,
  DocumentNode,
  FetchPolicy,
  FetchResult,
  NormalizedCacheObject,
  OperationVariables,
  TypedDocumentNode,
} from '@apollo/client/core';

import type { Entries } from '@apollo-elements/interfaces';
import type { GraphQLError } from '@apollo-elements/interfaces';

import {
  defineCE, expect, fixture,
  html as fhtml, nextFrame, unsafeStatic,
} from '@open-wc/testing';

import 'sinon-chai';

import { Observable } from '@apollo/client/core';

import {
  setupClient,
  teardownClient,
  isApolloError,
  assertType,
} from '@apollo-elements/test-helpers';

import { ApolloSubscriptionMixin } from './apollo-subscription-mixin';

import {
  describeSubscription,
  setupSubscriptionClass,
  SubscriptionElement,
} from '@apollo-elements/test-helpers/subscription.test';
import { effect } from '@apollo-elements/lib/descriptors';

class TestableApolloSubscription<D = unknown, V = OperationVariables>
  extends ApolloSubscriptionMixin(HTMLElement)<D, V>
  implements SubscriptionElement<D, V> {
  declare shadowRoot: ShadowRoot;

  static get template() {
    const template = document.createElement('template');
    template.innerHTML = /* html */`
      <output id="data"></output>
      <output id="error"></output>
      <output id="loading"></output>
    `;
    return template;
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' })
      .appendChild(TestableApolloSubscription.template.content.cloneNode(true));
  }

  $(id: keyof TestableApolloSubscription) { return this.shadowRoot.getElementById(id); }

  render() {
    this.$('data')!.textContent = this.stringify(this.data);
    this.$('error')!.textContent = this.stringify(this.error);
    this.$('loading')!.textContent = this.stringify(this.loading);
  }

  stringify(x: unknown) {
    return JSON.stringify(x, null, 2);
  }

  async hasRendered() {
    await nextFrame();
    return this;
  }
}

const DEFAULTS = {
  data: null,
  error: null,
  errors: null,
  loading: false,
};

Object.defineProperties(TestableApolloSubscription.prototype, Object.fromEntries(
  (Object.entries(DEFAULTS) as Entries<TestableApolloSubscription>)
    .map(([name, init]) => [
      name,
      effect<TestableApolloSubscription>({
        name,
        init,
        onSet() {
          this.render();
        },
      }),
    ])
));

describe('[mixins] ApolloSubscriptionMixin', function describeApolloSubscriptionMixin() {
  describeSubscription({
    class: TestableApolloSubscription,
    setupFunction: setupSubscriptionClass(TestableApolloSubscription),
  });

  describe('subclassing', function() {
    beforeEach(setupClient);
    afterEach(teardownClient);

    it('returns an instance of the superclass', async function returnsClass() {
      const tag = unsafeStatic(defineCE(class extends TestableApolloSubscription {}));
      const element = await fixture<TestableApolloSubscription>(fhtml`<${tag}></${tag}>`);

      expect(element).to.be.an.instanceOf(HTMLElement);
    });
  });
});

type TypeCheckData = { a: 'a', b: number };
type TypeCheckVars = { d: 'd', e: number };
class TypeCheck extends TestableApolloSubscription<TypeCheckData, TypeCheckVars> {
  typeCheck() {
    /* eslint-disable max-len, func-call-spacing, no-multi-spaces */

    assertType<HTMLElement>                         (this);

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
class TDNTypeCheck extends TestableApolloSubscription<TDN> {
  typeCheck() {
    assertType<TypeCheckData>(this.data!);
    assertType<TypeCheckVars>(this.variables!);
  }
}
