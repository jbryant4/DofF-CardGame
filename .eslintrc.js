module.exports = {
  extends: [
    'airbnb-typescript',
    'prettier',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json'
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'jsx-a11y',
    'import',
    'prettier'
  ],
  root: true,
  rules: {
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        },
        groups: [
          'builtin',
          'external',
          'object',
          'internal',
          'sibling',
          'parent',
          'index'
        ],
        pathGroups: [
          {
            pattern: '~/**',
            group: 'internal'
          },
          {
            pattern: '@/**',
            group: 'object'
          }
        ]
      }
    ],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' }
    ],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '[iI]gnored' }
    ],
    'react/display-names': 'off',
    'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.tsx'] }],
    'react/prop-types': 'off',
    'react-hooks/exhaustive-deps': 'error'
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/resolver': {
      typescript: {}
    },
    react: {
      version: 'detect'
    }
  }
};
