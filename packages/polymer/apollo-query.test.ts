import type {
  ApolloClient,
  ErrorPolicy,
  FetchPolicy,
  NetworkStatus,
  WatchQueryOptions,
  ObservableQuery,
  NormalizedCacheObject,
} from '@apollo/client/core';

import { fixture, html, expect, oneEvent } from '@open-wc/testing';
import gql from 'graphql-tag';
import { stub } from 'sinon';

import './apollo-query';
import { client } from '../test-helpers/client';
import { DocumentNode, GraphQLError } from 'graphql';

import { PolymerApolloQuery } from './apollo-query';

import { assertType, isApolloError } from '@apollo-elements/test-helpers';

type TypeCheckData = { a: 'a', b: number };
type TypeCheckVars = { d: 'd', e: number };
class TypeCheck extends PolymerApolloQuery<TypeCheckData, TypeCheckVars> {
  render() {
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


describe('[polymer] <apollo-query>', function() {
  it('caches observed properties', async function() {
    const el = await fixture<PolymerApolloQuery<unknown, unknown>>(html`
      <apollo-query
      ></apollo-query>
    `);

    const err = new Error('error');

    el.data = 'data';
    expect(el.data, 'data').to.equal('data');

    el.error = err;
    expect(el.error, 'error').to.equal(err);

    el.loading = true;
    expect(el.loading, 'loading').to.equal(true);

    el.networkStatus = 1;
    expect(el.networkStatus, 'networkStatus').to.equal(1);
  });

  it('notifies on data change', async function() {
    const queryStub = stub(client, 'query');

    queryStub.resolves({
      loading: false,
      partial: undefined,
      networkStatus: 7,
      data: { messages: ['hi'] },
    });

    const query = gql`query { messages }`;

    const el = await fixture<PolymerApolloQuery<{ messages: string[] }, unknown>>(html`
      <apollo-query
        .client="${client}"
      ></apollo-query>
    `);


    setTimeout(() => el.executeQuery({ query }));
    const { detail: { value } } = await oneEvent(el, 'data-changed');
    expect(value).to.deep.equal({ messages: ['hi'] });
    queryStub.restore();
  });

  it('notifies on error change', async function() {
    const el = await fixture<PolymerApolloQuery<unknown, unknown>>(html`
      <apollo-query
        .client="${client}"
      ></apollo-query>
    `);

    const err = new Error('error');
    setTimeout(() => el.error = err);
    const { detail: { value } } = await oneEvent(el, 'error-changed');
    expect(value).to.equal(err);
  });

  it('notifies on errors change', async function() {
    const el = await fixture<PolymerApolloQuery<unknown, unknown>>(html`
      <apollo-query
        .client="${client}"
      ></apollo-query>
    `);

    const errs = [new GraphQLError('error')];
    setTimeout(() => el.errors = errs);
    const { detail: { value } } = await oneEvent(el, 'errors-changed');
    expect(value).to.equal(errs);
  });

  it('notifies on loading change', async function() {
    const el = await fixture<PolymerApolloQuery<unknown, unknown>>(html`
      <apollo-query
        .client="${client}"
      ></apollo-query>
    `);

    setTimeout(() => el.loading = true);
    const { detail: { value } } = await oneEvent(el, 'loading-changed');
    expect(value).to.be.true;
  });
});
