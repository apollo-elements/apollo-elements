/* eslint-disable no-unused-vars */
const OFF = 'off';
const WARNING = 'warn';
const ERROR = 'error';

const ALWAYS = 'always';
const NEVER = 'never';
const IGNORE = 'ignore';
/* eslint-enable no-unused-vars */

export default {
  extends: ['eslint:recommended', 'google'],
  env: { browser: true, es6: true },
  parserOptions: { ecmaVersion: 2018, sourceType: 'module' },
  plugins: [
    'html',
    // 'jsdoc',
    'json',
    'no-loops',
  ],

  // settings: {
  //   jsdoc: {
  //     allowOverrideWithoutParam: true,
  //     tagNamePreference: {
  //       param: 'param',
  //       returns: 'return',
  //     },
  //     additionalTagNames: {
  //       customTags: [
  //         'appliesMixin',
  //         'customElement',
  //         'mixinFunction',
  //         'polymer',
  //       ],
  //     },
  //   },
  // },

  rules: {
    'arrow-parens': [ERROR, 'as-needed'],
    'block-spacing': [ERROR, ALWAYS],
    'brace-style': ERROR,
    'comma-dangle': [ERROR, {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: IGNORE,
    }],
    'comma-spacing': ERROR,
    'comma-style': [ERROR, 'last'],
    'eqeqeq': [ERROR, ALWAYS, { null: IGNORE }],
    'indent': [ERROR, 2, {
      flatTernaryExpressions: true,
      SwitchCase: 1,
      ignoredNodes: [
        'ConditionalExpression',
        'TaggedTemplateExpression > TemplateLiteral CallExpression > ObjectExpression',
        'TaggedTemplateExpression > TemplateLiteral > ObjectExpression',
        'TaggedTemplateExpression > TemplateLiteral CallExpression > TaggedTemplateLiteral',
      ],
    }],

    // 'jsdoc/check-examples': WARNING,
    // 'jsdoc/check-param-names': WARNING,
    // 'jsdoc/check-tag-names': OFF,
    // 'jsdoc/check-types': WARNING,
    // 'jsdoc/newline-after-description': WARNING,
    // 'jsdoc/no-undefined-types': WARNING,
    // 'jsdoc/require-description': OFF,
    // 'jsdoc/require-description-complete-sentence': OFF,
    // 'jsdoc/require-example': OFF,
    // 'jsdoc/require-hyphen-before-param-description': OFF,
    // 'jsdoc/require-param': ERROR,
    // 'jsdoc/require-param-description': ERROR,
    // 'jsdoc/require-param-name': ERROR,
    // 'jsdoc/require-param-type': ERROR,
    // 'jsdoc/require-returns': ERROR,
    // 'jsdoc/require-returns-check': OFF,
    // 'jsdoc/require-returns-description': OFF,
    // 'jsdoc/require-returns-type': ERROR,
    // 'jsdoc/valid-types': ERROR,

    'linebreak-style': [ERROR, 'unix'],
    'lines-between-class-members': [ERROR, ALWAYS],
    'max-len': [ERROR, 100, {
      ignoreComments: true,
      ignoreTemplateLiterals: true,
      ignoreUrls: true,
    }],
    'new-cap': OFF,
    'no-console': ERROR,
    'no-extend-native': ERROR,
    'no-loops/no-loops': ERROR,
    'no-var': ERROR,
    'object-curly-spacing': [ERROR, ALWAYS],
    'prefer-const': ERROR,
    'prefer-destructuring': ERROR,
    'prefer-object-spread': ERROR,
    'prefer-promise-reject-errors': OFF,
    'prefer-spread': ERROR,
    'prefer-template': ERROR,
    'require-jsdoc': OFF,
    'valid-jsdoc': OFF,
    'spaced-comment': [ERROR, ALWAYS, { markers: ['/'] }],
    'space-before-function-paren': [ERROR, {
      anonymous: NEVER,
      named: NEVER,
      asyncArrow: ALWAYS,
    }],
    'space-infix-ops': ERROR,
    'space-unary-ops': ERROR,
    'template-tag-spacing': ERROR,
    'template-curly-spacing': ERROR,
  },
  overrides: [{
    files: ['**/*.test.js', '**/*.spec.js'],
    env: { node: true, mocha: true },
    rules: {
      'max-len': OFF,
      'no-console': OFF,
      'require-jsdoc': OFF,
    },
  }, {
    files: ['*.conf*.js', '.*rc.js', 'packages/eslint-config/index.js'],
    env: { node: true },
    rules: {
      'no-console': OFF,
      'require-jsdoc': OFF,
    },
  }],
};
