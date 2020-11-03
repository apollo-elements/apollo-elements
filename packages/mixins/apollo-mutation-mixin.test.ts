import type {
  ApolloClient,
  DocumentNode,
  ErrorPolicy,
  FetchPolicy,
  FetchResult,
  NormalizedCacheObject,
} from '@apollo/client/core';

import type { GraphQLError } from 'graphql';

import type { RefetchQueryDescription } from '@apollo/client/core/watchQueryOptions';

import { assertType } from '@apollo-elements/test-helpers';
import { describeMutation, setupMutationClass } from '@apollo-elements/test-helpers/mutation.test';

import { ApolloMutationMixin } from './apollo-mutation-mixin';

import { isApolloError } from '@apollo/client/core';
import { expect, nextFrame, defineCE, fixture } from '@open-wc/testing';

import 'sinon-chai';

class XL extends HTMLElement {}

/**
 * Testable Mixed-in Apollo Mutation class
 */
class TestableApolloMutation<D = unknown, V = unknown> extends ApolloMutationMixin(XL)<D, V> {
  #called = false;

  #data: D = null;

  #error: Error = null;

  #errors: readonly GraphQLError[] = null;

  #loading = false;

  static get template() {
    const template = document.createElement('template');
    template.innerHTML = /* html */`
      <output id="called"></output>
      <output id="data"></output>
      <output id="error"></output>
      <output id="errors"></output>
      <output id="loading"></output>
    `;
    return template;
  }

  $(id: keyof TestableApolloMutation) { return this.shadowRoot.getElementById(id); }

  // @ts-expect-error: https://github.com/microsoft/TypeScript/issues/40220
  get called() { return this.#called; }

  set called(value: boolean) { this.#called = value; this.render(); }

  // @ts-expect-error: https://github.com/microsoft/TypeScript/issues/40220
  get data() { return this.#data; }

  set data(value: D) { this.#data = value; this.render(); }

  // @ts-expect-error: https://github.com/microsoft/TypeScript/issues/40220
  get error() { return this.#error; }

  set error(value: Error) { this.#error = value; this.render(); }

  // @ts-expect-error: https://github.com/microsoft/TypeScript/issues/40220
  get errors() { return this.#errors; }

  set errors(value: readonly GraphQLError[]) { this.#errors = value; this.render(); }

  // @ts-expect-error: https://github.com/microsoft/TypeScript/issues/40220
  get loading() { return this.#loading; }

  set loading(value: boolean) { this.#loading = value; this.render(); }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(TestableApolloMutation.template.content.cloneNode(true));
  }

  render() {
    this.$('called').textContent = this.stringify(this.called);
    this.$('data').textContent = this.stringify(this.data);
    this.$('error').textContent = this.stringify(this.error);
    this.$('errors').textContent = this.stringify(this.errors);
    this.$('loading').textContent = this.stringify(this.loading);
  }

  stringify(x: unknown) {
    return JSON.stringify(x, null, 2);
  }

  async hasRendered() {
    await nextFrame();
    return this;
  }
}

describe('[mixins] ApolloMutationMixin', function() {
  describeMutation({
    class: TestableApolloMutation,
    setupFunction: setupMutationClass(TestableApolloMutation),
  });

  describe('instantiating simple derived class', function() {
    let element: TestableApolloMutation;

    beforeEach(async function setupElement() {
      const tag = defineCE(class extends TestableApolloMutation {});
      element = await fixture<TestableApolloMutation>(`<${tag}></${tag}>`);
    });

    it('returns an instance of the superclass', function() {
      expect(element).to.be.an.instanceOf(HTMLElement);
    });
  });
});

type TypeCheckData = { a: 'a', b: number };
type TypeCheckVars = { d: 'd', e: number };
class TypeCheck extends TestableApolloMutation<TypeCheckData, TypeCheckVars> {
  typeCheck() {
    /* eslint-disable max-len, func-call-spacing, no-multi-spaces */

    assertType<HTMLElement>                         (this);

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

/* eslint-disable @typescript-eslint/no-unused-vars */
class AccessorTest extends TestableApolloMutation<unknown, { hey: 'yo' }> {
  // @ts-expect-error: don't allow using accessors. Run a function when dependencies change instead
  get variables() {
    return { hey: 'yo' as const };
  }
}

class PropertyTest extends TestableApolloMutation<unknown, { hey: 'yo' }> {
  variables = { hey: 'yo' as const };
}
/* eslint-enable @typescript-eslint/no-unused-vars */
