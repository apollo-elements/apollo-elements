#!/usr/bin/env ts-node-script

import { readFile, writeFile, copyFile } from 'fs/promises';
import { resolve } from 'path';
import { JSDOM } from 'jsdom';
import * as globby from 'globby';

import { out as DOCS_DIR } from '../typedoc.json';

const CLASSES_DIR = resolve(__dirname, '..', DOCS_DIR, 'classes');

const EMOJI_REGEXP =
  /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g; // eslint-disable-line max-len

const TEST = 'node_modules';

function isSectionFromANodeModule(x: HTMLElement): boolean {
  return x.textContent.includes(TEST);
}

async function fixHTML(path: string) {
  console.log(`Fixing ${path.replace(process.cwd(), '')}`);

  const dom = new JSDOM(await readFile(path, 'utf-8'));

  const { window: { document } } = dom;

  document.head.querySelector<HTMLMetaElement>('meta[name="description"]').content =
    '🌑 Custom elements meet Apollo GraphQL 🌜';

  document.head.innerHTML += `
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://apolloelements.dev">
    <meta property="og:image" content="/logo.svg">
    <meta property="twitter:card" content="summary_large_image"/>
    <meta property="twitter:url" content="https://apolloelements.dev"/>
    <meta property="twitter:image" content="/logo.svg">
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👩‍🚀</text></svg>">
    <link rel="stylesheet" href="/assets/css/theme.css">
  `;

  const LINKS =
    Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href]'));

  // Fix edge case of polymer-style one-way binding being interpreted as Typedoc link
  if (path.endsWith('_polymer.html')) {
    document.body.innerHTML = document.body.innerHTML.replace(
      `<span class="hljs-attr">variables</span>=<span class="hljs-string">"&lt;a href="</span><span class="hljs-attr">..</span>/<span class="hljs-attr">classes</span>/<span class="hljs-attr">_apollo_elements_interfaces.apollomutationinterface.html</span>#<span class="hljs-attr">variables</span>"&gt;</span>variables`,
      `<span class="hljs-attr">variables</span>=<span class="hljs-string">"[[variables]]"</span>`
    );
  }

  // Fix Homepage links
  if (path === resolve(DOCS_DIR, 'index.html')) {
    LINKS
      .filter(x => x.href.includes('./packages/'))
      .forEach(link =>
        link.href = `${link.href.replace(/.\/packages\/([\w-]+)/, './modules/_apollo_elements_$1')}.html`.replace('-', '_'));
  }

  // Fix TOC fragment links
  LINKS
    .filter(x => !!x.id)
    .forEach(x => {
      x.id = x.id.replace(EMOJI_REGEXP, '');
      if (x.href)
        x.href = `#${x.id}`;
    });

  // Point references to HTMLElement to MDN
  LINKS
    .filter(x => x.href.endsWith('#htmlelement'))
    .forEach(x =>
      x.href = 'https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement');

  // Remove HTMLElement properties from classes
  if (path.includes(CLASSES_DIR)) {
    console.log('  Fixing API Docs...');

    Array.from(document.querySelectorAll('section'))
      .filter(isSectionFromANodeModule)
      .map(x => x.querySelector('a').getAttribute('name'))
      .filter(Boolean)
      .forEach(name => {
        document.querySelector(`[name="${name}"]`)
        ?.closest('section')
        ?.remove();

        LINKS
          .filter(x => x.href && x.href.endsWith(`#${name}`))
          .forEach(x => x.closest('li')?.remove());
      });
  }

  const link = ({ href, textContent }) =>
    `<a target="_blank" rel="noreferrer noopener" href="${href}" class="tsd-signature-type">${textContent}</a>`;

  const content =
    dom.serialize()
      // Link ApolloClient params to ApolloClient docs
      .replace(/<span class="tsd-signature-type">ApolloClient<\/span>/g,
        link({ textContent: 'ApolloClient', href: 'https://www.apollographql.com/docs/react/api/core/ApolloClient/' }))
      // Link ApolloError params to Apollo Client source
      .replace(/<span class="tsd-signature-type">ApolloError<\/span>/g,
        link({ textContent: 'ApolloError', href: 'https://github.com/apollographql/apollo-client/blob/062b76b162e9c0d95443c3fcae14746590f9e862/src/errors/index.ts#L36' }))
      // Link ErrorPolicy and FetchPolicy params to ApolloClient docs
      .replace(/<span class="tsd-signature-type">(Error|Fetch)Policy<\/span>/g,
        link({ textContent: '$1Policy', href: 'https://www.apollographql.com/docs/react/api/core/ApolloClient/#$1Policy' }))
      // Link NetworkStatus to Apollo Client source
      .replace(/<span class="tsd-signature-type">NetworkStatus<\/span>/g,
        link({ textContent: 'NetworkStatus', href: 'https://github.com/apollographql/apollo-client/blob/v3.2.1/src/core/networkStatus.ts' }))
      // Link NormalizedCacheObject to Apollo Client source
      .replace(/<span class="tsd-signature-type">NormalizedCacheObject<\/span>/g,
        link({ textContent: 'NormalizedCacheObject', href: 'https://github.com/apollographql/apollo-client/blob/v3.2.1/src/cache/inmemory/types.ts#L76' }))
      // Link DocumentNode params to graphql.js source
      .replace(/<span class="tsd-signature-type">DocumentNode<\/span>/g,
        link({ textContent: 'DocumentNode', href: 'https://github.com/graphql/graphql-js/blob/b7ec154cd1df7083dd0672e436a683b781de7178/src/language/ast.d.ts#L212-L216' }))
      // Link GraphQLError params to graphql.js docs
      .replace(/<span class="tsd-signature-type">GraphQLError<\/span>/g,
        link({ textContent: 'GraphQLError', href: 'https://graphql.org/graphql-js/error/#graphqlerror' }))
      // Link Error params to MDN
      .replace(/<span class="tsd-signature-type">Error<\/span>/g,
        link({ textContent: 'Error', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error' }))
      // Link *Element params to MDN
      .replace(/<span class="tsd-signature-type">(((HTML)|(SVG))(\w+)?)?Element<\/span>/g,
        link({ textContent: '$1Element', href: 'https://developer.mozilla.org/en-US/docs/Web/API/$1Element' }))
      // Link *Observer params to MDN
      .replace(/<span class="tsd-signature-type">(Mutation|Intersection|Resize)Observer<\/span>/g,
        link({ textContent: '$1Observer', href: 'https://developer.mozilla.org/en-US/docs/Web/API/$1Observer' }));

  await writeFile(path, content);
}

async function main() {
  console.log('Copying CSS...');

  await copyFile(
    resolve(DOCS_DIR, '../pages/theme.css'),
    resolve(DOCS_DIR, 'assets', 'css', 'theme.css')
  );

  console.log(`Fixing HTML in ${DOCS_DIR}...`);

  const htmlFiles =
    await globby(['*/*.html', '**/*.html'], { cwd: DOCS_DIR, absolute: true });

  for (const file of htmlFiles)
    await fixHTML(file);

  console.log('Done!');
}

main();
