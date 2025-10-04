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
        project: ['./tsconfig.json', './packages/*/tsconfig.json', './test/tsconfig.json'],
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
      'no-redeclare': 'off', // Disable base rule for TypeScript overloads
      '@typescript-eslint/no-invalid-this': ['error'],
      '@typescript-eslint/no-redeclare': ['error'], // Use TS-aware version
      '@typescript-eslint/ban-ts-comment': ['warn', {
        'ts-expect-error': 'allow-with-description',
        'ts-ignore': 'allow-with-description'
      }],
      '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true
      }],
      '@typescript-eslint/no-deprecated': 'warn',
    },
  },

  // Test files override
  {
    files: [
      'packages/**/*.test.ts',
      'test/**/*.ts',
    ],
    languageOptions: {
      globals: {
        ...globals.mocha,
        Mocha: true,
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

  // Test TypeScript files - enable deprecation warnings
  {
    files: ['packages/**/*.test.ts', 'test/**/*.ts'],
    rules: {
      '@typescript-eslint/no-deprecated': 'warn',
    },
  },

  // Scripts override
  {
    files: ['scripts/*'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2020,
        project: null,
      },
    },
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-deprecated': 'off',
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
      'plugins/**',
      'test/**',
      'packages/**/*.js',
      'packages/*/custom-elements.json',
      'packages/*/custom-elements-manifest.config.js',
      'packages/create/template/**',
      'eslint.config.js',
      'web-test-runner.config.js',
    ],
  },
];
