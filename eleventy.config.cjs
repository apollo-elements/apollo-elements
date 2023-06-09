// @ts-check
const path = require('node:path');

// const eleventyRocketNav = require('@rocket/eleventy-rocket-nav');
// const rocketCollections = require('./docs/_plugins/rocket-eleventy/rocketCollections.cjs');
// const apolloElements = require('./docs/_plugins/rocket-preset-apollo-elements/index.cjs');
// const SlideDecks = require('eleventy-plugin-slide-decks');
// const CustomElementsManifest = require('./docs/_plugins/rocket-preset-custom-elements-manifest/eleventy/custom-elements-manifest.cjs');
// const Footnotes = require('eleventy-plugin-footnotes');

const { EleventyRenderPlugin } = require('@11ty/eleventy');
const WebC = require('@11ty/eleventy-plugin-webc');
const EleventyPluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const ImportMaps = require('./docs/_plugins/importMaps.cjs');
const Playgrounds = require('./docs/_plugins/playgrounds/playgrounds.cjs');
const CodeTabs = require('./docs/_plugins/code-tabs/code-tabs.cjs');
const Icons = require('./docs/_plugins/icons.cjs');
const LitPlugin = require('@lit-labs/eleventy-plugin-lit');

// Rocket
const Nav = require('./docs/_plugins/nav/nav.cjs');
const RocketCollections = require('./docs/_plugins/rocket-eleventy/rocketCollections.cjs');

const yaml = require('yaml');
/** @type{import('@11ty/eleventy/src/UserConfig')} */
module.exports = function(eleventyConfig) {
  // rocketSearch()...

  eleventyConfig.setQuietMode(true);
  eleventyConfig.addDataExtension('yaml,yml', content => yaml.parse(content));
  eleventyConfig.addPassthroughCopy('docs/!(*.md|*.html)*');
  eleventyConfig.addPassthroughCopy('docs/assets');
  eleventyConfig.addPassthroughCopy({ 'docs/icons/*.svg': 'assets/icons' });
  eleventyConfig.addPassthroughCopy('favicon.ico');
  eleventyConfig.addPassthroughCopy('decks/azconf-dev-2021/**/*.{js,png,svg,jpg,webp,woff,woff2}');

  eleventyConfig.addFilter('formatDate', date =>
    date instanceof Date ? date.toDateString() : date);

  eleventyConfig.addPlugin(RocketCollections);
  eleventyConfig.addPlugin(Nav);
  eleventyConfig.addPlugin(Icons);
  eleventyConfig.addPlugin(Playgrounds);
  eleventyConfig.addPlugin(CodeTabs);
  eleventyConfig.addPlugin(EleventyPluginSyntaxHighlight);
  eleventyConfig.addPlugin(ImportMaps, {
    cacheFor: '1d',
    specs: [
      '@lit-labs/ssr-client',
      '@lit-labs/ssr-client/lit-element-hydrate-support.js',
      '@power-elements/codesandbox-button',
      'lit',
      'lit/decorators/custom-element.js',
      'lit/decorators/property.js',
      'lit/decorators/state.js',
      'lit/directives/if-defined.js',
      'lit/directives/repeat.js',
      'playground-elements',
    ],
  });
  eleventyConfig.addPlugin(LitPlugin, {
    mode: 'worker',
    componentModules: [
      'docs/_plugins/code-tabs/components/code-tabs.js',
      'docs/_plugins/code-tabs/components/code-copy.js',
    ],
  });

  eleventyConfig.addPlugin(WebC, {
    components: [
      'docs/_components/**/*.webc',
      'docs/_plugins/playgrounds/components/**/*.webc',
      'docs/_plugins/code-tabs/components/**/*.webc',
      'npm:@11ty/eleventy-plugin-syntaxhighlight/*.webc',
    ],
  });

  // eleventyConfig.addPlugin(SlideDecks);
  // eleventyConfig.addPlugin(eleventyRocketNav);
  // eleventyConfig.addPlugin(Footnotes);
  // eleventyConfig.addPlugin(EleventyRenderPlugin);

  // const IMPORT_MAP_BASE = `{{ORIGIN}}/_merged_assets/_static/apollo-elements`;
  // eleventyConfig.addPlugin(playgroundElements, {
  //   playgroundImport: 'https://unpkg.com/playground-elements@0.15.0-pre.1/playground-ide.js?module',
  //   importMap: {
  //     '@apollo/client/core': `${IMPORT_MAP_BASE}/apollo-client.js`,
  //     '@apollo/client/utilities': `${IMPORT_MAP_BASE}/apollo-client.js`,
  //     '@apollo/client/utilities/graphql/storeUtils.js': `${IMPORT_MAP_BASE}/apollo-client.js`,
  //     '@apollo/client/link/schema': `${IMPORT_MAP_BASE}/schema-link.js`,
  //     '@graphql-tools/mock': `${IMPORT_MAP_BASE}/schema-link.js`,
  //     '@graphql-tools/schema': `${IMPORT_MAP_BASE}/schema-link.js`,
  //     '@graphql-tools/tools': `${IMPORT_MAP_BASE}/schema-link.js`,
  //     'event-iterator': `${IMPORT_MAP_BASE}/schema-link.js`,
  //   },
  // });

  // eleventyConfig.addPlugin(rocketCollections, {
  //   _inputDirCwdRelative: path.join(process.cwd(), 'docs'),
  // });

  // something's busted in plugin-manager?
  // derived these by printing in the configFunction of add-web-components-defintions
  // also had to patch out all the related calls
  // eleventyConfig.addPlugin(addWebComponentDefinitions, {
  //   quiet: true,
  //   singleScript: true,
  //   specifiers: {
  //     'code-copy': '/_merged_assets/_static/code-tabs/code-copy.js',
  //     'code-tabs': '/_merged_assets/_static/code-tabs/code-tabs.js',
  //     'codesandbox-button': '/_merged_assets/_static/apollo-elements/sandbox.js',
  //     'css-value-doc': '/_merged_assets/_static/custom-elements-manifest/css-value-doc.js',
  //     'docs-playground': '/_merged_assets/_static/playground-elements/docs-playground.js',
  //     'inline-notification': '@rocket/launch/inline-notification/inline-notification.js',
  //     'json-viewer': '/_merged_assets/_static/custom-elements-manifest/json-viewer.js',
  //     'type-doc': '/_merged_assets/_static/custom-elements-manifest/type-doc.js',
  //     'wcd-snippet': '/_merged_assets/_static/webcomponents-dev/wcd-snippet.js',
  //   },
  // });

  // eleventyConfig.addPlugin(apolloElements, { transformCSS: 'decks/**/*.css' });

  // eleventyConfig.addPlugin(webcomponentsDev);

  // eleventyConfig.addPlugin(CodeTabs, {
  //   collections: {
  //     frameworks: {
  //       angular: { label: 'Angular', iconHref: '/_merged_assets/brand-logos/angular.svg' },
  //       preact: { label: 'Preact', iconHref: '/_merged_assets/brand-logos/preact.svg' },
  //       react: { label: 'React', iconHref: '/_merged_assets/brand-logos/react.svg' },
  //       svelte: { label: 'Svelte', iconHref: '/_merged_assets/brand-logos/svelte.svg' },
  //       vue: { label: 'Vue', iconHref: '/_merged_assets/brand-logos/vue.svg' },
  //     },
  //     packageManagers: {
  //       npm: { label: 'NPM', iconHref: '/_merged_assets/brand-logos/npm.svg' },
  //       yarn: { label: 'Yarn', iconHref: '/_merged_assets/brand-logos/yarn.svg' },
  //       pnpm: { label: 'PNPM', iconHref: '/_merged_assets/brand-logos/pnpm.svg' },
  //     },
  //     libraries: {
  //       html: { label: 'HTML', iconHref: '/_merged_assets/brand-logos/html5.svg' },
  //       lit: { label: 'Lit', iconHref: '/_merged_assets/brand-logos/lit.svg' },
  //       fast: { label: 'FAST', iconHref: '/_merged_assets/brand-logos/fast.svg' },
  //       gluon: { label: 'Gluon', iconHref: '/_merged_assets/brand-logos/js.svg' },
  //       haunted: { label: 'Haunted', iconHref: '/_merged_assets/brand-logos/haunted.svg' },
  //       atomico: { label: 'Atomico', iconHref: '/_merged_assets/brand-logos/atomico.svg' },
  //       hybrids: { label: 'Hybrids', iconHref: '/_merged_assets/brand-logos/hybrids.svg' },
  //       mixins: { label: 'Vanilla', iconHref: '/_merged_assets/brand-logos/js.svg' },
  //       polymer: { label: 'Polymer', iconHref: '/_merged_assets/brand-logos/polymer.svg' },
  //     },
  //   },
  // });

  // eleventyConfig.addPlugin(CustomElementsManifest, {
  //   typeLinksNewTab: true,
  //   typeLinks: {
  //     ApolloElementElement: '/api/core/interfaces/element/',
  //     ApolloMutationElement: '/api/core/interfaces/mutation/',
  //     ApolloQueryElement: '/api/core/interfaces/query/',
  //     ApolloSubscriptionElement: '/api/core/interfaces/subscription/',
  //     ApolloControllerOptions: '/api/core/controllers/controller/#options',
  //     ApolloQueryControllerOptions: '/api/core/controllers/query/#options',
  //     ApolloMutationControllerOptions: '/api/core/controllers/mutation/#options',
  //     ApolloSubscriptionControllerOptions: '/api/core/controllers/subscription/#options',
  //     OptimisticResponseType: '/api/core/interfaces/mutation/#optimisticresponse',
  //     Hybrids: 'https://hybrids.js.org/#/misc/typescript',
  //     ApolloCache: 'https://www.apollographql.com/docs/react/api/cache/InMemoryCache/',
  //     ApolloClient: 'https://www.apollographql.com/docs/react/api/core/ApolloClient/',
  //     ApolloError: 'https://github.com/apollographql/apollo-client/blob/d96f4578f89b933c281bb775a39503f6cdb59ee8/src/errors/index.ts#L36-L70',
  //     ApolloQueryResult: 'https://github.com/apollographql/apollo-client/blob/d96f4578f89b933c281bb775a39503f6cdb59ee8/src/core/types.ts#L21-L31',
  //     DocumentNode: 'https://github.com/graphql/graphql-js/blob/cd273ad136d615b3f2f4c830bd8891c7c5590c30/src/language/ast.d.ts#L212',
  //     ErrorPolicy: 'https://www.apollographql.com/docs/react/data/error-handling/#error-policies',
  //     FetchPolicy: 'https://www.apollographql.com/docs/react/api/core/ApolloClient/#FetchPolicy',
  //     FetchResult: 'https://github.com/apollographql/apollo-client/blob/d470c964db46728d8a5dfc63990859c550fa1656/src/link/core/types.ts#L24-L32',
  //     GraphQLError: 'https://github.com/graphql/graphql-js/blob/607345275f60e07dba1b7156a23b9ddf8b086fc9/src/error/GraphQLError.d.ts#L13',
  //     HTMLElement: 'https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement',
  //     InMemoryCache: 'https://www.apollographql.com/docs/react/api/cache/InMemoryCache/',
  //     MutationOptions: 'https://github.com/apollographql/apollo-client/blob/29d41eb590157777f8a65554698fcef4d757a691/src/core/watchQueryOptions.ts#L247-L276',
  //     MutationUpdaterFn: 'https://github.com/apollographql/apollo-client/blob/29d41eb590157777f8a65554698fcef4d757a691/src/core/watchQueryOptions.ts#L279-L282',
  //     NetworkStatus: 'https://github.com/apollographql/apollo-client/blob/d470c964db46728d8a5dfc63990859c550fa1656/src/core/networkStatus.ts#L4',
  //     ObservableQuery: 'https://www.apollographql.com/docs/react/api/core/ObservableQuery/',
  //     Operation: 'https://github.com/apollographql/apollo-client/blob/d470c964db46728d8a5dfc63990859c550fa1656/src/link/core/types.ts#L15-L22',
  //     PureQueryOptions: 'https://github.com/apollographql/apollo-client/blob/d96f4578f89b933c281bb775a39503f6cdb59ee8/src/core/types.ts#L15-L19',
  //     QueryOptions: 'https://github.com/apollographql/apollo-client/blob/29d41eb590157777f8a65554698fcef4d757a691/src/core/watchQueryOptions.ts#L38-L91',
  //     RefetchQueriesType: 'https://github.com/apollographql/apollo-client/blob/29d41eb590157777f8a65554698fcef4d757a691/src/core/watchQueryOptions.ts#L201-L203',
  //     SubscribeToMoreOptions: 'https://github.com/apollographql/apollo-client/blob/29d41eb590157777f8a65554698fcef4d757a691/src/core/watchQueryOptions.ts#L129-L139',
  //     SubscriptionDataOptions: 'https://github.com/apollographql/apollo-client/blob/29d41eb590157777f8a65554698fcef4d757a691/src/react/types/types.ts#L250-L256',
  //     SubscriptionOptions: 'https://github.com/apollographql/apollo-client/blob/d470c964db46728d8a5dfc63990859c550fa1656/src/core/watchQueryOptions.ts#L150-L172',
  //     TypedDocumentNode: 'https://github.com/dotansimha/graphql-typed-document-node',
  //     TypePolicies: 'https://www.apollographql.com/docs/react/caching/cache-configuration/#typepolicy-fields',
  //     WatchQueryOptions: 'https://github.com/apollographql/apollo-client/blob/d470c964db46728d8a5dfc63990859c550fa1656/src/core/watchQueryOptions.ts#L107-L118',
  //     ZenObservable: 'https://github.com/zenparsing/zen-observable',
  //   },
  // });

  // eleventyConfig.addWatchTarget('packages/components/*.ts');
  // eleventyConfig.setTemplateFormats(['webc']);

  return {
    templateFormats: [
      'playground.html',
      'playground.css',
      'playground.graphql',
      'webc',
      'webc.md',
      'svg',
    ],
    dir: {
      input: 'docs',
      output: '_site',
    },
  };
};
