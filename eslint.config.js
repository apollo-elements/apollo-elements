import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import easyLoops from 'eslint-plugin-easy-loops';
import globals from 'globals';

export default [
  // Base config for all JavaScript/TypeScript files
  {
    files: ['**/*.{js,ts}'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        project: ['./tsconfig.json', './packages/*/tsconfig.json'],
      },
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'easy-loops': easyLoops,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,

      // Custom rules from original config
      'camelcase': ['error', { allow: ['__testing_escape_hatch__'] }],
      'valid-jsdoc': 'off',
      'no-invalid-this': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-invalid-this': ['error'],
      '@typescript-eslint/ban-ts-comment': ['warn', {
        'ts-expect-error': 'allow-with-description',
        'ts-ignore': 'allow-with-description'
      }],
      '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true
      }],
    },
  },

  // Config files override
  {
    files: ['web-test-runner.config.js', 'plugins/**/*.js', 'test/**/*.js'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
      },
    },
  },

  // Test files override
  {
    files: ['packages/**/*.test.ts', 'packages/**/*.test.js'],
    languageOptions: {
      globals: {
        ...globals.mocha,
      },
    },
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', {
        varsIgnorePattern: 'TypeCheck|ApolloQueryElement|LitApolloQueryController'
      }],
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },

  // Scripts override
  {
    files: ['scripts/*'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2020,
      },
    },
    rules: {
      'no-console': 'off',
    },
  },

  // Ignore files
  {
    ignores: [
      'node_modules/**',
      '**/node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      '**/coverage/**',
      '**/*.js.map',
      '**/*.d.ts',
      '_site/**',
      '_site-dev/**',
      'docs/**',
      'test/**',
      'plugins/**',
      'packages/**/*.js',
      'packages/*/custom-elements.json',
      'packages/*/custom-elements-manifest.config.js',
      'packages/create/template/**',
      'eslint.config.js',
      'web-test-runner.config.js',
    ],
  },
];
