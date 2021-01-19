import type {
  ApolloClient,
  ErrorPolicy,
  FetchPolicy,
  NetworkStatus,
  WatchQueryOptions,
  ObservableQuery,
  NormalizedCacheObject,
  DocumentNode,
  TypedDocumentNode,
} from '@apollo/client/core';

import { gql } from '@apollo/client/core';

import { GraphQLError } from 'graphql/error/GraphQLError';

import { fixture, expect, oneEvent, defineCE, nextFrame } from '@open-wc/testing';
import { stub } from 'sinon';

import {
  setupClient,
  teardownClient,
  assertType,
  isApolloError,
} from '@apollo-elements/test-helpers';

import './apollo-query';

import { PolymerApolloQuery } from './apollo-query';

import { PolymerElement, html } from '@polymer/polymer';

import NullableParamQuery from '@apollo-elements/test-helpers/graphql/NullableParam.query.graphql';

import { describeQuery, setupQueryClass } from '@apollo-elements/test-helpers/query.test';
import type { QueryElement } from '@apollo-elements/test-helpers/query.test';

class TestableApolloQuery<D, V>
  extends PolymerApolloQuery<D, V>
  implements QueryElement<D, V> {
  declare shadowRoot: ShadowRoot;

  static get template() {
    const template = document.createElement('template');
    template.innerHTML = /* html */`
      <output id="data"></output>
      <output id="error"></output>
      <output id="errors"></output>
      <output id="loading"></output>
      <output id="networkStatus"></output>
    `;
    return template;
  }

  $(id: keyof TestableApolloQuery<D, V>) { return this.shadowRoot.getElementById(id); }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(TestableApolloQuery.template.content.cloneNode(true));
    this.addEventListener('data-changed', this.render);
    this.addEventListener('error-changed', this.render);
    this.addEventListener('errors-changed', this.render);
    this.addEventListener('loading-changed', this.render);
    this.addEventListener('network-status-changed', this.render);
  }

  render() {
    this.$('data')!.textContent = this.stringify(this.data);
    this.$('error')!.textContent = this.stringify(this.error);
    this.$('errors')!.textContent = this.stringify(this.errors);
    this.$('loading')!.textContent = this.stringify(this.loading);
    this.$('networkStatus')!.textContent = this.stringify(this.networkStatus);
  }

  stringify(x: unknown) {
    return JSON.stringify(x, null, 2);
  }

  async hasRendered() {
    await nextFrame();
    return this;
  }
}

describe('[polymer] <apollo-query>', function() {
  describeQuery({
    setupFunction: setupQueryClass(TestableApolloQuery),
    class: TestableApolloQuery,
  });

  describe('notify events', function() {
    let element: PolymerApolloQuery<unknown, unknown>;
    beforeEach(setupClient);
    afterEach(teardownClient);

    beforeEach(async function() {
      element = await fixture<typeof element>(`<apollo-query></apollo-query>`);
    });

    it('notifies on data change', async function() {
      const queryStub = stub(element.client, 'query');

      queryStub.resolves({
        loading: false,
        partial: undefined,
        networkStatus: 7,
        data: { messages: ['hi'] },
      });

      const query = gql`query { messages }`;

      setTimeout(() => element.executeQuery({ query }));
      const { detail: { value } } = await oneEvent(element, 'data-changed');
      expect(value).to.deep.equal({ messages: ['hi'] });
      queryStub.restore();
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
            query: {
              type: Object,
              value: () => NullableParamQuery,
            },
            variables: {
              type: Object,
              value: () => ({ nullable: '🤡' }),
            },
          };
        }

        static get template() {
          return html`
          <apollo-query
              query="[[query]]"
              variables="[[variables]]"
              data="{{data}}"
          ></apollo-query>

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

class TypeCheck extends PolymerApolloQuery<TypeCheckData, TypeCheckVars> {
  typeCheck() {
    /* eslint-disable max-len, func-call-spacing, no-multi-spaces */

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

    // ApolloQueryInterface
    assertType<DocumentNode>                        (this.query!);
    assertType<TypeCheckVars>                       (this.variables!);
    assertType<ErrorPolicy>                         (this.errorPolicy!);
    assertType<string>                              (this.errorPolicy!);
    // @ts-expect-error: ErrorPolicy is not a number
    assertType<number>                              (this.errorPolicy);
    assertType<FetchPolicy>                         (this.fetchPolicy!);
    assertType<string>                              (this.fetchPolicy);
    assertType<FetchPolicy>                         (this.nextFetchPolicy!);
    assertType<string>                              (this.nextFetchPolicy);
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
class TDNTypeCheck extends PolymerApolloQuery<TDN> {
  typeCheck() {
    assertType<TypeCheckData>(this.data!);
    assertType<TypeCheckVars>(this.variables!);
  }
}
