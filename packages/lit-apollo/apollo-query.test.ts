import type {
  ApolloClient,
  ErrorPolicy,
  FetchPolicy,
  WatchQueryOptions,
  ObservableQuery,
  NormalizedCacheObject,
} from '@apollo/client/core';

import type { DocumentNode, GraphQLError } from 'graphql';

import { defineCE, fixture, unsafeStatic, expect, html as fhtml } from '@open-wc/testing';

import { ApolloQuery } from './apollo-query';
import { TemplateResult, html, LitElement } from 'lit-element';
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

describe('[lit-apollo] ApolloQuery', function describeApolloQuery() {
  it('is an instance of LitElement', async function() {
    class Test extends ApolloQuery<unknown, unknown> {
      set thing(v: unknown) {
        this.requestUpdate('thing', v);
      }
    }

    const tagName = defineCE(Test);
    const tag = unsafeStatic(tagName);
    const el = await fixture<Test>(fhtml`<${tag}></${tag}>`);
    expect(el).to.be.an.instanceOf(LitElement);
  });

  it('renders when networkStatus is set', async function rendersOnNetworkStatus() {
    class Test extends ApolloQuery<unknown, unknown> {
      render(): TemplateResult {
        return html`${this.networkStatus === NetworkStatus.error ? 'SUCCESS' : 'FAIL'}`;
      }
    }
    const tagName = defineCE(Test);
    const tag = unsafeStatic(tagName);
    const element = await fixture<Test>(fhtml`<${tag} .networkStatus="${NetworkStatus.error}"></${tag}>`);

    expect(element).shadowDom.to.equal('SUCCESS');
  });

  it('renders by default', async function noRender() {
    class Test extends ApolloQuery<unknown, unknown> {
      render(): TemplateResult {
        return html`RENDERED`;
      }
    }

    const tagName = defineCE(Test);
    const tag = unsafeStatic(tagName);
    const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);

    expect(element).shadowDom.to.equal('RENDERED');
  });

  it('does render when data is set', async function dataRender() {
    class Test extends ApolloQuery<{ test: string }, unknown> {
      render(): TemplateResult {
        return html`${this.data.test}`;
      }
    }

    const tagName = defineCE(Test);
    const tag = unsafeStatic(tagName);
    const el = await fixture<Test>(fhtml`<${tag} .data="${{ test: 'RENDERED' }}"></${tag}>`);
    expect(el).shadowDom.to.equal('RENDERED');
  });

  it('does render when error is set', async function errorRender() {
    class Test extends ApolloQuery<unknown, unknown> {
      render(): TemplateResult {
        return html`${this.error}`;
      }
    }

    const tagName = defineCE(Test);
    const tag = unsafeStatic(tagName);
    const el = await fixture<Test>(fhtml`<${tag} .error="${'ERROR'}"></${tag}>`);
    expect(el).shadowDom.to.equal('ERROR');
  });

  it('does render when loading is set', async function loadingRender() {
    class Test extends ApolloQuery<unknown, unknown> {
      render(): TemplateResult {
        return html`${this.loading ? 'SUCCESS' : 'FAIL'}`;
      }
    }

    const tagName = defineCE(Test);
    const tag = unsafeStatic(tagName);
    const el = await fixture<Test>(fhtml`<${tag} loading></${tag}>`);
    expect(el).shadowDom.to.equal('SUCCESS');
  });
});
