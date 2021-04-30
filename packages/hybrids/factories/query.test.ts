import type { SinonSpy, SinonStub } from 'sinon';
import type { DocumentNode, TypedDocumentNode } from '@apollo/client/core';
import type { Entries } from '@apollo-elements/interfaces';

import { assertType, SetupOptions, SetupResult } from '@apollo-elements/test';

import { setupSpies, setupStubs, stringify } from '@apollo-elements/test';

import { aTimeout } from '@open-wc/testing';

import { define, html, Hybrids, RenderFunction } from 'hybrids';

import { query, QueryHybridsFactoryOptions } from './query';

import { QueryElement, describeQuery } from '@apollo-elements/test/query.test';
import { __testing_escape_hatch__ } from '../helpers/accessors';

let counter = 0;

function getTagName(): string {
  const tagName = `query-element-${counter}`;
  counter++;
  return tagName;
}

type TestableApolloQueryHybrid<T, U> = Hybrids<QueryElement<T, U> & {
  stringify(x: unknown): string;
  hasRendered(): Promise<QueryElement<T, U>>;
  render?: RenderFunction<QueryElement<T, U>>;
}>

const testQuery = <T, U>(
  doc?: DocumentNode | TypedDocumentNode<T, U> | null,
  opts?: QueryHybridsFactoryOptions<T, U>
): TestableApolloQueryHybrid<T, U> => ({
    ...query<T, U>(doc, opts),
    stringify: () => stringify,
    hasRendered: host => async () => {
      await aTimeout(0);
      host.render?.(host);
      await aTimeout(0);
      return host;
    },
  });

describe('[hybrids] ApolloQuery', function() {
  describeQuery({
    async setupFunction<T extends QueryElement>(opts?: SetupOptions<T>): Promise<SetupResult<T>> {
      const { attributes, properties, innerHTML = '' } = opts ?? {};

      const tag = getTagName();

      define(tag, {
        ...testQuery(),
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

      element.innerHTML = innerHTML;

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
