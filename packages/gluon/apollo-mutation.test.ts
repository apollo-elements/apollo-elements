import type {
  ApolloClient,
  ErrorPolicy,
  FetchPolicy,
  FetchResult,
  MutationUpdaterFn,
  NormalizedCacheObject,
} from '@apollo/client/core';

import type { RefetchQueryDescription } from '@apollo/client/core/watchQueryOptions';

import type { DocumentNode, GraphQLError } from 'graphql';

import { defineCE, expect, fixture, html as fhtml, unsafeStatic } from '@open-wc/testing';

import { ApolloMutation } from './apollo-mutation';

import NoParamMutation from '../test-helpers/NoParam.mutation.graphql';

import { html } from '@gluon/gluon';
import { assertType, client, isApolloError, NoParamMutationData } from '@apollo-elements/test-helpers';
import { TemplateResult } from 'lit-html';
import sinon from 'sinon';

type TypeCheckData = { a: 'a', b: number };
type TypeCheckVars = { d: 'd', e: number };
class TypeCheck extends ApolloMutation<TypeCheckData, TypeCheckVars> {
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

describe('[gluon] ApolloMutation', function describeApolloMutation() {
  it('caches observed properties', async function cachesObserveProperties() {
    class Test extends ApolloMutation<unknown, unknown> {
    }

    const tag = unsafeStatic(defineCE(Test));

    const el = await fixture<Test>(fhtml`<${tag}></${tag}>`);

    const err = new Error('error');

    const client = null;

    const mutation = NoParamMutation;

    el.called = true;
    expect(el.called, 'called').to.be.true;

    el.client = client;
    expect(el.client, 'client').to.equal(client);

    el.data = 'data';
    expect(el.data, 'data').to.equal('data');

    el.error = err;
    expect(el.error, 'error').to.equal(err);

    el.loading = true;
    expect(el.loading, 'loading').to.be.true;

    el.mutation = mutation;
    expect(el.mutation, 'mutation').to.equal(mutation);
  });

  it('renders on set "called"', async function() {
    class Test extends ApolloMutation<unknown, unknown> {
      get template() {
        return html`${this.called}`;
      }
    }

    const tag = unsafeStatic(defineCE(Test));

    const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);

    element.called = true;

    await element.render();

    expect(element).shadowDom.to.equal('true');
  });

  it('allows passing custom update function', async function customUpdate() {
    const mutation = NoParamMutation;

    class Test extends ApolloMutation<NoParamMutationData, unknown> {
      client = client;

      mutation = mutation;

      get template(): TemplateResult {
        return html`${JSON.stringify(this.data || {}, null, 2)}`;
      }

      updater(): void { '💩'; }
    }

    const tagName = defineCE(Test);
    const update = sinon.stub() as MutationUpdaterFn;
    const tag = unsafeStatic(tagName);
    const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);

    const clientSpy = sinon.spy(element.client, 'mutate');
    await element.mutate({ update });
    expect(clientSpy).to.have.been.calledWith(sinon.match({ update }));
    clientSpy.restore();
  });
});
