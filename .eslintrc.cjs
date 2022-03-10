module.exports = {
  parser: '@babel/eslint-parser',
  plugins: ['node', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
    'plugin:unicorn/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    requireConfigFile: false,
  },
  env: {
    browser: false,
    node: true,
    es6: true,
  },
  rules: {
    'unicorn/prefer-module': 'off',
  },
  overrides: [
    {
      files: ['tests/**/*.js'],
      env: {
        jest: true,
      },
      rules: {
        'node/no-missing-import': [
          'error',
          {
            allowModules: ['@scalvert/cli-test-harness'],
          },
        ],
      },
    },
  ],
};
