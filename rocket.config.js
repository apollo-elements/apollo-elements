/* eslint-env node */

import graphql from '@apollo-elements/rollup-plugin-graphql';
import litcss from 'rollup-plugin-lit-css';

import { absoluteBaseUrlNetlify } from '@rocket/core/helpers';

import { codeTabs } from 'rocket-preset-code-tabs';
import { apolloElements } from 'rocket-preset-apollo-elements';
import { customElementsManifest } from 'rocket-preset-custom-elements-manifest';
import { playgroundElements } from 'rocket-preset-playground-elements';
import { slideDecks } from 'rocket-preset-slide-decks';
import { webcomponentsDev } from 'rocket-preset-webcomponents-dev';
import { esbuildPlugin } from '@web/dev-server-esbuild';
import { fromRollup } from '@web/dev-server-rollup';
import { rocketBlog } from '@rocket/blog';
import { rocketLaunch } from '@rocket/launch';
import { rocketSearch } from '@rocket/search';

const IMPORT_MAP_BASE = `{{ORIGIN}}/_merged_assets/_static/apollo-elements`;

/** @type {import('@rocket/cli/dist-types/types/main').RocketCliOptions} */
export default ({
  absoluteBaseUrl: absoluteBaseUrlNetlify('http://localhost:8080'),

  checkLinks: {
    ignoreLinkPatterns: [
      '**/blog/*/_assets/**/*',
      '**/healthy-snack.js',
      '/blog/next-evolution/_assets/healthy-snack/healthy-snack.js',
      'healthy-snack.js',
    ],
  },

  presets: [
    rocketLaunch(),
    rocketBlog(),
    rocketSearch(),

    apolloElements({ transformCSS: 'decks/**/*.css' }),
    webcomponentsDev(),
    slideDecks(),

    playgroundElements({
      importMap: {
        '@apollo/client/core': `${IMPORT_MAP_BASE}/apollo-client.js`,
        '@apollo/client/utilities': `${IMPORT_MAP_BASE}/apollo-client.js`,
        '@apollo/client/utilities/graphql/storeUtils.js': `${IMPORT_MAP_BASE}/apollo-client.js`,

        '@apollo/client/link/schema': `${IMPORT_MAP_BASE}/schema-link.js`,
        '@graphql-tools/mock': `${IMPORT_MAP_BASE}/schema-link.js`,
        '@graphql-tools/schema': `${IMPORT_MAP_BASE}/schema-link.js`,
        '@graphql-tools/tools': `${IMPORT_MAP_BASE}/schema-link.js`,
        'event-iterator': `${IMPORT_MAP_BASE}/schema-link.js`,

        '@apollo-elements/components': `${IMPORT_MAP_BASE}/apollo-elements.js`,
        '@apollo-elements/components/apollo-client': `${IMPORT_MAP_BASE}/apollo-elements.js`,
        '@apollo-elements/components/apollo-client.js': `${IMPORT_MAP_BASE}/apollo-elements.js`,
        '@apollo-elements/components/apollo-mutation': `${IMPORT_MAP_BASE}/apollo-elements.js`,
        '@apollo-elements/components/apollo-mutation.js': `${IMPORT_MAP_BASE}/apollo-elements.js`,
        '@apollo-elements/components/apollo-query': `${IMPORT_MAP_BASE}/apollo-elements.js`,
        '@apollo-elements/components/apollo-query.js': `${IMPORT_MAP_BASE}/apollo-elements.js`,
        '@apollo-elements/components/apollo-subscription': `${IMPORT_MAP_BASE}/apollo-elements.js`,
        '@apollo-elements/components/apollo-subscription.js': `${IMPORT_MAP_BASE}/apollo-elements.js`,

        '@apollo-elements/core': `${IMPORT_MAP_BASE}/apollo-elements.js`,
        '@apollo-elements/core/index.js': `${IMPORT_MAP_BASE}/apollo-elements.js`,
        '@apollo-elements/core/apollo-mutation-controller': `${IMPORT_MAP_BASE}/apollo-elements.js`,
        '@apollo-elements/core/apollo-query-controller': `${IMPORT_MAP_BASE}/apollo-elements.js`,
        '@apollo-elements/core/apollo-subscription-controller': `${IMPORT_MAP_BASE}/apollo-elements.js`,
        '@apollo-elements/core/decorators': `${IMPORT_MAP_BASE}/apollo-elements.js`,
        '@apollo-elements/core/events': `${IMPORT_MAP_BASE}/apollo-elements.js`,
        '@apollo-elements/core/lib/has-all-variables': `${IMPORT_MAP_BASE}/apollo-elements.js`,

        'atomico': `${IMPORT_MAP_BASE}/atomico.js`,
        '@apollo-elements/atomico': `${IMPORT_MAP_BASE}/atomico.js`,
        '@apollo-elements/atomico/useQuery.js': `${IMPORT_MAP_BASE}/atomico.js`,
        '@apollo-elements/atomico/useMutation.js': `${IMPORT_MAP_BASE}/atomico.js`,
        '@apollo-elements/atomico/useSubscription.js': `${IMPORT_MAP_BASE}/atomico.js`,
        '@apollo-elements/atomico/useQuery': `${IMPORT_MAP_BASE}/atomico.js`,
        '@apollo-elements/atomico/useMutation': `${IMPORT_MAP_BASE}/atomico.js`,
        '@apollo-elements/atomico/useSubscription': `${IMPORT_MAP_BASE}/atomico.js`,

        '@microsoft/fast-element': `${IMPORT_MAP_BASE}/fast.js`,
        '@apollo-elements/fast': `${IMPORT_MAP_BASE}/fast.js`,
        '@apollo-elements/fast/apollo-query.js': `${IMPORT_MAP_BASE}/fast.js`,
        '@apollo-elements/fast/apollo-mutation.js': `${IMPORT_MAP_BASE}/fast.js`,
        '@apollo-elements/fast/apollo-subscription.js': `${IMPORT_MAP_BASE}/fast.js`,
        '@apollo-elements/fast/apollo-query': `${IMPORT_MAP_BASE}/fast.js`,
        '@apollo-elements/fast/apollo-mutation': `${IMPORT_MAP_BASE}/fast.js`,
        '@apollo-elements/fast/apollo-subscription': `${IMPORT_MAP_BASE}/fast.js`,

        '@apollo-elements/lit-apollo': `${IMPORT_MAP_BASE}/lit-apollo.js`,
        '@apollo-elements/lit-apollo/apollo-query.js': `${IMPORT_MAP_BASE}/lit-apollo.js`,
        '@apollo-elements/lit-apollo/apollo-mutation.js': `${IMPORT_MAP_BASE}/lit-apollo.js`,
        '@apollo-elements/lit-apollo/apollo-subscription.js': `${IMPORT_MAP_BASE}/lit-apollo.js`,
        '@apollo-elements/lit-apollo/apollo-query': `${IMPORT_MAP_BASE}/lit-apollo.js`,
        '@apollo-elements/lit-apollo/apollo-mutation': `${IMPORT_MAP_BASE}/lit-apollo.js`,
        '@apollo-elements/lit-apollo/apollo-subscription': `${IMPORT_MAP_BASE}/lit-apollo.js`,

        '@apollo-elements/gluon': `${IMPORT_MAP_BASE}/gluon.js`,
        '@apollo-elements/gluon/index.js': `${IMPORT_MAP_BASE}/gluon.js`,
        '@apollo-elements/gluon/apollo-query.js': `${IMPORT_MAP_BASE}/gluon.js`,
        '@apollo-elements/gluon/apollo-mutation.js': `${IMPORT_MAP_BASE}/gluon.js`,
        '@apollo-elements/gluon/apollo-subscription.js': `${IMPORT_MAP_BASE}/gluon.js`,
        '@apollo-elements/gluon/apollo-query': `${IMPORT_MAP_BASE}/gluon.js`,
        '@apollo-elements/gluon/apollo-mutation': `${IMPORT_MAP_BASE}/gluon.js`,
        '@apollo-elements/gluon/apollo-subscription': `${IMPORT_MAP_BASE}/gluon.js`,

        '@apollo-elements/haunted': `${IMPORT_MAP_BASE}/haunted.js`,
        '@apollo-elements/haunted/useQuery.js': `${IMPORT_MAP_BASE}/haunted.js`,
        '@apollo-elements/haunted/useMutation.js': `${IMPORT_MAP_BASE}/haunted.js`,
        '@apollo-elements/haunted/useSubscription.js': `${IMPORT_MAP_BASE}/haunted.js`,
        '@apollo-elements/haunted/useQuery': `${IMPORT_MAP_BASE}/haunted.js`,
        '@apollo-elements/haunted/useMutation': `${IMPORT_MAP_BASE}/haunted.js`,
        '@apollo-elements/haunted/useSubscription': `${IMPORT_MAP_BASE}/haunted.js`,

        '@apollo-elements/hybrids': `${IMPORT_MAP_BASE}/hybrids.js`,
        '@apollo-elements/hybrids/factories/query.js': `${IMPORT_MAP_BASE}/hybrids.js`,
        '@apollo-elements/hybrids/factories/mutation.js': `${IMPORT_MAP_BASE}/hybrids.js`,
        '@apollo-elements/hybrids/factories/subscription.js': `${IMPORT_MAP_BASE}/hybrids.js`,
        '@apollo-elements/hybrids/factories/query': `${IMPORT_MAP_BASE}/hybrids.js`,
        '@apollo-elements/hybrids/factories/mutation': `${IMPORT_MAP_BASE}/hybrids.js`,
        '@apollo-elements/hybrids/factories/subscription': `${IMPORT_MAP_BASE}/hybrids.js`,

        '@apollo-elements/mixins': `${IMPORT_MAP_BASE}/mixins.js`,
        '@apollo-elements/mixins/apollo-client-mixin': `${IMPORT_MAP_BASE}/mixins.js`,
        '@apollo-elements/mixins/apollo-mutation-mixin': `${IMPORT_MAP_BASE}/mixins.js`,
        '@apollo-elements/mixins/apollo-query-mixin': `${IMPORT_MAP_BASE}/mixins.js`,
        '@apollo-elements/mixins/apollo-subscription-mixin': `${IMPORT_MAP_BASE}/mixins.js`,
        '@apollo-elements/mixins/controller-host-mixin': `${IMPORT_MAP_BASE}/mixins.js`,
        '@apollo-elements/mixins/graphql-script-child-mixin': `${IMPORT_MAP_BASE}/mixins.js`,
        '@apollo-elements/mixins/type-policies-mixin': `${IMPORT_MAP_BASE}/mixins.js`,
        '@apollo-elements/mixins/validate-variables-mixin': `${IMPORT_MAP_BASE}/mixins.js`,

        '@apollo-elements/polymer': `${IMPORT_MAP_BASE}/polymer.js`,
        '@apollo-elements/polymer/polymer-apollo-mutation': `${IMPORT_MAP_BASE}/polymer.js`,
        '@apollo-elements/polymer/polymer-apollo-query': `${IMPORT_MAP_BASE}/polymer.js`,
        '@apollo-elements/polymer/polymer-apollo-subscription': `${IMPORT_MAP_BASE}/polymer.js`,
      },
    }),

    codeTabs({
      collections: {
        frameworks: {
          angular: { label: 'Angular', iconHref: '/_merged_assets/brand-logos/angular.svg' },
          preact: { label: 'Preact', iconHref: '/_merged_assets/brand-logos/preact.svg' },
          react: { label: 'React', iconHref: '/_merged_assets/brand-logos/react.svg' },
          svelte: { label: 'Svelte', iconHref: '/_merged_assets/brand-logos/svelte.svg' },
          vue: { label: 'Vue', iconHref: '/_merged_assets/brand-logos/vue.svg' },
        },
        packageManagers: {
          npm: { label: 'NPM', iconHref: '/_merged_assets/brand-logos/npm.svg' },
          yarn: { label: 'Yarn', iconHref: '/_merged_assets/brand-logos/yarn.svg' },
          pnpm: { label: 'PNPM', iconHref: '/_merged_assets/brand-logos/pnpm.svg' },
        },
        libraries: {
          html: { label: 'HTML', iconHref: '/_merged_assets/brand-logos/html5.svg' },
          lit: { label: 'Lit', iconHref: '/_merged_assets/brand-logos/lit.svg' },
          fast: { label: 'FAST', iconHref: '/_merged_assets/brand-logos/fast.svg' },
          gluon: { label: 'Gluon', iconHref: '/_merged_assets/brand-logos/js.svg' },
          haunted: { label: 'Haunted', iconHref: '/_merged_assets/brand-logos/haunted.svg' },
          atomico: { label: 'Atomico', iconHref: '/_merged_assets/brand-logos/atomico.svg' },
          hybrids: { label: 'Hybrids', iconHref: '/_merged_assets/brand-logos/hybrids.svg' },
          mixins: { label: 'Vanilla', iconHref: '/_merged_assets/brand-logos/js.svg' },
          polymer: { label: 'Polymer', iconHref: '/_merged_assets/brand-logos/polymer.svg' },
        },
      },
    }),

    customElementsManifest({
      typeLinksNewTab: true,
      typeLinks: {
        ApolloElementElement: '/api/core/interfaces/element/',
        ApolloMutationElement: '/api/core/interfaces/mutation/',
        ApolloQueryElement: '/api/core/interfaces/query/',
        ApolloSubscriptionElement: '/api/core/interfaces/subscription/',
        ApolloControllerOptions: '/api/core/controllers/controller/#options',
        ApolloQueryControllerOptions: '/api/core/controllers/query/#options',
        ApolloMutationControllerOptions: '/api/core/controllers/mutation/#options',
        ApolloSubscriptionControllerOptions: '/api/core/controllers/subscription/#options',
        OptimisticResponseType: '/api/core/interfaces/mutation/#optimisticresponse',

        Hybrids: 'https://hybrids.js.org/#/misc/typescript',

        ApolloCache: 'https://www.apollographql.com/docs/react/api/cache/InMemoryCache/',
        ApolloClient: 'https://www.apollographql.com/docs/react/api/core/ApolloClient/',
        ApolloError: 'https://github.com/apollographql/apollo-client/blob/d96f4578f89b933c281bb775a39503f6cdb59ee8/src/errors/index.ts#L36-L70',
        ApolloQueryResult: 'https://github.com/apollographql/apollo-client/blob/d96f4578f89b933c281bb775a39503f6cdb59ee8/src/core/types.ts#L21-L31',
        DocumentNode: 'https://github.com/graphql/graphql-js/blob/cd273ad136d615b3f2f4c830bd8891c7c5590c30/src/language/ast.d.ts#L212',
        ErrorPolicy: 'https://www.apollographql.com/docs/react/data/error-handling/#error-policies',
        FetchPolicy: 'https://www.apollographql.com/docs/react/api/core/ApolloClient/#FetchPolicy',
        FetchResult: 'https://github.com/apollographql/apollo-client/blob/d470c964db46728d8a5dfc63990859c550fa1656/src/link/core/types.ts#L24-L32',
        GraphQLError: 'https://github.com/graphql/graphql-js/blob/607345275f60e07dba1b7156a23b9ddf8b086fc9/src/error/GraphQLError.d.ts#L13',
        HTMLElement: 'https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement',
        InMemoryCache: 'https://www.apollographql.com/docs/react/api/cache/InMemoryCache/',
        MutationOptions: 'https://github.com/apollographql/apollo-client/blob/29d41eb590157777f8a65554698fcef4d757a691/src/core/watchQueryOptions.ts#L247-L276',
        MutationUpdaterFn: 'https://github.com/apollographql/apollo-client/blob/29d41eb590157777f8a65554698fcef4d757a691/src/core/watchQueryOptions.ts#L279-L282',
        NetworkStatus: 'https://github.com/apollographql/apollo-client/blob/d470c964db46728d8a5dfc63990859c550fa1656/src/core/networkStatus.ts#L4',
        ObservableQuery: 'https://www.apollographql.com/docs/react/api/core/ObservableQuery/',
        Operation: 'https://github.com/apollographql/apollo-client/blob/d470c964db46728d8a5dfc63990859c550fa1656/src/link/core/types.ts#L15-L22',
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
    }),
  ],

  eleventy(eleventyConfig) {
    eleventyConfig.addPassThroughCopy('decks/graphql-in-html/*.{png,svg,jpg,webp}');
    eleventyConfig.addFilter('formatDate', date =>
      date instanceof Date ? date.toDateString() : date);
    eleventyConfig.addWatchTarget('_assets/**/*.css');
    eleventyConfig.addTransform('fix-noscript', content =>
      content
        .replace(/&#x26;#x3C;(link|style)/g, '<$1')
        .replace(/&#x26;(link|style)/g, '<$1')
        .replace(/&#x3C;(link|style)/g, '<$1')
    );
  },

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

});
