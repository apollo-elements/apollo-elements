import * as S from '@apollo-elements/test/schema';

import * as C from '@apollo/client/core';

import { aTimeout, fixture, expect, nextFrame } from '@open-wc/testing';

import { spy, SinonSpy } from 'sinon';

import { html } from 'lit/static-html.js';

import { setupClient, teardownClient } from '@apollo-elements/test';

import './apollo-query';

import { ApolloQueryElement } from './apollo-query';

describe('[components] <apollo-query>', function describeApolloQuery() {
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

    describe('setting fetch-policy attr', function() {
      it('cache-and-network', async function() {
        element.setAttribute('fetch-policy', 'cache-and-network');
        await element.updateComplete;
        expect(element.fetchPolicy === 'cache-and-network').to.be.true;
        expect(element.fetchPolicy).to.equal(element.controller.options.fetchPolicy);
      });
      it('cache-first', async function() {
        element.setAttribute('fetch-policy', 'cache-first');
        await element.updateComplete;
        expect(element.fetchPolicy === 'cache-first').to.be.true;
        expect(element.fetchPolicy).to.equal(element.controller.options.fetchPolicy);
      });
      it('cache-only', async function() {
        element.setAttribute('fetch-policy', 'cache-only');
        await element.updateComplete;
        expect(element.fetchPolicy === 'cache-only').to.be.true;
        expect(element.fetchPolicy).to.equal(element.controller.options.fetchPolicy);
      });
      it('network-only', async function() {
        element.setAttribute('fetch-policy', 'network-only');
        await element.updateComplete;
        expect(element.fetchPolicy === 'network-only').to.be.true;
        expect(element.fetchPolicy).to.equal(element.controller.options.fetchPolicy);
      });
      it('no-cache', async function() {
        element.setAttribute('fetch-policy', 'no-cache');
        await element.updateComplete;
        expect(element.fetchPolicy === 'no-cache').to.be.true;
        expect(element.fetchPolicy).to.equal(element.controller.options.fetchPolicy);
      });
      it('standby', async function() {
        element.setAttribute('fetch-policy', 'standby');
        await element.updateComplete;
        expect(element.fetchPolicy === 'standby').to.be.true;
        expect(element.fetchPolicy).to.equal(element.controller.options.fetchPolicy);
      });
      it('forwards an illegal value', async function() {
        element.setAttribute('fetch-policy', 'shmoo');
        await element.updateComplete;
        // @ts-expect-error: test for bad value
        expect(element.fetchPolicy === 'shmoo').to.be.true;
        expect(element.fetchPolicy).to.equal(element.controller.options.fetchPolicy);
      });
    });

    describe('setting error-policy attr', function() {
      it('all', async function() {
        element.setAttribute('error-policy', 'all');
        await element.updateComplete;
        expect(element.errorPolicy === 'all').to.be.true;
        expect(element.errorPolicy).to.equal(element.controller.options.errorPolicy);
      });
      it('none', async function() {
        element.setAttribute('error-policy', 'none');
        await element.updateComplete;
        expect(element.errorPolicy === 'none').to.be.true;
        expect(element.errorPolicy).to.equal(element.controller.options.errorPolicy);
      });
      it('ignore', async function() {
        element.setAttribute('error-policy', 'ignore');
        await element.updateComplete;
        expect(element.errorPolicy === 'ignore').to.be.true;
        expect(element.errorPolicy).to.equal(element.controller.options.errorPolicy);
      });
      it('forwards an illegal value', async function() {
        element.setAttribute('error-policy', 'shmoo');
        await element.updateComplete;
        // @ts-expect-error: test for bad value
        expect(element.errorPolicy === 'shmoo').to.be.true;
        expect(element.errorPolicy).to.equal(element.controller.options.errorPolicy);
      });
    });

    describe('setting context', function() {
      it('as empty object', async function() {
        element.context = {};
        await element.updateComplete;
        expect(element.controller.options.context).to.be.ok.and.to.be.empty;
      });
      it('as non-empty object', async function() {
        element.context = { a: 'b' };
        await element.updateComplete;
        expect(element.controller.options.context).to.deep.equal({ a: 'b' });
      });
      it('as illegal non-object', async function() {
        // @ts-expect-error: test bad value
        element.context = 1;
        await element.updateComplete;
        expect(element.controller.options.context).to.equal(1);
      });
    });

    describe('setting client', function() {
      it('is null by default', function() {
        expect(element.client).to.be.null;
      });
      it('as global client', async function() {
        element.client = window.__APOLLO_CLIENT__!;
        await element.updateComplete;
        expect(element.controller.client).to.equal(window.__APOLLO_CLIENT__);
      });
      it('as new client', async function() {
        const client = new C.ApolloClient({ cache: new C.InMemoryCache() });
        element.client = client;
        await element.updateComplete;
        expect(element.controller.client).to.equal(client);
      });
      it('as illegal value', async function() {
        // @ts-expect-error: test bad value
        element.client = 1;
        await element.updateComplete;
        expect(element.controller.client).to.equal(1);
      });
    });

    describe('setting loading', function() {
      it('as true', async function() {
        element.loading = true;
        await element.updateComplete;
        expect(element.controller.loading).to.equal(true);
      });
      it('as false', async function() {
        element.loading = false;
        await element.updateComplete;
        expect(element.controller.loading).to.equal(false);
      });
      it('as illegal value', async function() {
        // @ts-expect-error: test bad value
        element.loading = 1;
        await element.updateComplete;
        expect(element.controller.loading).to.equal(1);
      });
    });

    describe('setting query', function() {
      it('as DocumentNode', async function() {
        const query = C.gql`{ nullable }`;
        element.query = query;
        await element.updateComplete;
        expect(element.controller.query)
          .to.equal(query)
          .and.to.equal(element.controller.document);
      });
      it('as TypedDocumentNode', async function() {
        const query = C.gql`{ nullable }` as C.TypedDocumentNode<{ a: 'b'}, {a: 'b'}>;
        element.query = query;
        await element.updateComplete;
        expect(element.controller.query).to.equal(query);
        const l = element as unknown as ApolloQueryElement<typeof query>;
        l.data = { a: 'b' };
        // @ts-expect-error: can't assign bad data type
        l.data = { b: 'c' };
        // @ts-expect-error: can't assign bad variables type
        l.variables = { b: 'c' };
      });
      it('as illegal value', async function() {
        expect(() => {
          // @ts-expect-error: can't assign bad variables type
          element.query = 1;
        }).to.throw(/Query must be a parsed GraphQL document./);
        await element.updateComplete;
        expect(element.query)
          .to.be.null.and
          .to.equal(element.document).and
          .to.equal(element.controller.query).and
          .to.equal(element.controller.document);
      });
    });

    describe('setting error', function() {
      it('as ApolloError', async function() {
        let error: C.ApolloError;
        try { throw new C.ApolloError({}); } catch (e) { error = e; }
        element.error = error;
        await element.updateComplete;
        expect(element.controller.error).to.equal(error);
      });
      it('as Error', async function() {
        try {
          throw new Error('hi');
        } catch (err) {
          element.error = err;
        }
        await element.updateComplete;
        expect(element.controller.error?.message).to.equal('hi');
      });
      it('as null', async function() {
        const error = null;
        element.error = error;
        await element.updateComplete;
        expect(element.controller.error).to.equal(error);
      });
      it('as illegal value', async function() {
        const error = 0;
        // @ts-expect-error: test bad value
        element.error = error;
        await element.updateComplete;
        expect(element.controller.error).to.equal(error);
      });
    });
  });

  describe('with global client', function() {
    beforeEach(setupClient);

    afterEach(teardownClient);

    describe('with a simple template that renders data', function() {
      let element: ApolloQueryElement<typeof S.PaginatedQuery>;
      beforeEach(async function() {
        element = await fixture(html`
          <apollo-query>
            <template>{{ (data.pages || []).join(',') }}</template>
          </apollo-query>
        `);
      });

      it('uses global client', function() {
        expect(element.client).to.be.ok;
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
          describe('then setting illegal variables', function() {
            // @ts-expect-error: bad input
            beforeEach(() => element.variables = { boop: 'snoot', offset: 'offset' });
            beforeEach(nextFrame);
            describe('then calling subscribe()', function() {
              beforeEach(() => element.subscribe());
              beforeEach(nextFrame);
              it('doesn\'t render anything', function() {
                expect(element).shadowDom.to.equal('');
              });
              it('sets error', function() {
                expect(element.error?.message).to.equal(`Variable "$offset" got invalid value "offset"; Int cannot represent non-integer value: "offset"`);
              });
            });
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

      beforeEach(() => element.updateComplete);

      it('renders', function() {
        expect(element.$$('h1').length).to.equal(1);
        expect(element.$$('span').length).to.equal(2);
        expect(element.$('#data')).to.be.ok;
        expect(element.$('#data')?.textContent).to.equal('noParam');
      });

      it('removes loading attribute', function() {
        expect(element.loading, 'property').to.be.false;
        expect(element.hasAttribute('loading'), 'attribute').to.be.false;
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
});
