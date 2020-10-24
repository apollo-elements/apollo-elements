import type {
  ApolloClient,
  ErrorPolicy,
  FetchPolicy,
  WatchQueryOptions,
  ObservableQuery,
  NormalizedCacheObject,
} from '@apollo/client/core';

import type { DocumentNode, GraphQLError } from 'graphql';

import { fixture, unsafeStatic, expect, html as fhtml } from '@open-wc/testing';

import { ApolloQuery } from './apollo-query';
import { FASTElement, customElement, html } from '@microsoft/fast-element';
import { NetworkStatus } from '@apollo/client/core';
import { assertType, isApolloError } from '@apollo-elements/test-helpers';

type TypeCheckData = { a: 'a', b: number };
type TypeCheckVars = { d: 'd', e: number };
class TypeCheck extends ApolloQuery<TypeCheckData, TypeCheckVars> {
  render() {
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
    // @ts-expect-error: b as number type
    assertType<'a'>                                 (this.data.b);
    if (isApolloError(this.error))
      assertType<readonly GraphQLError[]>           (this.error.graphQLErrors);

    // ApolloQueryInterface
    assertType<DocumentNode>                        (this.query);
    assertType<TypeCheckVars>                       (this.variables);
    assertType<ErrorPolicy>                         (this.errorPolicy);
    assertType<string>                              (this.errorPolicy);
    // @ts-expect-error: ErrorPolicy is not a number
    assertType<number>                              (this.errorPolicy);
    assertType<FetchPolicy>                         (this.fetchPolicy);
    assertType<string>                              (this.fetchPolicy);
    assertType<FetchPolicy>                         (this.nextFetchPolicy);
    assertType<string>                              (this.nextFetchPolicy);
    assertType<NetworkStatus>                       (this.networkStatus);
    assertType<number>                              (this.networkStatus);
    // @ts-expect-error: NetworkStatus is not a string
    assertType<string>                              (this.networkStatus);
    assertType<boolean>                             (this.notifyOnNetworkStatusChange);
    assertType<number>                              (this.pollInterval);
    assertType<boolean>                             (this.partial);
    assertType<boolean>                             (this.partialRefetch);
    assertType<boolean>                             (this.returnPartialData);
    assertType<boolean>                             (this.noAutoSubscribe);
    assertType<ObservableQuery>                     (this.observableQuery);
    assertType<Partial<WatchQueryOptions>>          (this.options);

    /* eslint-enable max-len, func-call-spacing, no-multi-spaces */
  }
}

describe('[fast] ApolloQuery', function describeApolloQuery() {
  it('is an instance of FASTElement', async function() {
    const name = 'is-an-instance-of-f-a-s-t-element';
    @customElement({ name }) class Test extends ApolloQuery<unknown, unknown> { }
    const tag = unsafeStatic(name);
    const el = await fixture<Test>(fhtml`<${tag}></${tag}>`);
    expect(el).to.be.an.instanceOf(FASTElement);
  });

  it('renders when networkStatus is set', async function rendersOnNetworkStatus() {
    const name = 'renders-when-network-status-is-set';
    const template = html<Test>`${x => x.networkStatus === NetworkStatus.error ? 'SUCCESS' : 'FAIL'}`;
    @customElement({ name, template }) class Test extends ApolloQuery<unknown, unknown> { }
    const tag = unsafeStatic(name);
    const element = await fixture<Test>(fhtml`<${tag} .networkStatus="${NetworkStatus.error}"></${tag}>`);
    expect(element).shadowDom.to.equal('SUCCESS');
  });

  it('renders by default', async function noRender() {
    const name = 'renders-by-default';
    const template = html<Test>`${() => 'RENDERED'}`;
    @customElement({ name, template }) class Test extends ApolloQuery<unknown, unknown> { }
    const tag = unsafeStatic(name);
    const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);

    expect(element).shadowDom.to.equal('RENDERED');
  });

  it('does render when data is set', async function dataRender() {
    const name = 'does-renders-when-data-is-set';
    const template = html<Test>`${x => x.data.test}`;
    @customElement({ name, template }) class Test extends ApolloQuery<{ test: string }, unknown> { }
    const tag = unsafeStatic(name);
    const el = await fixture<Test>(fhtml`<${tag} .data="${{ test: 'RENDERED' }}"></${tag}>`);
    expect(el).shadowDom.to.equal('RENDERED');
  });

  it('does render when error is set', async function errorRender() {
    const name = 'does-renders-when-error-is-set';
    const template = html<Test>`${x => x.error}`;
    @customElement({ name, template }) class Test extends ApolloQuery<unknown, unknown> { }
    const tag = unsafeStatic(name);
    const el = await fixture<Test>(fhtml`<${tag} .error="${'ERROR'}"></${tag}>`);
    expect(el).shadowDom.to.equal('ERROR');
  });

  it('does render when loading is set', async function loadingRender() {
    const name = 'renders-when-loading-is-set';
    const template = html`${x => x.loading ?? false ? 'LOADING' : 'FAIL'}`;
    @customElement({ name, template }) class Test extends ApolloQuery<unknown, unknown> { }
    const tag = unsafeStatic(name);
    const element = await fixture<Test>(fhtml`<${tag} .loading="${true}"></${tag}>`);
    expect(element).shadowDom.to.equal('LOADING');
  });
});
