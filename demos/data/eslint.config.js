// const ts = require('@typescript-eslint/eslint-plugin')
const parser = require('@typescript-eslint/parser')
const reactRecommended = require('eslint-plugin-react/configs/recommended')
const globals = require('globals')

module.exports = [
  // ts.configs.recommended,
  {
    files: ['**.ts', '**.tsx'],
    languageOptions: {
      ...reactRecommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
      parser: parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
]
