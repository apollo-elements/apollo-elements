import type { ApolloSubscriptionController } from '@apollo-elements/core';

import * as S from '@apollo-elements/test';

import { aTimeout, expect, fixture, nextFrame } from '@open-wc/testing';
import { define, html, Hybrids } from 'hybrids';
import { setupClient, teardownClient, stringify } from '@apollo-elements/test';

import { subscription } from './subscription';

let counter = 0;

function getTagName(): string {
  const tagName = `subscription-element-${counter}`;
  counter++;
  return tagName;
}

describe('[hybrids] subscription factory', function() {
  describe('with global client', function() {
    beforeEach(setupClient);
    afterEach(teardownClient);

    describe(`with NullableParamSubscription controller at "subscription" key and "noAutoSubscribe" option`, function() {
      interface H {
        subscription: ApolloSubscriptionController<typeof S.NullableParamSubscription>
      }

      let element: HTMLElement & H;

      beforeEach(async function() {
        const tag = getTagName();

        define(tag, {
          subscription: subscription(S.NullableParamSubscription, { noAutoSubscribe: true }),
          render: (host: typeof element) => {
            return html`
              <output id="data">${stringify(host.subscription.data)}</output>
              <output id="error">${stringify(host.subscription.error)}</output>
              <output id="loading">${stringify(host.subscription.loading)}</output>
            `;
          },
        } as Hybrids<H>);

        element = await fixture<HTMLElement & H>(`<${tag}></${tag})`);
      });

      it('creates the controller', function() {
        expect(element.subscription.subscribe, 'subscribe').to.be.a.instanceof(Function);
        expect(
          element.subscription.subscription,
          'subscription'
        ).to.eq(S.NullableParamSubscription);
        expect(element.subscription.host, 'host').to.be.ok.and.to.not.equal(element);
        expect(
          element.subscription.host.requestUpdate,
          'host.requestUpdate'
        ).to.be.an.instanceof(Function);
      });

      describe('calling subscribe', function() {
        beforeEach(function() {
          element.subscription.subscribe();
        });

        beforeEach(nextFrame);

        it('sets loading state', function() {
          expect(element.subscription.loading).to.be.true;
        });

        it('renders loading state', function() {
          expect(element).shadowDom.to.equal(`
            <output id="data">null</output>
            <output id="error">null</output>
            <output id="loading">true</output>
          `);
        });

        describe('when subscription resolves', function() {
          beforeEach(() => aTimeout(100));
          beforeEach(nextFrame);
          it('resolves subscription data', function() {
            expect(element.subscription.data).to.not.be.null;
          });
          it('renders subscription data', function() {
            expect(element).shadowDom.to.equal(`
              <output id="data">{"nullableParam":{"nullable":"Hello World","__typename":"Nullable"}}</output>
              <output id="error">null</output>
              <output id="loading">false</output>
            `);
          });
        });
      });
    });
  });
});
