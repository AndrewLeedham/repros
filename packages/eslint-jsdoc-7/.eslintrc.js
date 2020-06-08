module.exports = {
  plugins: ['@typescript-eslint', 'jsdoc'],
  extends: ['plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  settings: {
    jsdoc: {
      mode: 'typescript',
    },
  },
  rules: {
    'jsdoc/check-param-names': 'error',
  },
};
