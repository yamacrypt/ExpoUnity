module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  env: {
    browser: true,
    es2021: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['build', 'dist', 'node_modules', '**/android', '**/ios'],
};
