import type {
  ApolloClient,
  DocumentNode,
  ErrorPolicy,
  FetchPolicy,
  TypedDocumentNode,
} from '@apollo/client';

import type { GraphQLError } from '@apollo-elements/core/types';
import type * as I from '@apollo-elements/core/types';

import { expect, defineCE, fixture } from '@open-wc/testing';

import { assertType, stringify, TestableElement } from '@apollo-elements/test';

import { ApolloMutationMixin } from './apollo-mutation-mixin';
// Note: isApolloError removed in Apollo Client v4
// import { isApolloError } from '@apollo/client';

import { describeMutation, setupMutationClass } from '@apollo-elements/test/mutation.test';


/**
 * Testable Mixed-in Apollo Mutation class
 */
class TestableApolloMutation<D = unknown, V = I.VariablesOf<D>>
  extends ApolloMutationMixin(class XL extends HTMLElement { hi?: 'hi'; })<D, V>
  implements TestableElement {
  declare shadowRoot: ShadowRoot;
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

  $(id: string) { return this.shadowRoot?.getElementById(id); }

  observed: Array<string> = ['called', 'data', 'error', 'errors', 'loading'];

  constructor() {
    super();
    this.hi = 'hi';
    this.attachShadow({ mode: 'open' })
      .append(TestableApolloMutation.template.content.cloneNode(true));
  }

  update() {
    this.render();
    super.update();
  }

  render() {
    this.observed?.forEach(property => {
      if (this.$(property))
        this.$(property)!.textContent = stringify(this[property as keyof this]);
    });
  }

  async hasRendered() {
    await this.updateComplete;
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
export class TypeCheck extends TestableApolloMutation<TypeCheckData, TypeCheckVars> {
  typeCheck(): void {


    assertType<HTMLElement>                         (this);

    // ApolloElementInterface
    assertType<ApolloClient>(this.client!);
    assertType<Record<string, unknown>>             (this.context!);
    assertType<boolean>                             (this.loading);
    assertType<DocumentNode|null>                   (this.document);
    assertType<Error>                               (this.error!);
    assertType<readonly GraphQLError[]>             (this.errors!);
    assertType<TypeCheckData>                       (this.data!);
    assertType<string>                              (this.error.message);
    assertType<'a'>                                 (this.data.a);
    assertType<number>                              (this.data.b);
    // Note: isApolloError and graphQLErrors removed in Apollo Client v4
    // if (isApolloError(this.error))
    //   assertType<readonly GraphQLError[]>(this.error.graphQLErrors);

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

    // Note: Apollo Client v4 changed refetchQueries function signature
    // if (typeof this.refetchQueries === 'function')
    //   assertType<(result: FormattedExecutionResult<TypeCheckData>) => I.RefetchQueriesType>(this.refetchQueries);
    // else
    //   assertType<I.RefetchQueriesType|undefined>(this.refetchQueries!);

    if (typeof this.optimisticResponse !== 'function')
      assertType<TypeCheckData|undefined>(this.optimisticResponse);
    else
      assertType<(vars: TypeCheckVars) => TypeCheckData>(this.optimisticResponse);


  }
}

type TCV = { hey: 'yo' }


export class AccessorTest extends TestableApolloMutation<TypeCheckData, TCV> {
  // @ts-expect-error: don't allow using accessors. Run a function when dependencies change instead
  get variables(): TCV {
    return { hey: 'yo' as const };
  }
}

export class PropertyTest extends TestableApolloMutation<TypeCheckData, TCV> {
  variables = { hey: 'yo' as const };
}


type TDN = TypedDocumentNode<TypeCheckData, TypeCheckVars>;
export class TDNTypeCheck extends TestableApolloMutation<TDN> {
  typeCheck(): void {
    assertType<TypeCheckData>(this.data!);
    assertType<TypeCheckVars>(this.variables!);
  }
}
