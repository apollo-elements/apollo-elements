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

import { defineCE, unsafeStatic, fixture, expect, html as fhtml } from '@open-wc/testing';
import sinon from 'sinon';
import 'sinon-chai';
import {
  client,
  setupClient,
  teardownClient,
  NoParamMutationData,
  NonNullableParamMutationData,
  NonNullableParamMutationVariables,
  NoParamMutationVariables,
  isApolloError,
  assertType,
} from '@apollo-elements/test-helpers';

import { ApolloMutation } from './apollo-mutation';
import { LitElement, TemplateResult, html } from 'lit-element';

import NoParamMutation from '../test-helpers/NoParam.mutation.graphql';

type TypeCheckData = { a: 'a', b: number };
type TypeCheckVars = { d: 'd', e: number };
class TypeCheck extends ApolloMutation<TypeCheckData, TypeCheckVars> {
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class TypeTestAccessor extends ApolloMutation<NonNullableParamMutationData, NonNullableParamMutationVariables> {
  // @ts-expect-error: meh
  get variables() {
    return { param: 'string' };
  }

  set variables(v) {
    null;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class TypeTestProperty extends ApolloMutation<NonNullableParamMutationData, NonNullableParamMutationVariables> {
  variables = { param: 'string' }
}

describe('[lit-apollo] ApolloMutation', function describeApolloMutation() {
  beforeEach(setupClient);
  afterEach(teardownClient);

  it('is an instance of LitElement', async function() {
    class Test extends ApolloMutation<unknown, unknown> {
      set thing(v: unknown) {
        this.requestUpdate('thing', v);
      }
    }

    const tagName = defineCE(Test);
    const tag = unsafeStatic(tagName);
    const element = await fixture<Test>(fhtml`<${tag}></${tag}>`);
    expect(element).to.be.an.instanceOf(LitElement);
  });

  it('renders when called is set', async function rendersOnCalled() {
    class Test extends ApolloMutation<unknown, unknown> {
      render(): TemplateResult {
        return html`${this.called ? 'CALLED' : 'FAIL'}`;
      }
    }

    const tagName = defineCE(Test);
    const tag = unsafeStatic(tagName);
    const element = await fixture<Test>(fhtml`<${tag} .called="${true}"></${tag}>`);
    expect(element).shadowDom.to.equal('CALLED');
  });

  it('uses element\'s updater method for mutation\'s `update` option by default', async function overridesMutateUpdate() {
    const mutation = NoParamMutation;

    class Test extends ApolloMutation<NoParamMutationData, NoParamMutationVariables> {
      client = client;

      mutation = mutation;

      render(): TemplateResult {
        return html`${JSON.stringify(this.data || {}, null, 2)}`;
      }

      updater(): void { '💩'; }
    }

    const tagName = defineCE(Test);

    const tag = unsafeStatic(tagName);

    const element =
      await fixture<Test>(fhtml`<${tag}></${tag}>`);

    const clientSpy =
      sinon.spy(element.client, 'mutate');

    await element.mutate();
    expect(clientSpy).to.have.been.calledWith(sinon.match({ update: element.updater }));
    clientSpy.restore();
  });

  it('allows passing custom update function', async function customUpdate() {
    const mutation = NoParamMutation;

    class Test extends ApolloMutation<NoParamMutationData, unknown> {
      client = client;

      mutation = mutation;

      render(): TemplateResult {
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

  it('does not use LitElement#update as mutation update', async function() {
    const mutation = NoParamMutation;

    class Test extends ApolloMutation<NoParamMutationData, unknown> {
      client = client;

      mutation = mutation;

      render(): TemplateResult {
        const { data = {} } = this;
        return html`${JSON.stringify(data, null, 2)}`;
      }

      update(...a: Parameters<LitElement['update']>): ReturnType<LitElement['update']> {
        super.update(...a);
      }
    }

    const tagName = defineCE(Test);

    const tag = unsafeStatic(tagName);

    const element =
      await fixture<Test>(fhtml`<${tag}></${tag}>`);

    const clientSpy =
      sinon.spy(element.client, 'mutate');

    await element.mutate();

    expect(clientSpy).to.not.have.been.calledWithMatch({
      update: element.update,
    });

    clientSpy.restore();
  });
});
