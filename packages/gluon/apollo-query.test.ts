import type {
  ApolloClient,
  ApolloError,
  ErrorPolicy,
  FetchPolicy,
  WatchQueryOptions,
  ObservableQuery,
  NormalizedCacheObject,
} from '@apollo/client/core';

import type { QueryElement } from '@apollo-elements/test-helpers/query.test';

import type { DocumentNode, GraphQLError } from 'graphql';

import { NetworkStatus } from '@apollo/client/core';

import { assertType, isApolloError } from '@apollo-elements/test-helpers';

import { ApolloQuery } from './apollo-query';

import { html } from 'lit-html';

import { describeQuery, setupQueryClass } from '@apollo-elements/test-helpers/query.test';

import { nextFrame } from '@open-wc/testing';
import { GluonElement } from '@gluon/gluon';

class TestableApolloQuery<D, V>
  extends ApolloQuery<D, V>
  implements QueryElement<D, V> {
  #data: D = null;

  #error: ApolloError = null;

  #errors: readonly GraphQLError[] = null;

  #loading = false;

  #networkStatus = NetworkStatus.ready;

  // @ts-expect-error: https://github.com/microsoft/TypeScript/issues/40220
  get data() { return this.#data; }

  set data(v: D) { this.#data = v; this.render(); }

  // @ts-expect-error: https://github.com/microsoft/TypeScript/issues/40220
  get error() { return this.#error; }

  set error(v: ApolloError) { this.#error = v; this.render(); }

  // @ts-expect-error: https://github.com/microsoft/TypeScript/issues/40220
  get errors() { return this.#errors; }

  set errors(v: readonly GraphQLError[]) { this.#errors = v; this.render(); }

  // @ts-expect-error: https://github.com/microsoft/TypeScript/issues/40220
  get loading() { return this.#loading; }

  set loading(v: boolean) { this.#loading = v; this.render(); }

  // @ts-expect-error: https://github.com/microsoft/TypeScript/issues/40220
  get networkStatus() { return this.#networkStatus; }

  set networkStatus(v: number) { this.#networkStatus = v; this.render(); }

  get template() {
    return html`
      <output id="data">${this.stringify(this.data)}</output>
      <output id="error">${this.stringify(this.error)}</output>
      <output id="errors">${this.stringify(this.errors)}</output>
      <output id="loading">${this.stringify(this.loading)}</output>
      <output id="networkStatus">${this.stringify(this.networkStatus)}</output>
    `;
  }

  $(id: keyof TestableApolloQuery<D, V>) { return this.shadowRoot.getElementById(id); }

  stringify(x: unknown) { return JSON.stringify(x, null, 2); }

  async hasRendered() {
    await nextFrame();
    await this.render();
    return this;
  }
}

describe('[gluon] ApolloQuery', function() {
  describeQuery({
    class: TestableApolloQuery,
    setupFunction: setupQueryClass(TestableApolloQuery),
  });
});


type TypeCheckData = { a: 'a', b: number };
type TypeCheckVars = { d: 'd', e: number };
class TypeCheck extends ApolloQuery<TypeCheckData, TypeCheckVars> {
  typeCheck() {
    /* eslint-disable max-len, func-call-spacing, no-multi-spaces */

    assertType<HTMLElement>                         (this);
    assertType<GluonElement>                        (this);

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
    // @ts-expect-error: b as number type
    assertType<'a'>                                 (this.data.b);
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
