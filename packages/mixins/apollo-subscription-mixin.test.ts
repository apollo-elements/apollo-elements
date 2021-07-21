import type * as C from '@apollo/client/core';

import type * as I from '@apollo-elements/core/types';

import { defineCE, expect, fixture } from '@open-wc/testing';

import { html as h, unsafeStatic } from 'lit/static-html.js';

import { ApolloSubscriptionMixin } from './apollo-subscription-mixin';

import {
  assertType,
  isApolloError,
  setupClient,
  teardownClient,
  stringify,
  TestableElement,
} from '@apollo-elements/test';

import {
  describeSubscription,
  setupSubscriptionClass,
} from '@apollo-elements/test/subscription.test';

class TestableApolloSubscription<D extends I.MaybeTDN = I.MaybeTDN, V = I.MaybeVariables<D>>
  extends ApolloSubscriptionMixin(HTMLElement)<D, V>
  implements TestableElement {
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

  $(id: keyof this) { return this.shadowRoot.getElementById(id as string); }

  observed: Array<keyof this> = ['data', 'error', 'loading'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' })
      .appendChild(TestableApolloSubscription.template.content.cloneNode(true));
  }

  render() {
    this.observed?.forEach(property => {
      if (this.$(property))
        this.$(property)!.textContent = stringify(this[property]);
    });
  }

  update() {
    this.render();
  }

  async hasRendered() {
    await this.controller.host.updateComplete;
    return this;
  }
}

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
      const element = await fixture<TestableApolloSubscription>(h`<${tag}></${tag}>`);

      expect(element).to.be.an.instanceOf(HTMLElement);
    });
  });
});

type TypeCheckData = { a: 'a', b: number };
type TypeCheckVars = { d: 'd', e: number };
export class TypeCheck extends TestableApolloSubscription<TypeCheckData, TypeCheckVars> {
  typeCheck(): void {
    /* eslint-disable max-len, func-call-spacing, no-multi-spaces */

    assertType<HTMLElement>                         (this);

    // ApolloElementInterface
    assertType<C.ApolloClient<C.NormalizedCacheObject>>  (this.client!);
    assertType<Record<string, unknown>>                  (this.context!);
    assertType<boolean>                                  (this.loading);
    assertType<C.DocumentNode>                           (this.document!);
    assertType<Error>                                    (this.error!);
    assertType<readonly I.GraphQLError[]>                (this.errors!);
    assertType<TypeCheckData>                            (this.data!);
    assertType<string>                                   (this.error.message);
    assertType<'a'>                                      (this.data.a);
    // @ts-expect-error: b as number type
    assertType<'a'>                                      (this.data.b);
    if (isApolloError(this.error))
      assertType<readonly I.GraphQLError[]>              (this.error.graphQLErrors);

    // ApolloSubscriptionInterface
    assertType<C.DocumentNode>                          (this.subscription!);
    assertType<TypeCheckVars>                           (this.variables!);
    assertType<C.FetchPolicy>                           (this.fetchPolicy!);
    assertType<string>                                  (this.fetchPolicy);
    assertType<boolean>                                 (this.notifyOnNetworkStatusChange!);
    assertType<number>                                  (this.pollInterval!);
    assertType<boolean>                                 (this.skip);
    assertType<boolean>                                 (this.noAutoSubscribe);

    /* eslint-enable max-len, func-call-spacing, no-multi-spaces */
  }
}
type TDN = C.TypedDocumentNode<TypeCheckData, TypeCheckVars>;
export class TDNTypeCheck extends TestableApolloSubscription<TDN> {
  typeCheck(): void {
    assertType<TypeCheckData>(this.data!);
    assertType<TypeCheckVars>(this.variables!);
  }
}
