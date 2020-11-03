import type {
  ApolloClient,
  ApolloError,
  ErrorPolicy,
  FetchPolicy,
  FetchResult,
  NormalizedCacheObject,
} from '@apollo/client/core';

import type { RefetchQueryDescription } from '@apollo/client/core/watchQueryOptions';

import type { DocumentNode, GraphQLError } from 'graphql';

import type { MutationElement } from '@apollo-elements/test-helpers/mutation.test';

import { ApolloMutation } from './apollo-mutation';

import { assertType, isApolloError } from '@apollo-elements/test-helpers';
import { describeMutation, setupMutationClass } from '@apollo-elements/test-helpers/mutation.test';
import { html } from 'lit-html';
import { nextFrame } from '@open-wc/testing';
import { GluonElement } from '@gluon/gluon';

class TestableApolloMutation<D, V> extends ApolloMutation<D, V> implements MutationElement<D, V> {
  #data: D = null;

  #error: ApolloError = null;

  #errors: readonly GraphQLError[] = null;

  #loading = false;

  #called = false;

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
  get called() { return this.#called; }

  set called(v: boolean) { this.#called = v; this.render(); }

  get template() {
    return html`
      <output id="called">${this.stringify(this.called)}</output>
      <output id="data">${this.stringify(this.data)}</output>
      <output id="error">${this.stringify(this.error)}</output>
      <output id="errors">${this.stringify(this.errors)}</output>
      <output id="loading">${this.stringify(this.loading)}</output>
    `;
  }

  stringify(x: unknown) {
    return JSON.stringify(x, null, 2);
  }

  async hasRendered() {
    await this.render();
    await nextFrame();
    return this;
  }
}

describe('[gluon] ApolloMutation', function() {
  describeMutation({
    class: TestableApolloMutation,
    setupFunction: setupMutationClass(TestableApolloMutation),
  });
});

type TypeCheckData = { a: 'a', b: number };
type TypeCheckVars = { d: 'd', e: number };
class TypeCheck extends ApolloMutation<TypeCheckData, TypeCheckVars> {
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

    // ApolloMutationInterface
    assertType<DocumentNode>                        (this.mutation);
    assertType<TypeCheckVars>                       (this.variables);
    assertType<boolean>                             (this.called);
    assertType<boolean>                             (this.ignoreResults);
    assertType<boolean>                             (this.awaitRefetchQueries);
    assertType<number>                              (this.mostRecentMutationId);
    assertType<ErrorPolicy>                         (this.errorPolicy);
    assertType<string>                              (this.errorPolicy);
    // @ts-expect-error: ErrorPolicy is not a number
    assertType<number>                              (this.errorPolicy);
    assertType<string>                              (this.fetchPolicy);
    assertType<Extract<FetchPolicy, 'no-cache'>>    (this.fetchPolicy);

    if (typeof this.refetchQueries === 'function')
      assertType<(result: FetchResult<TypeCheckData>) => RefetchQueryDescription>(this.refetchQueries);
    else
      assertType<RefetchQueryDescription>(this.refetchQueries);

    if (typeof this.optimisticResponse !== 'function')
      assertType<TypeCheckData>(this.optimisticResponse);
    else
      assertType<(vars: TypeCheckVars) => TypeCheckData>(this.optimisticResponse);

    /* eslint-enable max-len, func-call-spacing, no-multi-spaces */
  }
}
