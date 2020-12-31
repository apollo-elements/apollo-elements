// @ts-check

/* eslint-env node */

import { rocketLaunch } from '@d4kmor/launch';
import { rocketBlog } from '@d4kmor/blog';
import { rocketSearch } from '@d4kmor/search';

import { absoluteBaseUrlNetlify } from '@d4kmor/core/helpers';

import { esbuildPlugin } from '@web/dev-server-esbuild';
import { fromRollup } from '@web/dev-server-rollup';

import _litcss from 'rollup-plugin-lit-css';
import _nodeResolve from '@rollup/plugin-node-resolve';
import _graphql from '@apollo-elements/rollup-plugin-graphql';

import esbuild from 'rollup-plugin-esbuild';

import inclusiveLangPlugin from '@11ty/eleventy-plugin-inclusive-language';
import helmet from 'eleventy-plugin-helmet';
import footnotes from 'eleventy-plugin-footnotes';
import addWebComponentDefinitions from 'eleventy-plugin-add-web-component-definitions';

import { setupWrap } from './packages/docs/rocket-plugins/wrap.mjs';
import { githubTag } from './packages/docs/rocket-plugins/liquid/github.mjs';
import { linkTag } from './packages/docs/rocket-plugins/liquid/link.mjs';
import { customElementsManifest } from './packages/docs/rocket-plugins/custom-elements-manifest.mjs';
import { generateManifests } from './packages/docs/rocket-plugins/copy-manifests.mjs';
import { fixNoscript } from './packages/docs/rocket-plugins/fix-noscript.mjs';
import { wrapTab } from './packages/docs/rocket-plugins/code-tabs.mjs';
import { cloudinary } from './packages/docs/rocket-plugins/cloudinary.mjs';

const graphql = fromRollup(_graphql);
const litcss = fromRollup(_litcss);

// TODO: IMMEDIATE: move code-copy immediately to mdjs/core
// TODO: IMMEDIATE: cem-api over to new presets
// TODO: DEFERRED: after presets API is settled, move code-tabs, because it needs config in the preset init options

const isProd = process.env.ELEVENTY_ENV === 'production';

const nodeResolve = {
  exportConditions: ['default', 'esbuild', 'import'],
  extensions: ['.mjs', '.js', '.ts', '.css', '.graphql'],
};

/** @type {import('@d4kmor/cli/src/types').RocketCliOptions} */
const config = {
  themes: [
    rocketLaunch(),
    rocketBlog(),
    rocketSearch(),
  ],

  devServer: {
    nodeResolve,
    port: 9048,
    mimeTypes: {
      '**/*.graphql': 'js',
      '**/packages/docs/*.css': 'js',
    },
    middleware: [
      async (ctx, next) => {
        await next();
        ctx.set('Cache-Control', 'max-age=60');
      },
      // NB: Remove on next major rocket ver
      function rewriteRoot(context, next) {
        if (
          context.url.startsWith('/') &&
          !context.url.match(/node_modules|__web-dev-server__|packages\/docs/)
        )
          context.url = `_site-dev/${context.url}`;
        return next();
      },
    ],
    plugins: [
      { // NB: Remove on next major rocket ver
        name: 'hack-root-dir',
        transform(context) {
          if (process.env.ELEVENTY_ENV !== 'production' && context.response.is('html')) {
            return {
              body: context.body
                .replace(/_site-dev/g, '')
                .replace(/(href|src)="\/\//g, '$1="/'),
            };
          }
        },
      },
      litcss({ include: ['**/packages/docs/*.css'] }),
      graphql(),
      esbuildPlugin({ ts: true }),
    ],
  },

  eleventy(eleventyConfig) {
    // eleventyConfig.addPlugin(inclusiveLangPlugin);
    eleventyConfig.addPlugin(helmet);
    eleventyConfig.addPlugin(footnotes);

    /* start custom-elements-manifest */
    eleventyConfig.addWatchTarget('./packages/interfaces/');
    eleventyConfig.addWatchTarget('./packages/haunted/');
    eleventyConfig.addWatchTarget('./packages/hybrids/');
    eleventyConfig.addWatchTarget('./packages/lib/');
    eleventyConfig.on('beforeBuild', generateManifests);

    eleventyConfig.addPlugin(customElementsManifest, {
      imports: { keepExtension: false },
      types: {
        ApolloCache: 'https://www.apollographql.com/docs/react/api/cache/InMemoryCache/',
        ApolloClient: 'https://www.apollographql.com/docs/react/api/core/ApolloClient/',
        ApolloElementElement: '/api/interfaces/element/',
        ApolloError: 'https://github.com/apollographql/apollo-client/blob/d96f4578f89b933c281bb775a39503f6cdb59ee8/src/errors/index.ts#L36-L70',
        ApolloMutationElement: '/api/interfaces/mutation/',
        ApolloQueryElement: '/api/interfaces/query/',
        ApolloQueryResult: 'https://github.com/apollographql/apollo-client/blob/d96f4578f89b933c281bb775a39503f6cdb59ee8/src/core/types.ts#L21-L31',
        ApolloSubscriptionElement: '/api/interfaces/subscription/',
        DocumentNode: 'https://github.com/graphql/graphql-js/blob/cd273ad136d615b3f2f4c830bd8891c7c5590c30/src/language/ast.d.ts#L212',
        ErrorPolicy: 'https://www.apollographql.com/docs/react/data/error-handling/#error-policies',
        FetchPolicy: 'https://www.apollographql.com/docs/react/api/core/ApolloClient/#FetchPolicy',
        FetchResult: 'https://github.com/apollographql/apollo-client/blob/d470c964db46728d8a5dfc63990859c550fa1656/src/link/core/types.ts#L24-L32',
        GraphQLError: 'https://github.com/graphql/graphql-js/blob/607345275f60e07dba1b7156a23b9ddf8b086fc9/src/error/GraphQLError.d.ts#L13',
        HTMLElement: 'https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement',
        Hybrids: 'https://hybrids.js.org/#/misc/typescript',
        InMemoryCache: 'https://www.apollographql.com/docs/react/api/cache/InMemoryCache/',
        MutationOptions: 'https://github.com/apollographql/apollo-client/blob/29d41eb590157777f8a65554698fcef4d757a691/src/core/watchQueryOptions.ts#L247-L276',
        MutationUpdaterFn: 'https://github.com/apollographql/apollo-client/blob/29d41eb590157777f8a65554698fcef4d757a691/src/core/watchQueryOptions.ts#L279-L282',
        NetworkStatus: 'https://github.com/apollographql/apollo-client/blob/d470c964db46728d8a5dfc63990859c550fa1656/src/core/networkStatus.ts#L4',
        ObservableQuery: 'https://www.apollographql.com/docs/react/api/core/ObservableQuery/',
        Operation: 'https://github.com/apollographql/apollo-client/blob/d470c964db46728d8a5dfc63990859c550fa1656/src/link/core/types.ts#L15-L22',
        OptimisticResponseType: '/api/interfaces/mutation/#optimisticresponse',
        PureQueryOptions: 'https://github.com/apollographql/apollo-client/blob/d96f4578f89b933c281bb775a39503f6cdb59ee8/src/core/types.ts#L15-L19',
        QueryOptions: 'https://github.com/apollographql/apollo-client/blob/29d41eb590157777f8a65554698fcef4d757a691/src/core/watchQueryOptions.ts#L38-L91',
        RefetchQueriesType: 'https://github.com/apollographql/apollo-client/blob/29d41eb590157777f8a65554698fcef4d757a691/src/core/watchQueryOptions.ts#L201-L203',
        SubscribeToMoreOptions: 'https://github.com/apollographql/apollo-client/blob/29d41eb590157777f8a65554698fcef4d757a691/src/core/watchQueryOptions.ts#L129-L139',
        SubscriptionDataOptions: 'https://github.com/apollographql/apollo-client/blob/29d41eb590157777f8a65554698fcef4d757a691/src/react/types/types.ts#L250-L256',
        SubscriptionOptions: 'https://github.com/apollographql/apollo-client/blob/d470c964db46728d8a5dfc63990859c550fa1656/src/core/watchQueryOptions.ts#L150-L172',
        TypedDocumentNode: 'https://github.com/dotansimha/graphql-typed-document-node',
        TypePolicies: 'https://www.apollographql.com/docs/react/caching/cache-configuration/#typepolicy-fields',
        WatchQueryOptions: 'https://github.com/apollographql/apollo-client/blob/d470c964db46728d8a5dfc63990859c550fa1656/src/core/watchQueryOptions.ts#L107-L118',
        ZenObservable: 'https://github.com/zenparsing/zen-observable',
      },
    });

    /* end custom-elements-manifest */

    /* start blog */
    eleventyConfig.addFilter('cloudinary', cloudinary);
    eleventyConfig.addLiquidTag('github', githubTag);
    eleventyConfig.addLiquidTag('link', linkTag);
    /* end blog */

    /* start auto-import web components */
    function importSpecifier(tagName) {
      return isProd ?
        '@apollo-elements/docs/components'
      : `@apollo-elements/docs/${tagName}`;
    }

    eleventyConfig.addPlugin(addWebComponentDefinitions, {
      singleScript: true,
      specifiers: {
        'code-copy': importSpecifier,
        'code-tabs': importSpecifier,
        'wcd-snippet': importSpecifier,
        'type-doc': importSpecifier,
        'codesandbox-button': '@power-elements/codesandbox-button',
      },
    });
    /* end auto-import web components */

    // one day
    // eleventyConfig.addPlugin(mermaid);

    // In some cases, 11ty is encoding `<noscript><link>`, in the `<head>`,
    // even though that is legitimate HTML. This transform ensures the final
    // HTML has noscript styles.
    eleventyConfig.addPlugin(fixNoscript);
  },

  build: {
    emptyOutputDir: false,
    absoluteBaseUrl: absoluteBaseUrlNetlify('http://localhost:8080'),

    rollup(config) {
      config.plugins = [
        _litcss(),
        _nodeResolve(),
        esbuild({
          tsconfig: './packages/docs/tsconfig.json',
          include: 'packages/docs/*',
          sourceMap: true,
          loaders: {
            '.ts': 'ts',
            '.css': 'ts',
            '.graphql': 'ts',
          },
        }),
        ...config.plugins,
      ];
      return config;
    },

  },

  setupUnifiedPlugins: [
    setupWrap({
      copy: () => ({ tagName: 'code-copy' }),
      wcd: ([id, file]) => ({ tagName: 'wcd-snippet', attributes: { 'data-id': id, file } }),
      tab: ([tab]) => wrapTab(tab),
    }),
  ],

};

export default config;
