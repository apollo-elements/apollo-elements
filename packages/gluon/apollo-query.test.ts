import type {
  ApolloClient,
  ErrorPolicy,
  NetworkStatus,
  FetchPolicy,
  WatchQueryOptions,
  ObservableQuery,
  NormalizedCacheObject,
} from '@apollo/client/core';

import type { DocumentNode, GraphQLError } from 'graphql';

import { defineCE, fixture, unsafeStatic, expect, html as fhtml } from '@open-wc/testing';

import { assertType, isApolloError } from '@apollo-elements/test-helpers';

import { ApolloQuery } from './apollo-query';
import { client } from '../test-helpers';

import { html } from 'lit-html';

import NoParamQuery from '@apollo-elements/test-helpers/NoParam.query.graphql';

type TypeCheckData = { a: 'a', b: number };
type TypeCheckVars = { d: 'd', e: number };
class TypeCheck extends ApolloQuery<TypeCheckData, TypeCheckVars> {
  async render() {
    /* eslint-disable max-len, func-call-spacing, no-multi-spaces */

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

describe('[gluon] ApolloQuery', function describeApolloQuery() {
  it('caches observed properties', async function cachesObservedProperties() {
    class Test extends ApolloQuery<unknown, unknown> {
    }

    const tag = unsafeStatic(defineCE(Test));

    const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);

    const err = new Error('error');

    const query = NoParamQuery;

    element.client = client;
    expect(element.client).to.equal(client);

    element.data = 'data';
    expect(element.data).to.equal('data');

    element.error = err;
    expect(element.error).to.equal(err);

    element.loading = true;
    expect(element.loading).to.equal(true);

    element.networkStatus = 1;
    expect(element.networkStatus).to.equal(1);

    element.query = query;
    expect(element.query).to.equal(query);
  });

  it('renders on set "data"', async function() {
    class Test extends ApolloQuery<unknown, unknown> {
      get template() {
        return html`${this.data}`;
      }
    }

    const tag = unsafeStatic(defineCE(Test));

    const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);

    element.data = 'hi';

    await element.render();

    expect(element).shadowDom.to.equal('hi');
  });

  it('renders on set "error"', async function() {
    class Test extends ApolloQuery<unknown, unknown> {
      get template() {
        return html`${this.error?.message}`;
      }
    }

    const tag = unsafeStatic(defineCE(Test));

    const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);

    element.error = new Error('hi');

    await element.render();

    expect(element).shadowDom.to.equal('hi');
  });

  it('renders on set "loading"', async function() {
    class Test extends ApolloQuery<unknown, unknown> {
      get template() {
        return html`${this.loading}`;
      }
    }

    const tag = unsafeStatic(defineCE(Test));

    const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);

    element.loading = true;

    await element.render();

    expect(element).shadowDom.to.equal('true');
  });

  it('renders on set "query"', async function() {
    class Test extends ApolloQuery<unknown, unknown> {
      get template() {
        return html`${this.query?.loc?.source?.body ?? ''}`;
      }
    }

    const tag = unsafeStatic(defineCE(Test));

    const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);

    element.query = NoParamQuery;

    await element.render();

    expect(element).shadowDom.to.equal(NoParamQuery.loc.source.body);
  });

  it('renders on set "networkStatus"', async function() {
    class Test extends ApolloQuery<unknown, unknown> {
      get template() {
        return html`${this.networkStatus}`;
      }
    }

    const tag = unsafeStatic(defineCE(Test));

    const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);

    element.networkStatus = 5;

    await element.render();

    expect(element).shadowDom.to.equal('5');
  });
});
