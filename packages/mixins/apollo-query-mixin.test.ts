import type { Constructor, GraphQLError } from '@apollo-elements/core/types';
import type * as I from '@apollo-elements/core/types';

import type {
  ApolloClient,
  DocumentNode,
  ErrorPolicy,
  WatchQueryFetchPolicy,
  TypedDocumentNode,
} from '@apollo/client';

import * as S from '@apollo-elements/test/schema';

import { defineCE, expect, fixture, nextFrame } from '@open-wc/testing';

import { assertType, stringify, TestableElement } from '@apollo-elements/test';

import { describeQuery, setupQueryClass } from '@apollo-elements/test/query.test';

import { makeClient, teardownClient } from '@apollo-elements/test';

import { NetworkStatus } from '@apollo/client';

import { ApolloQueryMixin } from './apollo-query-mixin';

import { spy } from 'sinon';

class XL extends HTMLElement {
  hi?: 'hi';
}

class TestableApolloQuery<D = unknown, V = I.VariablesOf<D>>
  extends ApolloQueryMixin(XL)<D, V>
  implements TestableElement {
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

  $(id: string) { return this.shadowRoot.getElementById(id); }

  observed: Array<string> = ['data', 'error', 'errors', 'loading', 'networkStatus'];

  constructor() {
    super();
    this.hi = 'hi';
    this.attachShadow({ mode: 'open' })
      .append(TestableApolloQuery.template.content.cloneNode(true));
  }

  update() {
    this.render();
  }

  render() {
    this.observed?.forEach(property => {
      if (this.$(property))
        this.$(property)!.textContent = stringify(this[property as keyof this]);
    });
  }

  async hasRendered() {
    await this.controller.host.updateComplete;
    await nextFrame();
    return this;
  }
}

const setupFunction = setupQueryClass(TestableApolloQuery);

describe('[mixins] ApolloQueryMixin', function() {
  describeQuery({ setupFunction, class: TestableApolloQuery });
  describe('when base does not define observedAttributes', function() {
    class TestBase extends HTMLElement { }
    let element: TestBase & I.ApolloQueryElement<any, any>;
    beforeEach(async function() {
      const tag = defineCE(ApolloQueryMixin(TestBase));
      element = await fixture(`<${tag}></${tag}>`);
    });
    it('defines observedAttributes', function() {
      // @ts-expect-error: ts doesn't track constructor type;
      expect(element.constructor.observedAttributes).to.deep.equal([
        'error-policy',
        'fetch-policy',
        'next-fetch-policy',
        'no-auto-subscribe',
      ]);
    });
  });

  describe('when base defines observedAttributes', function() {
    class TestBase extends HTMLElement {
      static get observedAttributes() {
        return ['a'];
      }
    }
    let element: TestBase & I.ApolloQueryElement<any, any>;
    beforeEach(async function() {
      const tag = defineCE(ApolloQueryMixin(TestBase));
      element = await fixture(`<${tag}></${tag}>`);
    });
    it('defines observedAttributes', function() {
      // @ts-expect-error: ts doesn't track constructor type;
      expect(element.constructor.observedAttributes).to.deep.equal([
        'a',
        'error-policy',
        'fetch-policy',
        'next-fetch-policy',
        'no-auto-subscribe',
      ]);
    });
  });

  describe('basic instance', function() {
    let element: I.ApolloQueryElement<any, any>;
    beforeEach(async function() {
      const tag = defineCE(ApolloQueryMixin(HTMLElement));
      element = await fixture(`<${tag}></${tag}>`);
    });
    describe('setting nextFetchPolicy', function() {
      beforeEach(() => element.nextFetchPolicy = 'cache-and-network');
      beforeEach(nextFrame);
      it('sets attribute', function() {
        expect(element.getAttribute('next-fetch-policy')).to.equal('cache-and-network');
      });
      describe('then unsetting nextFetchPolicy', function() {
        beforeEach(() => element.nextFetchPolicy = undefined);
        beforeEach(nextFrame);
        it('removes attribute', function() {
          expect(element.hasAttribute('next-fetch-policy')).to.be.false;
        });
      });
      describe('then setting nextFetchPolicy with a function', function() {
        beforeEach(() => element.nextFetchPolicy = () => 'cache-first');
        beforeEach(nextFrame);
        it('removes attribute', function() {
          expect(element.hasAttribute('next-fetch-policy')).to.be.false;
        });
      });
    });
  });

  describe('with onData and onError', function() {
    let element: I.ApolloQueryElement<any, any>;
    const s = spy();
    beforeEach(async function() {
      const tag = defineCE(class extends ApolloQueryMixin(HTMLElement)<any, any> {
        client = makeClient();
        onData(x: unknown) { s(x); }
        onError(x: Error) { s(x); }
      });
      element = await fixture(`<${tag}></${tag}>`);
    });
    afterEach(() => s.resetHistory());
    afterEach(teardownClient);
    describe('resolving a query', function() {
      beforeEach(() => element.executeQuery({ query: S.NullableParamQuery }));
      beforeEach(nextFrame);
      it('calls onData', function() {
        expect(s).to.have.been.calledOnce;
      });
    });
    describe('getting a query error', function() {
      beforeEach(() => element.executeQuery({
        query: S.NullableParamQuery,
        variables: {
          nullable: 'error',
        },
      }).catch(() => null));
      beforeEach(nextFrame);
      it('calls onError', function() {
        expect(s).to.have.been.calledOnce;
      });
    });
  });
});

type TypeCheckData = { a: 'a', b: number };
type TypeCheckVars = { d: 'd', e: number };

class TypeCheck extends TestableApolloQuery<TypeCheckData, TypeCheckVars> {
  variables = { d: 'd' as const, e: 0 };

  typeCheck(): void {
     

    assertType<HTMLElement>                         (this);

    // ApolloElementInterface
    assertType<ApolloClient>(this.client!);
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
    assertType<TypeCheckVars>                       (this.variables);
    assertType<'d'>                                 (this.variables.d);
    assertType<number>                              (this.variables.e);
    // Note: isApolloError and graphQLErrors removed in Apollo Client v4
    // if (isApolloError(this.error))
    //   assertType<readonly GraphQLError[]>(this.error.graphQLErrors);

    // ApolloQueryInterface
    assertType<DocumentNode>                        (this.query!);
    assertType<ErrorPolicy>                         (this.errorPolicy!);
    // @ts-expect-error: ErrorPolicy is not a number
    assertType<number>                              (this.errorPolicy);
    assertType<WatchQueryFetchPolicy>               (this.fetchPolicy!);
    assertType<string>                              (this.fetchPolicy);
    if (typeof this.nextFetchPolicy !== 'function')
      assertType<WatchQueryFetchPolicy>             (this.nextFetchPolicy!);
    assertType<NetworkStatus>                       (this.networkStatus);
    assertType<number>                              (this.networkStatus);
    // @ts-expect-error: NetworkStatus is not a string
    assertType<string>                              (this.networkStatus);
    // Note: These properties removed in Apollo Client v4
    // assertType<boolean>(this.notifyOnNetworkStatusChange!);
    assertType<number>                              (this.pollInterval!);
    // assertType<boolean>(this.partial!);
    // assertType<boolean>(this.partialRefetch!);
    // assertType<boolean>(this.returnPartialData!);
    assertType<boolean>                             (this.noAutoSubscribe);

     
  }
}

type TDN = TypedDocumentNode<TypeCheckData, TypeCheckVars>;
export class TDNTypeCheck extends ApolloQueryMixin(HTMLElement)<TDN> {
  typeCheck(): void {
    assertType<TypeCheckData>(this.data!);
    assertType<TypeCheckVars>(this.variables!);
  }
}

function RuntimeMixin<Base extends Constructor>(superclass: Base) {
  return class extends superclass {
    declare mixinProp: boolean;
  };
}

class MixedClass<D, V = I.VariablesOf<D>>
  extends RuntimeMixin(ApolloQueryMixin(HTMLElement))<D, V> { }

function ChildMixin<Base extends Constructor>(superclass: Base) {
  return class extends superclass {
    declare childProp: number;
  };
}

class Inheritor<D, V = I.VariablesOf<D>> extends ChildMixin(MixedClass)<D, V> { }

const runChecks = false;
if (runChecks) {
  const instance = new MixedClass<{ foo: number }, unknown>();
  const inheritor = new Inheritor<{ foo: string }, unknown>();
  assertType<number>(instance.data!.foo);
  assertType<boolean>(instance.mixinProp);
  assertType<string>(inheritor.data!.foo);
  assertType<boolean>(inheritor.mixinProp);
  assertType<number>(inheritor.childProp);
}

type TCD = { hey: 'yo' };
type TCV = { hey: 'yo' };

export class TypeCheckAccessor extends ApolloQueryMixin(HTMLElement)<TCD, TCV> {
  // @ts-expect-error: don't allow using accessors. Run a function when dependencies change instead
  get variables(): TCV {
    return { hey: 'yo' as const };
  }
}

export class TypeCheckField extends ApolloQueryMixin(HTMLElement)<TCD, TCV> {
  variables = { hey: 'yo' as const };
}

export class TypeCheckFieldBad extends ApolloQueryMixin(HTMLElement)<TCD, TCV> {
  // @ts-expect-error: passes type check;
  variables = { hey: 'hey' };
}
