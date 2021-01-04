import type { SubscriptionElement } from '@apollo-elements/test-helpers/subscription.test';

import type {
  ApolloClient,
  DocumentNode,
  FetchPolicy,
  FetchResult,
  Observable,
  NormalizedCacheObject,
  TypedDocumentNode,
} from '@apollo/client/core';

import { fixture, expect, oneEvent, nextFrame, defineCE } from '@open-wc/testing';

import { setupClient, teardownClient } from '../test-helpers/client';

import {
  describeSubscription,
  setupSubscriptionClass,
} from '@apollo-elements/test-helpers/subscription.test';

import { PolymerApolloSubscription } from './apollo-subscription';
import { GraphQLError } from 'graphql';
import { assertType, isApolloError } from '@apollo-elements/test-helpers';
import { html, PolymerElement } from '@polymer/polymer';

import NullableParamSubscription from '@apollo-elements/test-helpers/graphql/NullableParam.subscription.graphql';

import './apollo-subscription';

class TestableApolloSubscription<D, V>
  extends PolymerApolloSubscription<D, V>
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

  $(id: keyof TestableApolloSubscription<D, V>) { return this.shadowRoot.getElementById(id); }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(TestableApolloSubscription.template.content.cloneNode(true));
    this.addEventListener('data-changed', this.render);
    this.addEventListener('error-changed', this.render);
    this.addEventListener('loading-changed', this.render);
  }

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

describe('[polymer] <apollo-subscription>', function() {
  describeSubscription({
    class: TestableApolloSubscription,
    setupFunction: setupSubscriptionClass(TestableApolloSubscription),
  });

  describe('notifying properties', function() {
    beforeEach(setupClient);
    afterEach(teardownClient);
    let element: PolymerApolloSubscription<unknown, unknown>;

    beforeEach(async function() {
      element = await fixture<typeof element>(`<apollo-subscription></apollo-subscription>`);
    });

    it('notifies on data change', async function() {
      const data = { messages: ['hi'] };
      setTimeout(() => element.data = data);
      const { detail: { value } } = await oneEvent(element, 'data-changed');
      expect(value).to.deep.equal(data);
    });

    it('notifies on error change', async function() {
      const err = new Error('error');
      setTimeout(() => element.error = err);
      const { detail: { value } } = await oneEvent(element, 'error-changed');
      expect(value).to.equal(err);
    });

    it('notifies on errors change', async function() {
      const errs = [new GraphQLError('error')];
      setTimeout(() => element.errors = errs);
      const { detail: { value } } = await oneEvent(element, 'errors-changed');
      expect(value).to.equal(errs);
    });

    it('notifies on loading change', async function() {
      setTimeout(() => element.loading = true);
      const { detail: { value } } = await oneEvent(element, 'loading-changed');
      expect(value).to.be.true;
    });

    describe('when used in a Polymer template', function() {
      let wrapper: WrapperElement;
      class WrapperElement extends PolymerElement {
        declare shadowRoot: ShadowRoot;

        static get properties() {
          return {
            subscription: {
              type: Object,
              value: () => NullableParamSubscription,
            },
            variables: {
              type: Object,
              value: () => ({ nullable: '🤡' }),
            },
          };
        }

        static get template() {
          return html`
          <apollo-subscription
              subscription="[[subscription]]"
              variables="[[variables]]"
              data="{{data}}"
          ></apollo-subscription>

          <output>[[data.nullableParam.nullable]]</output>
        `;
        }
      }

      beforeEach(async function() {
        const tag = defineCE(WrapperElement);
        wrapper = await fixture<WrapperElement>(`<${tag}></${tag}>`);
      });

      it('binds data up into parent component', async function() {
        expect(wrapper.shadowRoot.textContent).to.contain('🤡');
      });
    });
  });
});

type TypeCheckData = { a: 'a', b: number };
type TypeCheckVars = { d: 'd', e: number };
class TypeCheck extends PolymerApolloSubscription<TypeCheckData, TypeCheckVars> {
  typeCheck() {
    /* eslint-disable max-len, func-call-spacing, no-multi-spaces */
    assertType<HTMLElement>                         (this);

    // ApolloElementInterface
    assertType<ApolloClient<NormalizedCacheObject>> (this.client);
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
class TDNTypeCheck extends PolymerApolloSubscription<TDN> {
  typeCheck() {
    assertType<TypeCheckData>(this.data!);
    assertType<TypeCheckVars>(this.variables!);
  }
}
