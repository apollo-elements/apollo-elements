import type {
  ApolloClient,
  NormalizedCacheObject,
  ErrorPolicy,
  FetchPolicy,
  WatchQueryOptions,
  TypedDocumentNode,
  OperationVariables,
} from '@apollo/client/core';

import type { DocumentNode, GraphQLError } from 'graphql';

import type { Constructor, Entries } from '@apollo-elements/interfaces';

import { NetworkStatus } from '@apollo/client/core';

import { nextFrame } from '@open-wc/testing';

import 'sinon-chai';

import { ObservableQuery } from '@apollo/client/core';

import { assertType, isApolloError } from '@apollo-elements/test-helpers';

import { ApolloQueryMixin } from './apollo-query-mixin';

import { describeQuery, setupQueryClass } from '@apollo-elements/test-helpers/query.test';

import type { QueryElement } from '@apollo-elements/test-helpers/query.test';
import { effect } from '@apollo-elements/lib/descriptors';

class XL extends HTMLElement {}

class TestableApolloQuery<D = unknown, V = OperationVariables>
  extends ApolloQueryMixin(XL)<D, V>
  implements QueryElement<D, V> {
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

  $(id: keyof TestableApolloQuery) { return this.shadowRoot.getElementById(id); }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' })
      .append(TestableApolloQuery.template.content.cloneNode(true));
  }

  render() {
    this.$('data')!.textContent = this.stringify(this.data);
    this.$('error')!.textContent = this.stringify(this.error);
    this.$('errors')!.textContent = this.stringify(this.errors);
    this.$('loading')!.textContent = this.stringify(this.loading);
    this.$('networkStatus')!.textContent = this.stringify(this.networkStatus);
  }

  stringify(x: unknown) {
    return JSON.stringify(x, null, 2);
  }

  async hasRendered() {
    await nextFrame();
    return this;
  }
}

const DEFAULTS = {
  data: null,
  error: null,
  errors: null,
  loading: false,
  networkStatus: NetworkStatus.ready,
};

Object.defineProperties(TestableApolloQuery.prototype, Object.fromEntries(
  (Object.entries(DEFAULTS) as Entries<TestableApolloQuery>)
    .map(([name, init]) => [
      name,
      effect<TestableApolloQuery>({
        name,
        init,
        onSet() {
          this.render();
        },
      }),
    ])
));

const setupFunction = setupQueryClass(TestableApolloQuery);

describe('[mixins] ApolloQueryMixin', function() {
  describeQuery({ setupFunction, class: TestableApolloQuery });
});

type TypeCheckData = { a: 'a', b: number };
type TypeCheckVars = { d: 'd', e: number };

class TypeCheck extends TestableApolloQuery<TypeCheckData, TypeCheckVars> {
  variables = { d: 'd' as const, e: 0 };

  typeCheck() {
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
    assertType<ErrorPolicy>                         (this.errorPolicy);
    assertType<string>                              (this.errorPolicy);
    // @ts-expect-error: ErrorPolicy is not a number
    assertType<number>                              (this.errorPolicy);
    assertType<FetchPolicy>                         (this.fetchPolicy!);
    assertType<string>                              (this.fetchPolicy);
    assertType<FetchPolicy>                         (this.nextFetchPolicy!);
    assertType<string>                              (this.nextFetchPolicy);
    assertType<NetworkStatus>                       (this.networkStatus);
    assertType<number>                              (this.networkStatus);
    // @ts-expect-error: NetworkStatus is not a string
    assertType<string>                              (this.networkStatus);
    assertType<boolean>                             (this.notifyOnNetworkStatusChange);
    assertType<number>                              (this.pollInterval!);
    assertType<boolean>                             (this.partial!);
    assertType<boolean>                             (this.partialRefetch!);
    assertType<boolean>                             (this.returnPartialData!);
    assertType<boolean>                             (this.noAutoSubscribe);
    assertType<ObservableQuery<TypeCheckData, TypeCheckVars>>                     (this.observableQuery!);
    assertType <Partial<WatchQueryOptions<TypeCheckVars, TypeCheckData>>>          (this.options!);

    /* eslint-enable max-len, func-call-spacing, no-multi-spaces */
  }
}

type TDN = TypedDocumentNode<TypeCheckData, TypeCheckVars>;
class TDNTypeCheck extends ApolloQueryMixin(HTMLElement)<TDN> {
  typeCheck() {
    assertType<TypeCheckData>(this.data!);
    assertType<TypeCheckVars>(this.variables!);
  }
}

function RuntimeMixin<Base extends Constructor>(superclass: Base) {
  return class extends superclass {
    declare mixinProp: boolean;
  };
}

class MixedClass<D, V> extends RuntimeMixin(ApolloQueryMixin(HTMLElement))<D, V> { }

function ChildMixin<Base extends Constructor>(superclass: Base) {
  return class extends superclass {
    declare childProp: number;
  };
}

class Inheritor<D, V> extends ChildMixin(MixedClass)<D, V> { }

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

class TypeCheckAccessor extends ApolloQueryMixin(HTMLElement)<unknown, { hey: 'yo' }> {
  // @ts-expect-error: don't allow using accessors. Run a function when dependencies change instead
  get variables() {
    return { hey: 'yo' as const };
  }
}

class TypeCheckField extends ApolloQueryMixin(HTMLElement)<unknown, { hey: 'yo' }> {
  variables = { hey: 'yo' as const };
}

class TypeCheckFieldBad extends ApolloQueryMixin(HTMLElement)<unknown, { hey: 'yo' }> {
  // @ts-expect-error: passes type check;
  variables = { hey: 'hey' };
}
