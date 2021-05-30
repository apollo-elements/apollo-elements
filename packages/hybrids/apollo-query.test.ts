import type * as I from '@apollo-elements/interfaces';

import { SetupOptions, SetupResult } from '@apollo-elements/test';

import { setupSpies, setupStubs, stringify, TestableElement } from '@apollo-elements/test';

import { nextFrame } from '@open-wc/testing';

import { define, html, Hybrids } from 'hybrids';

import { ApolloQuery, ApolloQueryElement } from './apollo-query';

import { describeQuery } from '@apollo-elements/test/query.test';

let counter = 0;

function getTagName(): string {
  const tagName = `query-element-${counter}`;
  counter++;
  return tagName;
}

describe('[hybrids] ApolloQuery', function() {
  beforeEach(function(this: Mocha.Context) {
    this.SKIP_ATTRIBUTES = true;
  });

  describeQuery({
    async setupFunction<T extends ApolloQueryElement>(
      opts?: SetupOptions<T>
    ): Promise<SetupResult<T & TestableElement>> {
      const { attributes, properties, innerHTML = '' } = opts ?? {};

      const tag = getTagName();

      define(tag, {
        ...ApolloQuery,
        $: (host: ApolloQueryElement & TestableElement) =>
          (id: string) => host.shadowRoot!.getElementById(id),
        hasRendered: host => async () => {
          await nextFrame();
          await host.controller.host.updateComplete;
          return host;
        },
        render: host => {
          return html`
            <output id="data">${stringify(host.data)}</output>
            <output id="error">${stringify(host.error)}</output>
            <output id="errors">${stringify(host.errors)}</output>
            <output id="loading">${stringify(host.loading)}</output>
            <output id="networkStatus">${stringify(host.networkStatus)}</output>
          `;
        },
      } as Hybrids<ApolloQueryElement & TestableElement>);

      const attrs = attributes ? ` ${attributes}` : '';

      const template = document.createElement('template');

      template.innerHTML = `<${tag}${attrs}></${tag}>`;

      const [element] =
        (template.content.cloneNode(true) as DocumentFragment)
          .children as HTMLCollectionOf<T & TestableElement>;

      document.body.append(element);

      const spies = setupSpies(opts?.spy, element);
      const stubs = setupStubs(opts?.stub, element);

      for (const [key, val] of Object.entries(properties ?? {}) as I.Entries<T & TestableElement>)
        element[key] = val;

      element.innerHTML = innerHTML;

      return { element, spies, stubs };
    },
  });
});
