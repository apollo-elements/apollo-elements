import { expect, nextFrame } from '@open-wc/testing';
import 'sinon-chai';
import gql from 'graphql-tag';

import { spy } from 'sinon';
import { define, html, Hybrids } from 'hybrids';

import NoParamMutation from '@apollo-elements/test-helpers/NoParam.mutation.graphql';
import NullableParamMutation from '@apollo-elements/test-helpers/NullableParam.mutation.graphql';

import { ApolloMutation, ApolloMutationElement } from './apollo-mutation';
import { setupClient } from '@apollo-elements/test-helpers/client';
import { ApolloError } from '@apollo/client/core';

let counter = 0;

function getTagName(): string {
  const tagName = `mutation-element-${counter}`;
  counter++;
  return tagName;
}

const basicRender =
  <D = unknown, V = unknown>(host: ApolloMutationElement<D, V>): ReturnType<typeof html> =>
    html`${JSON.stringify(host.data, null, 2)}`;

describe('[hybrids] ApolloMutation', function describeApolloMutationMixin() {
  let element: ApolloMutationElement;
  // @ts-expect-error: it's an initial fixture
  let props: ApolloMutationElement = {};
  let render = basicRender;
  let hybrid: Hybrids<ApolloMutationElement> = { ...ApolloMutation, render };

  beforeEach(setupClient);

  function setupElement(properties = props, innerHTML = '') {
    const container = document.createElement('div');

    const tag = getTagName();

    define(tag, hybrid);

    container.innerHTML = `<${tag}>${innerHTML}</${tag}>`;

    const [element] = container.children as HTMLCollectionOf<ApolloMutationElement>;

    document.body.appendChild(element);

    // @ts-expect-error: ??
    const update = render({ ...element, ...properties });

    update({ ...element, ...properties }, container);

    return element;
  }

  function teardownFixture() {
    element?.remove?.();
    element = undefined;
    // @ts-expect-error: it's a fixture teardown
    props = {};
    render = basicRender;
    hybrid = { ...ApolloMutation, render };
  }

  beforeEach(function() {
    element = setupElement();
  });

  afterEach(teardownFixture);

  it('has default properties', async function setsDefaultProperties() {
    expect(element.awaitRefetchQueries, 'awaitRefetchQueries').to.be.undefined;
    expect(element.called, 'called').to.be.false;
    expect(element.client, 'client').to.equal(window.__APOLLO_CLIENT__);
    expect(element.data, 'data').to.be.null;
    expect(element.errorPolicy, 'errorPolicy').to.be.undefined;
    expect(element.fetchPolicy, 'fetchPolicy').to.be.undefined;
    expect(element.ignoreResults, 'ignoreResults').to.be.false;
    expect(element.mostRecentMutationId, 'mostRecentMutationId').to.equal(0);
    expect(element.mutation, 'mutation').to.be.null;
    expect(element.onCompleted, 'onCompleted').to.be.undefined;
    expect(element.onError, 'onError').to.be.undefined;
    expect(element.optimisticResponse, 'optimisticResponse').to.be.undefined;
    expect(element.refetchQueries, 'refetchQueries').to.be.undefined;
    expect(element.updater, 'updater').to.be.undefined;
    expect(element.variables, 'variables').to.be.null;
  });

  describe('when window.__APOLLO_CLIENT__ is set', function() {
    let cached: typeof window.__APOLLO_CLIENT__;

    beforeEach(function() {
      cached = window.__APOLLO_CLIENT__;
      window.__APOLLO_CLIENT__ = {} as typeof window.__APOLLO_CLIENT__;
      element = setupElement();
    });

    afterEach(function() {
      window.__APOLLO_CLIENT__ = cached;
    });

    it('uses global client', async function defaultsToGlobalClient() {
      expect(element.client).to.equal(window.__APOLLO_CLIENT__);
    });
  });

  describe('when instantiated with a graphql script child', function() {
    beforeEach(teardownFixture);
    beforeEach(function() {
      const tag = getTagName();

      const script = NoParamMutation.loc.source.body;

      const container = document.createElement('div');

      define(tag, hybrid);

      container.innerHTML = `
        <${tag}>
          <script type="application/graphql">
            ${script}
          </script>
        </${tag}>
      `;

      element = container.firstElementChild as ApolloMutationElement;

      document.body.append(element);
    });

    beforeEach(nextFrame);

    it('does not remove script child', function() {
      expect(element.firstElementChild).to.be.an.instanceof(HTMLScriptElement);
    });

    it('accepts a script child as mutation', function() {
      expect(element.mutation).to.deep.equal(gql(NoParamMutation.loc.source.body));
    });
  });

  describe('setting an invalid mutation', function() {
    it('rejects a bad mutation', async function badMutation() {
      // @ts-expect-error: testing the error
      expect(() => element.mutation = 'foo', 'setting the property throws')
        .to.throw('Mutation must be a gql-parsed DocumentNode');
      expect(element.mutation, 'does not set property').to.not.be.ok;
    });
  });

  describe('setting a valid mutation', function() {
    beforeEach(function() {
      element.mutation = NoParamMutation;
    });

    it('sets the mutation property', async function parsedMutation() {
      expect(element.mutation).to.equal(NoParamMutation);
    });

    describe('with a mutation that has nullable params', function mutate() {
      async function mutate() {
        try {
          await element.mutate();
        } catch { null; }
      }

      beforeEach(function() {
        element.mutation = NullableParamMutation;
        element.onCompleted = spy();
        element.onError = spy();
      });

      describe('calling mutate', function() {
        beforeEach(mutate);

        it('increments mostRecentMutationId', async function() {
          expect(element.mostRecentMutationId).to.equal(1);
        });

        it('calls onCompleted with data when mutation resolves', async function callsOnCompleted() {
          expect(element.onCompleted)
            .to.have.been.calledWithMatch({ nullableParam: { nullable: 'Hello World' } });
        });

        it('sets data, loading', async function setsDataLoading() {
          expect(element.error, 'error').to.be.null;
          expect(element.loading, 'loading').to.be.false;
          expect(element.data, 'data')
            .to.deep.equal({
              nullableParam: {
                __typename: 'Nullable',
                nullable: 'Hello World',
              },
            });
        });

        describe('then calling mutate again', function() {
          beforeEach(mutate);
          it('increments mostRecentMutationId', async function() {
            expect(element.mostRecentMutationId).to.equal(2);
          });
        });
      });

      describe('when it should error', function() {
        beforeEach(function() {
          element.variables = { nullable: 'error' };
        });

        beforeEach(mutate);

        it('calls onError', async function callsOnError() {
          // @ts-expect-error: spy
          const [error] = element.onError.firstCall.args;
          expect(error).to.be.an.instanceOf(ApolloError);
          expect(error.message).to.equal('error');
        });

        it('sets data, error, loading', async function setsErrorLoading() {
          expect(element.data).to.be.null;
          expect(element.error).to.be.an.instanceOf(ApolloError);
          expect(element.error.message).to.equal('error');
          expect(element.loading).to.be.false;
        });
      });
    });
  });
});
