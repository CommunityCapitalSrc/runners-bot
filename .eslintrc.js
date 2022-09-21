module.exports = {
  root: true,
  ignorePatterns: ['babel.config.js', 'build/*'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'unused-imports'],
  rules: {
    semi: ['error', 'never'],
    'max-len': ['error', { code: 120, ignoreStrings: true, ignoreTemplateLiterals: true, ignoreComments: true }],
    '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true, argsIgnorePattern: '^_' }],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: ['interface', 'typeLike'],
        format: ['PascalCase', 'camelCase'],
        custom: {
          regex: '^Props$',
          match: false,
        },
      },
    ],
    'no-unused-vars': 'off', // or "@typescript-eslint/no-unused-vars": "off",
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
    ],
  },
  settings: {},
  overrides: [
    {
      files: ['**/*.test.ts', '**/*.test.tsx', '**/setupTests.ts', 'src/testing/**/*.ts'],
      env: {
        jest: true,
      },
    },
  ],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2015,
  },
  env: {
    browser: true,
    amd: true,
    node: true,
  },
}
