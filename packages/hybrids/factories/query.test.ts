import type { ApolloQueryController } from '@apollo-elements/core';

import * as S from '@apollo-elements/test';

import { expect, fixture, nextFrame } from '@open-wc/testing';
import { define, html, Hybrids } from 'hybrids';
import { setupClient, teardownClient, stringify } from '@apollo-elements/test';

import { query } from './query';

let counter = 0;

function getTagName(): string {
  const tagName = `query-element-${counter}`;
  counter++;
  return tagName;
}

describe('[hybrids] query factory', function() {
  describe('with global client', function() {
    beforeEach(setupClient);
    afterEach(teardownClient);

    describe(`with NullableParamQuery controller at "query" key and "noAutoSubscribe" option`, function() {
      interface H extends HTMLElement {
        query: ApolloQueryController<typeof S.NullableParamQuery>
      }

      let element: H;

      beforeEach(async function() {
        const tag = getTagName();

        define(tag, {
          query: query(S.NullableParamQuery, { noAutoSubscribe: true }),
          render: (host: HTMLElement & H) => {
            return html`
              <output id="called">${stringify(host.query.called)}</output>
              <output id="data">${stringify(host.query.data)}</output>
              <output id="error">${stringify(host.query.error)}</output>
              <output id="errors">${stringify(host.query.errors)}</output>
              <output id="loading">${stringify(host.query.loading)}</output>
            `;
          },
        } as Hybrids<H>);

        element = await fixture<HTMLElement & H>(`<${tag}></${tag})`);
      });

      it('creates the controller', function() {
        expect(element.query.subscribe, 'subscribe').to.be.a.instanceof(Function);
        expect(element.query.query, 'query').to.eq(S.NullableParamQuery);
        expect(element.query.host, 'host').to.be.ok.and.to.not.equal(element);
        expect(
          element.query.host.requestUpdate,
          'host.requestUpdate'
        ).to.be.an.instanceof(Function);
      });

      describe('calling executeQuery', function() {
        let p: Promise<any>;
        beforeEach(function() {
          p = element.query.executeQuery({ variables: { delay: 100 } });
        });

        beforeEach(nextFrame);
        it('sets loading state', function() {
          expect(element.query.loading).to.be.true;
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

        describe('when query resolves', function() {
          beforeEach(() => p);
          beforeEach(nextFrame);
          it('resolves query data', function() {
            expect(element.query.data).to.not.be.null;
          });
          it('renders query data', function() {
            expect(element).shadowDom.to.equal(`
              <output id="called">true</output>
              <output id="data">{"nullableParam":{"__typename":"Nullable","nullable":"Hello World"}}</output>
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
