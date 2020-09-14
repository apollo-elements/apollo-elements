import type {
  ApolloClient,
  ErrorPolicy,
  FetchPolicy,
  NetworkStatus,
  WatchQueryOptions,
  ObservableQuery,
  NormalizedCacheObject,
} from '@apollo/client/core';

import { fixture, expect, oneEvent, defineCE, nextFrame, aTimeout } from '@open-wc/testing';
import gql from 'graphql-tag';
import { stub } from 'sinon';

import './apollo-query';
import { client, setupClient, teardownClient } from '../test-helpers/client';
import { DocumentNode, GraphQLError } from 'graphql';

import { PolymerApolloQuery } from './apollo-query';
import './apollo-query';

import { assertType, isApolloError } from '@apollo-elements/test-helpers';

import { PolymerElement, html } from '@polymer/polymer';

import NullableParamQuery from '@apollo-elements/test-helpers/NullableParam.query.graphql';

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
  beforeEach(setupClient);
  afterEach(teardownClient);

  let element: PolymerApolloQuery<unknown, unknown>;

  beforeEach(async function() {
    element =
      await fixture<PolymerApolloQuery<unknown, unknown>>(`<apollo-query></apollo-query>`);
  });

  it('caches observed properties', async function() {
    const err = new Error('error');

    element.data = 'data';
    expect(element.data, 'data').to.equal('data');

    element.error = err;
    expect(element.error, 'error').to.equal(err);

    element.loading = true;
    expect(element.loading, 'loading').to.equal(true);

    element.networkStatus = 1;
    expect(element.networkStatus, 'networkStatus').to.equal(1);
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

    setTimeout(() => element.executeQuery({ query }));
    const { detail: { value } } = await oneEvent(element, 'data-changed');
    expect(value).to.deep.equal({ messages: ['hi'] });
    queryStub.restore();
  });

  it('notifies on error change', async function() {
    const err = new Error('error');
    setTimeout(() => element.error = err);
    const { detail: { value } } = await oneEvent(element, 'error-changed');
    expect(value).to.equal(err);
  });

  it('notifies on errors change', async function() {
    const errs = [new GraphQLError('error')];
    setTimeout(() => element.errors = errs);
    const { detail: { value } } = await oneEvent(element, 'errors-changed');
    expect(value).to.equal(errs);
  });

  it('notifies on loading change', async function() {
    setTimeout(() => element.loading = true);
    const { detail: { value } } = await oneEvent(element, 'loading-changed');
    expect(value).to.be.true;
  });

  describe('when used in a Polymer template', function() {
    let wrapper: PolymerElement;
    class WrapperElement extends PolymerElement {
      static get properties() {
        return {
          query: {
            type: Object,
            value: () => NullableParamQuery,
          },
          variables: {
            type: Object,
            value: () => ({ nullable: '🤡' }),
          },
        };
      }

      static get template() {
        return html`
          <apollo-query
              query="[[query]]"
              variables="[[variables]]"
              data="{{data}}"
          ></apollo-query>

          <output>[[data.nullableParam.nullable]]</output>
        `;
      }
    }

    beforeEach(async function() {
      const tag = defineCE(WrapperElement);
      wrapper = await fixture<WrapperElement>(`<${tag}></${tag}>`);
    });

    it('binds data up into parent component', async function() {
      expect(wrapper.shadowRoot.textContent).to.contain('🤡');
    });
  });
});
