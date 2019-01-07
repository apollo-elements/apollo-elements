import { chai, expect, html } from '@open-wc/testing';
import sinonChai from 'sinon-chai';
import gql from 'graphql-tag';
import pick from 'crocks/helpers/pick';

import { ifDefined } from 'lit-html/directives/if-defined';
import { match, stub } from 'sinon';

import { ApolloMutationMixin } from './apollo-mutation-mixin.js';
import { client } from '@apollo-elements/test-helpers/client.js';
import { getElementWithLitTemplate } from '@apollo-elements/test-helpers/helpers.js';

chai.use(sinonChai);

const scriptTemplate = script => html`<script type="application/graphql">${script}</script>`;
const getClass = () => ApolloMutationMixin(HTMLElement);
const getTemplate = (tag, { mutation, variables, client, script } = {}) => html`
  <${tag}
      .client="${ifDefined(client)}"
      .mutation="${ifDefined(mutation)}"
      .variables="${variables}">
    ${script && scriptTemplate(script)}
  </${tag}>`;
const getElement = getElementWithLitTemplate({ getTemplate, getClass });

const pickMutationProps = pick([
  'awaitRefetchQueries',
  'context',
  'errorPolicy',
  'fetchPolicy',
  'mutation',
  'optimisticResponse',
  'refetchQueries',
  'update',
  'variables',
]);

describe('ApolloMutationMixin', function describeApolloMutationMixin() {
  it('returns an instance of the superclass', async function returnsClass() {
    expect(await getElement()).to.be.an.instanceOf(HTMLElement);
  });

  it('sets default properties', async function setsDefaultProperties() {
    window.__APOLLO_CLIENT__ = client;
    const el = await getElement();
    expect(el.client, 'client').to.equal(client);
    expect(el.ignoreResults, 'ignoreResults').to.be.false;
    expect(el.mostRecentMutationId, 'mostRecentMutationId').to.equal(0);
    expect(el.optimisticResponse, 'optimisticResponse').to.be.undefined;
    expect(el.variables, 'variables').to.be.undefined;
    expect(el.onUpdate, 'onUpdate').to.be.undefined;
    expect(el.onCompleted, 'onCompleted').to.be.a('function');
    expect(el.onCompleted(), 'onCompleted application').to.be.undefined;
    expect(el.onError, 'onError').to.be.a('function');
    expect(el.onError(), 'onError application').to.be.undefined;
  });

  it('accepts a script child as mutation', async function scriptChild() {
    const script = `mutation { foo { bar } }`;
    const el = await getElement({ client, script });
    expect(el.firstElementChild).to.be.an.instanceof(HTMLScriptElement);
    expect(el.mutation).to.deep.equal(gql(script));
  });

  it('accepts a parsed mutation', async function parsedMutation() {
    const mutation = gql`mutation { foo { bar } }`;
    const el = await getElement({ client, mutation });
    expect(el.mutation).to.equal(mutation);
  });

  it('accepts a parsed mutation in setter', async function parsedMutation() {
    const mutation = gql`mutation { foo { bar } }`;
    const el = await getElement({ client });
    el.mutation = mutation;
    expect(el.mutation).to.equal(mutation);
  });

  it('rejects a bad mutation', async function badMutation() {
    const el = await getElement();
    expect(() => {
      el.mutation = 'foo';
    }).to.throw('Mutation must be a gql-parsed DocumentNode');
    expect(el.mutation).to.not.be.ok;
  });

  describe('generateMutationId', function generateMutationId() {
    it('increments mostRecentMutationId', async function() {
      const el = await getElement({ client });
      expect(el.generateMutationId()).to.equal(1);
      expect(el.mostRecentMutationId).to.equal(1);
      expect(el.generateMutationId()).to.equal(2);
      expect(el.mostRecentMutationId).to.equal(2);
    });
  });

  describe('mutate', function mutate() {
    const mutation = gql`mutation { foo }`;
    it('calls generateMutationId', async function() {
      const el = await getElement({ client, mutation });
      const generateMutationIdStub = stub(el, 'generateMutationId');
      el.mutate();
      expect(generateMutationIdStub).to.have.been.calledOnce;
      generateMutationIdStub.restore();
    });

    it('calls client.mutate with element props', async function() {
      const el = await getElement({ client, mutation });
      const mutateStub = stub(client, 'mutate');
      const props = pickMutationProps({ ...el });
      el.mutate();
      expect(mutateStub).to.have.been.calledWith(match(props));
      mutateStub.restore();
    });

    it('calls onCompletedMutation when mutation resolves', async function() {
      const el = await getElement({ client, mutation });
      const mutateStub = stub(client, 'mutate');
      const onCompletedMutationStub = stub(el, 'onCompletedMutation');
      mutateStub.resolves('foo');
      await el.mutate();
      expect(onCompletedMutationStub).to.have.been.calledWith('foo', 1);
      mutateStub.restore();
      onCompletedMutationStub.restore();
    });

    it('calls onMutationError when mutation rejects', async function() {
      const el = await getElement({ client, mutation });
      const mutateStub = stub(client, 'mutate');
      const onMutationErrorStub = stub(el, 'onMutationError');
      mutateStub.rejects(new Error('foo'));
      try {
        await el.mutate();
      } catch (e) {
        expect(onMutationErrorStub).to.have.been.calledWith('foo', 1);
      } finally {
        mutateStub.restore();
        onMutationErrorStub.restore();
      }
    });

    it('defaults to element\'s mutation', async function() {
      const el = await getElement({ client, mutation });
      const mutateStub = stub(client, 'mutate');
      await el.mutate({ mutation: undefined });
      expect(mutateStub).to.have.been.calledWith(match({ mutation }));
      mutateStub.restore();
    });
  });

  describe('onCompletedMutation', function() {
    const mutation = gql`mutation { foo }`;
    it('calls isMostRecentMutation', async function() {
      const el = await getElement({ client, mutation });
      const isMostRecentMutationStub = stub(el, 'isMostRecentMutation');
      el.onCompletedMutation({ data: 1 }, 1);
      expect(isMostRecentMutationStub).to.have.been.calledWith(1);
      isMostRecentMutationStub.restore();
    });

    it('calls onCompleted with data', async function() {
      const el = await getElement({ client, mutation });
      const onCompletedStub = stub(el, 'onCompleted');
      el.onCompletedMutation({ data: 2 }, 1);
      expect(onCompletedStub).to.have.been.calledWith(2);
      onCompletedStub.restore();
    });

    it('sets data, error, loading', async function() {
      const el = await getElement({ client, mutation });
      const mutateStub = stub(client, 'mutate');
      mutateStub.resolves({ data: 2 });
      await el.mutate();
      expect(el.data).to.equal(2);
      expect(el.error).to.be.null;
      expect(el.loading).to.be.false;
      mutateStub.restore();
    });
  });

  describe('onMutationError', function() {
    const mutation = gql`mutation { foo }`;
    it('calls isMostRecentMutation', async function() {
      const el = await getElement({ client, mutation });
      const isMostRecentMutationStub = stub(el, 'isMostRecentMutation');
      el.onMutationError({ data: 1 }, 1);
      expect(isMostRecentMutationStub).to.have.been.calledWith(1);
      isMostRecentMutationStub.restore();
    });

    it('calls onError with data', async function() {
      const el = await getElement({ client, mutation });
      const onErrorStub = stub(el, 'onError');
      el.onMutationError('foo', 1);
      expect(onErrorStub).to.have.been.calledWith('foo');
      onErrorStub.restore();
    });

    it('sets data, error, loading', async function() {
      const el = await getElement({ client, mutation });
      const mutateStub = stub(client, 'mutate');
      mutateStub.rejects('foo');
      try {
        await el.mutate();
      } catch (error) {
        expect(el.data).to.be.null;
        expect(el.error).to.equal('foo');
        expect(el.loading).to.be.false;
      } finally {
        mutateStub.restore();
      }
    });
  });
});
