import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';
import prettierPlugin from 'eslint-plugin-prettier';

// Get dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create compatibility layer
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended
});

// Define the extended configs
const extendedConfigs = compat.extends(
  'plugin:@typescript-eslint/recommended',
  'plugin:react/recommended',
  'plugin:react-hooks/recommended',
  'prettier'
);

// Define our custom rules and settings
const customConfig = {
  files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
  plugins: {
    prettier: prettierPlugin,
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'prettier/prettier': 'error',
    'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
    'react/jsx-closing-tag-location': 'error'
  },
  settings: {
    react: {
      version: 'detect'
    },
  },
};

export default [js.configs.recommended, ...extendedConfigs, customConfig];
