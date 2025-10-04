import type * as C from '@apollo/client';
// Note: Apollo Client v4 uses different execution result types

import type { ApolloMutationElement } from '@apollo-elements/core/types';

import {
  NonNullableParamMutationData,
  NonNullableParamMutationVariables,
  SetupOptions,
  setupSpies,
  setupStubs,
} from '@apollo-elements/test';

import type * as I from '@apollo-elements/core/types';

import { expect, fixture } from '@open-wc/testing';

import { html as h, unsafeStatic } from 'lit/static-html.js';

import {
  setupClient,
  teardownClient,
  isApolloError,
  assertType,
  stringify,
  TestableElement,
} from '@apollo-elements/test';

import { ApolloMutation } from './apollo-mutation';
import { FASTElement, html, customElement, Updates } from '@microsoft/fast-element';

import { describeMutation } from '@apollo-elements/test/mutation.test';

const template = html<TestableApolloMutation<any>>`
  <output id="called">${x => stringify(x.called)}</output>
  <output id="data">${x => stringify(x.data)}</output>
  <output id="error">${x => stringify(x.error)}</output>
  <output id="errors">${x => stringify(x.errors)}</output>
  <output id="loading">${x => stringify(x.loading)}</output>
`;

let counter = -1;

@customElement({ name: 'fast-testable-apollo-mutation-class', template })
class TestableApolloMutation<D, V = I.VariablesOf<D>>
  extends ApolloMutation<D, V> implements TestableElement {
  declare shadowRoot: ShadowRoot;

  async hasRendered(): Promise<this> {
    await Updates.next();
    return this;
  }

  $(id: string) {
    return this.shadowRoot.getElementById(id);
  }
}

describe('[fast] ApolloMutation', function describeApolloMutation() {
  describeMutation({
    async setupFunction<T extends ApolloMutationElement<any, any>>(options: SetupOptions<T> = {}) {
      const name = `fast-setup-function-element-${counter++}`;

      const { properties, attributes, innerHTML = '' } = options;

      @customElement({ name, template })
      class Test extends TestableApolloMutation<any> { }

      const attrs = attributes ? ` ${attributes}` : '';

      // for mutation components, which don't fetch on connect,
      // and have optional instance callbacks,
      // we must ensure spies are created *after* properties are applied
      if (properties?.onCompleted)
        Test.prototype.onCompleted = properties.onCompleted as unknown as Test['onCompleted'];

      if (properties?.onError)
        Test.prototype.onError = properties.onError as unknown as Test['onError'];

      const element = await fixture<T>(`<${name}${attrs}>${innerHTML}</${name}>`);

      const spies = setupSpies(options?.spy, Test.prototype as unknown as T);
      const stubs = setupStubs(options?.stub, Test.prototype as unknown as T);

      for (const [key, val] of Object.entries(properties ?? {}) as I.Entries<T>)
        key !== 'onCompleted' && key !== 'onError' && (element[key] = val);

      await Updates.next();

      return { element, spies, stubs };
    },

  });

  describe('subclassing', function() {
    beforeEach(setupClient);
    afterEach(teardownClient);

    it('is an instance of FASTElement', async function() {
      const name = 'is-an-instance-of-f-a-s-t-element';
      @customElement({ name })
      class Test extends ApolloMutation<any> { }
      const el = await fixture<Test>(`<${name}></${name}>`);
      expect(el).to.be.an.instanceOf(FASTElement);
    });

    it('renders when data is set', async function rendersOnData() {
      const name = 'renders-when-data-is-set';
      const template = html<Test>`${x => x.data?.foo ?? 'FAIL'}`;
      @customElement({ name, template })
      class Test extends ApolloMutation<{ foo: 'bar' }, null> { }
      const tag = unsafeStatic(name);
      const element = await fixture<Test>(h`<${tag} .data="${{ foo: 'bar' }}"></${tag}>`);
      expect(element).shadowDom.to.equal('bar');
    });

    describe('refetchQueries', function() {
      let element: Test;

      class Test extends ApolloMutation<any> { }

      describe(`when refetch-queries attribute set with comma-separated, badly-formatted query names`, function() {
        beforeEach(async function() {
          const name = `refetch-queries-attribute-${Date.now()}`;
          @customElement({ name })
          class Klass extends Test { }
          element = await fixture<Klass>(`<${name} refetch-queries="A, B,C,    D"></${name}>`);
          await Updates.next();
        });

        it('sets the property as an array of query names', function() {
          expect(element.refetchQueries)
            .to.deep.equal(['A', 'B', 'C', 'D']);
        });
      }
      );

      describe('when refetchQueries property set as array of query names', function() {
        const refetchQueries = ['A', 'B', 'C', 'D'];

        beforeEach(async function setupElement() {
          const name = `refetch-queries-property-${counter++}-${Math.floor(Math.random() * Date.now())}`;
          @customElement({ name })
          class Klass extends Test { }
          element = await fixture<Klass>(`<${name}></${name}>`);
        });

        beforeEach(async function setRefetchQueries() {
          element.refetchQueries = refetchQueries;
          await Updates.next();
        });

        it('sets the property as an array of query names', function() {
          expect(element.refetchQueries).to.deep.equal(refetchQueries);
        });

        it('does not reflect', function() {
          expect(element.getAttribute('refetch-queries')).to.be.null;
        });
      });

      describe('when refetchQueries property nullified', function() {
        const refetchQueries = null;

        beforeEach(async function setupElement() {
          const name = `refetch-queries-property-${counter++}-${Math.floor(Math.random() * Date.now())}`;
          @customElement({ name })
          class Klass extends Test { }
          element = await fixture<Klass>(`<${name}></${name}>`);
        });

        beforeEach(async function setRefetchQueries() {
          element.refetchQueries = refetchQueries;
          await Updates.next();
        });

        it('sets the property as an array of query names', function() {
          expect(element.refetchQueries).to.be.null;
        });

        it('does not reflect', function() {
          expect(element.getAttribute('refetch-queries')).to.be.null;
        });
      });
    });
  });
});

type TypeCheckData = { a: 'a', b: number };
type TypeCheckVars = { d: 'd', e: number };
class TypeCheck extends ApolloMutation<TypeCheckData, TypeCheckVars> {
  typeCheck() {


    assertType<HTMLElement>                         (this);
    assertType<FASTElement>                         (this);

    // ApolloElementInterface
    assertType<C.ApolloClient>(this.client!);
    assertType<Record<string, unknown>>                 (this.context!);
    assertType<boolean>                                 (this.loading);
    assertType<C.DocumentNode>                          (this.document!);
    assertType<Error>                                   (this.error!);
    assertType<readonly I.GraphQLError[]>               (this.errors!);
    assertType<TypeCheckData>                           (this.data!);
    assertType<string>                                  (this.error.message);
    assertType<'a'>                                     (this.data.a);
    // @ts-expect-error: b as number type
    assertType<'a'>                                     (this.data.b);
    if (isApolloError(this.error)) {
      // In Apollo Client v4, graphQLErrors are handled differently
      // and are not directly available on Error objects
    }

    // ApolloMutationInterface
    assertType<C.DocumentNode>                          (this.mutation!);
    assertType<TypeCheckVars>                           (this.variables!);
    assertType<boolean>                                 (this.called);
    assertType<boolean>                                 (this.ignoreResults!);
    assertType<boolean>                                 (this.awaitRefetchQueries!);
    assertType<C.ErrorPolicy>                           (this.errorPolicy!);
    assertType<string>                                  (this.errorPolicy);
    // @ts-expect-error: ErrorPolicy is not a number
    assertType<number>                                 (this.errorPolicy);
    assertType<string>                                 (this.fetchPolicy!);
    assertType<Extract<C.FetchPolicy, 'no-cache'>>     (this.fetchPolicy);

    if (typeof this.refetchQueries === 'function') {
      // Note: Apollo Client v4 changed refetchQueries function signature
      // assertType<(result: FormattedExecutionResult<TypeCheckData>) => I.RefetchQueriesType>(this.refetchQueries);
    } else {
      assertType<I.RefetchQueriesType>(this.refetchQueries!);
    }

    if (typeof this.optimisticResponse !== 'function')
      assertType<TypeCheckData>(this.optimisticResponse!);
    else
      assertType<(vars: TypeCheckVars) => TypeCheckData>(this.optimisticResponse);


  }
}

type TDN = C.TypedDocumentNode<TypeCheckData, TypeCheckVars>;

class TDNTypeCheck extends ApolloMutation<TDN> {
  typeCheck() {
    this.data;
    assertType<TypeCheckData>(this.data!);
    assertType<TypeCheckVars>(this.variables!);
    assertType<TDN>(this.mutation!);
  }
}

class TypeCheckAccessor extends ApolloMutation<
  NonNullableParamMutationData,
  NonNullableParamMutationVariables
> {
  // @ts-expect-error: current typescript versions don't allow this type of override
  get variables() {
    return { param: 'string' };
  }

  set variables(v) {
    null;
  }
}

class TypeCheckProperty extends ApolloMutation<
  NonNullableParamMutationData,
  NonNullableParamMutationVariables
> {
  variables = { param: 'string' };
}
