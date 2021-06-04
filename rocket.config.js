// @ts-check

/* eslint-env node */

import { rocketLaunch } from '@rocket/launch';
import { rocketBlog } from '@rocket/blog';
import { rocketSearch } from '@rocket/search';

import { absoluteBaseUrlNetlify } from '@rocket/core/helpers';

import { esbuildPlugin } from '@web/dev-server-esbuild';
import { fromRollup } from '@web/dev-server-rollup';

import litcss from 'rollup-plugin-lit-css';
import graphql from '@apollo-elements/rollup-plugin-graphql';

import esbuildRollup from 'rollup-plugin-esbuild';

import path from 'path';

import helmet from 'eleventy-plugin-helmet';
import footnotes from 'eleventy-plugin-footnotes';
import addWebComponentDefinitions from 'eleventy-plugin-add-web-component-definitions';

import { markdown } from './packages/docs/rocket-plugins/markdown.js';
import { prettyJson } from './packages/docs/rocket-plugins/prettyJson.js';
import { setupWrap } from './packages/docs/rocket-plugins/wrap.js';
import { githubTag } from './packages/docs/rocket-plugins/liquid/github.js';
import { linkTag } from './packages/docs/rocket-plugins/liquid/link.js';
import { customElementsManifest } from './packages/docs/rocket-plugins/custom-elements-manifest.js';
import { generateManifests } from './packages/docs/rocket-plugins/copy-manifests.js';
import { fixNoscript } from './packages/docs/rocket-plugins/fix-noscript.js';
import { wrapTab } from './packages/docs/rocket-plugins/code-tabs.js';
import { getWebmentionsForUrl } from './packages/docs/rocket-plugins/webmentions.js';
import { icon } from './packages/docs/rocket-plugins/icon.js';
import { buildComponents } from './packages/docs/rocket-plugins/build-components.js';

import { addPlugin, adjustPluginOptions } from 'plugins-manager';

const isProd = process.env.ELEVENTY_ENV === 'production';

/** @type {import('@rocket/cli/dist-types/types/main').RocketCliOptions} */
export default ({
  presets: [
    rocketLaunch(),
    rocketBlog(),
    rocketSearch(),
  ],

  absoluteBaseUrl: absoluteBaseUrlNetlify('http://localhost:8080'),

  eleventy(eleventyConfig) {
    eleventyConfig.addWatchTarget('./packages/components/');
    eleventyConfig.on('beforeBuild', buildComponents);
    // eleventyConfig.addPlugin(inclusiveLangPlugin);
    eleventyConfig.addPlugin(helmet);
    eleventyConfig.addPlugin(footnotes);

    /* start custom-elements-manifest */
    eleventyConfig.addWatchTarget('./packages/interfaces/');
    eleventyConfig.addWatchTarget('./packages/haunted/');
    eleventyConfig.addWatchTarget('./packages/hybrids/');
    eleventyConfig.addWatchTarget('./packages/lib/');

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

    eleventyConfig.on('beforeBuild', generateManifests);
    /* end custom-elements-manifest */

    /* start blog */
    eleventyConfig.addFilter('markdown', markdown);
    eleventyConfig.addFilter('prettyJson', prettyJson);
    eleventyConfig.addFilter('uniUrlFilter', x => encodeURI(x));
    eleventyConfig.addLiquidTag('github', githubTag);
    eleventyConfig.addLiquidTag('link', linkTag);
    eleventyConfig.addFilter('getWebmentionsForUrl', getWebmentionsForUrl);
    eleventyConfig.addFilter('icon', icon(eleventyConfig));
    /* end blog */

    /* start slides */
    eleventyConfig.addFilter('dirname', pathname => pathname && path.dirname(pathname));
    eleventyConfig.addFilter('joinPath', (pathname, ...to) => path.join(pathname, ...to));
    eleventyConfig.addCollection('slides', function(collectionApi) {
      return collectionApi.getFilteredByTag('slide').sort((a, b) => {
        return (
            a.template.inputPath < b.template.inputPath ? -1
          : a.template.inputPath > b.template.inputPath ? 1
          : 0
        );
      });
    });
    /* start slides */

    /* start auto-import web components */
    function importSpecifier(tagName) {
      return isProd ?
        '@apollo-elements/docs/components'
      : `@apollo-elements/docs/${tagName}`;
    }

    eleventyConfig.addPlugin(addWebComponentDefinitions, {
      quiet: true,
      singleScript: true,
      specifiers: {
        'code-copy': importSpecifier,
        'code-tabs': importSpecifier,
        'wcd-snippet': importSpecifier,
        'type-doc': importSpecifier,
        'json-viewer': '@power-elements/json-viewer',
        'codesandbox-button': '@power-elements/codesandbox-button',
        'inline-notification': '@rocket/launch/inline-notification/inline-notification.js',
        'docs-playground': '/_assets/_static/docs-playground.js',
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

  setupUnifiedPlugins: [
    setupWrap({
      'copy': () => ({ tagName: 'code-copy' }),
      'wcd': ([id, file]) => ({ tagName: 'wcd-snippet', attributes: { 'data-id': id, file } }),
      'tab': ([tab]) => wrapTab(tab),
      'reveal': () => ({ tagName: 'div', attributes: { reveal: 'true' } }),
      'center': () => ({ tagName: 'div', attributes: { center: 'true' } }),
      'playground': ([id]) => ({
        tagName: 'docs-playground',
        attributes: { id },
      }),
      'playground-file': ([id, name]) => ({
        tagName: 'template',
        attributes: {
          'data-playground-id': id,
          'data-filename': name,
        },
      }),
      'playground-import-map': ([id]) => ({
        tagName: 'template',
        attributes: {
          'data-import-map': id,
        },
      }),
    }),
  ],

  devServer: {
    port: 9048,
    nodeResolve: {
      exportConditions: ['default', 'development', 'esbuild', 'import'],
      extensions: ['.mjs', '.js', '.ts', '.css', '.graphql'],
    },
    mimeTypes: {
      '**/*.ts': 'js',
      '**/*.graphql': 'js',
      '**/packages/docs/*.css': 'js',
    },
    plugins: [
      fromRollup(graphql)(),
      fromRollup(litcss)({ include: ['**/packages/docs/*.css'] }),
      esbuildPlugin({ ts: true }),
    ],
  },

  setupBuildPlugins: [
    addPlugin({
      name: 'esbuild-rollup',
      plugin: esbuildRollup,
      options: {
        minify: false,
        tsconfig: './packages/docs/tsconfig.json',
        include: 'packages/docs/*',
        sourceMap: true,
        loaders: {
          '.ts': 'ts',
          '.css': 'ts',
          '.graphql': 'ts',
        },
      } }),
    adjustPluginOptions('import-meta-assets', {
      exclude: '**/node_modules/playground-elements/*',
    }),
  ],

});
