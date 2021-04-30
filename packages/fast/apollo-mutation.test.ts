import type {
  ApolloClient,
  DocumentNode,
  ErrorPolicy,
  FetchPolicy,
  FetchResult,
  NormalizedCacheObject,
  OperationVariables,
  TypedDocumentNode,
} from '@apollo/client/core';

import {
  NonNullableParamMutationData,
  NonNullableParamMutationVariables,
  SetupOptions,
  setupSpies,
  setupStubs,
} from '@apollo-elements/test';

import type { RefetchQueryDescription } from '@apollo/client/core/watchQueryOptions';

import type { Entries, GraphQLError } from '@apollo-elements/interfaces';

import {
  aTimeout,
  expect,
  fixture,
  nextFrame,
} from '@open-wc/testing';

import { html as h, unsafeStatic } from 'lit/static-html.js';

import {
  setupClient,
  teardownClient,
  isApolloError,
  assertType,
} from '@apollo-elements/test';

import { ApolloMutation } from './apollo-mutation';
import { FASTElement, html, customElement, DOM } from '@microsoft/fast-element';

import { MutationElement, describeMutation } from '@apollo-elements/test/mutation.test';

const template = html<TestableApolloMutation>`
  <output id="called">${x => x.stringify(x.called)}</output>
  <output id="data">${x => x.stringify(x.data)}</output>
  <output id="error">${x => x.stringify(x.error)}</output>
  <output id="errors">${x => x.stringify(x.errors)}</output>
  <output id="loading">${x => x.stringify(x.loading)}</output>
`;

let counter = -1;

@customElement({ name: 'fast-testable-apollo-mutation-class', template })
class TestableApolloMutation<D = unknown, V = OperationVariables>
  extends ApolloMutation<D, V>
  implements MutationElement<D, V> {
  declare shadowRoot: ShadowRoot;

  async hasRendered(): Promise<this> {
    await nextFrame();
    await DOM.nextUpdate();
    await nextFrame();
    await aTimeout(50);
    return this;
  }

  stringify(x: unknown) {
    return JSON.stringify(x, null, 2);
  }
}

describe('[fast] ApolloMutation', function describeApolloMutation() {
  describeMutation({
    async setupFunction<T extends MutationElement>(options: SetupOptions<T> = {}) {
      const name = `fast-setup-function-element-${counter++}`;

      const { properties, attributes, innerHTML = '' } = options;

      @customElement({ name, template })
      class Test extends TestableApolloMutation { }

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

      for (const [key, val] of Object.entries(properties ?? {}) as Entries<T>)
        key !== 'onCompleted' && key !== 'onError' && (element[key] = val);

      await DOM.nextUpdate();

      return { element, spies, stubs };
    },

  });

  describe('subclassing', function() {
    beforeEach(setupClient);
    afterEach(teardownClient);

    it('is an instance of FASTElement', async function() {
      const name = 'is-an-instance-of-f-a-s-t-element';
      @customElement({ name })
      class Test extends ApolloMutation<unknown, unknown> { }
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

      class Test extends ApolloMutation<unknown, unknown> { }

      describe(`when refetch-queries attribute set with comma-separated, badly-formatted query names`, function() {
        beforeEach(async function() {
          const name = `refetch-queries-attribute-${Date.now()}`;
          @customElement({ name })
          class Klass extends Test { }
          element = await fixture<Klass>(`<${name} refetch-queries="A, B,C,    D"></${name}>`);
          await DOM.nextUpdate();
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
          await DOM.nextUpdate();
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
          await DOM.nextUpdate();
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
    /* eslint-disable max-len, func-call-spacing, no-multi-spaces */

    assertType<HTMLElement>                         (this);
    assertType<FASTElement>                         (this);

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

    // ApolloMutationInterface
    assertType<DocumentNode>                        (this.mutation!);
    assertType<TypeCheckVars>                       (this.variables!);
    assertType<boolean>                             (this.called);
    assertType<boolean>                             (this.ignoreResults!);
    assertType<boolean>                             (this.awaitRefetchQueries!);
    assertType<ErrorPolicy>                         (this.errorPolicy!);
    assertType<string>                              (this.errorPolicy);
    // @ts-expect-error: ErrorPolicy is not a number
    assertType<number>                              (this.errorPolicy);
    assertType<string>                              (this.fetchPolicy!);
    assertType<Extract<FetchPolicy, 'no-cache'>>    (this.fetchPolicy);

    if (typeof this.refetchQueries === 'function')
      assertType<(result: FetchResult<TypeCheckData>) => RefetchQueryDescription>(this.refetchQueries);
    else
      assertType<RefetchQueryDescription>(this.refetchQueries!);

    if (typeof this.optimisticResponse !== 'function')
      assertType<TypeCheckData>(this.optimisticResponse!);
    else
      assertType<(vars: TypeCheckVars) => TypeCheckData>(this.optimisticResponse);

    /* eslint-enable max-len, func-call-spacing, no-multi-spaces */
  }
}

type TDN = TypedDocumentNode<TypeCheckData, TypeCheckVars>;
class TDNTypeCheck extends ApolloMutation<TDN> {
  typeCheck() {
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
  variables = { param: 'string' }
}
