import { NoParamSubscriptionData as Data, NoParamMutationVariables as Variables, setupClient } from '@apollo-elements/test-helpers';
import { defineCE, expect, fixture, html, unsafeStatic } from '@open-wc/testing';

import { ApolloSubscription } from './apollo-subscription';
import NoParamSubscription from '@apollo-elements/test-helpers/NoParam.subscription.graphql';

class Test extends ApolloSubscription<Data, Variables> { }

const err = new Error('error');

describe('[gluon] ApolloSubscription', function describeApolloSubscription() {
  let element: Test;
  beforeEach(setupClient);

  describe('simply instantiating', async function cachesObserveProperties() {
    beforeEach(async function() {
      const tag = unsafeStatic(defineCE(class extends Test { }));

      element = await fixture<Test>(html`<${tag}></${tag}>`);
    });

    it('has default properties', function() {
      expect(element.data, 'data').to.be.null;
      expect(element.variables, 'variables').to.be.null;
      expect(element.subscription, 'subscription').to.be.null;
      expect(element.fetchPolicy, 'fetchPolicy').to.be.undefined;
      expect(element.fetchResults, 'fetchResults').to.be.undefined;
      expect(element.pollInterval, 'pollInterval').to.be.undefined;
      expect(element.onSubscriptionData, 'onSubscriptionData').to.be.undefined;
      expect(element.onError, 'onError').to.be.undefined;
      expect(element.notifyOnNetworkStatusChange, 'notifyOnNetworkStatusChange').to.be.false;
      expect(element.observable, 'observableQuery').to.be.undefined;
    });

    it('caches properties', function() {
      const client = {} as typeof window.__APOLLO_CLIENT__;
      element.client = client;
      expect(element.client, 'client').to.equal(client);

      const data = { messageSent: { message: null } };
      element.data = data;
      expect(element.data, 'data').to.deep.equal(data);

      element.error = err;
      expect(element.error, 'error').to.equal(err);

      element.loading = true;
      expect(element.loading, 'loading').to.be.true;
    });
  });

  describe('with a subscription', function() {
    beforeEach(async function() {
      const tag = unsafeStatic(defineCE(class extends Test {
        subscription = NoParamSubscription;
      }));

      element = await fixture<Test>(html`<${tag}></${tag}>`);
    });

    it('caches subscription property', function() {
      expect(element.subscription, 'subscription').to.equal(NoParamSubscription);
    });
  });
});
