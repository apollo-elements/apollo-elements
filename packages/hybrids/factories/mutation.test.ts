import type { ApolloMutationController } from '@apollo-elements/core';

import * as S from '@apollo-elements/test';

import { expect, fixture, nextFrame } from '@open-wc/testing';
import { define, html, Hybrids } from 'hybrids';
import { setupClient, teardownClient, stringify } from '@apollo-elements/test';

import { mutation } from './mutation';

let counter = 0;

function getTagName(): string {
  const tagName = `mutation-element-${counter}`;
  counter++;
  return tagName;
}

describe('[hybrids] mutation factory', function() {
  describe('with global client', function() {
    beforeEach(setupClient);
    afterEach(teardownClient);

    describe('with NullableParamMutation controller at "mutation" key', function() {
      interface H {
        mutation: ApolloMutationController<typeof S.NullableParamMutation>
      }

      let element: H;

      beforeEach(async function() {
        const tag = getTagName();

        define(tag, {
          mutation: mutation(S.NullableParamMutation),
          render: (host: H) => {
            return html`
              <output id="called">${stringify(host.mutation.called)}</output>
              <output id="data">${stringify(host.mutation.data)}</output>
              <output id="error">${stringify(host.mutation.error)}</output>
              <output id="errors">${stringify(host.mutation.errors)}</output>
              <output id="loading">${stringify(host.mutation.loading)}</output>
            `;
          },
        } as Hybrids<H>);

        element = await fixture<HTMLElement & H>(`<${tag}></${tag})`);
      });

      it('creates the controller', function() {
        expect(element.mutation.mutate, 'mutate').to.be.a.instanceof(Function);
        expect(element.mutation.mutation, 'mutation').to.eq(S.NullableParamMutation);
        expect(element.mutation.host, 'host').to.be.ok.and.to.not.equal(element);
        expect(
          element.mutation.host.requestUpdate,
          'host.requestUpdate'
        ).to.be.an.instanceof(Function);
      });

      describe('calling mutate', function() {
        let p: Promise<any>;
        beforeEach(function() {
          p = element.mutation.mutate({ variables: { delay: 100 } });
        });

        beforeEach(nextFrame);
        it('sets loading state', function() {
          expect(element.mutation.loading).to.be.true;
        });
        it('renders loading state', function() {
          expect(element).shadowDom.to.equal(`
            <output id="called">true</output>
            <output id="data">null</output>
            <output id="error">null</output>
            <output id="errors">[]</output>
            <output id="loading">true</output>
          `);
        });

        describe('when mutation resolves', function() {
          beforeEach(() => p);
          beforeEach(nextFrame);
          it('resolves mutation data', function() {
            expect(element.mutation.data).to.not.be.null;
          });
          it('renders mutation data', function() {
            expect(element).shadowDom.to.equal(`
              <output id="called">true</output>
              <output id="data">{"nullableParam":{"nullable":"Hello World","__typename":"Nullable"}}</output>
              <output id="error">null</output>
              <output id="errors">[]</output>
              <output id="loading">false</output>
            `);
          });
        });
      });
    });
  });
});
