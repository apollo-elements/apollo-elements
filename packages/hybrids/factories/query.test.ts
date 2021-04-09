import type { SinonSpy, SinonStub } from 'sinon';
import type { TypedDocumentNode } from '@apollo/client/core';

import { assertType, Entries, SetupOptions, SetupResult } from '@apollo-elements/test-helpers';

import { setupSpies, setupStubs, stringify } from '@apollo-elements/test-helpers';

import { aTimeout, nextFrame } from '@open-wc/testing';

import { define, html } from 'hybrids';

import { query } from './query';

import 'sinon-chai';

import { QueryElement, describeQuery } from '@apollo-elements/test-helpers/query.test';
import { __testing_escape_hatch__ } from '../helpers/accessors';

let counter = 0;

function getTagName(): string {
  const tagName = `query-element-${counter}`;
  counter++;
  return tagName;
}

describe('[hybrids] ApolloQuery', function() {
  describeQuery({
    async setupFunction<T extends QueryElement>(opts?: SetupOptions<T>): Promise<SetupResult<T>> {
      const { attributes, properties, innerHTML = '' } = opts ?? {};

      const tag = getTagName();

      define<QueryElement>(tag, {
        ...query(null),
        stringify: () => stringify,
        hasRendered: (host: QueryElement & { render(): ShadowRoot }) => async () => {
          await aTimeout(100);
          host.render();
          return host;
        },
        render: host => html`
          <output id="data">${host.stringify(host.data)}</output>
          <output id="error">${host.stringify(host.error)}</output>
          <output id="errors">${host.stringify(host.errors)}</output>
          <output id="loading">${host.stringify(host.loading)}</output>
          <output id="networkStatus">${host.stringify(host.networkStatus)}</output>
        `,
      });

      const attrs = attributes ? ` ${attributes}` : '';

      const template = document.createElement('template');

      template.innerHTML = `<${tag}${attrs}></${tag}>`;

      const [element] =
        (template.content.cloneNode(true) as DocumentFragment)
          .children as HTMLCollectionOf<T>;

      let spies!: Record<string|keyof T, SinonSpy>;
      let stubs!: Record<string|keyof T, SinonStub>;

      // @ts-expect-error: just for tests
      element[__testing_escape_hatch__] = function(el: T) {
        spies = setupSpies(opts?.spy, el);
        stubs = setupStubs(opts?.stub, el);
      };

      document.body.append(element);

      for (const [key, val] of Object.entries(properties ?? {}) as Entries<T>)
        element[key] = val;

      await nextFrame();

      element.innerHTML = innerHTML;

      await nextFrame();

      return { element, spies, stubs };
    },
  });
});

function TDNTypeCheck() {
  type TypeCheckData = { a: 'a'; b: number };
  type TypeCheckVars = { c: 'c'; d: number };

  const TDN = {} as TypedDocumentNode<TypeCheckData, TypeCheckVars>;

  const Class = define('typed-query', {
    ...query(TDN),
  });

  const instance = new Class();

  assertType<TypeCheckData>(instance.data!);
  assertType<TypeCheckVars>(instance.variables!);
}
