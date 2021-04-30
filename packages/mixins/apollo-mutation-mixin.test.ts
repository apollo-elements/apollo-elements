import type {
  ApolloClient,
  DocumentNode,
  ErrorPolicy,
  FetchPolicy,
  FetchResult,
  NormalizedCacheObject,
  TypedDocumentNode,
} from '@apollo/client/core';

import type { RefetchQueryDescription } from '@apollo/client/core/watchQueryOptions';

import type { GraphQLError, ApolloMutationInterface, Entries } from '@apollo-elements/interfaces';

import type { Constructor } from 'lit-element';

import { expect, nextFrame, defineCE, fixture } from '@open-wc/testing';

import { assertType } from '@apollo-elements/test';

import { ApolloMutationMixin } from './apollo-mutation-mixin';
import { isApolloError } from '@apollo/client/core';
import { effect } from '@apollo-elements/lib/descriptors';

import {
  describeMutation,
  MutationElement,
  setupMutationClass,
} from '@apollo-elements/test/mutation.test';

class XL extends HTMLElement {}

/**
 * Testable Mixed-in Apollo Mutation class
 */
class TestableApolloMutation<D = any, V = any>
  extends ApolloMutationMixin(XL)<D, V>
  implements ApolloMutationInterface<D, V> {
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

  async hasRendered(): Promise<this> {
    await nextFrame();
    return this;
  }
}

const DEFAULTS = {
  called: false,
  data: null,
  error: null,
  errors: null,
  loading: false,
};

Object.defineProperties(TestableApolloMutation.prototype, Object.fromEntries(
  (Object.entries(DEFAULTS) as Entries<TestableApolloMutation>)
    .map(([name, init]) => [
      name,
      effect<TestableApolloMutation>({
        name,
        init,
        onSet() {
          this.render();
        },
      }),
    ])
));

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
export class TypeCheck extends TestableApolloMutation<TypeCheckData, TypeCheckVars> {
  typeCheck(): void {
    /* eslint-disable max-len, func-call-spacing, no-multi-spaces */

    assertType<HTMLElement>                         (this);

    // ApolloElementInterface
    assertType<ApolloClient<NormalizedCacheObject>> (this.client!);
    assertType<Record<string, unknown>>             (this.context!);
    assertType<boolean>                             (this.loading);
    assertType<DocumentNode|null>                   (this.document);
    assertType<Error>                               (this.error!);
    assertType<readonly GraphQLError[]>             (this.errors!);
    assertType<TypeCheckData>                       (this.data!);
    assertType<string>                              (this.error.message);
    assertType<'a'>                                 (this.data.a);
    assertType<number>                              (this.data.b);
    if (isApolloError(this.error))
      assertType<readonly GraphQLError[]>           (this.error.graphQLErrors);

    // ApolloMutationInterface
    assertType<DocumentNode|null>                   (this.mutation);
    assertType<TypeCheckVars|null>                  (this.variables);
    assertType<boolean>                             (this.called);
    assertType<boolean>                             (this.ignoreResults!);
    assertType<boolean>                             (this.awaitRefetchQueries!);
    assertType<ErrorPolicy>                         (this.errorPolicy!);
    assertType<string>                              (this.errorPolicy!);
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

type TCV = { hey: 'yo' }

/* eslint-disable @typescript-eslint/no-unused-vars */
export class AccessorTest extends TestableApolloMutation<unknown, TCV> {
  // @ts-expect-error: don't allow using accessors. Run a function when dependencies change instead
  get variables(): TCV {
    return { hey: 'yo' as const };
  }
}

export class PropertyTest extends TestableApolloMutation<unknown, TCV> {
  variables = { hey: 'yo' as const };
}
/* eslint-enable @typescript-eslint/no-unused-vars */

type TDN = TypedDocumentNode<TypeCheckData, TypeCheckVars>;
export class TDNTypeCheck extends TestableApolloMutation<TDN> {
  typeCheck(): void {
    assertType<TypeCheckData>(this.data!);
    assertType<TypeCheckVars>(this.variables!);
  }
}
