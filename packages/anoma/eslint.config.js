// const ts = require('@typescript-eslint/eslint-plugin')
const parser = require('@typescript-eslint/parser')

module.exports = [
  // ts.configs.recommended,
  {
    files: ['**.ts'],
    ignores: ['api/**', 'dist/**'],
    parser: parser,
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
]
