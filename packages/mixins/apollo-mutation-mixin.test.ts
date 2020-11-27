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
import {
  describeMutation,
  MutationElement,
  setupMutationClass,
} from '@apollo-elements/test-helpers/mutation.test';

import { ApolloMutationMixin } from './apollo-mutation-mixin';

import { isApolloError } from '@apollo/client/core';
import { expect, nextFrame, defineCE, fixture } from '@open-wc/testing';

import 'sinon-chai';
import { Constructor } from 'lit-element';

class XL extends HTMLElement {}

/**
 * Testable Mixed-in Apollo Mutation class
 */
class TestableApolloMutation<D = any, V = any> extends ApolloMutationMixin(XL)<D, V> {
  ___called = false;

  ___data: D | null = null;

  ___error: Error | null = null;

  ___errors: readonly GraphQLError[] | null = null;

  ___loading = false;

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

  $(id: keyof TestableApolloMutation) { return this.shadowRoot?.getElementById(id); }

  // @ts-expect-error: https://github.com/microsoft/TypeScript/issues/40220
  get called() { return this.___called; }

  set called(value: boolean) { this.___called = value; this.render(); }

  // @ts-expect-error: https://github.com/microsoft/TypeScript/issues/40220
  get data() { return this.___data; }

  set data(value: D) { this.___data = value; this.render(); }

  // @ts-expect-error: https://github.com/microsoft/TypeScript/issues/40220
  get error() { return this.___error; }

  set error(value: Error) { this.___error = value; this.render(); }

  // @ts-expect-error: https://github.com/microsoft/TypeScript/issues/40220
  get errors() { return this.___errors; }

  set errors(value: readonly GraphQLError[]) { this.___errors = value; this.render(); }

  // @ts-expect-error: https://github.com/microsoft/TypeScript/issues/40220
  get loading() { return this.___loading; }

  set loading(value: boolean) { this.___loading = value; this.render(); }

  observed: Array<keyof TestableApolloMutation> = ['called', 'data', 'error', 'errors', 'loading'];

  constructor() {
    super();
    this.observed ??= [];
    this.attachShadow({ mode: 'open' })
      .append(TestableApolloMutation.template.content.cloneNode(true));
  }


  render() {
    this.observed?.forEach(property => {
      if (this.$(property))
        this.$(property)!.textContent = this.stringify(this[property]);
    });
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
    class: TestableApolloMutation as Constructor<MutationElement>,
    setupFunction: setupMutationClass(TestableApolloMutation as Constructor<MutationElement>),
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
    assertType<ApolloClient<NormalizedCacheObject>|null> (this.client);
    assertType<Record<string, unknown>|undefined>        (this.context);
    assertType<boolean>                             (this.loading);
    assertType<DocumentNode|null>                   (this.document);
    assertType<Error>                               (this.error);
    assertType<readonly GraphQLError[]>             (this.errors);
    assertType<TypeCheckData>                       (this.data);
    assertType<string>                              (this.error.message);
    assertType<'a'>                                 (this.data.a);
    assertType<number>                              (this.data.b);
    if (isApolloError(this.error))
      assertType<readonly GraphQLError[]>           (this.error.graphQLErrors);

    // ApolloMutationInterface
    assertType<DocumentNode|null>                   (this.mutation);
    assertType<TypeCheckVars|null>                  (this.variables);
    assertType<boolean>                             (this.called);
    assertType<boolean>                             (this.ignoreResults);
    assertType<boolean|undefined>                   (this.awaitRefetchQueries);
    assertType<number>                              (this.mostRecentMutationId);
    assertType<ErrorPolicy|undefined>               (this.errorPolicy);
    assertType<string|undefined>                    (this.errorPolicy);
    // @ts-expect-error: ErrorPolicy is not a number
    assertType<number>                              (this.errorPolicy);
    assertType<string|undefined>                    (this.fetchPolicy);
    assertType<Extract<FetchPolicy, 'no-cache'>|undefined> (this.fetchPolicy);

    if (typeof this.refetchQueries === 'function')
      assertType<(result: FetchResult<TypeCheckData>) => RefetchQueryDescription>(this.refetchQueries);
    else
      assertType<RefetchQueryDescription|undefined>(this.refetchQueries!);

    if (typeof this.optimisticResponse !== 'function')
      assertType<TypeCheckData|undefined>(this.optimisticResponse);
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
