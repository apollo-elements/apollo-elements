import type { SinonSpy, SinonStub } from 'sinon';
import type { Entries, SetupOptions, SetupResult } from '@apollo-elements/test-helpers';

import { setupSpies, setupStubs, stringify } from '@apollo-elements/test-helpers';

import { aTimeout, nextFrame } from '@open-wc/testing';

import { define, html, Hybrids } from 'hybrids';

import { ApolloQuery } from './apollo-query';

import 'sinon-chai';

import { QueryElement, describeQuery } from '@apollo-elements/test-helpers/query.test';
import { __testing_escape_hatch__ } from './helpers/accessors';

let counter = 0;

function getTagName(): string {
  const tagName = `query-element-${counter}`;
  counter++;
  return tagName;
}

function render<D = unknown, V = unknown>(host: QueryElement<D, V>): ReturnType<typeof html> {
  return html`
    <output id="data">${host.stringify(host.data)}</output>
    <output id="error">${host.stringify(host.error)}</output>
    <output id="errors">${host.stringify(host.errors)}</output>
    <output id="loading">${host.stringify(host.loading)}</output>
    <output id="networkStatus">${host.stringify(host.networkStatus)}</output>
  `;
}

describe('[hybrids] ApolloQuery', function() {
  describeQuery({
    async setupFunction<T extends QueryElement>(opts?: SetupOptions<T>): Promise<SetupResult<T>> {
      const { attributes, properties, innerHTML = '' } = opts ?? {};

      const tag = getTagName();

      const hasRendered =
        (host: T) => async () => { await aTimeout(50); return host; };

      define<T>(tag, {
        ...ApolloQuery,
        stringify: () => stringify,
        hasRendered,
        render,
      } as Hybrids<T>);

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
