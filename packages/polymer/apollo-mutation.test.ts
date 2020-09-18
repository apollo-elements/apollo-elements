import type {
  ApolloClient,
  ErrorPolicy,
  FetchPolicy,
  FetchResult,
  NormalizedCacheObject,
} from '@apollo/client/core';
import type { DocumentNode } from 'graphql';
import type { RefetchQueryDescription } from '@apollo/client/core/watchQueryOptions';

import { fixture, expect, oneEvent, defineCE, nextFrame } from '@open-wc/testing';

import gql from 'graphql-tag';

import { stub } from 'sinon';

import {
  assertType,
  isApolloError,
  setupClient,
  teardownClient,
} from '@apollo-elements/test-helpers';

import { GraphQLError } from 'graphql';

import './apollo-mutation';

import { PolymerApolloMutation } from './apollo-mutation';

import { PolymerElement, html } from '@polymer/polymer';

import NullableParamMutation from '@apollo-elements/test-helpers/NullableParam.mutation.graphql';

type TypeCheckData = { a: 'a', b: number };
type TypeCheckVars = { d: 'd', e: number };
class TypeCheck extends PolymerApolloMutation<TypeCheckData, TypeCheckVars> {
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

    // ApolloMutationInterface
    assertType<DocumentNode>                        (this.mutation);
    assertType<TypeCheckVars>                       (this.variables);
    assertType<boolean>                             (this.called);
    assertType<boolean>                             (this.ignoreResults);
    assertType<boolean>                             (this.awaitRefetchQueries);
    assertType<number>                              (this.mostRecentMutationId);
    assertType<ErrorPolicy>                         (this.errorPolicy);
    assertType<string>                              (this.errorPolicy);
    // @ts-expect-error: ErrorPolicy is not a number
    assertType<number>                              (this.errorPolicy);
    assertType<string>                              (this.fetchPolicy);
    assertType<Extract<FetchPolicy, 'no-cache'>>    (this.fetchPolicy);

    if (typeof this.refetchQueries === 'function')
      assertType<(result: FetchResult<TypeCheckData>) => RefetchQueryDescription>(this.refetchQueries);
    else
      assertType<RefetchQueryDescription>(this.refetchQueries);

    if (typeof this.optimisticResponse !== 'function')
      assertType<TypeCheckData>(this.optimisticResponse);
    else
      assertType<(vars: TypeCheckVars) => TypeCheckData>(this.optimisticResponse);

    /* eslint-enable max-len, func-call-spacing, no-multi-spaces */
  }
}

describe('[polymer] <apollo-mutation>', function() {
  let element: PolymerApolloMutation<unknown, unknown>;
  beforeEach(setupClient);
  afterEach(teardownClient);

  beforeEach(async function() {
    element = await fixture(`<apollo-mutation></apollo-mutation>`);
  });

  it('caches observed properties', async function() {
    const err = new Error('error');
    element.called = true;
    expect(element.called, 'called').to.equal(true);

    element.data = 'data';
    expect(element.data, 'data').to.equal('data');

    element.error = err;
    expect(element.error, 'error').to.equal(err);

    element.loading = true;
    expect(element.loading, 'loading').to.equal(true);
  });

  it('notifies on data change', async function() {
    const mutationStub = stub(element.client, 'mutate');

    mutationStub.resolves({ data: { messages: ['hi'] } });

    const mutation = gql`mutation { messages }`;

    element.mutate({ mutation });

    const { detail: { value } } = await oneEvent(element, 'data-changed');

    expect(value).to.deep.equal({ messages: ['hi'] });
    mutationStub.restore();
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

  it('notifies on called change', async function() {
    setTimeout(() => element.called = true);
    const { detail: { value } } = await oneEvent(element, 'called-changed');
    expect(value).to.be.true;
  });

  describe('when used in a Polymer template', function() {
    let wrapper: PolymerElement;
    class WrapperElement extends PolymerElement {
      static get properties() {
        return {
          mutation: {
            type: Object,
            value: () => NullableParamMutation,
          },
          variables: {
            type: Object,
            value: () => ({ nullable: '🤡' }),
          },
        };
      }

      static get template() {
        return html`
          <apollo-mutation id="mutation"
              mutation="[[mutation]]"
              variables="[[variables]]"
              data="{{data}}"
          ></apollo-mutation>

          <button id="button" on-click="onClick"></button>
          <output>[[data.nullableParam.nullable]]</output>
        `;
      }

      onClick() {
        (this.$.mutation as PolymerApolloMutation<unknown, unknown>).mutate();
      }
    }

    beforeEach(async function() {
      const tag = defineCE(WrapperElement);
      wrapper = await fixture<WrapperElement>(`<${tag}></${tag}>`);
      (wrapper.$.button as HTMLButtonElement).click();
      await nextFrame();
    });

    it('binds data up into parent component', async function() {
      expect(wrapper.shadowRoot.textContent).to.contain('🤡');
    });
  });
});
