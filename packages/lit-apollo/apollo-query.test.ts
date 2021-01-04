import type {
  ApolloClient,
  DocumentNode,
  ErrorPolicy,
  FetchPolicy,
  WatchQueryOptions,
  ObservableQuery,
  NormalizedCacheObject,
  TypedDocumentNode,
} from '@apollo/client/core';

import type { GraphQLError } from '@apollo-elements/interfaces';

import { assertType, isApolloError } from '@apollo-elements/test-helpers';

import { describeQuery, setupQueryClass } from '@apollo-elements/test-helpers/query.test';

import { defineCE, fixture, expect, nextFrame } from '@open-wc/testing';

import { ApolloQuery } from './apollo-query';
import { html, LitElement, PropertyValues } from 'lit-element';
import { NetworkStatus } from '@apollo/client/core';

class TestableApolloQuery<D, V> extends ApolloQuery<D, V> {
  render() {
    return html`
      <output id="data">${this.stringify(this.data)}</output>
      <output id="error">${this.stringify(this.error)}</output>
      <output id="errors">${this.stringify(this.errors)}</output>
      <output id="loading">${this.stringify(this.loading)}</output>
      <output id="networkStatus">${this.stringify(this.networkStatus)}</output>
    `;
  }

  stringify(x: unknown) {
    return JSON.stringify(x, null, 2);
  }

  async hasRendered() {
    await nextFrame();
    await this.updateComplete;
    return this;
  }
}

const setupFunction = setupQueryClass(TestableApolloQuery);

describe('[lit-apollo] ApolloQuery', function() {
  describeQuery({ setupFunction, class: TestableApolloQuery });

  describe('subclassing', function() {
    let el: ApolloQuery<unknown, unknown>;
    beforeEach(async function subclass() {
      class Test extends ApolloQuery<unknown, unknown> { }
      const tagName = defineCE(Test);
      el = await fixture<Test>(`<${tagName}></${tagName}>`);
    });

    it('produces an instance of LitElement', function() {
      expect(el).to.be.an.instanceOf(LitElement);
    });
  });
});

type TypeCheckData = { a: 'a', b: number };
type TypeCheckVars = { d: 'd', e: number };

class TypeCheck extends ApolloQuery<TypeCheckData, TypeCheckVars> {
  typeCheck() {
    /* eslint-disable max-len, func-call-spacing, no-multi-spaces */
    assertType<HTMLElement>                         (this);
    assertType<LitElement>                          (this);

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

    // ApolloQueryInterface
    assertType<DocumentNode>                        (this.query!);
    assertType<TypeCheckVars>                       (this.variables!);
    assertType<ErrorPolicy>                         (this.errorPolicy);
    assertType<string>                              (this.errorPolicy);
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
    assertType<boolean>                             (this.notifyOnNetworkStatusChange);
    assertType<number>                              (this.pollInterval!);
    assertType<boolean>                             (this.partial!);
    assertType<boolean>                             (this.partialRefetch!);
    assertType<boolean>                             (this.returnPartialData!);
    assertType<boolean>                             (this.noAutoSubscribe);
    assertType<ObservableQuery<TypeCheckData, TypeCheckVars>>(this.observableQuery!);
    assertType<Partial<WatchQueryOptions<TypeCheckVars, TypeCheckData>>>          (this.options!);

    /* eslint-enable max-len, func-call-spacing, no-multi-spaces */
  }
}

type TDN = TypedDocumentNode<TypeCheckData, TypeCheckVars>;
class TDNTypeCheck extends ApolloQuery<TDN> {
  typeCheck() {
    assertType<TypeCheckData>(this.data!);
    assertType<TypeCheckVars>(this.variables!);
  }
}


class TypeCheckLit extends ApolloQuery<unknown, unknown> {
  update(changed: PropertyValues<TypeCheckLit>) {
    changed.has('data');
    super.update(changed);
  }

  a() {
    this.requestUpdate('data', null);
  }
}
