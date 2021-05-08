import type { GraphQLError } from '@apollo-elements/interfaces';

import * as S from '@apollo-elements/test';

import {
  ApolloClient,
  ApolloError,
  DocumentNode,
  ErrorPolicy,
  FetchPolicy,
  NormalizedCacheObject,
} from '@apollo/client/core';

import { aTimeout, fixture, expect, nextFrame } from '@open-wc/testing';

import { spy, SinonSpy } from 'sinon';

import { html } from 'lit/static-html.js';

import {
  setupClient,
  isApolloError,
  assertType,
  teardownClient,
} from '@apollo-elements/test';

import './apollo-query';

import { ApolloQueryElement } from './apollo-query';

describe('[components] <apollo-query>', function describeApolloQuery() {
  beforeEach(setupClient);

  afterEach(teardownClient);

  describe('simply instantiating', function() {
    let element: ApolloQueryElement;
    beforeEach(async function() {
      element = await fixture(html`<apollo-query></apollo-query>`);
    });

    it('has a shadow root', function() {
      expect(element.shadowRoot).to.be.ok;
    });

    it('doesn\'t render anything', function() {
      expect(element).shadowDom.to.equal('');
    });
  });

  describe('with a simple template that renders data', function() {
    let element: ApolloQueryElement<typeof S.PaginatedQuery>;
    beforeEach(async function() {
      element = await fixture(html`
        <apollo-query>
          <template>{{ (data.pages || []).join(',') }}</template>
        </apollo-query>
      `);
    });

    describe('setting no-auto-subscribe', function() {
      beforeEach(() => element.setAttribute('no-auto-subscribe', ''));
      beforeEach(nextFrame);
      it('reflects', function() {
        expect(element.noAutoSubscribe).to.be.true
          .and.to.equal(element.controller.options.noAutoSubscribe);
      });
      describe('then setting query', function() {
        beforeEach(() => element.query = S.PaginatedQuery);
        beforeEach(nextFrame);
        it('doesn\'t render anything', function() {
          expect(element).shadowDom.to.equal('');
        });
        describe('then setting variables', function() {
          beforeEach(() => element.variables = { offset: 0 });
          beforeEach(nextFrame);
          it('doesn\'t render anything', function() {
            expect(element).shadowDom.to.equal('');
          });
          it('canAutoSubscribe is false', function() {
            expect(element.canAutoSubscribe).to.be.false;
          });
          describe('then calling subscribe()', function() {
            beforeEach(() => element.subscribe());
            beforeEach(nextFrame);
            it('renders data', function() {
              expect(element).shadowDom.to.equal('1,2,3,4,5,6,7,8,9,10');
            });
            describe('then calling refetch', function() {
              beforeEach(async () => element.refetch({
                offset: (element.variables?.offset ?? 0) + 10,
              }));
              beforeEach(nextFrame);
              it('renders next page', function() {
                expect(element).shadowDom.to.equal(`
                  1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20
                `);
              });
            });
            describe('then calling fetchMore({ variables })', function() {
              beforeEach(async () => element.fetchMore({
                variables: { offset: (element.variables?.offset ?? 0) + 10 },
              }).catch(() => 0));
              beforeEach(nextFrame);
              it('renders next page', function() {
                expect(element).shadowDom.to.equal(`
                  1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20
                `);
              });
            });
            describe('then calling subscribeToMore({ document, updateQuery })', function() {
              beforeEach(() => element.subscribeToMore({
                document: S.PageAddedSubscription,
                updateQuery(_, { subscriptionData }) {
                  return { pages: [subscriptionData.data!.pageAdded!] };
                },
              }));
              beforeEach(nextFrame);
              it('renders data', function() {
                expect(element).shadowDom.to.equal('1,2,3,4,5,6,7,8,9,10,11');
              });
            });
            describe('then calling startPolling(20)', function() {
              beforeEach(() => spy(element.controller, 'refetch'));
              afterEach(() => (element.controller.refetch as SinonSpy).restore?.());
              beforeEach(function startPolling() {
                element.startPolling(20);
              });
              beforeEach(() => aTimeout(70));
              it('refetches', function() {
                expect(element.controller.refetch).to.have.been.calledThrice;
              });
              describe('then stopPolling', function() {
                beforeEach(function stopPolling() {
                  element.stopPolling();
                });
                beforeEach(() => aTimeout(100));
                it('stops calling refetch', function() {
                  expect(element.controller.refetch).to.have.been.calledThrice;
                });
              });
            });
          });
          describe('then calling executeQuery()', function() {
            beforeEach(() => element.executeQuery());
            beforeEach(nextFrame);
            it('renders data', function() {
              expect(element).shadowDom.to.equal('1,2,3,4,5,6,7,8,9,10');
            });
          });
          describe('when executeQuery() rejects', function() {
            let e: Error;
            beforeEach(() => element.executeQuery({
              variables: {
                limit: 1000, // client is programmed to reject this
              },
            }).catch(err => e = err));
            beforeEach(nextFrame);
            it('"unrenders" data', function() {
              expect(element).shadowDom.to.equal('');
            });
            it('sets error', function() {
              expect(element.error).to.equal(e);
              expect(element.error!.message).to.equal('rate limited');
            });
          });
        });
      });
    });
  });

  describe('with template attribute set but empty', function() {
    let element: ApolloQueryElement;
    beforeEach(async function() {
      element = await fixture(html`<apollo-query template=""></apollo-query>`);
    });

    it('has null template', function() {
      expect(element.template).to.be.null;
    });
  });

  describe('with template attribute set but no template', function() {
    let element: ApolloQueryElement;
    beforeEach(async function() {
      element = await fixture(html`<apollo-query template="heh"></apollo-query>`);
    });

    it('has null template', function() {
      expect(element.template).to.be.null;
    });
  });

  describe('with `no-shadow` attribute set as a string', function() {
    let element: ApolloQueryElement;

    beforeEach(async function() {
      element = await fixture(html`<apollo-query no-shadow="special"></apollo-query>`);
    });

    it('creates a special div', function() {
      expect(element.querySelector('.special')).to.be.ok;
    });
  });

  describe('with template and query DOM and `no-shadow` attribute set', function() {
    let element: ApolloQueryElement<typeof S.NoParamQuery>;

    beforeEach(async function() {
      element = await fixture(html`
        <apollo-query no-shadow>
          <script type="application/graphql">
            query NoParamQuery {
              noParam {
                noParam
              }
            }
          </script>
          <template>
            <h1>Template</h1>
            <span id="data">{{ data.noParam.noParam }}</span>
            <span id="error">{{ error.message }}</span>
          </template>
        </apollo-query>
      `);
    });

    beforeEach(() => aTimeout(200));

    it('renders', function() {
      expect(element.$$('h1').length).to.equal(1);
      expect(element.$$('span').length).to.equal(2);
      expect(element.$('#data')).to.be.ok;
      expect(element.$('#data')?.textContent).to.equal('noParam');
    });

    it('creates a query-result div', function() {
      expect(element.querySelector('.output')).to.be.ok;
    });

    it('renders to the light DOM', function() {
      expect(element.$('#data')).to.equal(element.querySelector('#data'));
    });

    it('does not blow away template', function() {
      expect(element.template).to.be.an.instanceof(HTMLTemplateElement);
    });

    it('does not blow away query', function() {
      expect(element.querySelector('script[type="application/graphql"]')).to.be.ok;
    });
  });

  describe('with `no-shadow` and `template` attributes set', function() {
    let element: ApolloQueryElement<typeof S.NoParamQuery>;

    beforeEach(async function() {
      element = await fixture(html`
        <apollo-query no-shadow template="tpl" .query="${S.NoParamQuery}"></apollo-query>

        <template id="tpl">
          <h1>Template</h1>
          <span id="data">{{ data.noParam.noParam }}</span>
          <span id="error">{{ error.message }}</span>
        </template>
      `);
    });

    beforeEach(nextFrame);
    beforeEach(nextFrame);

    it('renders', function() {
      expect(element.$$('h1').length).to.equal(1);
      expect(element.$$('span').length).to.equal(2);
      expect(element.$('#data')).to.be.ok;
      expect(element.$('#data')?.textContent).to.equal('noParam');
    });

    it('renders to the light DOM', function() {
      expect(element.$('#data')).to.equal(element.querySelector('#data'));
    });

    it('does not blow away template', function() {
      expect(element.template).to.be.an.instanceof(HTMLTemplateElement);
    });
  });

  describe('with template in DOM and a query property', function() {
    let element: ApolloQueryElement<typeof S.NoParamQuery>;

    beforeEach(async function() {
      element = await fixture(html`
        <apollo-query .query="${S.NoParamQuery}">
          <template>
            <h1>Template</h1>
            <span id="data">{{ data.noParam.noParam }}</span>
            <span id="error">{{ error.message }}</span>
          </template>
        </apollo-query>
      `);
    });

    beforeEach(nextFrame);

    it('renders', function() {
      expect(element.$$('h1').length).to.equal(1);
      expect(element.$$('span').length).to.equal(2);
      expect(element.$('#data')).to.be.ok;
      expect(element.$('#data')?.textContent).to.equal('noParam');
    });
  });

  describe('with template, query, and variables in DOM', function() {
    let element: ApolloQueryElement<typeof S.NullableParamQuery>;

    beforeEach(async function() {
      element = await fixture(html`
        <apollo-query>

          <script type="application/graphql">
            query NullableParamQuery($nullable: String) {
              nullableParam(nullable: $nullable) {
                nullable
              }
            }
          </script>

          <script type="application/json">
            {
              "nullable": "DOM"
            }
          </script>

          <template>
            <h1>Template</h1>
            <span id="data">{{ data.nullableParam.nullable }}</span>
            <span id="error">{{ error.message }}</span>
          </template>

        </apollo-query>
      `);
    });

    beforeEach(nextFrame);

    it('canAutoSubscribe is true', function() {
      expect(element.canAutoSubscribe).to.be.true;
    });

    it('renders', function() {
      expect(element.$$('h1').length).to.equal(1);
      expect(element.$$('span').length).to.equal(2);
      expect(element.$('#data')).to.be.ok;
      expect(element.$('#data')?.textContent).to.equal('DOM');
    });

    describe('setting variables property', function() {
      beforeEach(function() {
        element.variables = { nullable: 'set by js' };
      });

      beforeEach(nextFrame);

      it('rerenders', function() {
        expect(element.$('#data')).to.be.ok;
        expect(element.$('#data')?.textContent).to.equal('set by js');
      });
    });
  });

  describe('when query errors', function() {
    let element: ApolloQueryElement<typeof S.NullableParamQuery>;

    beforeEach(async function() {
      element = await fixture(html`
        <apollo-query
            .query="${S.NullableParamQuery}"
            .variables="${{ nullable: 'error' }}">
          <template>
            <h1>Template</h1>
            <span id="data">{{ data.nullableParam.nullable }}</span>
            <span id="error">{{ error.message }}</span>
          </template>
        </apollo-query>
      `);
    });

    it('renders', function() {
      expect(element.$('#error')).to.be.ok;
      expect(element.$('#error')?.textContent).to.equal('error');
    });
  });

  describe('with a list rendering template', function() {
    let element: ApolloQueryElement;

    beforeEach(async function() {
      element = await fixture(html`
        <apollo-query>
          <template>
            <p>{{ data.me.name }}</p>
            <ul>
              <template type="repeat" repeat="{{ data.friends || [] }}">
                <li data-id="{{ item.id }}"
                    data-index="{{ index }}">{{ item.name }}</li>
              </template>
            </ul>
          </template>
        </apollo-query>
      `);
    });

    describe('setting data', function() {
      beforeEach(function() {
        element.data = {
          me: { name: 'ME' },
          friends: [
            { id: 'friend-a', name: 'A' },
            { id: 'friend-b', name: 'B' },
            { id: 'friend-c', name: 'C' },
          ],
        };
      });

      beforeEach(nextFrame);

      it('renders the list', function() {
        expect(element).shadowDom.to.equal(`
          <p>ME</p>
          <ul>
            <li data-id="friend-a" data-index="0">A</li>
            <li data-id="friend-b" data-index="1">B</li>
            <li data-id="friend-c" data-index="2">C</li>
          </ul>
        `);
      });
    });
  });
});

type TypeCheckData = { a: 'a', b: number };
type TypeCheckVars = { d: 'd', e: number };

function TypeCheck() {
  const el = new ApolloQueryElement<TypeCheckData, TypeCheckVars>();
  /* eslint-disable max-len, func-call-spacing, no-multi-spaces */

  assertType<HTMLElement>                               (el);

  // ApolloElementInterface
  assertType<ApolloClient<NormalizedCacheObject>|null>  (el.client);
  assertType<Record<string, unknown>|undefined>         (el.context);
  assertType<boolean>                                   (el.loading);
  assertType<DocumentNode|null>                         (el.document);
  assertType<ApolloError|Error|null>                    (el.error);
  assertType<readonly GraphQLError[]|null>              (el.errors);
  assertType<TypeCheckData>                             (el.data!);
  assertType<string>                                    (el.error!.message);
  assertType<'a'>                                       (el.data.a);
  // @ts-expect-error: b as number type
  assertType<'a'>                                       (el.data.b);
  if (isApolloError(el.error!))
    assertType<readonly GraphQLError[]>                 (el.error.graphQLErrors);

  // ApolloQueryInterface
  assertType<DocumentNode>                              (el.query!);
  assertType<TypeCheckVars>                             (el.variables!);
  assertType<ErrorPolicy>                               (el.errorPolicy!);
  assertType<string>                                    (el.errorPolicy!);
  // @ts-expect-error: ErrorPolicy is not a number
  assertType<number>                                    (el.errorPolicy!);
  assertType<FetchPolicy>                               (el.fetchPolicy!);

  /* eslint-enable max-len, func-call-spacing, no-multi-spaces */
}
