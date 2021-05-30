import type { ApolloQueryInterface, GraphQLError } from '@apollo-elements/interfaces';
import type { Constructor } from '@apollo-elements/interfaces';
import type * as I from '@apollo-elements/interfaces';

import type {
  ApolloClient,
  DocumentNode,
  ErrorPolicy,
  WatchQueryFetchPolicy,
  NormalizedCacheObject,
  TypedDocumentNode,
} from '@apollo/client/core';

import { defineCE, expect, fixture, nextFrame } from '@open-wc/testing';

import { assertType, isApolloError, stringify, TestableElement } from '@apollo-elements/test';

import { describeQuery, setupQueryClass } from '@apollo-elements/test/query.test';

import { NetworkStatus } from '@apollo/client/core';

import { ApolloQueryMixin } from './apollo-query-mixin';

class XL extends HTMLElement {
  hi?: 'hi';
}

class TestableApolloQuery<D extends I.MaybeTDN = I.MaybeTDN, V = I.MaybeVariables<D>>
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

  $(id: keyof this) { return this.shadowRoot.getElementById(id as string); }

  observed: Array<keyof this> = ['data', 'error', 'errors', 'loading', 'networkStatus'];

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
        this.$(property)!.textContent = stringify(this[property]);
    });
  }

  async hasRendered() {
    await this.updateComplete;
    await nextFrame();
    return this;
  }
}

const setupFunction = setupQueryClass(TestableApolloQuery);

describe('[mixins] ApolloQueryMixin', function() {
  describeQuery({ setupFunction, class: TestableApolloQuery });
  describe('when base does not define observedAttributes', function() {
    class TestBase extends HTMLElement { }
    let element: TestBase & ApolloQueryInterface<any, any>;
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
    let element: TestBase & ApolloQueryInterface<any, any>;
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
});

type TypeCheckData = { a: 'a', b: number };
type TypeCheckVars = { d: 'd', e: number };

class TypeCheck extends TestableApolloQuery<TypeCheckData, TypeCheckVars> {
  variables = { d: 'd' as const, e: 0 };

  typeCheck(): void {
    /* eslint-disable max-len, func-call-spacing, no-multi-spaces */

    assertType<HTMLElement>                         (this);

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
    assertType<TypeCheckVars>                       (this.variables);
    assertType<'d'>                                 (this.variables.d);
    assertType<number>                              (this.variables.e);
    if (isApolloError(this.error))
      assertType<readonly GraphQLError[]>           (this.error.graphQLErrors);

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
    assertType<boolean>                             (this.notifyOnNetworkStatusChange!);
    assertType<number>                              (this.pollInterval!);
    assertType<boolean>                             (this.partial!);
    assertType<boolean>                             (this.partialRefetch!);
    assertType<boolean>                             (this.returnPartialData!);
    assertType<boolean>                             (this.noAutoSubscribe);

    /* eslint-enable max-len, func-call-spacing, no-multi-spaces */
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

class MixedClass<D extends I.MaybeTDN, V>
  extends RuntimeMixin(ApolloQueryMixin(HTMLElement))<D, V> { }

function ChildMixin<Base extends Constructor>(superclass: Base) {
  return class extends superclass {
    declare childProp: number;
  };
}

class Inheritor<D extends I.MaybeTDN, V> extends ChildMixin(MixedClass)<D, V> { }

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
