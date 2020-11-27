#!/usr/bin/env ts-node-script

import { readFile, writeFile, copyFile } from 'fs/promises';
import { resolve } from 'path';
import { JSDOM } from 'jsdom';
import * as globby from 'globby';

import { out as DOCS_DIR } from '../typedoc.json';

const CLASSES_DIR = resolve(__dirname, '..', DOCS_DIR, 'classes');
const PAGES_DIR = resolve(__dirname, '..', DOCS_DIR, 'pages');

const EMOJI_REGEXP =
  /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g; // eslint-disable-line max-len

const TEST = 'node_modules';

function isSectionFromANodeModule(x: HTMLElement): boolean {
  return x.textContent!.includes(TEST);
}

function fixA11Y(document: Document, path: string) {
  // a11y fixes
  document.documentElement.lang = 'en';
}

function graphTag(document: Document, property: string, content: string): void {
  document.head.querySelector(`meta[property="og:${property}"]`)?.remove();
  document.head.innerHTML += /* html */`<meta property="${property}" content="${content}">`;
}

function appendMeta(document: Document, path: string) {
  document.head.querySelector<HTMLMetaElement>('meta[name="description"]')!.content =
    '🌑 Custom elements meet Apollo GraphQL 🌜';

  document.head.innerHTML += /* html */`
    <meta property="og:type" content="website">
    <meta property="og:url" content="${path.replace(process.cwd(), 'https://apolloelements.dev')}">
    <meta property="og:image" content="/logo.svg">
    <meta name="twitter:card" content="summary"/>
    <meta name="twitter:site" content="PowersBenny">
    <meta name="twitter:creator" content="PowersBenny">
    <meta property="og:title" content="${document.head.querySelector('title')!.textContent}">
    <meta property="og:description" content="🌑 Custom elements meet Apollo GraphQL 🌜">
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👩‍🚀</text></svg>">
    <link rel="stylesheet" href="/assets/css/theme.css">
  `;

  if (document.body.querySelector('wcd-live'))
    document.head.innerHTML += /* html */`<script type="module" src="https://unpkg.com/@wcd/bennypowers.wcd-live"></script>`;

  if (document.body.querySelector('code-tabs') || document.body.querySelector('code-copy'))
    document.head.innerHTML += /* html */`<script type="module" src="/components.js"></script>`;

  document.body.querySelectorAll('meta').forEach(meta => {
    const name = meta.getAttribute('property') ?? meta.name;
    const { content } = meta;
    document.head.querySelector(`meta[name="${name}"]`)?.remove();
    document.head.appendChild(meta);
    switch (name) {
      case 'title':
      case 'og:title':
      case 'twitter:title': graphTag(document, 'title', content); break;
      case 'og:description':
      case 'twitter:description':
      case 'description': graphTag(document, 'description', content); break;
    }
  });
}

function fixContent(document: Document, path: string) {
  const homeLink = document.querySelector('header a.title')!;

  const footer = document.querySelector('footer.with-border-bottom')!;

  const generatorTag = document.querySelector('.tsd-generator')!;

  homeLink.innerHTML = /* html */`
    <img src="/logo.svg" height="16px" width="16px" role="presentation"/>
    Apollo Elements
  `;

  footer.innerHTML += /* html */`
    <div class="container"></div>
  `;

  footer.querySelector('.container:last-of-type')!
    .appendChild(generatorTag);

  generatorTag.classList.remove('container');

  // Add CC BY-SA license to docs pages
  if (path.includes(PAGES_DIR)) {
    generatorTag.innerHTML += /* html */`
      <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 42" height="51" version="1.0">
          <title>This work is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License.</title>
          <path d="M3.408.476l113.354.202c1.584 0 3-.235 3 3.16l-.14 37.33H.547V3.7C.547 2.026.71.476 3.407.476z" fill="#aab2ab"/>
          <path d="M34.522 19.576c.005 7.529-6.096 13.636-13.626 13.641-7.53.004-13.64-6.096-13.644-13.625v-.016C7.248 12.046 13.35 5.938 20.88 5.934c7.531-.005 13.639 6.096 13.643 13.625v.017z" fill="#fff"/>
          <path d="M31.971 8.47c3.024 3.024 4.536 6.726 4.536 11.105 0 4.38-1.486 8.043-4.458 10.988-3.153 3.102-6.88 4.653-11.181 4.653-4.249 0-7.912-1.537-10.987-4.614-3.076-3.076-4.614-6.751-4.614-11.027 0-4.275 1.538-7.976 4.614-11.105 2.997-3.024 6.66-4.535 10.987-4.535 4.38 0 8.08 1.511 11.103 4.535zm-20.054 2.034C9.36 13.086 8.083 16.11 8.083 19.58c0 3.469 1.265 6.467 3.794 8.996 2.53 2.53 5.542 3.794 9.037 3.794 3.495 0 6.532-1.277 9.114-3.833 2.452-2.373 3.678-5.358 3.678-8.957 0-3.572-1.246-6.603-3.737-9.094-2.49-2.49-5.508-3.735-9.055-3.735-3.547 0-6.546 1.251-8.997 3.754zm6.727 7.55c-.391-.852-.976-1.278-1.756-1.278-1.378 0-2.067.928-2.067 2.783 0 1.856.689 2.784 2.067 2.784.91 0 1.561-.452 1.951-1.358l1.911 1.018c-.91 1.618-2.277 2.428-4.1 2.428-1.405 0-2.53-.431-3.376-1.292-.846-.862-1.269-2.05-1.269-3.563 0-1.489.436-2.67 1.308-3.544.872-.875 1.958-1.312 3.26-1.312 1.926 0 3.305.759 4.139 2.275l-2.068 1.058zm8.99 0c-.391-.852-.965-1.278-1.72-1.278-1.406 0-2.11.928-2.11 2.783 0 1.856.704 2.784 2.11 2.784.912 0 1.55-.452 1.915-1.358l1.953 1.018c-.909 1.618-2.274 2.428-4.092 2.428-1.404 0-2.527-.431-3.372-1.292-.843-.862-1.266-2.05-1.266-3.563 0-1.489.43-2.67 1.287-3.544.857-.875 1.947-1.312 3.273-1.312 1.923 0 3.3.759 4.13 2.275l-2.108 1.058z"/>
          <path d="M117.753 0H2.247A2.25 2.25 0 000 2.247v39.245c0 .28.227.508.507.508h118.985c.28 0 .508-.228.508-.508V2.247A2.25 2.25 0 00117.753 0zM2.247 1.015h115.506c.68 0 1.232.553 1.232 1.232v27.245H36.428c-3.026 5.47-8.856 9.185-15.546 9.185-6.694 0-12.522-3.711-15.547-9.185h-4.32V2.247c0-.68.552-1.232 1.232-1.232z"/>
          <g fill="#fff">
            <path d="M86.264 37.732c.08.155.186.28.32.376.132.096.287.167.466.213.18.047.365.07.556.07.13 0 .268-.01.416-.032.148-.022.287-.064.417-.126a.9.9 0 00.323-.255.635.635 0 00.13-.413.581.581 0 00-.172-.435 1.355 1.355 0 00-.45-.279 4.54 4.54 0 00-.628-.194 16.854 16.854 0 01-.713-.186 6.254 6.254 0 01-.723-.227 2.486 2.486 0 01-.63-.348 1.637 1.637 0 01-.45-.533 1.63 1.63 0 01-.17-.775c0-.34.072-.635.217-.886.146-.25.336-.459.57-.626.235-.167.5-.29.797-.371.296-.08.593-.12.89-.12.346 0 .678.038.996.116.317.077.6.203.847.376.248.173.444.394.59.664.144.269.217.595.217.979h-1.413a1.192 1.192 0 00-.124-.492.826.826 0 00-.282-.306 1.197 1.197 0 00-.402-.158 2.455 2.455 0 00-.494-.046 1.72 1.72 0 00-.35.037.943.943 0 00-.318.13.796.796 0 00-.236.232.63.63 0 00-.092.352c0 .13.024.236.073.316.05.08.148.155.293.222a3.7 3.7 0 00.601.205c.256.068.591.154 1.006.26.123.024.294.07.513.134.22.065.437.169.653.31.217.143.403.334.561.571.157.239.236.543.236.914 0 .304-.06.585-.177.845-.117.26-.292.484-.524.672-.232.19-.519.336-.861.441a4.078 4.078 0 01-1.192.158c-.365 0-.72-.045-1.063-.135a2.675 2.675 0 01-.91-.423 2.107 2.107 0 01-.625-.734c-.155-.298-.228-.65-.222-1.058h1.413c0 .222.04.411.12.565zM94.47 32.747l2.477 6.622h-1.513l-.5-1.475h-2.478l-.52 1.475h-1.465l2.505-6.622h1.493zm.083 4.06l-.835-2.427H93.7l-.864 2.428h1.717z"/>
          </g>
          <g fill="#fff">
            <path d="M59.997 32.747c.315 0 .603.029.863.084.26.056.484.147.67.274.185.126.33.295.432.505.102.21.153.47.153.778 0 .334-.076.612-.228.834-.151.223-.376.405-.673.547.41.118.715.323.917.617.202.294.303.649.303 1.063 0 .334-.066.623-.196.867a1.7 1.7 0 01-.525.599c-.22.154-.471.269-.753.343a3.381 3.381 0 01-.87.111h-3.215v-6.622h3.122zm-.187 2.679c.26 0 .474-.062.642-.185.167-.124.25-.324.25-.601a.77.77 0 00-.083-.38.62.62 0 00-.224-.231.945.945 0 00-.32-.116 2.12 2.12 0 00-.376-.032h-1.365v1.545h1.476zm.086 2.81c.142 0 .278-.014.408-.042.13-.027.246-.074.345-.139a.707.707 0 00.237-.264.903.903 0 00.088-.426c0-.34-.096-.583-.288-.728-.193-.145-.447-.218-.762-.218h-1.59v1.817h1.562zM62.69 32.747h1.634l1.55 2.616 1.542-2.616h1.624l-2.459 4.08v2.542h-1.46v-2.578l-2.43-4.044z"/>
          </g>
            <path d="M102.403 14.98c.004 5.846-4.731 10.588-10.577 10.592-5.846.005-10.588-4.73-10.593-10.576v-.015C81.229 9.135 85.965 4.394 91.81 4.389c5.846-.004 10.59 4.731 10.593 10.576v.016z" fill="#fff"/>
            <path d="M91.742 3.386c-3.212 0-5.93 1.12-8.156 3.362-2.283 2.32-3.425 5.064-3.425 8.233 0 3.169 1.142 5.894 3.425 8.174 2.283 2.28 5.002 3.42 8.156 3.42 3.193 0 5.96-1.15 8.303-3.449 2.205-2.183 3.308-4.899 3.308-8.145 0-3.246-1.123-5.991-3.367-8.233-2.245-2.241-4.993-3.362-8.244-3.362zm.03 2.087c2.631 0 4.866.927 6.705 2.783 1.857 1.836 2.786 4.077 2.786 6.725 0 2.666-.909 4.88-2.728 6.638-1.916 1.894-4.17 2.84-6.764 2.84-2.593 0-4.828-.937-6.705-2.81-1.877-1.876-2.815-4.098-2.815-6.668 0-2.57.948-4.812 2.844-6.725 1.82-1.856 4.044-2.783 6.676-2.783z"/>
            <path d="M86.603 13.344c.462-2.917 2.516-4.477 5.09-4.477 3.702 0 5.958 2.686 5.958 6.268 0 3.495-2.4 6.21-6.016 6.21-2.488 0-4.714-1.53-5.12-4.534h2.921c.088 1.56 1.1 2.108 2.546 2.108 1.648 0 2.72-1.53 2.72-3.87 0-2.455-.927-3.755-2.663-3.755-1.272 0-2.37.462-2.603 2.05l.85-.004-2.3 2.299-2.299-2.3.916.005z"/>
            <g transform="matrix(.99378 0 0 .99367 -177.694 -74.436)">
            <circle cx="242.562" cy="90.225" r="10.806" fill="#fff"/>
            <path d="M245.69 87.098a.754.754 0 00-.754-.754h-4.772a.754.754 0 00-.754.754v4.773h1.33v5.652h3.618V91.87h1.332v-4.773z"/>
            <circle cx="242.55" cy="84.083" r="1.632"/>
            <path clip-rule="evenodd" d="M242.535 78.318c-3.232 0-5.969 1.128-8.208 3.384-2.298 2.333-3.446 5.095-3.446 8.284 0 3.19 1.148 5.932 3.446 8.227s5.034 3.442 8.208 3.442c3.213 0 5.998-1.156 8.353-3.471 2.22-2.197 3.33-4.93 3.33-8.198 0-3.267-1.129-6.028-3.387-8.284-2.26-2.256-5.025-3.384-8.296-3.384zm.029 2.1c2.648 0 4.897.934 6.747 2.8 1.87 1.848 2.805 4.104 2.805 6.768 0 2.684-.915 4.911-2.746 6.681-1.928 1.906-4.197 2.858-6.806 2.858-2.61 0-4.858-.942-6.747-2.83-1.89-1.885-2.833-4.122-2.833-6.709 0-2.586.954-4.842 2.862-6.767 1.83-1.867 4.07-2.801 6.718-2.801z" fill-rule="evenodd"/>
          </g>
        </svg>
      </a>
    `;
  }

  generatorTag.innerHTML += /* html */`
    <a href="https://www.netlify.com">
      <img src="https://www.netlify.com/img/global/badges/netlify-dark.svg" alt="Deploys by Netlify" />
    </a>
  `;

  document.body.querySelector('header .table-wrap')!.innerHTML += /* html */`
    <a class="social-link" href="https://github.com/apollo-elements/apollo-elements" rel="noopener noreferrer" target="_blank">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 16" fill="none">
        <title>GitHub</title>
        <path fill="currentColor" fill-rule="evenodd" d="M8.18391.249268C3.82241.249268.253906 3.81777.253906 8.17927c0 3.46933 2.279874 6.44313 5.451874 7.53353.3965.0991.49563-.1983.49563-.3965v-1.3878c-2.18075.4956-2.67638-.9912-2.67638-.9912-.3965-.8922-.89212-1.1895-.89212-1.1895-.69388-.4957.09912-.4957.09912-.4957.793.0992 1.1895.793 1.1895.793.69388 1.2887 1.88338.8922 2.27988.6939.09912-.4956.29737-.8921.49562-1.0904-1.78425-.1982-3.5685-.8921-3.5685-3.96496 0-.89212.29738-1.586.793-2.08162-.09912-.19825-.3965-.99125.09913-2.08163 0 0 .69387-.19825 2.18075.793.59475-.19825 1.28862-.29737 1.9825-.29737.69387 0 1.38775.09912 1.98249.29737 1.4869-.99125 2.1808-.793 2.1808-.793.3965 1.09038.1982 1.88338.0991 2.08163.4956.59475.793 1.28862.793 2.08162 0 3.07286-1.8834 3.66766-3.66764 3.86586.29737.3965.59474.8921.59474 1.586v2.1808c0 .1982.0991.4956.5948.3965 3.172-1.0904 5.4518-4.0642 5.4518-7.53353-.0991-4.3615-3.6676-7.930002-8.02909-7.930002z" clip-rule="evenodd"></path>
      </svg>
    </a>

    <a class="social-link" href="https://discord.gg/xuTK3T" rel="noopener noreferrer" target="_blank">
      <svg viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg">
        <title>Discord</title>
        <path d="m3.58 21.196h14.259l-.681-2.205 1.629 1.398 1.493 1.338 2.72 2.273v-21.525c-.068-1.338-1.22-2.475-2.648-2.475l-16.767.003c-1.427 0-2.585 1.139-2.585 2.477v16.24c0 1.411 1.156 2.476 2.58 2.476zm10.548-15.513-.033.012.012-.012zm-7.631 1.269c1.833-1.334 3.532-1.27 3.532-1.27l.137.135c-2.243.535-3.26 1.537-3.26 1.537s.272-.133.747-.336c3.021-1.188 6.32-1.102 9.374.402 0 0-1.019-.937-3.124-1.537l.186-.183c.291.001 1.831.055 3.479 1.26 0 0 1.844 3.15 1.844 7.02-.061-.074-1.144 1.666-3.931 1.726 0 0-.472-.534-.808-1 1.63-.468 2.24-1.404 2.24-1.404-.535.337-1.023.537-1.419.737-.609.268-1.219.4-1.828.535-2.884.468-4.503-.315-6.033-.936l-.523-.266s.609.936 2.174 1.404c-.411.469-.818 1.002-.818 1.002-2.786-.066-3.802-1.806-3.802-1.806 0-3.876 1.833-7.02 1.833-7.02z"/>
        <path d="m14.308 12.771c.711 0 1.29-.6 1.29-1.34 0-.735-.576-1.335-1.29-1.335v.003c-.708 0-1.288.598-1.29 1.338 0 .734.579 1.334 1.29 1.334z"/>
        <path d="m9.69 12.771c.711 0 1.29-.6 1.29-1.34 0-.735-.575-1.335-1.286-1.335l-.004.003c-.711 0-1.29.598-1.29 1.338 0 .734.579 1.334 1.29 1.334z"/>
      </svg>
    </a>
  `;

  const LINKS =
    Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href]'));

  // Fix edge case of polymer-style one-way binding being interpreted as Typedoc link
  if (path.endsWith('_polymer.html')) {
    document.body.innerHTML = document.body.innerHTML.replace(
      /* html */`<span class="hljs-attr">variables</span>=<span class="hljs-string">"&lt;a href="</span><span class="hljs-attr">..</span>/<span class="hljs-attr">classes</span>/<span class="hljs-attr">_apollo_elements_interfaces.apollomutationinterface.html</span>#<span class="hljs-attr">variables</span>"&gt;</span>variables`,
      /* html */`<span class="hljs-attr">variables</span>=<span class="hljs-string">"[[variables]]"</span>`
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
    Array.from(document.querySelectorAll('section'))
      .filter(isSectionFromANodeModule)
      .map(x => x.querySelector('a')?.getAttribute('name'))
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
}

async function fixHTML(path: string) {
  const dom = new JSDOM(await readFile(path, 'utf-8'));

  const { window: { document } } = dom;

  fixA11Y(document, path);
  appendMeta(document, path);
  fixContent(document, path);

  const link = ({ href, textContent }: any) =>
    /* html */`<a target="_blank" rel="noreferrer noopener" href="${href}" class="tsd-signature-type">${textContent}</a>`;

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

  console.log(`Fixed ${path.replace(process.cwd(), '')}`);
}

async function main() {
  console.log('Copying CSS...');

  await copyFile(
    resolve(DOCS_DIR, '../packages/components/components-snippet.png'),
    resolve(DOCS_DIR, 'modules/components-snippet.png')
  );

  await copyFile(
    resolve(DOCS_DIR, '../packages/create/create-screenshot.png'),
    resolve(DOCS_DIR, 'modules/create-screenshot.png')
  );

  await copyFile(
    resolve(DOCS_DIR, '../pages/theme.css'),
    resolve(DOCS_DIR, 'assets/css/theme.css')
  );

  console.log(`Fixing HTML in ${DOCS_DIR}...`);

  const htmlFiles =
    await globby(['*/*.html', '**/*.html'], { cwd: DOCS_DIR, absolute: true });

  await Promise.all(htmlFiles.map(fixHTML));

  console.log('Done!');
}

main();
